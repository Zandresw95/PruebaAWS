import Button from "../../components/generic/Button";
import ContInput from "../../components/generic/ContInput";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { dominio } from "../../helpers/Dbdata";
import { Validar } from "../../helpers/Validar";

import "./FormOrganizacion.css";
import PopupContext from "../../context/PopupContext";

let initialOrganization = {
    nombre_organizacion: "",
    direccion_organizacion: "",
    telefono_organizacion: ""
};

let initialFormValidado = {
    nombre_organizacion: [false, ""],
    direccion_organizacion: [false, ""],
    telefono_organizacion: [false, ""],
};

const FormOrganizacion = ({id_organizacion, cerrar, recargar}) => {
    const [organizacion, setOrganizacion] = useState(initialOrganization);
    const [formValidado, setFormValidado] = useState(initialFormValidado);
    const [mostrarCargando, setMostrarCargando] = useState(false);

    const { mostrarPopup } = useContext(PopupContext);

    useEffect(() => {
        if(id_organizacion > 0){
            obtenerOrganizacion();
        }
    }, [id_organizacion]);

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
            if (Object.hasOwnProperty.call(initialOrganization, key)) {
                const el = data[key];
                tempFormValidado = { ...tempFormValidado, [key]: Validar.general(el) };
            }
        }
        setFormValidado(tempFormValidado);
    };

    const guardarOrganizacion = () => {
        if (validarForm()) {
            if (id_organizacion !== 0) {
                actualizarOrganizacion();
            }
        } else {
            mostrarPopup(2, "Llena todos los datos");
        }
    };

    const obtenerOrganizacion = () => {
        if (id_organizacion && id_organizacion > 0) {
          $.ajax({
            url: `${dominio}/api/tabla_organizaciones/${id_organizacion}`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            beforeSend: function () {
              setMostrarCargando(true);
            },
            success: function (data) {
              setMostrarCargando(false);
              let formatedData = {
                nombre_organizacion: data.data.nombre_organizacion,
                direccion_organizacion: data.data.direccion_organizacion,
                telefono_organizacion: data.data.telefono_organizacion,
              };
              setOrganizacion(formatedData);
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
          setOrganizacion(initialOrganization);
        }
    };

    const actualizarOrganizacion = () => {
        $.ajax({
          url: `${dominio}/api/tabla_organizaciones/edit/${id_organizacion}`,
          type: "put",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify({ ...organizacion }),
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
        <div className="cont-form-organizacion">
            <h3 className="titulo-persona">EDITAR DATOS ORGANIZACIÓN</h3>
            <form>
                <ContInput label="Nombre" icono={"pi pi-home"}>
                    <input
                        value={organizacion.nombre_organizacion}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="nombre_organizacion"
                        autoComplete={"off"}
                    />
                    {!formValidado.nombre_organizacion[0] && (
                        <div className="ico-advertencia  format-ico-form-validacion"></div>
                    )}
                </ContInput>
                {!formValidado.nombre_organizacion[0] && (
                    <p className="texto-validacion">{formValidado.nombre_organizacion[1]}</p>
                )}
                <ContInput label="Dirección" icono={"pi pi-building"}>
                    <input
                        value={organizacion.direccion_organizacion}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="direccion_organizacion"
                        autoComplete="off"
                    />
                    {!formValidado.direccion_organizacion[0] && (
                        <div className="ico-advertencia  format-ico-form-validacion"></div>
                    )}
                </ContInput>
                {!formValidado.direccion_organizacion[0] && (
                    <p className="texto-validacion">{formValidado.direccion_organizacion[1]}</p>
                )}
                <ContInput label="Teléfono" icono={"pi pi-phone"}>
                    <input
                        value={organizacion.telefono_organizacion}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                        name="telefono_organizacion"
                    />
                    {!formValidado.telefono_organizacion[0] && (
                        <div className="ico-advertencia  format-ico-form-validacion"></div>
                    )}
                </ContInput>
                {!formValidado.telefono_organizacion[0] && (
                    <p className="texto-validacion">{formValidado.telefono_organizacion[1]}</p>
                )}
            </form>
            <div className="form-fundacion-acciones" style={{ width: "max-content", alignSelf: "center" }}>
                <Button icono="pi pi-check" label={"Actualizar"} onClick={guardarOrganizacion} aceptar={true}/>
                <Button icono="pi pi-ban" label={"Cancelar"} onClick={cerrar} cancelar={true}/>
            </div>

        </div>
    );
}

export default FormOrganizacion;