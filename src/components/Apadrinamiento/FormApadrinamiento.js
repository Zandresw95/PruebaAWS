import Button from "../generic/Button";
import ContInput from "../generic/ContInput";
import $ from "jquery";
import { dominio } from "../../helpers/Dbdata";
import { Validar } from "../../helpers/Validar";
import { useContext, useEffect, useState } from "react";
// import './FormDonacionMonetaria.css'

import PopupContext from "../../context/PopupContext";
import ConfirmContext from "../../context/ConfirmContext";

let initialApadrinamiento = {
    id_persona: localStorage.getItem("idpersona"),
    id_fundacion: "",
    id_animal: "",
    monto_apadrinamiento: ""
};

let initialFormValidado = {
    monto_apadrinamiento: [false, ""]
};

const FormApadrinamiento = ({ id_fundacion, id_animal, cerrar, nombre }) => {
    const [mounted, setMounted] = useState(true);
    const [mostrarCargando, setMostrarCargando] = useState(false);
    const [disponible, setDisponible] = useState(false);
    const [apadrinamiento, setApadrinamiento] = useState(initialApadrinamiento);
    const [formValidado, setFormValidado] = useState(initialFormValidado);


    const { mostrarPopup } = useContext(PopupContext);
    const { mostrarConfirm } = useContext(ConfirmContext);

    const handleChange = (e) => {
        setApadrinamiento({ ...apadrinamiento, [e.target.name]: e.target.value });
        actualizarValidacion(e);
    };

    const handleBlur = (e) => {
        setApadrinamiento({ ...apadrinamiento, [e.target.name]: e.target.value.trim() });
    };

    const actualizarValidacion = (e) => {
        let tempCampo = {};
        switch (e.target.name) {
            case "monto_apadrinamiento":
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
            setApadrinamiento(initialApadrinamiento);
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

    const guardarApadrinamiento = () => {
        if (validarForm()) {
            crearApadrinamiento();
        } else {
            mostrarPopup(2, "Llena todos los datos");
        }
    };

    const crearApadrinamiento = async () => {
        if (await mostrarConfirm("Seguro de apadrinar al Animalito")) {
            apadrinamiento.id_fundacion = id_fundacion;
            apadrinamiento.id_animal = id_animal;
            $.ajax({
                url: `${dominio}/api/tabla_apadrinamientos/agregar`,
                type: "post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({ ...apadrinamiento }),
                beforeSend: function () {
                    setMostrarCargando(true);
                },
                success: function (data) {
                    console.log(data);
                    setMostrarCargando(false);
                    mostrarPopup(1, "Apadrinamiento realizado con éxito");
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

    };



    return (
        <div className="cont-form-donacion">
            <h3 className="titulo-donacion">{nombre}</h3>
            <div className="cont-form-donacion">
                <form>
                    <>

                        <ContInput label="Monto" icono={"ico-usuario"}>
                            <input
                                value={apadrinamiento.monto_apadrinamiento}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="monto_apadrinamiento"
                                placeholder="$10"
                            />
                            {!formValidado.monto_apadrinamiento[0] && (
                                <div className="ico-advertencia  format-ico-form-validacion"></div>
                            )}
                        </ContInput>
                        {!formValidado.monto_apadrinamiento[0] && (
                            <p className="texto-validacion">{formValidado.monto_apadrinamiento[1]}</p>
                        )}
                    </>

                    <div className="form-donacion-acciones" style={{ width: "max-content", alignSelf: "center" }}>

                        <Button icono="pi pi-check" label={"Aceptar"} onClick={guardarApadrinamiento} aceptar={true} />

                        <Button icono="pi pi-ban" label={"Cancelar"} onClick={cerrar} cancelar={true} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormApadrinamiento;
