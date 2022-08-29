import Button from "../../generic/Button";
import ContInput from "../../generic/ContInput";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { dominio } from "../../../helpers/Dbdata";
import { Validar } from "../../../helpers/Validar";

import "./FormPerfil.css";
import PopupContext from "../../../context/PopupContext";
import ConfirmContext from "../../../context/ConfirmContext";

let initialPerfil = {
  descripcion_perfil: "",
  observacion_perfil: "",
  estado_perfil: true,
};

let initialFormValidado = {
  descripcion_perfil: [false, ""],
};

function FormPerfil({ idPerfil, cerrar, recargar }) {
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const [perfil, setPerfil] = useState(initialPerfil);
  const [tempPerfil, setTempPerfil] = useState(initialPerfil);
  const [formValidado, setFormValidado] = useState(initialFormValidado);
  const [editando, setEditando] = useState(false);

  const { mostrarPopup } = useContext(PopupContext);
  const { mostrarConfirm } = useContext(ConfirmContext);

  useEffect(() => {
    if (idPerfil === 0){
      setEditando(true);
      setFormValidado(initialFormValidado);
      setPerfil(initialPerfil);
    } else{
      setEditando(false);
      obtenerPerfil();
    } 
 
  }, [idPerfil]);

  const handleChange = (e) => {
    if (e.target.name === "estado_perfil")
      setPerfil({
        ...perfil,
        [e.target.name]: e.target.checked ? true : false,
      });
    else setPerfil({ ...perfil, [e.target.name]: e.target.value });
    actualizarValidacion(e);
  };

  const handleBlur = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value.trim() });
  };

  const actualizarValidacion = (e) => {
    let tempCampo = {};
    switch (e.target.name) {
      case "descripcion_perfil":
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
      if (Object.hasOwnProperty.call(initialPerfil, key)) {
        const el = data[key];
        tempFormValidado = { ...tempFormValidado, [key]: Validar.general(el) };
      }
    }
    setFormValidado(tempFormValidado);
  };

  const guardarPerfil = () => {
    if (validarForm()) {
      if (editando && idPerfil !== 0) {
        actualizarPerfil();
      } else {
        crearPerfil();
      }
    } else {
      mostrarPopup(2, "Llena todos los datos");
    }
  };

  const editarPerfil = () => {
    setTempPerfil(perfil);
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setPerfil(tempPerfil);
    setEditando(false);
  };

  const obtenerPerfil = () => {
    if (idPerfil && idPerfil > 0) {
      $.ajax({
        url: `${dominio}/api/tabla_perfiles/${idPerfil}`,
        type: "get",
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
          setMostrarCargando(true);
        },
        success: function (data) {
          setMostrarCargando(false);
          console.log(data);
          let formatedData = {
            descripcion_perfil: data.data.descripcion_perfil,
            observacion_perfil: data.data.observacion_perfil,
            estado_perfil: data.data.estado_perfil,
          };
          setPerfil(formatedData);
          validarTodo(formatedData);
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
      setPerfil(initialPerfil);
    }
  };

  const crearPerfil = () => {
    $.ajax({
      url: `${dominio}/api/tabla_perfiles/agregar`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...perfil }),
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

  const actualizarPerfil = () => {
    $.ajax({
      url: `${dominio}/api/tabla_perfiles/edit/${idPerfil}`,
      type: "put",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...perfil }),
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

  const eliminarPerfil = async () => {
    if (await mostrarConfirm("¿Seguro que deseas deshabilitar el perfil?"))
      $.ajax({
        url: `${dominio}/api/tabla_perfiles/disable/${idPerfil}`,
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
    <div className="cont-form-perfil">
      {mostrarCargando ? (
        <div className="cont-loader-full-container">
          <div className="loader format-ico-loader"></div>
        </div>
      ) : (
        <>
          <h3 className="titulo-perfil">
            {idPerfil === 0
              ? "NUEVO PERFIL"
              : !editando
              ? "VER PERFIL"
              : "EDITAR PERFIL"}
          </h3>
          <div className="form-perfil-acciones" style={{ width: "max-content", alignSelf: "center" }}>
            {idPerfil && idPerfil !== 0 && !editando ? (
              <>
                <Button
                  label={"Editar"}
                  icono={"ico-lapiz"}
                  onClick={editarPerfil}
                  editar={true}
                />
                <Button
                  label={"Eliminar"}
                  icono={"ico-eliminar"}
                  onClick={eliminarPerfil}
                  borrar={true}
                  rojo= {true}
                />
              </>
            ) : (
              ""
            )}
          </div>
          <form>
            <ContInput label="Descripción" icono={"pi pi-comment"}>
              <input
                value={perfil.descripcion_perfil}
                onChange={handleChange}
                onBlur={handleBlur}
                name="descripcion_perfil"
                disabled={!editando}
              />
              {!formValidado.descripcion_perfil[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.descripcion_perfil[0] && (
              <p className="texto-validacion">
                {formValidado.descripcion_perfil[1]}
              </p>
            )}
            <ContInput label="Observación" icono={"pi pi-book"}>
              <input
                value={perfil.observacion_perfil}
                onChange={handleChange}
                onBlur={handleBlur}
                name="observacion_perfil"
                disabled={!editando}
              />
            </ContInput>
            <p className="form-perfil-toggle">
              <label htmlFor="toggleEstado">Activo </label>
              <input
                id="toggleEstado"
                type="checkbox"
                style={{ width: "20px", height: "30px" }}
                name="estado_perfil"
                checked={perfil.estado_perfil}
                onChange={handleChange}
                disabled={!editando}
              />
            </p>
            <div className="form-perfil-acciones" style={{ width: "max-content", alignSelf: "center" }}>
              {idPerfil && idPerfil !== 0 && editando ? (
                  <>
                  {/*Editando*/}
                  <Button icono={"pi pi-check"} label={"Aceptar"} onClick={guardarPerfil} aceptar={true}/>
                  <Button icono={"pi pi-ban"} label={"Cancelar"} onClick={cancelarEdicion} cancelar={true}/>
                  </>
                ) : idPerfil && idPerfil !== 0 && !editando ? (
                  /*Ver la opcion*/
                  ""
                ):(
                  <>
                  {/*Nueva*/}
                  <Button icono={"pi pi-check"} label={"Aceptar"} onClick={guardarPerfil} aceptar={true}/>
                  <Button icono={"pi pi-ban"} label={"Cancelar"} onClick={cerrar} cancelar={true}/>
                  </>
                )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default FormPerfil;
