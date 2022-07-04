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
  direccion_persona: "",
  telefono_persona: "",
  email_persona: "",
  fechanac_persona: "",
  instruccion_persona: "",
  cedula_persona: "",
};

let initialFormValidado = {
  nombre_persona: [true, ""],
  apellido_persona: [true, ""],
  direccion_persona: [true, ""],
  telefono_persona: [true, ""],
  email_persona: [true, ""],
  fechanac_persona: [true, ""],
  instruccion_persona: [true, ""],
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
      case "telefono":
        tempCampo = {
          [e.target.name]: Validar.telefono(e.target.value),
        };
        break;
      case "direccion":
        tempCampo = {
          [e.target.name]: Validar.direccion(e.target.value),
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
            direccion_persona: data.data.direccion_persona,
            telefono_persona: data.data.telefono_persona,
            email_persona: data.data.email_persona,
            fechanac_persona: data.data.fechanac_persona,
            inatruccion_persona: data.data.instruccion_persona,
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
            <ContInput label="Nombres" icono={"ico-usuario"}>
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
            <ContInput label="Apellidos" icono={"ico-usuario"}>
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
            <ContInput label="Dirección" icono={"ico-usuario"}>
              <input
                value={usuario.direccion_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="direccion_persona"
                disabled={!editando}
              />
              {!formValidado.direccion_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            <ContInput label="Telefono" icono={"ico-usuario"}>
              <input
                value={usuario.telefono_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="telefono_persona"
                disabled={!editando}
              />
              {!formValidado.telefono_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            <ContInput label="Email" icono={"ico-usuario"}>
              <input
                value={usuario.email_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email_persona"
                disabled={!editando}
              />
              {!formValidado.email_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            <ContInput label="Fecha nacimiento" icono={"ico-usuario"}>
              <input
                value={usuario.fechanac_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="fechanac_persona"
                disabled={!editando}
                type="date"
              />
              {!formValidado.fechanac_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            <ContInput label="Instruccion" icono={"ico-usuario"}>
              <input
                value={usuario.instruccion_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="instruccion_persona"
                disabled={!editando}
              />
              {!formValidado.instruccion_persona[0] && (
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
