import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Validar } from "../helpers/Validar.js";

import $ from "jquery";
import ContInput from "../components/generic/ContInput";
import Button from "../components/generic/Button";
import PopupContext from "../context/PopupContext";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { host, port, dominio } from "../helpers/Dbdata";
import MensajesUI from "../helpers/MensajesUI";
import { login, startLogin } from "../reduxStore/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../reduxStore/actions/ui";

const initialDatosUsuarioTemp = {
  usuario: "",
  clave: "",
};

const initialFormValidado = {
  usuario: [false, ""],
  clave: [false, ""],
};

function Login() {
  const { mostrarPopup } = useContext(PopupContext);

  const [datosUsuarioTemp, setDatosUsuarioTemp] = useState(
    initialDatosUsuarioTemp
  );
  const [formValidado, setFormValidado] = useState(initialFormValidado);
  const { loading: cargando, msgError } = useSelector((state) => state.ui);

  const handleChange = (e) => {
    e.target.value = e.target.value.toUpperCase();
    setDatosUsuarioTemp({
      ...datosUsuarioTemp,
      [e.target.name]: e.target.value,
    });
    actualizarValidacion(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      verificarUsuario();
    }
  };

  const actualizarValidacion = (e) => {
    if (e.target.name === "usuario")
      setFormValidado({
        ...formValidado,
        usuario: Validar.general(e.target.value),
      });
    if (e.target.name === "clave")
      setFormValidado({
        ...formValidado,
        clave: Validar.general(e.target.value),
      });
  };

  const dispatch = useDispatch();
  async function verificarUsuario() {
    if (validarForm()) {
      // dispatch(startLogin(datosUsuarioTemp.usuario, datosUsuarioTemp.password));
      $.ajax({
        url: `http://${dominio}/api/tabla_usuarios/login`,
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(datosUsuarioTemp),
        beforeSend: function () {
          dispatch(startLoading());
        },
        success: function (data) {
          dispatch(stopLoading());
          dispatch(login(data.data.id_usuario, data.data.login_usuario));
          localStorage.setItem("iduser", data.data.id_usuario);
          localStorage.setItem("nombre", data.data.login_usuario);
        },
        error: function (data) {
          dispatch(stopLoading());
          console.log(data.responseJSON.data);
          mostrarPopup(0, data.responseJSON.data);
        },
      });
    } else {
      mostrarPopup(2, MensajesUI.advertencia.form.noValidado);
    }
  }

  const validarForm = () => {
    setFormValidado({
      usuario: Validar.general(datosUsuarioTemp.usuario),
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
    <div className="cont-page-login">
      <div className="cont-seccion cont-login  animar-zoom-min-to-max">
        <div className="login-logo"></div>
        <form className="cont-card">
          <div className="justify-content-center"></div>
          <ContInput label={"Usuario"} icono={"ico-usuario"}>
            <input
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              placeholder="1700000001"
              name="usuario"
              autoFocus
              autoComplete="off"
              value={datosUsuarioTemp.usuario}
            ></input>
            {!formValidado.usuario[0] && (
              <div className="ico-advertencia format-ico-form-validacion"></div>
            )}
          </ContInput>
          {formValidado.usuario[1].length > 0 && (
            <p className="texto-validacion">{formValidado.usuario[1]}</p>
          )}
          <ContInput label={"Contraseña"} icono={"ico-candado"}>
            <input
              type="password"
              onKeyDown={handleKeyDown}
              onChange={handleChange}
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
          {cargando ? (
            <div className="loader format-ico-loader"></div>
          ) : (
            <Button
              label={"Ingresar"}
              icono={"ico-login"}
              onClick={verificarUsuario}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
