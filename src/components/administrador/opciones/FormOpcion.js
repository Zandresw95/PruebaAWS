import Button from "../../generic/Button";
import ContInput from "../../generic/ContInput";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { dominio } from "../../../helpers/Dbdata";
import { Validar } from "../../../helpers/Validar";

import "./FormOpcion.css";
import PopupContext from "../../../context/PopupContext";
import ConfirmContext from "../../../context/ConfirmContext";

let initialOpcion = {
  descripcion_opcion: "",
  observacion_opcion: "",
  estado_opcion: true,
};

let initialFormValidado = {
  descripcion_opcion: [false, ""],
};

function FormOpcion({ idOpcion, cerrar, recargar }) {
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const [opcion, setOpcion] = useState(initialOpcion);
  const [tempOpcion, setTempOpcion] = useState(initialOpcion);
  const [formValidado, setFormValidado] = useState(initialFormValidado);
  const [editando, setEditando] = useState(false);
  
  const { mostrarConfirm } = useContext(ConfirmContext);
  const { mostrarPopup } = useContext(PopupContext);

  useEffect(() => {
    if (idOpcion === 0){
      setEditando(true);
      setFormValidado(initialFormValidado);
      setTempOpcion(initialOpcion);
    }else{
      setEditando(false);
      obtenerOpcion();
    }
    
  }, [idOpcion]);

  const handleChange = (e) => {
    if (e.target.name === "estado_opcion")
      setOpcion({ ...opcion, [e.target.name]: e.target.checked ? true : false });
    else setOpcion({ ...opcion, [e.target.name]: e.target.value });
    actualizarValidacion(e);
  };

  const handleBlur = (e) => {
    setOpcion({ ...opcion, [e.target.name]: e.target.value.trim() });
  };

  const actualizarValidacion = (e) => {
    let tempCampo = {};
    switch (e.target.name) {
      case "descripcion_opcion":
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
      if (Object.hasOwnProperty.call(initialOpcion, key)) {
        const el = data[key];
        tempFormValidado = { ...tempFormValidado, [key]: Validar.general(el) };
      }
    }
    setFormValidado(tempFormValidado);
  };

  const guardarOpcion = () => {
    if (validarForm()) {
      if (editando && idOpcion !== 0) {
        actualizarOpcion();
      } else {
        crearOpcion();
      }
    } else {
      mostrarPopup(2, "Llena todos los datos");
    }
  };

  const editarOpcion = () => {
    setTempOpcion(opcion);
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setOpcion(tempOpcion);
    setEditando(false);
  };

  const obtenerOpcion = () => {
    if (idOpcion && idOpcion > 0) {
      $.ajax({
        url: `https://${dominio}/api/tabla_opciones/${idOpcion}`,
        type: "get",
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
          setMostrarCargando(true);
        },
        success: function (data) {
          setMostrarCargando(false);
          let formatedData = {
            descripcion_opcion: data.data.descripcion_opcion,
            observacion_opcion: data.data.observacion_opcion,
            estado_opcion: data.data.estado_opcion,
          };
          setOpcion(formatedData);
          validarTodo(formatedData);
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
      setOpcion(initialOpcion);
    }
  };

  const crearOpcion = () => {
    $.ajax({
      url: `https://${dominio}/api/tabla_opciones/agregar`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...opcion }),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        console.log(data);
        setMostrarCargando(false);
        mostrarPopup(1, data.mensaje);
        recargar();
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

  const actualizarOpcion = () => {
    $.ajax({
      url: `https://${dominio}/api/tabla_opciones/edit/${idOpcion}`,
      type: "put",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...opcion }),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        setMostrarCargando(false);
        mostrarPopup(1, data.mensaje);
        recargar();
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

  const eliminarOpcion = async () => {
    if (await mostrarConfirm("¿Seguro que deseas deshabilitar la opción?"))
      $.ajax({
        url: `https://${dominio}/api/tabla_opciones/disable/${idOpcion}`,
        type: "put",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ estado: false }),
        beforeSend: function () {
          setMostrarCargando(true);
        },
        success: function (data) {
          setMostrarCargando(false);
          mostrarPopup(1, data.mensaje);
          recargar();
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
    <div className="cont-form-opcion">
      {mostrarCargando ? (
        <div className="cont-loader-full-container">
          <div className="loader format-ico-loader"></div>
        </div>
      ) : (
        <>
          <h3 className="titulo-opcion">{idOpcion === 0 ? "NUEVA OPCIÓN" : !editando ? "VER OPCIÓN": "EDITAR OPCIÓN" }</h3>
          <div className="form-opcion-acciones" style={{ width: "max-content", alignSelf: "center" }}>
            {idOpcion && idOpcion !== 0 && !editando ? (
              <>
                <Button
                  label={"Editar"}
                  icono={"ico-lapiz"}
                  onClick={editarOpcion}
                  editar={true}
                />
                <Button
                  label={"Eliminar"}
                  icono={"ico-eliminar"}
                  onClick={eliminarOpcion}
                  borrar={true}
                  rojo = {true}
                />
              </>
            ) : (
              ""
            )}
          </div>
          <form>
            <ContInput label="Descripción" icono={"ico-opcion"}>
              <input
                value={opcion.descripcion_opcion}
                onChange={handleChange}
                onBlur={handleBlur}
                name="descripcion_opcion"
                disabled={!editando}
              />
              {!formValidado.descripcion_opcion[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.descripcion_opcion[0] && (
              <p className="texto-validacion">{formValidado.descripcion_opcion[1]}</p>
            )}
            <ContInput label="Observación" icono={"ico-opcion"}>
              <input
                value={opcion.observacion_opcion}
                onChange={handleChange}
                onBlur={handleBlur}
                name="observacion_opcion"
                disabled={!editando}
              />
            </ContInput>
            <p className="form-opcion-toggle">
              <label htmlFor="toggleEstado">Activo </label>
              <input
                id="toggleEstado"
                type="checkbox"
                style={{ width: "20px", height: "30px" }}
                name="estado_opcion"
                checked={opcion.estado_opcion}
                onChange={handleChange}
                disabled={!editando}
              />
            </p>
            <div className="form-opcion-acciones" style={{ width: "max-content", alignSelf: "center" }}>
               
              {idOpcion && idOpcion !== 0 && editando ? (
                <>
                 {/*Editando la opcion*/}
                 <Button label={"Aceptar"} onClick={guardarOpcion} aceptar={true}/>
                 <Button label={"Cancelar"} onClick={cancelarEdicion} cancelar={true}/>
                </>
              ) : idOpcion && idOpcion !== 0 && !editando ? (
                /*Ver la opcion*/
                ""
              ):(
                <>
                {/*Nueva opcion*/}
                <Button label={"Aceptar"} onClick={guardarOpcion} aceptar={true}/>
                <Button label={"Cancelar"} onClick={cerrar} cancelar={true}/>
                </>
              )}
              
            </div>
            
          </form>
        </>
      )}
    </div>
  );
}

export default FormOpcion;
