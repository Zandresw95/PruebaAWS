import Button from "../generic/Button";
import ContInput from "../generic/ContInput";
import $ from "jquery";
import { dominio } from "../../helpers/Dbdata";
import { Validar } from "../../helpers/Validar";
import { useContext, useEffect, useState } from "react";
import './FormDonacionMonetaria.css'

import PopupContext from "../../context/PopupContext";
import ConfirmContext from "../../context/ConfirmContext";

let initialDonacionM = {
    id_cuenta: "",
    id_fundacion: "",
    id_persona: localStorage.getItem("idpersona"),
    observacion_donacion: "",
    descripcion_donacion: "",
    estado_donacion: 0,
    tipo_donacion: "Monetaria"
  };
  
  let initialFormValidado = {
    id_cuenta: [false, ""],
    observacion_donacion: [false, ""],
    descripcion_donacion: [false, ""]
  };

const FormDonacionMonetaria = ({ id_fundacion, cerrar, nombre }) => {
    const [mounted, setMounted] = useState(true);
    const [mostrarCargando, setMostrarCargando] = useState(false);
    const [disponible, setDisponible] = useState(false);
    const [donacion, setDonacion] = useState(initialDonacionM);
    const [formValidado, setFormValidado] = useState(initialFormValidado);    
    const [opcionesCuentas, setOpcionesCuentas] = useState([]);
    const [cuentas, setCuentas] = useState([]);

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
          case "id_cuenta":
            tempCampo = {
              [e.target.name]: Validar.general(e.target.value),
            };
            break;
          case "descripcion_donacion":
              tempCampo = {
                [e.target.name]: Validar.numeros(e.target.value),
              };
            break;
          case "observacion_donacion":
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
        obtenerCuentas();
        return () => setMounted(false);
    }, [id_fundacion])

    useEffect(() => {
        if (id_fundacion != 0){
            setFormValidado(initialFormValidado);
            setDonacion(initialDonacionM);
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

    const subirArchivo = (id_donacion) => {
        const formData = new FormData();
        console.log(document.querySelector('#observacion_donacion').files[0]);
        formData.append('bucket', "donaciones");
        formData.append('file', document.querySelector('#observacion_donacion').files[0]);
        $.ajax({
            url: `${dominio}/api/tabla_donaciones/subirImagen/${id_donacion}`,
            type: "post",
            contentType: false,
            cache: false,
            processData:false,
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

    const crearDonacion = async () => {
        if(await mostrarConfirm("Seguro de generar la donación")){
            donacion.id_fundacion = id_fundacion;
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
                subirArchivo(data.id_donacion);
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

    const obtenerCuentas = () => {
        $.ajax({
          url: `${dominio}/api/tabla_cuenta_bancaria/fundacion/${id_fundacion}`,
          type: "get",
          dataType: "json",
          contentType: "application/json",
          beforeSend: function () {
            setMostrarCargando(true);
          },
          success: function (data) {
            if (mounted) {
              setMostrarCargando(false);
              setCuentas(data.data);
              setOpcionesCuentas(
                data.data.map((el) => {
                  return { label: el['banco_cuenta']+"-"+el['numero_cuenta'], value: el['id_cuenta'] };
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
                        <ContInput label="Cuentas" icono={"ico-usuario"}>
                            <select
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="id_cuenta"
                                value={donacion.id_cuenta}
                            >
                                {donacion.id_cuenta === "" && <option disabled value={""} />}
                                {opcionesCuentas.length > 0 ?
                                    opcionesCuentas.map((el, i) => {
                                        return (
                                            <option key={"id_cuenta "+i} value={el.value}>
                                                {el.label}
                                            </option>
                                        );
                                    }) :
                                    <option disabled value={"No existen cuentas"} >No existen cuentas</option>
                                }
                            </select>
                            {!formValidado.id_cuenta[0] && (
                                <div className="ico-advertencia format-ico-form-validacion"></div>
                            )}
                        </ContInput>
                        {!formValidado.id_cuenta[0] && (
                          <p className="texto-validacion">{formValidado.id_cuenta[1]}</p>
                        )}
                        <div className="cont-input">
                            <p className="etiqueta-textarea">Datos Cuenta Bancaria</p>
                            <textarea 
                                disabled={true}
                                name="datos_cuenta"
                                id="datos_cuenta"
                                value={
                                  cuentas.map((el, i) => {
                                      if(el.id_cuenta === donacion.id_cuenta){
                                          return(
                                            `Banco: ${el.banco_cuenta}\nTipo de Cuenta: ${el.tipo_cuenta}\nNúmero de cuenta: ${el.numero_cuenta}\nCédula o RUC Beneficiario: ${el.cedula_cuenta}\nNombres Beneficiario: ${el.nombre_cuenta}\nApellidos Beneficiario: ${el.apellido_cuenta}\nCorreo Beneficiario: ${el.correo_cuenta}`
                                          );
                                      }
                                  })
                                }
                            >
                            </textarea>
                        </div>
                        <ContInput label="Monto" icono={"ico-usuario"}>
                            <input
                                value={donacion.descripcion_donacion}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="descripcion_donacion"
                                placeholder="$10"
                            />
                            {!formValidado.descripcion_donacion[0] && (
                                <div className="ico-advertencia  format-ico-form-validacion"></div>
                            )}
                        </ContInput>
                        {!formValidado.descripcion_donacion[0] && (
                        <p className="texto-validacion">{formValidado.descripcion_donacion[1]}</p>
                        )}
                        <ContInput label="Comprobante" icono={"ico-usuario"}>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="observacion_donacion"
                                id="observacion_donacion"
                                type="file"
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
                        <p className="etiqueta-textarea">La fundación no posee cuentas bancarias, lo sentimos intenta hacer una donación física.</p>
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

export default FormDonacionMonetaria;
