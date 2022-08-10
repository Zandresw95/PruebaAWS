import Button from "../generic/Button";
import ContInput from "../generic/ContInput";
import $ from "jquery";
import { dominio } from "../../helpers/Dbdata";
import { Validar } from "../../helpers/Validar";
import { useContext, useEffect, useState } from "react";
import './FormDonacionMonetaria.css'

import PopupContext from "../../context/PopupContext";
import ConfirmContext from "../../context/ConfirmContext";

let initialDonacionF = {
    id_centro_almacenamiento: "",
    id_fundacion: "",
    id_persona: "",
    observacion_donacion: "",
    descripcion_donacion: "",
    estado_donacion: 1,
    tipo_donacion: "Física"
  };
  
  let initialFormValidado = {
    id_centro_almacenamiento: [false, ""],
    observacion_donacion: [true, ""],
    descripcion_donacion: [false, ""]
  };

const FormDonacionFisica = ({ id_fundacion, cerrar, nombre }) => {
    const [mounted, setMounted] = useState(true);
    const [mostrarCargando, setMostrarCargando] = useState(false);
    const [disponible, setDisponible] = useState(false);
    const [donacion, setDonacion] = useState(initialDonacionF);
    const [formValidado, setFormValidado] = useState(initialFormValidado);    
    const [opcionesCentros, setOpcionesCentros] = useState([]);
    const [centrosAlm, setCentrosAlm] = useState([]);

    const { mostrarPopup } = useContext(PopupContext);
    const { mostrarConfirm } = useContext(ConfirmContext);

    const handleChange = (e) => {
        setDonacion({ ...donacion, [e.target.name]: e.target.value });
        actualizarValidacion(e);
    };

    const handleBlur = (e) => {
        setDonacion({ ...donacion, [e.target.name]: e.target.value.trim() });
    };

    const actualizarValidacion = (e) => {
        let tempCampo = {};
        switch (e.target.name) {
          case "id_centro_almacenamiento":
            tempCampo = {
              [e.target.name]: Validar.general(e.target.value),
            };
            break;
          case "descripcion_donacion":
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
        obtenerCentros();
        return () => setMounted(false);
    }, [id_fundacion])

    useEffect(() => {
        if (id_fundacion != 0){
            setFormValidado(initialFormValidado);
            setDonacion(initialDonacionF);
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

    const guardarDonacion = () => {
        if (validarForm()) {
          crearDonacion();
        } else {
          mostrarPopup(2, "Llena todos los datos");
        }
    };

    const crearDonacion = async () => {
        if(await mostrarConfirm("¿Seguro de generar la donación?. Te comprometes a entregarla en el centro de almacenamiento escogido")){
            donacion.id_fundacion = id_fundacion;
            donacion.id_persona = localStorage.getItem("idpersona");
            $.ajax({
            url: `${dominio}/api/tabla_donaciones/agregar`,
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ ...donacion }),
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
            
    };

    const obtenerCentros = () => {
        $.ajax({
          url: `${dominio}/api/tabla_centro_almacenamiento/fundacion/${id_fundacion}`,
          type: "get",
          dataType: "json",
          contentType: "application/json",
          beforeSend: function () {
            setMostrarCargando(true);
          },
          success: function (data) {
            if (mounted) {
              setMostrarCargando(false);
              setCentrosAlm(data.data);
              setOpcionesCentros(
                data.data.map((el) => {
                  return { label: el['nombre_centro_almacenamiento'], value: el['id_centro_almacenamiento'] };
                })
              );
              if(data.data.length > 0) setDisponible(true);
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

    return (
        <div className="cont-form-donacion">
            <h3 className="titulo-donacion">{nombre}</h3>
            <div className="cont-form-donacion">
                <form>
                    {disponible ? 
                    <>
                        <ContInput label="Centro Almacenamiento" icono={"ico-usuario"}>
                            <select
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="id_centro_almacenamiento"
                                value={donacion.id_centro_almacenamiento}
                            >
                                {donacion.id_centro_almacenamiento === "" && <option disabled value={""} />}
                                {opcionesCentros.length > 0 ?
                                    opcionesCentros.map((el, i) => {
                                        return (
                                            <option key={"id_centro "+i} value={el.value}>
                                                {el.label}
                                            </option>
                                        );
                                    }) :
                                    <option disabled value={"No existen centros"} >No existen centros de almacenamiento</option>
                                }
                            </select>
                            {!formValidado.id_centro_almacenamiento[0] && (
                                <div className="ico-advertencia format-ico-form-validacion"></div>
                            )}
                        </ContInput>
                        {!formValidado.id_centro_almacenamiento[0] && (
                          <p className="texto-validacion">{formValidado.id_centro_almacenamiento[1]}</p>
                        )}
                        <div className="cont-input">
                            <p className="etiqueta-textarea">Datos Centro de Almacenamiento</p>
                            <textarea 
                                disabled={true}
                                name="datos_centro"
                                id="datos_centro"
                                value={
                                    centrosAlm.map((el, i) => {
                                        if(el.id_centro_almacenamiento === donacion.id_centro_almacenamiento){
                                            return(
                                                `Nombre: ${el.nombre_centro_almacenamiento}\nDirección: ${el.direccion_centro_almacenamiento}\nHorario de atención: ${el.horario_centro_almacenamiento}`
                                            );
                                        }
                                    })
                                }
                            >
                            </textarea>
                        </div>
                        <ContInput label="Descripción Donación" icono={"ico-usuario"}>
                            <input
                                value={donacion.descripcion_donacion}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="descripcion_donacion"
                                placeholder="1qq Avena"
                            />
                            {!formValidado.descripcion_donacion[0] && (
                                <div className="ico-advertencia  format-ico-form-validacion"></div>
                            )}
                        </ContInput>
                        {!formValidado.descripcion_donacion[0] && (
                        <p className="texto-validacion">{formValidado.descripcion_donacion[1]}</p>
                        )}
                        <ContInput label="Observación Donación" icono={"ico-usuario"}>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="observacion_donacion"
                                id="observacion_donacion"
                                value={donacion.observacion_donacion}
                            />
                            {!formValidado.observacion_donacion[0] && (
                                <div className="ico-advertencia  format-ico-form-validacion"></div>
                            )}
                        </ContInput>
                        {!formValidado.observacion_donacion[0] && (
                        <p className="texto-validacion">{formValidado.observacion_donacion[1]}</p>
                        )}
                    </>
                    : 
                    <div className="cont-input">
                        <p className="etiqueta-textarea">La fundación no posee centros de almacenamiento donde recibir tu donación, lo sentimos intenta hacer una donación monetaria.</p>
                    </div>
                    }
                    <div className="form-donacion-acciones" style={{ width: "max-content", alignSelf: "center" }}>
                        {disponible &&
                            <Button icono="pi pi-check" label={"Aceptar"} onClick={guardarDonacion} aceptar={true}/>
                        }
                        <Button icono="pi pi-ban" label={"Cancelar"} onClick={cerrar} cancelar={true}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormDonacionFisica;