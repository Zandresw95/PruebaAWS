import Button from "../../generic/Button";
import ContInput from "../../generic/ContInput";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { dominio } from "../../../helpers/Dbdata";
import { Validar } from "../../../helpers/Validar";

import "./FormPerfil.css";
import PopupContext from "../../../context/PopupContext";

let initialPerfil = {
  descripcion_perfil: "",
  observacion_perfil: "",
  estado_perfil: true,
};

let initialFormValidado = {
  descripcion_perfil: [false, ""],
};

function FormPerfil({ idPerfil, cerrar }) {
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const [perfil, setPerfil] = useState(initialPerfil);
  const [tempPerfil, setTempPerfil] = useState(initialPerfil);
  const [formValidado, setFormValidado] = useState(initialFormValidado);
  const [editando, setEditando] = useState(false);

  const { mostrarPopup } = useContext(PopupContext);

  useEffect(() => {
    obtenerPerfil();
    if (idPerfil === 0) setEditando(true);
    else setEditando(false);
    setFormValidado(initialFormValidado);
    setTempPerfil(initialPerfil);
  }, [idPerfil]);

  useEffect(() => {
    if (idPerfil !== 0) validarTodo();
    else setFormValidado(initialFormValidado);
  }, [perfil]);

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
    actualizarValidacion(e);
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

  const validarTodo = () => {
    let tempFormValidado;
    for (const key in perfil) {
      if (Object.hasOwnProperty.call(perfil, key)) {
        const el = perfil[key];
        if (key === "estado_perfil" || key === "observacion_perfil") continue;
        tempFormValidado = { ...tempFormValidado, [key]: Validar.general(el) };
      }
    }
    setFormValidado(tempFormValidado);
  };

  useEffect(() => {
    console.log(formValidado);
  }, [formValidado]);

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
        url: `http://${dominio}/api/tabla_perfiles/${idPerfil}`,
        type: "get",
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
          setMostrarCargando(true);
        },
        success: function (data) {
          setMostrarCargando(false);
          console.log(data);
          setPerfil({
            descripcion_perfil: data.data.descripcion_perfil,
            observacion_perfil: data.data.observacion_perfil,
            estado_perfil: data.data.estado_perfil,
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
      setPerfil(initialPerfil);
    }
  };

  const crearPerfil = () => {
    $.ajax({
      url: `http://${dominio}/api/tabla_perfiles/agregar`,
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

  const actualizarPerfil = () => {
    $.ajax({
      url: `http://${dominio}/api/tabla_perfiles/edit/${idPerfil}`,
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

  const eliminarPerfil = () => {
    if (window.confirm("¿Seguro que desea eliminar el perfil?"))
      $.ajax({
        url: `http://${dominio}/api/tabla_perfiles/delete/${idPerfil}`,
        type: "delete",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ estado: false }),
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
          <div className="form-perfil-acciones">
            {idPerfil && idPerfil !== 0 && !editando ? (
              <>
                <Button
                  label={"Editar"}
                  icono={"ico-edit"}
                  onClick={editarPerfil}
                  editar={true}
                />
                <Button
                  label={"Eliminar"}
                  icono={"ico-eliminar"}
                  onClick={eliminarPerfil}
                  borrar={true}
                />
              </>
            ) : (
              ""
            )}
            {idPerfil && idPerfil !== 0 && editando ? (
              <Button label={"Cancelar"} onClick={cancelarEdicion} />
            ) : (
              ""
            )}
          </div>
          <form>
            <ContInput label="Descripción" icono={"ico-perfil"}>
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
            <ContInput label="Observación" icono={"ico-perfil"}>
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
                onBlur={handleBlur}
                disabled={!editando}
              />
            </p>
            <div className="form-perfil-acciones">
              <Button
                label={"Aceptar"}
                onClick={guardarPerfil}
                aceptar={true}
              />
              {editando && (
                <Button
                  label={"Cancelar"}
                  onClick={cancelarEdicion}
                  cancelar={true}
                />
              )}
              {!editando && (
                <Button label={"Cancelar"} onClick={cerrar} cancelar={true} />
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default FormPerfil;
