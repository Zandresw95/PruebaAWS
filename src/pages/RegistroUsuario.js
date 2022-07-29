import React, { useState, useContext } from 'react';
import { dominio } from "../helpers/Dbdata";
import { Validar } from "../helpers/Validar";
import Button from '../components/generic/Button';
import ContInput from "../components/generic/ContInput";
import imgBanner from '../media/img/regUsuario.png';
import $ from "jquery";
import BannerRegistro from "../components/navbar/BannerRegistro";
import { TabView, TabPanel } from 'primereact/tabview';
import { useNavigate } from "react-router-dom";
import './RegistroUsuario.css';

import PopupContext from "../context/PopupContext";

let initialUsuario = {
    nombre_persona: "",
    apellido_persona: "",
    direccion_persona: "",
    telefono_persona: "",
    email_persona: "",
    fechanac_persona: "",
    instruccion_persona: "",
    cedula_persona: "",
    login_usuario: "",
    clave_usuario: "",
    claveConfirm_usuario: "",
  };
  
  let initialUsuarioFormValidado = {
    nombre_persona: [false, ""],
    apellido_persona: [false, ""],
    direccion_persona: [false, ""],
    telefono_persona: [false, ""],
    email_persona: [false, ""],
    fechanac_persona: [false, ""],
    instruccion_persona: [false, ""],
    cedula_persona: [false, ""],
    login_usuario: [false, ""],
    clave_usuario: [false, ""],
    claveConfirm_usuario: [false, ""],
  };


const RegistroUsuario = () => {
  const [usuario, setUsuario] = useState(initialUsuario);
  const [formUsValidado, setFormUsValidado] = useState(initialUsuarioFormValidado);
  const { mostrarPopup } = useContext(PopupContext);
  const navigate = useNavigate();

 
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
      case "claveConfirm_usuario":
          tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
          };
        break;
      default:
        break;
    }
    setFormUsValidado({
      ...formUsValidado,
      ...tempCampo,
    });
  };

  const validarUsForm = () => {
    for (const key in formUsValidado) {
      if (Object.hasOwnProperty.call(formUsValidado, key)) {
        const el = formUsValidado[key];
        if (!el[0]) return false;
      }
    }
    return true;
  };

  const validarTodo = (data) => {
    let tempFormValidado = formUsValidado;
    for (const key in data) {
      if (Object.hasOwnProperty.call(initialUsuario, key)) {
        const el = data[key];
        tempFormValidado = { ...tempFormValidado, [key]: Validar.general(el) };
      }
    }
    setFormUsValidado(tempFormValidado);
  };

  const guardarUsuario = () => {
    if (validarUsForm()) {
      insertarPersona();
    } else {
      mostrarPopup(2, "Llena todos los datos");
    }
  };

  const cancelarEdicion = () => {
    setUsuario(initialUsuario);
  };

  const asignarPerfil = (id_usuario) => {
    $.ajax({
      url: `${dominio}/api/tabla_usu_perfil/agregar/${"P004"}`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ id_usuario: id_usuario}),
      success: function (data) {
        if(data.ok){
          mostrarPopup(1, "Usuario registrado correctamente");
          cancelarEdicion();
          navigate("/");
        }else{
          mostrarPopup(0, "Ocurrió un error al registrar su fundación");
        }
      },
      error: function (data) {
        let mensaje = data.responseJSON.data;
        if (data.status === 0)
          mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        else mostrarPopup(2, mensaje);
      },
    });
  }

    const insertarUsuario = (id_persona) =>{
    $.ajax({
      url: `${dominio}/api/tabla_usuarios/agregar`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...usuario, id_persona: id_persona, estado_usuario: true}, 
        ["login_usuario", "clave_usuario", "estado_usuario", "id_persona"]),
      success: function (data) {
        asignarPerfil(data.id_usuario.toString());
      },
      error: function (data) {
        let mensaje = data.responseJSON.data;
        if (data.status === 0)
          mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        else mostrarPopup(2, mensaje);
      },
    });
  }

  const insertarPersona = async () => {
    $.ajax({
      url: `${dominio}/api/tabla_personas/agregar`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...usuario}, ["nombre_persona", "apellido_persona", 
      "direccion_persona", "telefono_persona", "email_persona", "fechanac_persona", 
      "instruccion_persona", "cedula_persona"] ),
      success: function (data) {
        insertarUsuario(data.id_persona.toString());
      },
      error: function (data) {
        let mensaje = data.responseJSON.data;
        if (data.status === 0)
          mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        else mostrarPopup(2, mensaje);
      },
    });
  };

    return (
      <div className='cont-regUs animar-zoom-max-to-min'>
        <BannerRegistro img={imgBanner} color="#C7CEEA" nombre="Usuario"/>
        <div className="tabview-demo" style={{width: "100%"}}>
            <h5 className="tabview-title">Por favor completa todos los datos </h5>
            <div className="card">
            <form>
                <TabView className="tabview-header-icon">
                    <TabPanel header="Datos Personales" leftIcon="pi pi-user-plus">
                    <div className="cont-form-usuario"> 
                        <ContInput label="Nombres" icono={"pi pi-user"}>
                        <input
                            value={usuario.nombre_persona}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="nombre_persona"
                        />
                        {!formUsValidado.nombre_persona[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInput>
                        {!formUsValidado.nombre_persona[0] && (
                        <p className="texto-validacion">{formUsValidado.nombre_persona[1]}</p>
                        )}
                        <ContInput label="Apellidos" icono={"pi pi-user"}>
                        <input
                            value={usuario.apellido_persona}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="apellido_persona"
                        />
                        {!formUsValidado.apellido_persona[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInput>
                        {!formUsValidado.apellido_persona[0] && (
                        <p className="texto-validacion">{formUsValidado.apellido_persona[1]}</p>
                        )}
                        <ContInput label="Dirección" icono={"pi pi-home"}>
                        <input
                            value={usuario.direccion_persona}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="direccion_persona"
                        />
                        {!formUsValidado.direccion_persona[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInput>
                        {!formUsValidado.direccion_persona[0] && (
                        <p className="texto-validacion">{formUsValidado.direccion_persona[1]}</p>
                        )}
                        <ContInput label="Teléfono" icono={"pi pi-phone"}>
                        <input
                            value={usuario.telefono_persona}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="telefono_persona"
                        />
                        {!formUsValidado.telefono_persona[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInput>
                        {!formUsValidado.telefono_persona[0] && (
                        <p className="texto-validacion">{formUsValidado.telefono_persona[1]}</p>
                        )}
                        <ContInput label="Correo" icono={"pi pi-at"}>
                        <input
                            value={usuario.email_persona}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email_persona"
                        />
                        {!formUsValidado.email_persona[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInput>
                        {!formUsValidado.email_persona[0] && (
                        <p className="texto-validacion">{formUsValidado.email_persona[1]}</p>
                        )}
                        <ContInput label="Fecha Nacimiento" icono={"pi pi-calendar"}>
                        <input
                            value={usuario.fechanac_persona}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="fechanac_persona"
                            type="date"
                        />
                        {!formUsValidado.fechanac_persona[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInput>
                        {!formUsValidado.fechanac_persona[0] && (
                        <p className="texto-validacion">{formUsValidado.fechanac_persona[1]}</p>
                        )}
                        <ContInput label="Instrucción" icono={"pi pi-briefcase"}>
                        <select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="instruccion_persona"
                            value={usuario.instruccion_persona}
                        >
                            {usuario.instruccion_persona === "" && <option disabled value={""} />}
                            <option value="Ninguna">Ninguna</option>
                            <option value="Primaria">Primaria</option>
                            <option value="Secundaria">Secundaria</option>
                            <option value="Tercer Nivel">Tercer Nivel</option>
                            <option value="Cuarto Nivel">Cuarto Nivel</option>
                            <option value="Doctorado">Doctorado</option>
                            <option value="Otra">Otra</option>
                            </select>
                        {!formUsValidado.instruccion_persona[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInput>
                        {!formUsValidado.instruccion_persona[0] && (
                        <p className="texto-validacion">{formUsValidado.instruccion_persona[1]}</p>
                        )}
                        <ContInput label="Cédula" icono={"pi pi-id-card"}>
                        <input
                            value={usuario.cedula_persona}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="cedula_persona"
                        />
                        {!formUsValidado.cedula_persona[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInput>
                        {!formUsValidado.cedula_persona[0] && (
                        <p className="texto-validacion">{formUsValidado.cedula_persona[1]}</p>
                        )}
                    </div>
                    </TabPanel>
                    <TabPanel header="Usuario" leftIcon="pi pi-user">
                    <div className="cont-form-usuario">  
                        <ContInput label="Usuario" icono={"ico-usuario"}>
                        <input
                            value={usuario.login_usuario}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="login_usuario"
                        />
                        {!formUsValidado.login_usuario[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInput>
                        {!formUsValidado.login_usuario[0] && (
                        <p className="texto-validacion">{formUsValidado.login_usuario[1]}</p>
                        )}

                        <ContInput label="Clave" icono={"pi pi-key"}>
                        <input
                            value={usuario.clave_usuario}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="clave_usuario"
                            type={"password"}
                        />
                        {!formUsValidado.clave_usuario[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInput>
                        {!formUsValidado.clave_usuario[0] && (
                        <p className="texto-validacion">{formUsValidado.clave_usuario[1]}</p>
                        )}
                        <ContInput label="Confirmar clave" icono={"pi pi-key"}>
                        <input
                            value={usuario.claveConfirm_usuario}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="claveConfirm_usuario"
                            type={"password"}
                        />
                        {!formUsValidado.claveConfirm_usuario[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInput>
                        {!formUsValidado.claveConfirm_usuario[0] && (
                        <p className="texto-validacion">{formUsValidado.claveConfirm_usuario[1]}</p>
                        )}
                        <div className="form-usuario-acciones">
                        <Button label={"Registrar"} icono={"pi pi-check"} onClick={guardarUsuario} aceptar={true}/>
                        <Button label={"Limpiar Todo"} icono={"pi pi-ban"} onClick={cancelarEdicion} cancelar={true}/>
                        </div>
                    </div>
                    </TabPanel>
                </TabView>
            </form>
            </div>
        </div>
      </div>
    );
}

export default RegistroUsuario;