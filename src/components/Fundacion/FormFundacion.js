import Button from "../../components/generic/Button";
import ContInput from "../../components/generic/ContInput";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { dominio } from "../../helpers/Dbdata";
import { Validar } from "../../helpers/Validar";

import "./FormFundacion.css";
import PopupContext from "../../context/PopupContext";
import ConfirmContext from "../../context/ConfirmContext";

let initialFundacion = {
  nombre_fundacion: "",
  direccion_fundacion: "",
  telefono_fundacion: "",
  email_fundacion: "",
  fechacrea_fundacion: "",
  permiso_fundacion: "",
};

let initialFormValidado = {
  nombre_fundacion: [false, ""],
  direccion_fundacion: [false, ""],
  telefono_fundacion: [false, ""],
  email_fundacion: [false, ""],
  fechacrea_fundacion: [false, ""],
  permiso_fundacion: [false, ""],
};

const FormFundacion = () => {
  const [fundacion, setFundacion] = useState(initialFundacion);
  const [tempfundacion, setTempfundacion] = useState(initialFundacion);
  const [formValidado, setFormValidado] = useState(initialFormValidado);
  const [editando, setEditando] = useState(false);

  const { mostrarPopup } = useContext(PopupContext);

  useEffect(() => {
    setEditando(true);
    setFormValidado(initialFormValidado);
    setFundacion(initialFundacion);

  }, []);

  
  const handleChange = (e) => {
    setFundacion({ ...fundacion, [e.target.name]: e.target.value });
    actualizarValidacion(e);
  };

  const handleBlur = (e) => {
    setFundacion({ ...fundacion, [e.target.name]: e.target.value.trim() });
  };

  const actualizarValidacion = (e) => {
    let tempCampo = {};
    switch (e.target.name) {
      case "nombre_fundacion":
        tempCampo = {
          [e.target.name]: Validar.texto(e.target.value),
        };
        break;  
      case "telefono_fundacion":
        tempCampo = {
          [e.target.name]: Validar.telefono(e.target.value),
        };
        break;
      case "direccion_fundacion":
        tempCampo = {
          [e.target.name]: Validar.direccion(e.target.value),
        };
        break;
      case "email_fundacion":
        tempCampo = {
          [e.target.name]: Validar.email(e.target.value),
        };
        break;
      case "fechacrea_fundacion":
        tempCampo = {
          [e.target.name]: Validar.general(e.target.value),
        };
        break;  
      case "permiso_fundacion":
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

  const validarForm = () => {
    for (const key in formValidado) {
      if (Object.hasOwnProperty.call(formValidado, key)) {
        const el = formValidado[key];
        if (!el[0]) return false;
      }
    }
    return true;
  };

  const validarTodo = (data) => {
    let tempFormValidado = formValidado;
    for (const key in data) {
      if (Object.hasOwnProperty.call(initialFundacion, key)) {
        const el = data[key];
        tempFormValidado = { ...tempFormValidado, [key]: Validar.general(el) };
      }
    }
    setFormValidado(tempFormValidado);
  };

  const guardarfundacion = () => {
    if (validarForm()) {
      crearFundacion();
    } else {
      mostrarPopup(2, "Llena todos los datos");
    }
  };

  const cancelarEdicion = () => {
    setFundacion(tempfundacion);
  };

  const crearFundacion = () => {
    $.ajax({
      url: `https://${dominio}/api/tabla_fundacion/agregar`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...fundacion }),
      beforeSend: function () {

      },
      success: function (data) {

        mostrarPopup(1, data.mensaje);
      },
      error: function (data) {

        console.log(data.responseJSON.data);
        let mensaje = data.responseJSON.data;
        if (data.status === 0)
          mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        else mostrarPopup(2, mensaje);
      },
    });
  };

  return (
    <div className="cont-form-fundacion">
          <form>
            <ContInput label="Nombre" icono={"pi pi-home"}>
              <input
                value={fundacion.nombre_fundacion}
                onChange={handleChange}
                onBlur={handleBlur}
                name="nombre_fundacion"
                disabled={!editando}
                autoComplete="off"
              />
              {!formValidado.nombre_fundacion[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.nombre_fundacion[0] && (
              <p className="texto-validacion">{formValidado.nombre_fundacion[1]}</p>
            )}
            <ContInput label="Dirección" icono={"pi pi-building"}>
              <input
                value={fundacion.direccion_fundacion}
                onChange={handleChange}
                onBlur={handleBlur}
                name="direccion_fundacion"
                autoComplete="off"
                disabled={!editando}
              />
              {!formValidado.direccion_fundacion[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.direccion_fundacion[0] && (
              <p className="texto-validacion">{formValidado.direccion_fundacion[1]}</p>
            )}
            <ContInput label="Teléfono" icono={"pi pi-phone"}>
              <input
                value={fundacion.telefono_fundacion}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                name="telefono_fundacion"
                disabled={!editando}
              />
              {!formValidado.telefono_fundacion[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.telefono_fundacion[0] && (
              <p className="texto-validacion">{formValidado.telefono_fundacion[1]}</p>
            )}
            <ContInput label="Correo" icono={"pi pi-at"}>
              <input
                value={fundacion.email_fundacion}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                name="email_fundacion"
                disabled={!editando}
              />
              {!formValidado.email_fundacion[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.email_fundacion[0] && (
              <p className="texto-validacion">{formValidado.email_fundacion[1]}</p>
            )}
            <ContInput label="Fecha Creación" icono={"pi pi-calendar"}>
              <input
                value={fundacion.fechacrea_fundacion}
                onChange={handleChange}
                onBlur={handleBlur}
                name="fechacrea_fundacion"
                autoComplete="off"
                disabled={!editando}
                type="date"
              />
              {!formValidado.fechacrea_fundacion[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.fechacrea_fundacion[0] && (
              <p className="texto-validacion">{formValidado.fechacrea_fundacion[1]}</p>
            )}
            <ContInput label="Permiso Funcionamiento" icono={"pi pi-file-pdf"}>
              <input
                value={fundacion.permiso_fundacion}
                onChange={handleChange}
                onBlur={handleBlur}
                name="permiso_fundacion"
                autoComplete="off"
                disabled={!editando}
                type="file"
              />
              {!formValidado.permiso_fundacion[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.permiso_fundacion[0] && (
              <p className="texto-validacion">{formValidado.permiso_fundacion[1]}</p>
            )}

            <div className="form-usuario-acciones" style={{ width: "max-content", alignSelf: "center" }}>
              <Button icono="pi pi-chevron-right" label={"Continuar"} onClick={cancelarEdicion} aceptar={true}/>
            </div>
          </form>
    </div>
  );
}

export default FormFundacion;
