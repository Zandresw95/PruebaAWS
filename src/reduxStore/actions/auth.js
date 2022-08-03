import { types } from "../types/types";
import $ from "jquery";
import { host, port, dominio } from "../../helpers/Dbdata";
import { setError, startLoading, stopLoading } from "./ui";

export const login = (uid, displayName,role, idpersona) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
      role,
      idpersona
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
  localStorage.removeItem("idpersona");
  localStorage.removeItem("role");
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
export const startchekLogin = (uid, nombre,role) => {
  const credenciales = {
    uid: uid,
    nombre: nombre,
    role: role
  };

  return (dispatch) => {
    dispatch(chekLogin(credenciales.uid, credenciales.nombre,credenciales.role));
  };
};
export const chekLogin = (uid, displayName,role) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
      role
    },
  };
};
export const stargetUsuarios = (usuario, password) => {
  return (dispatch) => {
    $.ajax({
      url: `${dominio}/api/tabla_usuarios`,
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
