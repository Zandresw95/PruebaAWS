import { useContext, useState } from "react";
import UserContext from "../../../context/UserContext";
import Button from "../../generic/Button";
import ContInput from "../../generic/ContInput";
import PopupContext from "../../../context/PopupContext";
import { Validar } from "../../../helpers/Validar";
import "./FormContrasena.css";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../../reduxStore/actions/auth";
import $ from "jquery";
import { host, port } from "../../../helpers/Dbdata";

let initialDatosForm = { anterior: "", nueva: "", verificacion: "" };

let initialFormValidado = {
  anterior: [false, ""],
  nueva: [false, ""],
  verificacion: [false, ""],
};

function FormContrasena({ cerrar }) {
  const [datosForm, setDatosForm] = useState(initialDatosForm);
  const [formValidado, setFormValidado] = useState(initialFormValidado);
  const { mostrarPopup } = useContext(PopupContext);
  const [cargando, setCargando] = useState(false);

  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const guardarContrasena = () => {
    $.ajax({
      url: `${host}:${port}/api/tabla_usuarios/edit/${uid}`,
      type: "put",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        claveAnterior: datosForm.anterior,
        clave: datosForm.nueva,
      }),
      beforeSend: function () {
        setCargando(true);
      },
      success: function (data) {
        setCargando(false);
        // console.log(data);
        mostrarPopup(1, data.mensaje + ". La sesión se cerrará.");
        dispatch(startLogout());
      },
      error: function (data) {
        setCargando(false);
        console.log(data);
        if (data.status === 0)
          mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        else mostrarPopup(0, data.responseJSON.data);
      },
    });
  };

  const handleGuardarContrasena = () => {
    if (validarForm()) {
      if (datosForm.nueva === datosForm.verificacion) guardarContrasena();
      else mostrarPopup(2, "Las claves no coinciden");
    } else {
      mostrarPopup(
        2,
        "Revisa que todos los campos se hayan llenado correctamente"
      );
    }
  };

  const validarForm = () => {
    for (const key in formValidado) {
      if (Object.hasOwnProperty.call(formValidado, key)) {
        const el = formValidado[key];
        if (!el[0]) return false;
      }
    }
    return true;
  };

  const handleChange = (e) => {
    setDatosForm({
      ...datosForm,
      [e.target.name]: e.target.value,
    });
    actualizarValidacion(e);
  };

  const actualizarValidacion = (e) => {
    let tempCampo = {};
    switch (e.target.name) {
      case "anterior":
        tempCampo = {
          [e.target.name]: Validar.general(e.target.value),
        };
        break;
      case "nueva":
        tempCampo = {
          [e.target.name]: Validar.general(e.target.value),
        };
        break;
      case "verificacion":
        tempCampo = {
          [e.target.name]: Validar.general(e.target.value),
        };
        break;
      default:
        break;
    }
    setFormValidado({
      ...formValidado,
      ...tempCampo,
    });
  };

  return (
    <div className="cont-form-contrasena">
      <form className="cont-flex-vertical-gap">
        <h3>Cambiar contraseña</h3>
        <div>
          <ContInput label={"Contraseña anterior"}>
            <input
              type="password"
              name="anterior"
              placeholder="1234"
              value={datosForm.anterior}
              onChange={handleChange}
            />
            {!formValidado.anterior[0] && (
              <div className="ico-advertencia  format-ico-form-validacion"></div>
            )}
          </ContInput>
          {!formValidado.anterior[0] && (
            <p className="texto-validacion">{formValidado.anterior[1]}</p>
          )}
        </div>
        <div>
          <ContInput label={"Nueva contraseña"}>
            <input
              type="password"
              name="nueva"
              placeholder="1234"
              value={datosForm.nueva}
              onChange={handleChange}
            />
            {!formValidado.nueva[0] && (
              <div className="ico-advertencia  format-ico-form-validacion"></div>
            )}
          </ContInput>
          {!formValidado.nueva[0] && (
            <p className="texto-validacion">{formValidado.nueva[1]}</p>
          )}
        </div>
        <div>
          <ContInput label={"Verifica la nueva contraseña"}>
            <input
              type="password"
              name="verificacion"
              placeholder="1234"
              value={datosForm.verificacion}
              onChange={handleChange}
            />
            {!formValidado.verificacion[0] && (
              <div className="ico-advertencia  format-ico-form-validacion"></div>
            )}
          </ContInput>
          {!formValidado.verificacion[0] && (
            <p className="texto-validacion">{formValidado.verificacion[1]}</p>
          )}
        </div>
        <div className="max-content justify-content-center">
          <Button
            label={"Guardar"}
            icono={"ico-guardar"}
            onClick={handleGuardarContrasena}
            cargando={cargando}
          />
        </div>
      </form>
    </div>
  );
}

export default FormContrasena;
