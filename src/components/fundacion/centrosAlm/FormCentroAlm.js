import Button from "../../generic/Button";
import ContInput from "../../generic/ContInput";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { dominio } from "../../../helpers/Dbdata";
import { Validar } from "../../../helpers/Validar";

import "./FormCentroAlm.css";
import PopupContext from "../../../context/PopupContext";
import ConfirmContext from "../../../context/ConfirmContext";

let initialcentro = {
  id_fundacion: "",
  direccion_centro_almacenamiento: "",
  nombre_centro_almacenamiento: "",
  horario_centro_almacenamiento: "",
};

let initialFormValidado = {
  direccion_centro_almacenamiento: [false, ""],
  nombre_centro_almacenamiento: [false, ""],
  horario_centro_almacenamiento: [false, ""],
};

function FormCentroAlm({ id_fundacion, idcentro, cerrar, recargar }) {
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const [centro, setcentro] = useState(initialcentro);
  const [tempcentro, setTempcentro] = useState(initialcentro);
  const [formValidado, setFormValidado] = useState(initialFormValidado);
  const [editando, setEditando] = useState(false);
  
  const { mostrarConfirm } = useContext(ConfirmContext);
  const { mostrarPopup } = useContext(PopupContext);

  useEffect(() => {
    if (idcentro === 0){
      setEditando(true);
      setFormValidado(initialFormValidado);
      setcentro(initialcentro);
    }else{
      setEditando(false);
      obtenercentro();
    }
    
  }, [idcentro]);

  const handleChange = (e) => {
    setcentro({ ...centro, [e.target.name]: e.target.value });
    actualizarValidacion(e);
  };

  const handleBlur = (e) => {
    setcentro({ ...centro, [e.target.name]: e.target.value.trim() });
  };

  const actualizarValidacion = (e) => {
    let tempCampo = {};
    switch (e.target.name) {
      case "nombre_centro_almacenamiento":
      tempCampo = {
        [e.target.name]: Validar.general(e.target.value),
      };
      break;
      case "direccion_centro_almacenamiento":
      tempCampo = {
        [e.target.name]: Validar.direccion(e.target.value),
      };
      break;
      case "horario_centro_almacenamiento":
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
      if (Object.hasOwnProperty.call(initialcentro, key)) {
        const el = data[key];
        tempFormValidado = { ...tempFormValidado, [key]: Validar.general(el) };
      }
    }
    setFormValidado(tempFormValidado);
  };

  const guardarcentro = () => {
    if (validarForm()) {
      if (editando && idcentro !== 0) {
        actualizarcentro();
      } else {
        crearcentro();
      }
    } else {
      mostrarPopup(2, "Llena todos los datos");
    }
  };

  const editarcentro = () => {
    setTempcentro(centro);
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setcentro(tempcentro);
    setEditando(false);
  };

  const obtenercentro = () => {
    if (idcentro && idcentro > 0) {
      $.ajax({
        url: `${dominio}/api/tabla_centro_almacenamiento/${idcentro}`,
        type: "get",
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
          setMostrarCargando(true);
        },
        success: function (data) {
          setMostrarCargando(false);
          let formatedData = {
            id_fundacion: data.data.id_fundacion,
            nombre_centro_almacenamiento: data.data.nombre_centro_almacenamiento,
            direccion_centro_almacenamiento: data.data.direccion_centro_almacenamiento,
            horario_centro_almacenamiento: data.data.horario_centro_almacenamiento,
          };
          setcentro(formatedData);
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
      setcentro(initialcentro);
    }
  };

  const crearcentro = () => {
    centro.id_fundacion = id_fundacion;
    $.ajax({
      url: `${dominio}/api/tabla_centro_almacenamiento/agregar`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...centro }),
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

  const actualizarcentro = () => {
    $.ajax({
      url: `${dominio}/api/tabla_centro_almacenamiento/edit/${idcentro}`,
      type: "put",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...centro }),
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

  const eliminarcentro = async () => {
    if (await mostrarConfirm("¿Seguro que deseas eliminar el centro de almacenamiento?"))
      $.ajax({
        url: `${dominio}/api/tabla_centro_almacenamiento/delete/${idcentro}`,
        type: "put",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(),
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
    <div className="cont-form-centro">
      {mostrarCargando ? (
        <div className="cont-loader-full-container">
          <div className="loader format-ico-loader"></div>
        </div>
      ) : (
        <>
          <h3 className="titulo-centro">{idcentro === 0 ? "NUEVO CENTRO ACOPIO" : !editando ? "VER CENTRO ACOPIO": "EDITAR CENTRO ACOPIO" }</h3>
          <div className="form-centro-acciones" style={{ width: "max-content", alignSelf: "center" }}>
            {idcentro && idcentro !== 0 && !editando ? (
              <>
                <Button
                  label={"Editar"}
                  icono={"ico-lapiz"}
                  onClick={editarcentro}
                  editar={true}
                />
                <Button
                  label={"Eliminar"}
                  icono={"ico-eliminar"}
                  onClick={eliminarcentro}
                  borrar={true}
                  rojo = {true}
                />
              </>
            ) : (
              ""
            )}
          </div>
          <form>
            <ContInput label="Nombre" icono={"ico-centro"}>
              <input
                value={centro.nombre_centro_almacenamiento}
                onChange={handleChange}
                onBlur={handleBlur}
                name="nombre_centro_almacenamiento"
                disabled={!editando}
              />
              {!formValidado.nombre_centro_almacenamiento[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.nombre_centro_almacenamiento[0] && (
              <p className="texto-validacion">{formValidado.nombre_centro_almacenamiento[1]}</p>
            )}
            <ContInput label="Dirección" icono={"ico-centro"}>
              <input
                value={centro.direccion_centro_almacenamiento}
                onChange={handleChange}
                onBlur={handleBlur}
                name="direccion_centro_almacenamiento"
                disabled={!editando}
              />
              {!formValidado.direccion_centro_almacenamiento[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.direccion_centro_almacenamiento[0] && (
              <p className="texto-validacion">{formValidado.direccion_centro_almacenamiento[1]}</p>
            )}
            <ContInput label="Horario atención" icono={"ico-centro"}>
              <input
                value={centro.horario_centro_almacenamiento}
                onChange={handleChange}
                onBlur={handleBlur}
                name="horario_centro_almacenamiento"
                disabled={!editando}
              />
              {!formValidado.horario_centro_almacenamiento[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.horario_centro_almacenamiento[0] && (
              <p className="texto-validacion">{formValidado.horario_centro_almacenamiento[1]}</p>
            )}
            <div className="form-centro-acciones" style={{ width: "max-content", alignSelf: "center" }}>
               
              {idcentro && idcentro !== 0 && editando ? (
                <>
                 {/*Editando la centro*/}
                 <Button icono="pi pi-check" label={"Aceptar"} onClick={guardarcentro} aceptar={true}/>
                 <Button icono="pi pi-ban" label={"Cancelar"} onClick={cancelarEdicion} cancelar={true}/>
                </>
              ) : idcentro && idcentro !== 0 && !editando ? (
                /*Ver la centro*/
                ""
              ):(
                <>
                {/*Nueva centro*/}
                <Button icono="pi pi-check" label={"Aceptar"} onClick={guardarcentro} aceptar={true}/>
                <Button icono="pi pi-ban" label={"Cancelar"} onClick={cerrar} cancelar={true}/>
                </>
              )}
              
            </div>
            
          </form>
        </>
      )}
    </div>
  );
}

export default FormCentroAlm;
