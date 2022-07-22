import { types } from "../types/types";
import $ from "jquery";
import { host, port, dominio } from "../../helpers/Dbdata";
import { setError, startLoading, stopLoading } from "./ui";

export const startLogin = (usuario, password) => {
  const credenciales = {
    user: usuario,
    clave: password,
  };

  return (dispatch) => {
    $.ajax({
      url: `https://${dominio}/api/tabla_usuarios/login`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(credenciales),
      beforeSend: function () {
        dispatch(startLoading());
      },
      success: function (data) {
        dispatch(stopLoading());
        dispatch(login(data.iduser, data.nombre));
        localStorage.setItem("iduser", data.iduser);
        localStorage.setItem("nombre", data.nombre);
      },
      error: function (data) {
        dispatch(stopLoading());
        console.log(data.responseJSON.data);
        dispatch(setError(data.responseJSON.data));
      },
    });
  };
};

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};
export const startLogout = () => {
  return (dispatch) => {
    dispatch(logout());
  };
};

export const logout = () => {
  localStorage.removeItem("iduser");
  localStorage.removeItem("nombre");
  return {
    type: types.logout,
  };
};
export const startcambiarPassword = (id, password) => {
  const credenciales = {
    id: id,
    clave: password,
  };
  return (dispatch) => {
    $.ajax({
      url: `htttp://${dominio}/api/tabla_usuarios/edit/${credenciales.id}`,
      type: "put",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(credenciales),
      beforeSend: function () {},
      success: function (data) {
        // console.log(`to do: alerta: ${data.mensaje}`);
        // to do actualizar nombre etc
        // dispatch(cambiarPassword(data.iduser, data.nombre));
        dispatch(startLogout());
      },
      error: function (data) {
        // setMostrarCargando(false);
        console.log(data.responseJSON.data);
      },
    });
  };
};
export const cambiarPassword = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};
export const startchekLogin = (uid, nombre) => {
  const credenciales = {
    uid: uid,
    nombre: nombre,
  };

  return (dispatch) => {
    dispatch(chekLogin(credenciales.uid, credenciales.nombre));
  };
};
export const chekLogin = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};
export const stargetUsuarios = (usuario, password) => {
  return (dispatch) => {
    $.ajax({
      url: `https://${dominio}/api/tabla_usuarios`,
      type: "get",
      dataType: "json",
      contentType: "application/json",

      beforeSend: function () {
        dispatch(startLoading());
      },
      success: function (data) {
        dispatch(stopLoading());
        dispatch(getUsuarios(data.data));
      },
      error: function (data) {
        // setMostrarCargando(false);
        // console.log(data.responseJSON.data);
      },
    });
  };
};

export const getUsuarios = (e) => {
  return {
    type: types.getUsuarios,
    payload: {
      e,
    },
  };
};
