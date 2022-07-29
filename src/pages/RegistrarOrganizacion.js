import React, { useState, useContext } from 'react';
import { dominio } from "../helpers/Dbdata";
import { Validar } from "../helpers/Validar";
import Button from '../components/generic/Button';
import ContInput from "../components/generic/ContInput";
import imgBanner from '../media/img/regOrganizacion.png';
import $ from "jquery";
import BannerRegistro from "../components/navbar/BannerRegistro";
import { TabView, TabPanel } from 'primereact/tabview';
import { useNavigate } from "react-router-dom";
import './RegistrarOrganizacion.css';

import PopupContext from "../context/PopupContext";

let initialOrganizacion = {
    nombre_organizacion: "",
    direccion_organizacion: "",
    telefono_organizacion: "",
    nombre_persona: "",
    apellido_persona: "",
    direccion_persona: "",
    telefono_persona: "",
    email_persona: "",
    fechanac_persona: "",
    instruccion_persona: "",
    cedula_persona: "",
    cargo_representante: "",
    login_usuario: "",
    clave_usuario: "",
    claveConfirm_usuario: "",
};

let initialOrganizacionFormValidado = {
    nombre_organizacion: [false, ""],
    direccion_organizacion: [false, ""],
    telefono_organizacion: [false, ""],
    nombre_persona: [false, ""],
    apellido_persona: [false, ""],
    direccion_persona: [false, ""],
    telefono_persona: [false, ""],
    email_persona: [false, ""],
    fechanac_persona: [false, ""],
    instruccion_persona: [false, ""],
    cedula_persona: [false, ""],
    cargo_representante: [false, ""],
    login_usuario: [false, ""],
    clave_usuario: [false, ""],
    claveConfirm_usuario: [false, ""],
};


const RegistroOrganizacion = () => {
    const [organizacion, setOrganizacion] = useState(initialOrganizacion);
    const [formFundValidado, setFormFundValidado] = useState(initialOrganizacionFormValidado);
    const { mostrarPopup } = useContext(PopupContext);
    const navigate = useNavigate();


    const handleChange = (e) => {
        setOrganizacion({ ...organizacion, [e.target.name]: e.target.value });
        actualizarValidacion(e);
    };

    const handleBlur = (e) => {
        setOrganizacion({ ...organizacion, [e.target.name]: e.target.value.trim() });
    };

    const actualizarValidacion = (e) => {
        let tempCampo = {};
        switch (e.target.name) {
            case "nombre_organizacion":
                tempCampo = {
                    [e.target.name]: Validar.texto(e.target.value),
                };
                break;
            case "telefono_organizacion":
                tempCampo = {
                    [e.target.name]: Validar.telefono(e.target.value),
                };
                break;
            case "direccion_organizacion":
                tempCampo = {
                    [e.target.name]: Validar.direccion(e.target.value),
                };
                break;
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
        setFormFundValidado({
            ...formFundValidado,
            ...tempCampo,
        });
    };

    const validarFundForm = () => {
        for (const key in formFundValidado) {
            if (Object.hasOwnProperty.call(formFundValidado, key)) {
                const el = formFundValidado[key];
                if (!el[0]) return false;
            }
        }
        return true;
    };

    const validarTodo = (data) => {
        let tempFormValidado = formFundValidado;
        for (const key in data) {
            if (Object.hasOwnProperty.call(initialOrganizacion, key)) {
                const el = data[key];
                tempFormValidado = { ...tempFormValidado, [key]: Validar.general(el) };
            }
        }
        setFormFundValidado(tempFormValidado);
    };

    const guardarOrganizacion = () => {
        if (validarFundForm()) {
            insertarPersona();
        } else {
            mostrarPopup(2, "Llena todos los datos");
        }
    };

    const cancelarEdicion = () => {
        setOrganizacion(initialOrganizacion);
    };

    const asignarPerfil = (id_usuario) => {
        $.ajax({
            url: `${dominio}/api/tabla_usu_perfil/agregar/${"P003"}`,
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ id_usuario: id_usuario }),
            success: function (data) {
                if (data.ok) {
                    mostrarPopup(1, "Organizacion registrada con exito");
                    cancelarEdicion();
                    navigate("/");
                } else {
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

    const crearOrganizacion = (id_usuario, id_persona) => {
        $.ajax({
            url: `${dominio}/api/tabla_organizaciones/agregar`,
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ ...organizacion, id_persona: id_persona },
                ["nombre_organizacion", "direccion_organizacion", "telefono_organizacion",
                     "id_persona"]),
            success: function (data) {
                asignarPerfil(id_usuario);
            },
            error: function (data) {
                let mensaje = data.responseJSON.data;
                if (data.status === 0)
                    mostrarPopup(0, "No es posible conectarse al servidor Node JS");
                else mostrarPopup(2, mensaje);
            },
        });
    }

    const insertarRepresentante = (id_persona) => {
        $.ajax({
            url: `${dominio}/api/tabla_representante/agregar`,
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ ...organizacion, id_persona: id_persona }, ["cargo_representante", "id_persona"]),
            success: function (data) {
                insertarUsuario(id_persona);
            },
            error: function (data) {
                let mensaje = data.responseJSON.data;
                if (data.status === 0)
                    mostrarPopup(0, "No es posible conectarse al servidor Node JS");
                else mostrarPopup(2, mensaje);
            },
        });
    }

    const insertarUsuario = (id_persona) => {
        $.ajax({
            url: `${dominio}/api/tabla_usuarios/agregar`,
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ ...organizacion, id_persona: id_persona, estado_usuario: true },
                ["login_usuario", "clave_usuario", "estado_usuario", "id_persona"]),
            success: function (data) {
                crearOrganizacion(data.id_usuario.toString(), id_persona);
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
            data: JSON.stringify({ ...organizacion }, ["nombre_persona", "apellido_persona",
                "direccion_persona", "telefono_persona", "email_persona", "fechanac_persona",
                "instruccion_persona", "cedula_persona"]),
            success: function (data) {
                insertarRepresentante(data.id_persona.toString());
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
        <div className='cont-regFund animar-zoom-max-to-min'>
            <BannerRegistro img={imgBanner} color="#FFDBCB" nombre="Organización" />
            <div className="tabview-demo" style={{ width: "100%" }}>
                <h5 className="tabview-title">Por favor completa todos los datos </h5>
                <div className="card">
                    <form>
                        <TabView className="tabview-header-icon">
                            <TabPanel header="Organizacion" leftIcon="pi pi-home">
                                <div className="cont-form-organizacion">
                                    <ContInput label="Nombre" icono={"pi pi-home"}>
                                        <input
                                            value={organizacion.nombre_organizacion}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="nombre_organizacion"
                                            autoComplete={"off"}
                                        />
                                        {!formFundValidado.nombre_organizacion[0] && (
                                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                                        )}
                                    </ContInput>
                                    {!formFundValidado.nombre_organizacion[0] && (
                                        <p className="texto-validacion">{formFundValidado.nombre_organizacion[1]}</p>
                                    )}
                                    <ContInput label="Dirección" icono={"pi pi-building"}>
                                        <input
                                            value={organizacion.direccion_organizacion}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="direccion_organizacion"
                                            autoComplete="off"
                                        />
                                        {!formFundValidado.direccion_organizacion[0] && (
                                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                                        )}
                                    </ContInput>
                                    {!formFundValidado.direccion_organizacion[0] && (
                                        <p className="texto-validacion">{formFundValidado.direccion_organizacion[1]}</p>
                                    )}
                                    <ContInput label="Teléfono" icono={"pi pi-phone"}>
                                        <input
                                            value={organizacion.telefono_organizacion}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoComplete="off"
                                            name="telefono_organizacion"
                                        />
                                        {!formFundValidado.telefono_organizacion[0] && (
                                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                                        )}
                                    </ContInput>
                                    {!formFundValidado.telefono_organizacion[0] && (
                                        <p className="texto-validacion">{formFundValidado.telefono_organizacion[1]}</p>
                                    )}
                                </div>

                            </TabPanel>
                            <TabPanel header="Representante" leftIcon="pi pi-user-plus">
                                <div className="cont-form-organizacion">
                                    <ContInput label="Nombres" icono={"pi pi-user"}>
                                        <input
                                            value={organizacion.nombre_persona}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="nombre_persona"
                                        />
                                        {!formFundValidado.nombre_persona[0] && (
                                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                                        )}
                                    </ContInput>
                                    {!formFundValidado.nombre_persona[0] && (
                                        <p className="texto-validacion">{formFundValidado.nombre_persona[1]}</p>
                                    )}
                                    <ContInput label="Apellidos" icono={"pi pi-user"}>
                                        <input
                                            value={organizacion.apellido_persona}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="apellido_persona"
                                        />
                                        {!formFundValidado.apellido_persona[0] && (
                                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                                        )}
                                    </ContInput>
                                    {!formFundValidado.apellido_persona[0] && (
                                        <p className="texto-validacion">{formFundValidado.apellido_persona[1]}</p>
                                    )}
                                    <ContInput label="Dirección" icono={"pi pi-home"}>
                                        <input
                                            value={organizacion.direccion_persona}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="direccion_persona"
                                        />
                                        {!formFundValidado.direccion_persona[0] && (
                                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                                        )}
                                    </ContInput>
                                    {!formFundValidado.direccion_persona[0] && (
                                        <p className="texto-validacion">{formFundValidado.direccion_persona[1]}</p>
                                    )}
                                    <ContInput label="Teléfono" icono={"pi pi-phone"}>
                                        <input
                                            value={organizacion.telefono_persona}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="telefono_persona"
                                        />
                                        {!formFundValidado.telefono_persona[0] && (
                                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                                        )}
                                    </ContInput>
                                    {!formFundValidado.telefono_persona[0] && (
                                        <p className="texto-validacion">{formFundValidado.telefono_persona[1]}</p>
                                    )}
                                    <ContInput label="Correo" icono={"pi pi-at"}>
                                        <input
                                            value={organizacion.email_persona}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="email_persona"
                                        />
                                        {!formFundValidado.email_persona[0] && (
                                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                                        )}
                                    </ContInput>
                                    {!formFundValidado.email_persona[0] && (
                                        <p className="texto-validacion">{formFundValidado.email_persona[1]}</p>
                                    )}
                                    <ContInput label="Fecha Nacimiento" icono={"pi pi-calendar"}>
                                        <input
                                            value={organizacion.fechanac_persona}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="fechanac_persona"
                                            type="date"
                                        />
                                        {!formFundValidado.fechanac_persona[0] && (
                                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                                        )}
                                    </ContInput>
                                    {!formFundValidado.fechanac_persona[0] && (
                                        <p className="texto-validacion">{formFundValidado.fechanac_persona[1]}</p>
                                    )}
                                    <ContInput label="Instrucción" icono={"pi pi-briefcase"}>
                                        <select
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="instruccion_persona"
                                            value={organizacion.instruccion_persona}
                                        >
                                            {organizacion.instruccion_persona === "" && <option disabled value={""} />}
                                            <option value="Ninguna">Ninguna</option>
                                            <option value="Primaria">Primaria</option>
                                            <option value="Secundaria">Secundaria</option>
                                            <option value="Tercer Nivel">Tercer Nivel</option>
                                            <option value="Cuarto Nivel">Cuarto Nivel</option>
                                            <option value="Doctorado">Doctorado</option>
                                            <option value="Otra">Otra</option>
                                        </select>
                                        {!formFundValidado.instruccion_persona[0] && (
                                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                                        )}
                                    </ContInput>
                                    {!formFundValidado.instruccion_persona[0] && (
                                        <p className="texto-validacion">{formFundValidado.instruccion_persona[1]}</p>
                                    )}
                                    <ContInput label="Cédula" icono={"pi pi-id-card"}>
                                        <input
                                            value={organizacion.cedula_persona}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="cedula_persona"
                                        />
                                        {!formFundValidado.cedula_persona[0] && (
                                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                                        )}
                                    </ContInput>
                                    {!formFundValidado.cedula_persona[0] && (
                                        <p className="texto-validacion">{formFundValidado.cedula_persona[1]}</p>
                                    )}
                                    <ContInput label="Cargo" icono={"pi pi-id-card"}>
                                        <input
                                            value={organizacion.cargo_representante}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="cargo_representante"
                                        />
                                        {!formFundValidado.cargo_representante[0] && (
                                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                                        )}
                                    </ContInput>
                                    {!formFundValidado.cargo_representante[0] && (
                                        <p className="texto-validacion">{formFundValidado.cargo_representante[1]}</p>
                                    )}
                                </div>
                            </TabPanel>
                            <TabPanel header="Usuario" leftIcon="pi pi-user">
                                <div className="cont-form-organizacion">
                                    <ContInput label="Usuario" icono={"ico-usuario"}>
                                        <input
                                            value={organizacion.login_usuario}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="login_usuario"
                                        />
                                        {!formFundValidado.login_usuario[0] && (
                                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                                        )}
                                    </ContInput>
                                    {!formFundValidado.login_usuario[0] && (
                                        <p className="texto-validacion">{formFundValidado.login_usuario[1]}</p>
                                    )}

                                    <ContInput label="Clave" icono={"pi pi-key"}>
                                        <input
                                            value={organizacion.clave_usuario}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="clave_usuario"
                                            type={"password"}
                                        />
                                        {!formFundValidado.clave_usuario[0] && (
                                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                                        )}
                                    </ContInput>
                                    {!formFundValidado.clave_usuario[0] && (
                                        <p className="texto-validacion">{formFundValidado.clave_usuario[1]}</p>
                                    )}
                                    <ContInput label="Confirmar clave" icono={"pi pi-key"}>
                                        <input
                                            value={organizacion.claveConfirm_usuario}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="claveConfirm_usuario"
                                            type={"password"}
                                        />
                                        {!formFundValidado.claveConfirm_usuario[0] && (
                                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                                        )}
                                    </ContInput>
                                    {!formFundValidado.claveConfirm_usuario[0] && (
                                        <p className="texto-validacion">{formFundValidado.claveConfirm_usuario[1]}</p>
                                    )}
                                    <div className="form-organizacion-acciones">
                                        <Button label={"Registrar"} icono={"pi pi-check"} onClick={guardarOrganizacion} aceptar={true} />
                                        <Button label={"Limpiar Todo"} icono={"pi pi-ban"} onClick={cancelarEdicion} cancelar={true} />
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

export default RegistroOrganizacion;