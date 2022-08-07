import Button from "./Button";
import ContInput from "./ContInput";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { dominio } from "../../helpers/Dbdata";
import { Validar } from "../../helpers/Validar";


import "./FormDatos.css";
import PopupContext from "../../context/PopupContext";

let initialPersona = {
  nombre_persona: "",
  apellido_persona: "",
  direccion_persona: "",
  telefono_persona: "",
  email_persona: "",
  fechanac_persona: "",
  instruccion_persona: "",
  cedula_persona: "",
  cargo_representante: "",
};

let initialFormValidado = {
  nombre_persona: [false, ""],
  apellido_persona: [false, ""],
  direccion_persona: [false, ""],
  telefono_persona: [false, ""],
  email_persona: [false, ""],
  fechanac_persona: [false, ""],
  instruccion_persona: [false, ""],
  cedula_persona: [false, ""],
  cargo_representante: [false, ""],
};

function FormDatos({ rol, idPersona, codai_persona, cerrar, recargar }) {
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const [persona, setPersona] = useState(initialPersona);
  const [formValidado, setFormValidado] = useState(initialFormValidado);

  const { mostrarPopup } = useContext(PopupContext);

  useEffect(() => {
    if (codai_persona > 0){
        if(rol === "P001" || rol === "P004"){
            obtenerPersona();
        }else{
            obtenerRepresentante();
        }
    }
  }, [codai_persona]);

  
  const handleChange = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
    actualizarValidacion(e);
  };

  const handleBlur = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value.trim() });
  };

  const actualizarValidacion = (e) => {
    let tempCampo = {};
    switch (e.target.name) {
      case "nombre_persona":
        tempCampo = {
          [e.target.name]: Validar.texto(e.target.value),
        };
        break;
      case "apellido_persona":
        tempCampo = {
          [e.target.name]: Validar.texto(e.target.value),
        };
        break;    
      case "cedula_persona":
        tempCampo = {
          [e.target.name]: Validar.cedula(e.target.value),
        };
        break;
      case "telefono_persona":
        tempCampo = {
          [e.target.name]: Validar.telefono(e.target.value),
        };
        break;
      case "direccion_persona":
        tempCampo = {
          [e.target.name]: Validar.direccion(e.target.value),
        };
        break;
      case "email_persona":
        tempCampo = {
          [e.target.name]: Validar.email(e.target.value),
        };
        break;
      case "fechanac_persona":
        tempCampo = {
          [e.target.name]: Validar.general(e.target.value),
        };
        break;  
      case "instruccion_persona":
        tempCampo = {
          [e.target.name]: Validar.general(e.target.value),
        };
        break; 
      case "cargo_representante":
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
      if (Object.hasOwnProperty.call(initialPersona, key)) {
        const el = data[key];
        tempFormValidado = { ...tempFormValidado, [key]: Validar.general(el) };
      }
    }
    setFormValidado(tempFormValidado);
  };

  const guardarPersona = () => {
    if (validarForm()) {
        if (codai_persona !== 0) {
            if(rol === "P001" || rol === "P004"){
                actualizarPersona();
            }else{
                actualizarRepresentante();
            }
        }
    } else {
      mostrarPopup(2, "Llena todos los datos");
    }
  };

  const obtenerPersona = () => {
      if (codai_persona && codai_persona > 0) {
        $.ajax({
            url: `${dominio}/api/tabla_personas/${codai_persona}`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            beforeSend: function () {
          setMostrarCargando(true);
        },
        success: function (data) {
          setMostrarCargando(false);
          let formatedData = {
            nombre_persona: data.data.nombre_persona,
            apellido_persona: data.data.apellido_persona,
            direccion_persona: data.data.direccion_persona,
            telefono_persona: data.data.telefono_persona,
            email_persona: data.data.email_persona,
            fechanac_persona: data.data.fechanac_persona,
            instruccion_persona: data.data.instruccion_persona,
            cedula_persona: data.data.cedula_persona,
            cargo_representante: "cargo",
          };
          setPersona(formatedData);
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
      setPersona(initialPersona);
    }
  };

  const obtenerRepresentante = () => {
      if (codai_persona && codai_persona > 0) {
        $.ajax({
            url: `${dominio}/api/tabla_representante/persona/${idPersona}`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            beforeSend: function () {
            setMostrarCargando(true);
        },
        success: function (data) {
          setMostrarCargando(false);
          let formatedData = {
            nombre_persona: data.data.NOMBRE_PERSONA,
            apellido_persona: data.data.APELLIDO_PERSONA,
            direccion_persona: data.data.DIRECCION_PERSONA,
            telefono_persona: data.data.TELEFONO_PERSONA,
            email_persona: data.data.EMAIL_PERSONA,
            fechanac_persona: data.data.FECHANAC_PERSONA,
            instruccion_persona: data.data.INSTRUCCION_PERSONA,
            cedula_persona: data.data.CEDULA_PERSONA,
            cargo_representante: data.data.CARGO_REPRESENTANTE,
          };
          setPersona(formatedData);
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
      setPersona(initialPersona);
    }
  };

  const actualizarPersona = () => {
    $.ajax({
      url: `${dominio}/api/tabla_personas/edit/${codai_persona}`,
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

  const actualizarRepresentante = () => {
    $.ajax({
      url: `${dominio}/api/tabla_representante/edit/${idPersona}`,
      type: "put",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...persona }),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        setMostrarCargando(false);
        actualizarPersona();
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
        <h3 className="titulo-persona">{(rol === "P001" || rol === "P004") ? "EDITAR PERSONA" : ("EDITAR REPRESENTANTE") }</h3>
          <form>
            {(rol === "P002" || rol === "P003") && (
                <>
                    <ContInput label="Cargo" icono={"ico-persona"}>
                    <input
                    value={persona.cargo_representante}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="cargo_representante"
                    />
                    {!formValidado.cargo_representante[0] && (
                    <div className="ico-advertencia  format-ico-form-validacion"></div>
                    )}
                    </ContInput>
                    {!formValidado.cargo_representante[0] && (
                        <p className="texto-validacion">{formValidado.cargo_representante[1]}</p>
                    )}
                </>
            )}
            <ContInput label="Nombres" icono={"ico-persona"}>
              <input
                value={persona.nombre_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="nombre_persona"
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
              />
              {!formValidado.apellido_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.apellido_persona[0] && (
              <p className="texto-validacion">{formValidado.apellido_persona[1]}</p>
            )}
            <ContInput label="Dirección" icono={"ico-persona"}>
              <input
                value={persona.direccion_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="direccion_persona"
              />
              {!formValidado.direccion_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.direccion_persona[0] && (
              <p className="texto-validacion">{formValidado.direccion_persona[1]}</p>
            )}
            <ContInput label="Teléfono" icono={"ico-persona"}>
              <input
                value={persona.telefono_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="telefono_persona"
              />
              {!formValidado.telefono_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.telefono_persona[0] && (
              <p className="texto-validacion">{formValidado.telefono_persona[1]}</p>
            )}
            <ContInput label="Correo" icono={"ico-persona"}>
              <input
                value={persona.email_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email_persona"
              />
              {!formValidado.email_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.email_persona[0] && (
              <p className="texto-validacion">{formValidado.email_persona[1]}</p>
            )}
            <ContInput label="Fecha Nacimiento" icono={"ico-persona"}>
              <input
                value={persona.fechanac_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="fechanac_persona"
                type="date"
              />
              {!formValidado.fechanac_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.fechanac_persona[0] && (
              <p className="texto-validacion">{formValidado.fechanac_persona[1]}</p>
            )}
            <ContInput label="Instrucción" icono={"ico-persona"}>
              <select
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="instruccion_persona"
                  value={persona.instruccion_persona}
              >
                {persona.instruccion_persona === "" && <option disabled value={""} />}
                  <option value="Ninguna">Ninguna</option>
                  <option value="Primaria">Primaria</option>
                  <option value="Secundaria">Secundaria</option>
                  <option value="Tercer Nivel">Tercer Nivel</option>
                  <option value="Cuarto Nivel">Cuarto Nivel</option>
                  <option value="Doctorado">Doctorado</option>
                  <option value="Otra">Otra</option>
                </select>
              {!formValidado.instruccion_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.instruccion_persona[0] && (
              <p className="texto-validacion">{formValidado.instruccion_persona[1]}</p>
            )}
            <ContInput label="Cédula" icono={"ico-ruc"}>
              <input
                value={persona.cedula_persona}
                onChange={handleChange}
                onBlur={handleBlur}
                name="cedula_persona"
              />
              {!formValidado.cedula_persona[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.cedula_persona[0] && (
              <p className="texto-validacion">{formValidado.cedula_persona[1]}</p>
            )}

            <div className="form-persona-acciones" style={{ width: "max-content", alignSelf: "center" }}>
                <Button icono="pi pi-check" label={"Actualizar"} onClick={guardarPersona} aceptar={true}/>
                <Button icono="pi pi-ban" label={"Cancelar"} onClick={cerrar} cancelar={true}/>
            </div>
          </form>
    </div>
  );
}

export default FormDatos;
