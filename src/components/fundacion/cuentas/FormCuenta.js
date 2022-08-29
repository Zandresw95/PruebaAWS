import Button from "../../generic/Button";
import ContInput from "../../generic/ContInput";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { dominio } from "../../../helpers/Dbdata";
import { Validar } from "../../../helpers/Validar";

import "./FormCuenta.css";
import PopupContext from "../../../context/PopupContext";
import ConfirmContext from "../../../context/ConfirmContext";

let initialcuenta = {
  id_fundacion: "",
  banco_cuenta: "",
  tipo_cuenta: "",
  numero_cuenta: "",
  cedula_cuenta: "",
  nombre_cuenta: "",
  apellido_cuenta: "",
  correo_cuenta: "",
};

let initialFormValidado = {
    banco_cuenta: [false, ""],
    tipo_cuenta: [false, ""],
    numero_cuenta: [false, ""],
    cedula_cuenta: [false, ""],
    nombre_cuenta: [false, ""],
    apellido_cuenta: [false, ""],
    correo_cuenta: [false, ""],
};

function FormCuenta({ id_fundacion, idCuenta, cerrar, recargar }) {
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const [cuenta, setCuenta] = useState(initialcuenta);
  const [tempCuenta, setTempCuenta] = useState(initialcuenta);
  const [formValidado, setFormValidado] = useState(initialFormValidado);
  const [editando, setEditando] = useState(false);
  
  const { mostrarConfirm } = useContext(ConfirmContext);
  const { mostrarPopup } = useContext(PopupContext);

  useEffect(() => {
    if (idCuenta === 0){
      setEditando(true);
      setFormValidado(initialFormValidado);
      setCuenta(initialcuenta);
    }else{
      setEditando(false);
      obtenerCuenta();
    }
    
  }, [idCuenta]);

  const handleChange = (e) => {
    setCuenta({ ...cuenta, [e.target.name]: e.target.value });
    actualizarValidacion(e);
  };

  const handleBlur = (e) => {
    setCuenta({ ...cuenta, [e.target.name]: e.target.value.trim() });
  };

  const actualizarValidacion = (e) => {
    let tempCampo = {};
    switch (e.target.name) {
      case "banco_cuenta":
        tempCampo = {
          [e.target.name]: Validar.general(e.target.value),
        };
        break;
        case "tipo_cuenta":
        tempCampo = {
          [e.target.name]: Validar.general(e.target.value),
        };
        break;
        case "numero_cuenta":
        tempCampo = {
          [e.target.name]: Validar.numeros(e.target.value),
        };
        break;
        case "cedula_cuenta":
        tempCampo = {
          [e.target.name]: Validar.general(e.target.value),
        };
        break;
        case "nombre_cuenta":
        tempCampo = {
          [e.target.name]: Validar.general(e.target.value),
        };
        break;
        case "apellido_cuenta":
        tempCampo = {
          [e.target.name]: Validar.general(e.target.value),
        };
        break;
        case "correo_cuenta":
        tempCampo = {
          [e.target.name]: Validar.email(e.target.value),
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
      if (Object.hasOwnProperty.call(initialcuenta, key)) {
        const el = data[key];
        tempFormValidado = { ...tempFormValidado, [key]: Validar.general(el) };
      }
    }
    setFormValidado(tempFormValidado);
  };

  const guardarCuenta = () => {
    if (validarForm()) {
      if (editando && idCuenta !== 0) {
        actualizarCuenta();
      } else {
        crearCuenta();
      }
    } else {
      mostrarPopup(2, "Llena todos los datos");
    }
  };

  const editarCuenta = () => {
    setTempCuenta(cuenta);
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setCuenta(tempCuenta);
    setEditando(false);
  };

  const obtenerCuenta = () => {
    if (idCuenta && idCuenta > 0) {
      $.ajax({
        url: `${dominio}/api/tabla_cuenta_bancaria/${idCuenta}`,
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
            banco_cuenta: data.data.banco_cuenta,
            tipo_cuenta: data.data.tipo_cuenta,
            numero_cuenta: data.data.numero_cuenta,
            cedula_cuenta: data.data.cedula_cuenta,
            nombre_cuenta: data.data.nombre_cuenta,
            apellido_cuenta: data.data.apellido_cuenta,
            correo_cuenta: data.data.correo_cuenta,
            
          };
          setCuenta(formatedData);
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
      setCuenta(initialcuenta);
    }
  };

  const crearCuenta = () => {
    cuenta.id_fundacion = id_fundacion;
    $.ajax({
      url: `${dominio}/api/tabla_cuenta_bancaria/agregar`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...cuenta }),
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

  const actualizarCuenta = () => {
    $.ajax({
      url: `${dominio}/api/tabla_cuenta_bancaria/edit/${idCuenta}`,
      type: "put",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...cuenta }),
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

  const eliminarCuenta = async () => {
    if (await mostrarConfirm("¿Seguro que deseas eliminar la cuenta?"))
      $.ajax({
        url: `${dominio}/api/tabla_cuenta_bancaria/delete/${idCuenta}`,
        type: "delete",
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
    <div className="cont-form-cuenta">
      {mostrarCargando ? (
        <div className="cont-loader-full-container">
          <div className="loader format-ico-loader"></div>
        </div>
      ) : (
        <>
          <h3 className="titulo-cuenta">{idCuenta === 0 ? "NUEVA CUENTA" : !editando ? "VER CUENTA": "EDITAR CUENTA" }</h3>
          <div className="form-cuenta-acciones" style={{ width: "max-content", alignSelf: "center" }}>
            {idCuenta && idCuenta !== 0 && !editando ? (
              <>
                <Button
                  label={"Editar"}
                  icono={"ico-lapiz"}
                  onClick={editarCuenta}
                  editar={true}
                />
                <Button
                  label={"Eliminar"}
                  icono={"ico-eliminar"}
                  onClick={eliminarCuenta}
                  borrar={true}
                  rojo = {true}
                />
              </>
            ) : (
              ""
            )}
          </div>
          <form>
            <ContInput label="Banco" icono={"ico-cuenta"}>
              <input
                value={cuenta.banco_cuenta}
                onChange={handleChange}
                onBlur={handleBlur}
                name="banco_cuenta"
                disabled={!editando}
              />
              {!formValidado.banco_cuenta[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.banco_cuenta[0] && (
              <p className="texto-validacion">{formValidado.banco_cuenta[1]}</p>
            )}
            <ContInput label="Tipo de Cuenta" icono={"ico-as"}>
              <select
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="tipo_cuenta"
                  disabled={!editando}
                  value={cuenta.tipo_cuenta}
              >
                {cuenta.tipo_cuenta === "" && <option disabled value={""} />}
                  <option value="Ahorros">Ahorros</option>
                  <option value="Corriente">Corriente</option>
                </select>
              {!formValidado.tipo_cuenta[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.tipo_cuenta[0] && (
              <p className="texto-validacion">{formValidado.tipo_cuenta[1]}</p>
            )}
            <ContInput label="Número" icono={"ico-cuenta"}>
              <input
                value={cuenta.numero_cuenta}
                onChange={handleChange}
                onBlur={handleBlur}
                name="numero_cuenta"
                disabled={!editando}
              />
              {!formValidado.numero_cuenta[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.numero_cuenta[0] && (
              <p className="texto-validacion">{formValidado.numero_cuenta[1]}</p>
            )}
            <ContInput label="Cédula Beneficiario" icono={"ico-cuenta"}>
              <input
                value={cuenta.cedula_cuenta}
                onChange={handleChange}
                onBlur={handleBlur}
                name="cedula_cuenta"
                disabled={!editando}
              />
              {!formValidado.cedula_cuenta[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.cedula_cuenta[0] && (
              <p className="texto-validacion">{formValidado.cedula_cuenta[1]}</p>
            )}
            <ContInput label="Nombres Beneficiario" icono={"ico-cuenta"}>
              <input
                value={cuenta.nombre_cuenta}
                onChange={handleChange}
                onBlur={handleBlur}
                name="nombre_cuenta"
                disabled={!editando}
              />
              {!formValidado.nombre_cuenta[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.nombre_cuenta[0] && (
              <p className="texto-validacion">{formValidado.nombre_cuenta[1]}</p>
            )}
            <ContInput label="Apellidos Beneficiario" icono={"ico-cuenta"}>
              <input
                value={cuenta.apellido_cuenta}
                onChange={handleChange}
                onBlur={handleBlur}
                name="apellido_cuenta"
                disabled={!editando}
              />
              {!formValidado.apellido_cuenta[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.apellido_cuenta[0] && (
              <p className="texto-validacion">{formValidado.apellido_cuenta[1]}</p>
            )}
            <ContInput label="Correo Beneficiario" icono={"ico-cuenta"}>
              <input
                value={cuenta.correo_cuenta}
                onChange={handleChange}
                onBlur={handleBlur}
                name="correo_cuenta"
                disabled={!editando}
              />
              {!formValidado.correo_cuenta[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.correo_cuenta[0] && (
              <p className="texto-validacion">{formValidado.correo_cuenta[1]}</p>
            )}
            <div className="form-cuenta-acciones" style={{ width: "max-content", alignSelf: "center" }}>
               
              {idCuenta && idCuenta !== 0 && editando ? (
                <>
                 {/*Editando la cuenta*/}
                 <Button icono="pi pi-check" label={"Aceptar"} onClick={guardarCuenta} aceptar={true}/>
                 <Button icono="pi pi-ban" label={"Cancelar"} onClick={cancelarEdicion} cancelar={true}/>
                </>
              ) : idCuenta && idCuenta !== 0 && !editando ? (
                /*Ver la cuenta*/
                ""
              ):(
                <>
                {/*Nueva cuenta*/}
                <Button icono="pi pi-check" label={"Aceptar"} onClick={guardarCuenta} aceptar={true}/>
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

export default FormCuenta;
