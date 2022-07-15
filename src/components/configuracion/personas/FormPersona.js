import Button from "../../generic/Button";
import ContInput from "../../generic/ContInput";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { host, port, dominio } from "../../../helpers/Dbdata";
import { Validar } from "../../../helpers/Validar";

import "./FormPersona.css";
import PopupContext from "../../../context/PopupContext";

let initialPersona = {
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

function FormPersona({ idPersona, cerrar }) {
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const [persona, setPersona] = useState(initialPersona);
  const [tempPersona, setTempPersona] = useState(initialPersona);
  const [formValidado, setFormValidado] = useState(initialFormValidado);
  const [editando, setEditando] = useState(false);

  const { mostrarPopup } = useContext(PopupContext);

  useEffect(() => {
    obtenerpersona();
    if (idPersona === 0) setEditando(true);
    else setEditando(false);
    setFormValidado(initialFormValidado);
    setTempPersona(initialPersona);
  }, [idPersona]);

  useEffect(() => {
    if (idPersona !== 0) validarTodo();
    else setFormValidado(initialFormValidado);
  }, [persona]);

  const handleChange = (e) => {
    if (e.target.name === "estado")
      setPersona({ ...persona, [e.target.name]: e.target.checked ? 1 : 0 });
    else setPersona({ ...persona, [e.target.name]: e.target.value });
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
    for (const key in persona) {
      if (Object.hasOwnProperty.call(persona, key)) {
        const el = persona[key];
        if (key === "estado") continue;
        console.log(Validar.general(el));
        tempFormValidado = { ...tempFormValidado, [key]: Validar.general(el) };
      }
    }
    setFormValidado(tempFormValidado);
    // console.log(tempFormValidado);
    // console.log(persona);
  };

  useEffect(() => {
    console.log(formValidado);
  }, [formValidado]);

  const guardarpersona = () => {
    if (validarForm()) {
      if (editando && idPersona !== 0) {
        actualizarpersona();
      } else {
        crearpersona();
      }
    } else {
      mostrarPopup(2, "Llena todos los datos");
    }
  };

  const editarpersona = () => {
    setTempPersona(persona);
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setPersona(tempPersona);
    setEditando(false);
  };

  const obtenerpersona = () => {
    if (idPersona && idPersona > 0) {
      console.log("dentrooo");
      $.ajax({
        url: `http://${dominio}/api/tabla_personas/${idPersona}`,
        type: "get",
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
          setMostrarCargando(true);
        },
        success: function (data) {
          setMostrarCargando(false);
          console.log(data);
          setPersona({
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
      setPersona(initialPersona);
    }
  };

  const crearpersona = () => {
    console.log("creando");
    $.ajax({
      url: `http://${dominio}/api/tabla_personas/agregar`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...persona }),
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

  const actualizarpersona = () => {
    $.ajax({
      url: `http://${dominio}/api/tabla_personas/edit/${idPersona}`,
      type: "put",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...persona }),
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

  const eliminarpersona = () => {
    if (window.confirm("¿Seguro que desea eliminar el persona?"))
      $.ajax({
        url: `http://${dominio}/api/tabla_personas/delete/${idPersona}`,
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
    <div className="cont-form-persona">
      {mostrarCargando ? (
        <div className="cont-loader-full-container">
          <div className="loader format-ico-loader"></div>
        </div>
      ) : (
        <>
          <h3>{idPersona === 0 ? "Nuevo persona" : persona.nombre_persona}</h3>
          <div className="form-persona-acciones">
            {idPersona && idPersona !== 0 && !editando ? (
              <>
                <Button
                  label={"Editar"}
                  icono={"ico-editar"}
                  onClick={editarpersona}
                />
                <Button
                  label={"Eliminar"}
                  icono={"ico-eliminar"}
                  onClick={eliminarpersona}
                />
              </>
            ) : (
              ""
            )}
            {idPersona && idPersona !== 0 && editando ? (
              <Button label={"Cancelar"} onClick={cancelarEdicion} />
            ) : (
              ""
            )}
          </div>
          <form>
            <ContInput label="Nombres" icono={"ico-persona"}>
              <input
                value={persona.nombre_persona}
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
            <ContInput label="Apellidos" icono={"ico-persona"}>
              <input
                value={persona.apellido_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="apellido_persona"
                disabled={!editando}
              />
              {!formValidado.apellido_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            <ContInput label="Dirección" icono={"ico-persona"}>
              <input
                value={persona.direccion_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="direccion_persona"
                disabled={!editando}
              />
              {!formValidado.direccion_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            <ContInput label="Telefono" icono={"ico-persona"}>
              <input
                value={persona.telefono_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="telefono_persona"
                disabled={!editando}
              />
              {!formValidado.telefono_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            <ContInput label="Email" icono={"ico-persona"}>
              <input
                value={persona.email_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email_persona"
                disabled={!editando}
              />
              {!formValidado.email_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            <ContInput label="Fecha nacimiento" icono={"ico-persona"}>
              <input
                value={persona.fechanac_persona}
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
            <ContInput label="Instruccion" icono={"ico-persona"}>
              <input
                value={persona.instruccion_persona}
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
                value={persona.cedula_persona}
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
            {editando && <Button label={"Guardar"} onClick={guardarpersona} />}
          </form>
        </>
      )}
    </div>
  );
}

export default FormPersona;
