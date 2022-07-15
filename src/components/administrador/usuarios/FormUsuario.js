import Button from "../../generic/Button";
import ContInput from "../../generic/ContInput";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { dominio } from "../../../helpers/Dbdata";
import { Validar } from "../../../helpers/Validar";
import { Dropdown } from 'primereact/dropdown';
import "./FormUsuario.css";
import PopupContext from "../../../context/PopupContext";

let initialUsuario = {
  id_persona: "",
  login_usuario: "",
  clave_usuario: "",
  id_perfil: "",
  estado_usuario: true,
};

let initialFormValidado = {
  id_persona: [false, ""],
  login_usuario: [false, ""],
  clave_usuario: [false, ""],
};

function FormUsuario({ idUsuario, cerrar, recargar}) {
  const [mounted, setMounted] = useState(true);
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const [usuario, setUsuario] = useState(initialUsuario);
  const [tempUsuario, setTempUsuario] = useState(initialUsuario);
  const [formValidado, setFormValidado] = useState(initialFormValidado);
  const [editando, setEditando] = useState(false);
  const [personas, setPersonas] = useState([]);
  

  const { mostrarPopup } = useContext(PopupContext);

  useEffect(() => {
    obtenerPersonas();
    return () => setMounted(false);
  }, [])

  useEffect(() => {
    if (idUsuario === 0){
      setEditando(true);
      setFormValidado(initialFormValidado);
      setUsuario(initialUsuario);
    } else {
      setEditando(false);
      obtenerUsuario();
    }
  }, [idUsuario]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
    actualizarValidacion(e);
  };

  const handleBlur = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value.trim() });
  };

  const actualizarValidacion = (e) => {
    let tempCampo = {};
    switch (e.target.name) {
      case "login_usuario":
        tempCampo = {
          [e.target.name]: Validar.general(e.target.value),
        };
        break;
      case "clave_usuario":
          tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
          };
        break;
      case "id_persona":
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
      if (Object.hasOwnProperty.call(initialUsuario, key)) {
        const el = data[key];
        tempFormValidado = { ...tempFormValidado, [key]: Validar.general(el) };
      }
    }
    setFormValidado(tempFormValidado);
  };

  useEffect(() => {
   console.log(formValidado);
  }, [formValidado]);

  const guardarUsuario = () => {
    if (validarForm()) {
        crearUsuario();
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
  
  const obtenerPersonas = () => {
    $.ajax({
      url: `http://${dominio}/api/tabla_personas/obtener/activos`,
      type: "get",
      dataType: "json",
      contentType: "application/json",
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        if(mounted){
          setMostrarCargando(false);
          setPersonas(data.data);
        }
      },
      error: function (data) {
        setMostrarCargando(false);
        console.log(data.responseJSON.data);
        // if (data.status === 0)
        // mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        // else mostrarPopup(2, mensaje);
      },
    });
  };

  const obtenerUsuario = () => {
    if (idUsuario && idUsuario > 0) {
      $.ajax({
        url: `http://${dominio}/api/tabla_usuario/${idUsuario}`,
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
            id_persona: data.data.id_persona,
            login_usuario: data.data.login_usuario,
            clave_usuario: data.data.clave_usuario,
          };
          setUsuario({ ...formatedData,  estado: data.data.estado_usuario});
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
      setUsuario(initialUsuario);
    }
  };

  const crearUsuario = () => {
    $.ajax({
      url: `http://${dominio}/api/tabla_usuario/agregar`,
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

  const actualizarUsuario = () => {
    $.ajax({
      url: `http://${dominio}/api/tabla_usuario/edit/${idUsuario}`,
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

  const eliminarUsuario = () => {
    if (window.confirm("¿Seguro que desea eliminar usuario?"))
      $.ajax({
        url: `http://${dominio}/api/tabla_usuario/delete/${idUsuario}`,
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
    <div className="cont-form-usuario">
      {mostrarCargando ? (
        <div className="cont-loader-full-container">
          <div className="loader format-ico-loader"></div>
        </div>
      ) : (
        <>
          <h3 className="titulo-usuario">{idUsuario === 0 ? "NUEVO USUARIO" : !editando ? "VER USUARIO": "EDITAR USUARIO" }</h3>
          <div className="form-usuario-acciones">
            {idUsuario && idUsuario !== 0 && !editando ? (
              <>
                <Button
                  label={"Editar"}
                  icono={"ico-edit"}
                  onClick={editarUsuario}
                  editar={true}
                />
                <Button
                  label={"Eliminar"}
                  icono={"ico-eliminar"}
                  onClick={eliminarUsuario}
                  borrar={true}
                />
              </>
            ) : (
              ""
            )}
          </div>
          <form>
            <ContInput label="Persona" icono={"ico-usuario"}>
              <Dropdown disabled={!editando}
                        name="id_persona"
                        value={usuario.id_persona}
                        options={personas}
                        onChange={handleChange}
                        placeholder="Selecciona una persona"
              />
              {!formValidado.id_persona[0] && (
                <div className="ico-advertencia format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.id_persona[0] && (
              <p className="texto-validacion">{formValidado.id_persona[1]}</p>
            )}

            <ContInput label="Usuario" icono={"ico-usuario"}>
              <input
                value={usuario.login_usuario}
                onChange={handleChange}
                name="login_usuario"
                disabled={!editando}
              />
              {!formValidado.login_usuario[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.login_usuario[0] && (
              <p className="texto-validacion">{formValidado.login_usuario[1]}</p>
            )}

            <ContInput label="Clave" icono={"ico-usuario"}>
              <input
                value={usuario.clave_usuario}
                onChange={handleChange}
                name="clave_usuario"
                disabled={!editando}
                type={"password"}
              />
              {!formValidado.clave_usuario[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.clave_usuario[0] && (
              <p className="texto-validacion">{formValidado.clave_usuario[1]}</p>
            )}
           
            <div className="form-usuario-acciones">
               
              {idUsuario && idUsuario !== 0 && editando ? (
                <>
                 {/*Editando usuario*/}
                 <Button label={"Aceptar"} onClick={guardarUsuario} aceptar={true}/>
                 <Button label={"Cancelar"} onClick={cancelarEdicion} cancelar={true}/>
                </>
              ) : idUsuario && idUsuario !== 0 && !editando ? (
                /*Ver usuario*/
                ""
              ):(
                <>
                {/*Nuevo usuario*/}
                <Button label={"Aceptar"} onClick={guardarUsuario} aceptar={true}/>
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

export default FormUsuario;
