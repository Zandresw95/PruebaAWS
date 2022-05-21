import React, { useContext, useState } from "react";
import "./Login.css";
import { Validar } from "../helpers/Validar.js";

import $ from "jquery";
import ContInput from "../components/generic/ContInput";
import Button from "../components/generic/Button";
import PopupContext from "../context/PopupContext";

import { host, port } from "../helpers/Dbdata";

const initialDatosUsuarioTemp = {
  cedula: "",
  clave: "",
};

const initialFormValidado = {
  cedula: [false, ""],
  clave: [false, ""],
};

function Login() {

  const { mostrarPopup } = useContext(PopupContext);

  const [datosUsuarioTemp, setDatosUsuarioTemp] = useState(
    initialDatosUsuarioTemp
  );
  const [formValidado, setFormValidado] = useState(initialFormValidado);
  const [mostrarCargando, setMostrarCargando] = useState(false);

  const handleChange = (e) => {
    e.target.value = e.target.value.toUpperCase();
    setDatosUsuarioTemp({
      ...datosUsuarioTemp,
      [e.target.name]: e.target.value,
    });
    actualizarValidacion(e);
  };

  const handleBlur = (e) => {
    actualizarValidacion(e);
  };

  const actualizarValidacion = (e) => {
    if (e.target.name === "cedula")
      setFormValidado({
        ...formValidado,
        cedula: Validar.numeros(e.target.value),
      });
    if (e.target.name === "clave")
      setFormValidado({
        ...formValidado,
        clave: Validar.general(e.target.value),
      });
  };

  function verificarUsuario() {
    // const url="https://admin.pinprexat.com/api/clientecotizaciones.php";
    // console.log(`http://${host}:${port}/api/usuarios_administracion/login`);
    if (validarForm()) {
      $.ajax({
        url: `http://${host}:${port}/api/usuarios_administracion/login`,
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(datosUsuarioTemp),
        beforeSend: function () {
          setMostrarCargando(true);
        },
        success: function (data) {
          setMostrarCargando(false);
          if ("cedula" in data) {

          } else {
            mostrarPopup(2, data);
          }
        },
        error: function (data) {
          setMostrarCargando(false);
          console.log(data.responseJSON.data);
          let mensaje = data.responseJSON.data;
          if (data.status === 0)
            mostrarPopup(0, "No es posible conectarse al servidor Node JS");
          else mostrarPopup(2, mensaje);
        },
      });
    } else {
      mostrarPopup(2, "Llena todos los campos");
    }
  }

  const validarForm = () => {
    setFormValidado({
      cedula: Validar.numeros(datosUsuarioTemp.cedula),
      clave: Validar.general(datosUsuarioTemp.clave),
    });
    for (const key in formValidado) {
      if (Object.hasOwnProperty.call(formValidado, key)) {
        const el = formValidado[key];
        if (!el[0]) return false;
      }
    }
    return true;
  };

  return (
    <div className="cont-login0">
      <h2
        style={{
          color: "var(--color-principal)",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        Confiteca
      </h2>
      <form className="cont-login cont-card">
        {/* <div className="login-logo"></div> */}

        <h3 style={{ fontWeight: "bold" }}>LOGIN</h3>
        <div>
          <ContInput label={"Cédula"} icono={"ico-usuario"}>
            <input
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="1700000001"
              name="cedula"
              autoFocus
              autoComplete="off"
              value={datosUsuarioTemp.cedula}
            ></input>
            {!formValidado.cedula[0] && (
              <div className="ico-advertencia format-ico-form-validacion"></div>
            )}
          </ContInput>
          {formValidado.cedula[1].length > 0 && (
            <p className="texto-validacion">{formValidado.cedula[1]}</p>
          )}
        </div>
        <div>
          <ContInput label={"Contraseña"} icono={"ico-candado"}>
            <input
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="1234"
              name="clave"
              autoComplete="off"
              value={datosUsuarioTemp.clave}
            ></input>
            {!formValidado.clave[0] && (
              <div className="ico-advertencia format-ico-form-validacion"></div>
            )}
          </ContInput>
          {formValidado.clave[1].length > 0 && (
            <p className="texto-validacion">{formValidado.clave[1]}</p>
          )}
        </div>
        {mostrarCargando ? (
          <div className="loader format-ico-loader"></div>
        ) : (
          <div style={{ width: "100%" }}>
            <Button
              label={"Ingresar"}
              icono={"ico-login"}
              onClick={() =>
                //  cerrarSesion()
                verificarUsuario()
              }
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
