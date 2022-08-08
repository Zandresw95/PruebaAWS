import Button from "../generic/Button";
import ContInput from "../generic/ContInput";
import $ from "jquery";
import { dominio } from "../../helpers/Dbdata";
import { Validar } from "../../helpers/Validar";
import { useContext, useEffect, useState } from "react";
// import './FormDonacionMonetaria.css'

import PopupContext from "../../context/PopupContext";
import ConfirmContext from "../../context/ConfirmContext";

let initialAdopcion = {
    id_persona: localStorage.getItem("idpersona"),
    id_fundacion: "",
    id_animal: "",
    observacion_solicitud:"",
    archivo_solicitud:""
};

let initialFormValidado = {
    observacion_solicitud: [false, ""],
    archivo_solicitud: [false, ""]
};

const FormAdopcion = ({ id_fundacion, id_animal, cerrar, nombre }) => {
    const [mounted, setMounted] = useState(true);
    const [mostrarCargando, setMostrarCargando] = useState(false);
    const [disponible, setDisponible] = useState(false);
    const [adopcion, setAdopcion] = useState(initialAdopcion);
    const [formValidado, setFormValidado] = useState(initialFormValidado);


    const { mostrarPopup } = useContext(PopupContext);
    const { mostrarConfirm } = useContext(ConfirmContext);

    const handleChange = (e) => {
        setAdopcion({ ...adopcion, [e.target.name]: e.target.value });
        actualizarValidacion(e);
    };

    const handleBlur = (e) => {
        setAdopcion({ ...adopcion, [e.target.name]: e.target.value.trim() });
    };

    const actualizarValidacion = (e) => {
        let tempCampo = {};
        switch (e.target.name) {
            case "observacion_solicitud":
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


    useEffect(() => {
        if (id_fundacion != 0) {
            setFormValidado(initialFormValidado);
            setAdopcion(initialAdopcion);
        }
    }, [id_fundacion]);

    const validarForm = () => {
        for (const key in formValidado) {
            if (Object.hasOwnProperty.call(formValidado, key)) {
                const el = formValidado[key];
                if (!el[0]) return false;
            }
        }
        return true;
    };

    const guardarAdopcion = () => {
        if (validarForm()) {
            crearAdopcion();
        } else {
            mostrarPopup(2, "Llena todos los datos");
        }
    };

    const subirArchivo = (id_adopcion) => {
        const formData = new FormData();
        console.log(document.querySelector('#archivo_solicitud').files[0]);
        formData.append('bucket', "adopciones-apadrinamientos");
        formData.append('file', document.querySelector('#archivo_solicitud').files[0]);
        $.ajax({
            url: `${dominio}/api/tabla_adopciones/subirImagen/${id_adopcion}`,
            type: "post",
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
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
    }

    const crearAdopcion = async () => {
        if (await mostrarConfirm("Seguro de generar la adopcion")) {
            adopcion.id_fundacion = id_fundacion;
            $.ajax({
                url: `${dominio}/api/tabla_adopciones/agregar`,
                type: "post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({ ...adopcion }),
                beforeSend: function () {
                    setMostrarCargando(true);
                },
                success: function (data) {
                    console.log(data);
                    setMostrarCargando(false);
                    subirArchivo(data.id_adopcion);
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
        }

    };

    return (
        <div className="cont-form-donacion">
            <h3 className="titulo-donacion">{nombre}</h3>
            <div className="cont-form-donacion">
                <form>
                    <>

                        <ContInput label="Observacion" icono={"ico-usuario"}>
                            <input
                                value={adopcion.observacion_solicitud}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="observacion_solicitud"
                                id="observacion_solicitud"
                                placeholder="observacion"
                            />
                            {!formValidado.observacion_solicitud[0] && (
                                <div className="ico-advertencia  format-ico-form-validacion"></div>
                            )}
                        </ContInput>
                        {!formValidado.observacion_solicitud[0] && (
                            <p className="texto-validacion">{formValidado.observacion_solicitud[1]}</p>
                        )}
                        <ContInput label="Formulario Adopción" icono={"ico-usuario"}>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="archivo_solicitud"
                                id="archivo_solicitud"
                                type="file"
                            />
                            {!formValidado.archivo_solicitud[0] && (
                                <div className="ico-advertencia  format-ico-form-validacion"></div>
                            )}
                        </ContInput>
                        {!formValidado.archivo_solicitud[0] && (
                            <p className="texto-validacion">{formValidado.archivo_solicitud[1]}</p>
                        )}
                    </>

                    <div className="form-donacion-acciones" style={{ width: "max-content", alignSelf: "center" }}>

                        <Button icono="pi pi-check" label={"Aceptar"} onClick={guardarAdopcion} aceptar={true} />

                        <Button icono="pi pi-ban" label={"Cancelar"} onClick={cerrar} cancelar={true} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormAdopcion;
