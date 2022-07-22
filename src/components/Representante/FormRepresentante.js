import Button from "../generic/Button";
import ContInput from "../generic/ContInput";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { dominio } from "../../helpers/Dbdata";
import { Validar } from "../../helpers/Validar";

import "./FormRepresentante.css";
import PopupContext from "../../context/PopupContext";
import ConfirmContext from "../../context/ConfirmContext";

let initialrepresentante = {
  nombre_representante: "",
  apellido_representante: "",
  direccion_representante: "",
  telefono_representante: "",
  email_representante: "",
  fechanac_representante: "",
  instruccion_representante: "",
  cedula_representante: "",
  cargo_representante: "",
};

let initialFormValidado = {
  nombre_representante: [false, ""],
  apellido_representante: [false, ""],
  direccion_representante: [false, ""],
  telefono_representante: [false, ""],
  email_representante: [false, ""],
  fechanac_representante: [false, ""],
  instruccion_representante: [false, ""],
  cedula_representante: [false, ""],
  cargo_representante: [false, ""],
};

function FormRepresentante() {
  const [representante, setrepresentante] = useState(initialrepresentante);
  const [temprepresentante, setTemprepresentante] = useState(initialrepresentante);
  const [formValidado, setFormValidado] = useState(initialFormValidado);
  const [editando, setEditando] = useState(false);

  const { mostrarPopup } = useContext(PopupContext);
  const { mostrarConfirm } = useContext(ConfirmContext);

  useEffect(() => {
    setEditando(true);
    setFormValidado(initialFormValidado);
    setrepresentante(initialrepresentante);
  }, []);

  
  const handleChange = (e) => {
    setrepresentante({ ...representante, [e.target.name]: e.target.value });
    actualizarValidacion(e);
  };

  const handleBlur = (e) => {
    setrepresentante({ ...representante, [e.target.name]: e.target.value.trim() });
  };

  const actualizarValidacion = (e) => {
    let tempCampo = {};
    switch (e.target.name) {
      case "nombre_representante":
        tempCampo = {
          [e.target.name]: Validar.texto(e.target.value),
        };
        break;
      case "apellido_representante":
        tempCampo = {
          [e.target.name]: Validar.texto(e.target.value),
        };
        break;    
      case "cedula_representante":
        tempCampo = {
          [e.target.name]: Validar.cedula(e.target.value),
        };
        break;
      case "telefono_representante":
        tempCampo = {
          [e.target.name]: Validar.telefono(e.target.value),
        };
        break;
      case "direccion_representante":
        tempCampo = {
          [e.target.name]: Validar.direccion(e.target.value),
        };
        break;
      case "email_representante":
        tempCampo = {
          [e.target.name]: Validar.email(e.target.value),
        };
        break;
      case "fechanac_representante":
        tempCampo = {
          [e.target.name]: Validar.general(e.target.value),
        };
        break;  
      case "instruccion_representante":
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
      if (Object.hasOwnProperty.call(initialrepresentante, key)) {
        const el = data[key];
        tempFormValidado = { ...tempFormValidado, [key]: Validar.general(el) };
      }
    }
    setFormValidado(tempFormValidado);
  };

  const guardarrepresentante = () => {
    if (validarForm()) {
        crearrepresentante();
    } else {
      mostrarPopup(2, "Llena todos los datos");
    }
  };

  const editarrepresentante = () => {
    setTemprepresentante(representante);
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setrepresentante(temprepresentante);
    setEditando(false);
  };

  const crearrepresentante = () => {
    $.ajax({
      url: `http://${dominio}/api/tabla_representantes/agregar`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...representante }),
      beforeSend: function () {

      },
      success: function (data) {

        mostrarPopup(1, data.mensaje);

      },
      error: function (data) {

        console.log(data.responseJSON.data);
        let mensaje = data.responseJSON.data;
        if (data.status === 0)
          mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        else mostrarPopup(2, mensaje);
      },
    });
  };

  return (
    <div className="cont-form-representante">
        <>
          <form>
            <ContInput label="Nombres" icono={"ico-representante"}>
              <input
                value={representante.nombre_representante}
                onChange={handleChange}
                onBlur={handleBlur}
                name="nombre_representante"
                disabled={!editando}
              />
              {!formValidado.nombre_representante[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.nombre_representante[0] && (
              <p className="texto-validacion">{formValidado.nombre_representante[1]}</p>
            )}
            <ContInput label="Apellidos" icono={"ico-representante"}>
              <input
                value={representante.apellido_representante}
                onChange={handleChange}
                onBlur={handleBlur}
                name="apellido_representante"
                disabled={!editando}
              />
              {!formValidado.apellido_representante[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.apellido_representante[0] && (
              <p className="texto-validacion">{formValidado.apellido_representante[1]}</p>
            )}
            <ContInput label="Dirección" icono={"ico-representante"}>
              <input
                value={representante.direccion_representante}
                onChange={handleChange}
                onBlur={handleBlur}
                name="direccion_representante"
                disabled={!editando}
              />
              {!formValidado.direccion_representante[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.direccion_representante[0] && (
              <p className="texto-validacion">{formValidado.direccion_representante[1]}</p>
            )}
            <ContInput label="Teléfono" icono={"ico-representante"}>
              <input
                value={representante.telefono_representante}
                onChange={handleChange}
                onBlur={handleBlur}
                name="telefono_representante"
                disabled={!editando}
              />
              {!formValidado.telefono_representante[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.telefono_representante[0] && (
              <p className="texto-validacion">{formValidado.telefono_representante[1]}</p>
            )}
            <ContInput label="Correo" icono={"ico-representante"}>
              <input
                value={representante.email_representante}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email_representante"
                disabled={!editando}
              />
              {!formValidado.email_representante[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.email_representante[0] && (
              <p className="texto-validacion">{formValidado.email_representante[1]}</p>
            )}
            <ContInput label="Fecha Nacimiento" icono={"ico-representante"}>
              <input
                value={representante.fechanac_representante}
                onChange={handleChange}
                onBlur={handleBlur}
                name="fechanac_representante"
                disabled={!editando}
                type="date"
              />
              {!formValidado.fechanac_representante[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.fechanac_representante[0] && (
              <p className="texto-validacion">{formValidado.fechanac_representante[1]}</p>
            )}
            <ContInput label="Instrucción" icono={"ico-representante"}>
              <select
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="instruccion_representante"
                  disabled={!editando}
                  value={representante.instruccion_representante}
              >
                {representante.instruccion_representante === "" && <option disabled value={""} />}
                  <option value="Ninguna">Ninguna</option>
                  <option value="Primaria">Primaria</option>
                  <option value="Secundaria">Secundaria</option>
                  <option value="Tercer Nivel">Tercer Nivel</option>
                  <option value="Cuarto Nivel">Cuarto Nivel</option>
                  <option value="Doctorado">Doctorado</option>
                  <option value="Otra">Otra</option>
                </select>
              {!formValidado.instruccion_representante[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.instruccion_representante[0] && (
              <p className="texto-validacion">{formValidado.instruccion_representante[1]}</p>
            )}
            <ContInput label="Cédula" icono={"ico-ruc"}>
              <input
                value={representante.cedula_representante}
                onChange={handleChange}
                onBlur={handleBlur}
                name="cedula_representante"
                disabled={!editando}
              />
              {!formValidado.cedula_representante[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.cedula_representante[0] && (
              <p className="texto-validacion">{formValidado.cedula_representante[1]}</p>
            )}

            <div className="form-usuario-acciones" style={{ width: "max-content", alignSelf: "center" }}>
               
              
                <>
                {/*Nuevo usuario*/}
                <Button label={"Aceptar"} onClick={guardarrepresentante} aceptar={true}/>
                </>
              
            </div>
          </form>
        </>
    </div>
  );
}

export default FormRepresentante;
