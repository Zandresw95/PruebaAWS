import Button from "../../generic/Button";
import ContInput from "../../generic/ContInput";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { host, port, dominio } from "../../../helpers/Dbdata";
import { Validar } from "../../../helpers/Validar";

import "./FormUsuario.css";
import PopupContext from "../../../context/PopupContext";

let initialUsuario = {
  nombre_persona: "",
  apellido_persona: "",
  edad_persona: 0,
  fecha_nacimiento_persona: "",
  cedula_persona: "",
};

let initialFormValidado = {
  nombre_persona: [true, ""],
  apellido_persona: [true, ""],
  edad_persona: [true, ""],
  fecha_nacimiento_persona: [true, ""],
  cedula_persona: [true, ""],
};

function FormUsuario({ idUsuario, cerrar }) {
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const [usuario, setUsuario] = useState(initialUsuario);
  const [tempUsuario, setTempUsuario] = useState(initialUsuario);
  const [formValidado, setFormValidado] = useState(initialFormValidado);
  const [editando, setEditando] = useState(false);

  const { mostrarPopup } = useContext(PopupContext);

  useEffect(() => {
    obtenerUsuario();
    if (idUsuario === 0) setEditando(true);
    else setEditando(false);
    setFormValidado(initialFormValidado);
    setTempUsuario(initialUsuario);
  }, [idUsuario]);

  useEffect(() => {
    if (idUsuario !== 0) validarTodo();
    else setFormValidado(initialFormValidado);
  }, [usuario]);

  const handleChange = (e) => {
    if (e.target.name === "estado")
      setUsuario({ ...usuario, [e.target.name]: e.target.checked ? 1 : 0 });
    else setUsuario({ ...usuario, [e.target.name]: e.target.value });
    actualizarValidacion(e);
  };

  const handleBlur = (e) => {
    actualizarValidacion(e);
  };

  const actualizarValidacion = (e) => {
    let tempCampo = {};
    switch (e.target.name) {
      case "nombre":
        tempCampo = {
          [e.target.name]: Validar.general(e.target.value),
        };
        break;
      case "cedula":
        tempCampo = {
          [e.target.name]: Validar.cedula(e.target.value),
        };
        break;
      case "idperfil":
        tempCampo = {
          [e.target.name]: Validar.noCero(e.target.value),
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

  const validarTodo = () => {
    // console.log("validar");
    let tempFormValidado;
    for (const key in usuario) {
      if (Object.hasOwnProperty.call(usuario, key)) {
        const el = usuario[key];
        if (key === "estado") continue;
        console.log(Validar.general(el));
        tempFormValidado = { ...tempFormValidado, [key]: Validar.general(el) };
      }
    }
    setFormValidado(tempFormValidado);
    // console.log(tempFormValidado);
    // console.log(usuario);
  };

  useEffect(() => {
    console.log(formValidado);
  }, [formValidado]);

  const guardarUsuario = () => {
    if (validarForm()) {
      if (editando && idUsuario !== 0) {
        actualizarUsuario();
      } else {
        crearUsuario();
      }
    } else {
      mostrarPopup(2, "Llena todos los datos");
    }
  };

  const editarUsuario = () => {
    setTempUsuario(usuario);
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setUsuario(tempUsuario);
    setEditando(false);
  };

  const obtenerUsuario = () => {
    if (idUsuario && idUsuario > 0) {
      $.ajax({
        url: `http://${dominio}/api/tabla_personas/${idUsuario}`,
        type: "get",
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
          setMostrarCargando(true);
        },
        success: function (data) {
          setMostrarCargando(false);
          console.log(data);
          setUsuario({
            nombre_persona: data.data.nombre_persona,
            apellido_persona: data.data.apellido_persona,
            edad_persona: data.data.edad_persona,
            fecha_nacimiento_persona: data.data.fecha_nacimiento_persona,
            cedula_persona: data.data.cedula_persona,
          });
          // if ("cedula" in data) {
          //   setUserData(data);
          // } else {
          //   mostrarPopup(2, data);
          // }
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
      setUsuario(initialUsuario);
    }
  };

  const crearUsuario = () => {
    console.log("creando");
    $.ajax({
      url: `http://${dominio}/api/tabla_personas/agregar`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...usuario }),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        console.log(data);
        setMostrarCargando(false);
        mostrarPopup(1, data.mensaje);
        cerrar();
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
  };

  const actualizarUsuario = () => {
    $.ajax({
      url: `http://${dominio}/api/tabla_personas/edit/${idUsuario}`,
      type: "put",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...usuario }),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        setMostrarCargando(false);
        mostrarPopup(1, data.mensaje);
        cerrar();
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
  };

  const eliminarUsuario = () => {
    if (window.confirm("¿Seguro que desea eliminar el usuario?"))
      $.ajax({
        url: `http://${dominio}/api/tabla_personas/delete/${idUsuario}`,
        type: "delete",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ estado: 100 }),
        beforeSend: function () {
          setMostrarCargando(true);
        },
        success: function (data) {
          setMostrarCargando(false);
          mostrarPopup(1, data.mensaje);
          cerrar();
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
  };

  return (
    <div className="cont-form-usuario">
      {mostrarCargando ? (
        <div className="cont-loader-full-container">
          <div className="loader format-ico-loader"></div>
        </div>
      ) : (
        <>
          <h3>{idUsuario === 0 ? "Nuevo usuario" : usuario.nombre_persona}</h3>
          <div className="form-usuario-acciones">
            {idUsuario && idUsuario !== 0 && !editando ? (
              <>
                <Button
                  label={"Editar"}
                  icono={"ico-editar"}
                  onClick={editarUsuario}
                />
                <Button
                  label={"Eliminar"}
                  icono={"ico-eliminar"}
                  onClick={eliminarUsuario}
                />
              </>
            ) : (
              ""
            )}
            {idUsuario && idUsuario !== 0 && editando ? (
              <Button label={"Cancelar"} onClick={cancelarEdicion} />
            ) : (
              ""
            )}
          </div>
          <form>
            <ContInput label="Nombre" icono={"ico-usuario"}>
              <input
                value={usuario.nombre_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="nombre_persona"
                disabled={!editando}
              />
              {!formValidado.nombre_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.nombre_persona[0] && (
              <p className="texto-validacion">{formValidado.nombre_persona[1]}</p>
            )}
            <ContInput label="Apellido" icono={"ico-usuario"}>
              <input
                value={usuario.apellido_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="apellido_persona"
                disabled={!editando}
              />
              {!formValidado.apellido_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            <ContInput label="Edad" icono={"ico-usuario"}>
              <input
                value={usuario.edad_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="edad_persona"
                disabled={!editando}
              />
              {!formValidado.edad_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            <ContInput label="Fecha nacimiento" icono={"ico-usuario"}>
              <input
                value={usuario.fecha_nacimiento_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="fecha_nacimiento_persona"
                disabled={!editando}
                type="date"
              />
              {!formValidado.fecha_nacimiento_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            <ContInput label="Cédula" icono={"ico-ruc"}>
              <input
                value={usuario.cedula_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="cedula_persona"
                disabled={!editando}
              />
              {!formValidado.cedula_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.cedula_persona[0] && (
              <p className="texto-validacion">{formValidado.cedula_persona[1]}</p>
            )}
            {editando && <Button label={"Guardar"} onClick={guardarUsuario} />}
          </form>
        </>
      )}
    </div>
  );
}

export default FormUsuario;
