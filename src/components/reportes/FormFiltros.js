import Button from "../generic/Button";
import ContInput from "../generic/ContInput";
import $ from "jquery";
import { useContext, useEffect, useState, useRef } from "react";
import { host, port } from "../../helpers/Dbdata";
import { Validar } from "../../helpers/Validar";

import "./FormFiltros.css";
import PopupContext from "../../context/PopupContext";
import DownloadReporte from "../reportes/DownloadReporte"
import Download_RTH_Pesos from "./Download_RTH_Pesos"

let initialFiltro = {
  fechaDesde: "",
  fechaHasta: "",
  id_maquina: "",
  id_producto: "",
  id_usuario: "",
  id_cuarto: "",
  id_estacion: "",
};

let initialFormValidado = {
  fechaDesde: [true, ""],
  fechaHasta: [true, ""],
};

function FormFiltros({ cerrar, idForm }) {

  const downloadButton = useRef();
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const [filtro, setFiltro] = useState(initialFiltro);
  const [formValidado, setFormValidado] = useState(initialFormValidado);
  
  const [descargar, setDescargar] = useState(false);
  const [datosCSV, setDatosCSV] = useState([]);

  const { mostrarPopup } = useContext(PopupContext);

  /*useEffect(() => {
    setFormValidado(initialFormValidado);
  }, [filtro]);*/

  const handleChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
    actualizarValidacion(e);
  };

  const handleBlur = (e) => {
    actualizarValidacion(e);
  };

  const actualizarValidacion = (e) => {
    let tempCampo = {};
    switch (e.target.name) {
      case "fechaDesde":
        tempCampo = Validar.fechaDesde(e.target.value, filtro.fechaHasta);
        //  ["fechaDesde"]: Validar.fechaDesde(e.target.value, filtro.fechaHasta),
        
        break;
      case "fechaHasta":
        tempCampo = 
        //  ["fechaHasta"]: Validar.fechaDesde(filtro.fechaDesde, e.target.value),
         Validar.fechaDesde(filtro.fechaDesde, e.target.value);
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

  useEffect(() => {
    console.log(formValidado);
  }, [formValidado]);
  
  useEffect(() => {
    if (datosCSV.length > 0 && descargar) {
      downloadButton.current.click();
      setTimeout(() => {
        setDescargar(false);
        setDatosCSV([]);
      }, 1000);
    }
  }, [datosCSV, descargar]);

  const generarReporte = () => {
    if (validarForm()) {
      obtenerReporte();
    } else {
      mostrarPopup(2, "Llena todos los datos");
    }
  };

  const generarCSV = (data) => {
    if (data.length > 0) {
      setDatosCSV(data);
      setDescargar(true);
      mostrarPopup(1, "Descargando Archivo");
    } else {
      mostrarPopup(2, "No existen resultados");
    }
  };

  const obtenerReporte = () => {

    if(filtro.fechaDesde.length > 0 && filtro.fechaHasta.length > 0){
      const fechaD = new Date(filtro.fechaDesde+", 00:00:00");
      const fechaH = new Date(filtro.fechaHasta+", 23:59:59");
      filtro.fechaDesde = fechaD;
      filtro.fechaHasta = fechaH;
    }
    
    let uri = `http://${host}:${port}/api/reportes_confiteca_balanzas`;
    if(idForm === 2) uri = `http://${host}:${port}/api/reportes_confiteca_balanzas/fallas`;
    if(idForm === 3) uri = `http://${host}:${port}/api/reportes_confiteca_balanzas/rth`;
    if(idForm === 4) uri = `http://${host}:${port}/api/reportes_confiteca_balanzas/pesos`;

    $.ajax({
      url: uri,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...filtro }),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        console.log(data.data);
        setMostrarCargando(false);
        generarCSV(data.data);
        setFiltro(initialFiltro);
        cerrar();
      },
      error: function (data) {
        setMostrarCargando(false);
        console.log(data.responseJSON.data);
        let mensaje = data.responseJSON.data;
        if (data.status === 0)
          mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        else mostrarPopup(2, mensaje);
        setFiltro(initialFiltro);
      },
    });
  };


  return (
    <div className="cont-form-usuario">
      {mostrarCargando ? (
        <div className="cont-loader-full-container">
          <div className="loader format-ico-loader"></div>
        </div>
      ) : (
        <>
          <h3>Filtros para el reporte</h3>
          <form>
                <ContInput label="Fecha Desde" icono={"ico-fecha"}>
                    <input
                        type={"date"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="fechaDesde"
                       
                    />
                    {!formValidado.fechaDesde[0] && (
                      <div className="ico-advertencia  format-ico-form-validacion"></div>
                    )}
                </ContInput>
                {!formValidado.fechaDesde[0] && (
                  <p className="texto-validacion">{formValidado.fechaDesde[1]}</p>
                )}
                <ContInput label="Fecha Hasta" icono={"ico-fecha"}>
                    <input
                        type={"date"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="fechaHasta"
                       // disabled={habilitado}
                    />
                    {!formValidado.fechaHasta[0] && (
                      <div className="ico-advertencia  format-ico-form-validacion"></div>
                    )}
                </ContInput>
                {!formValidado.fechaHasta[0] && (
                  <p className="texto-validacion">{formValidado.fechaHasta[1]}</p>
                )}
               
                
                {idForm === 1 ? 
                (
                  <>
                  <ContInput label="Id Máquina" icono={"ico-machine"}>
                    <input
                        type={"number"}
                        min={"1"}
                        onChange={handleChange}
                        name="id_maquina"
                    />
                </ContInput>
                  
                  <ContInput label="Id Producto" icono={"ico-product"}>
                      <input
                          type={"text"}
                          onChange={handleChange}
                          name="id_producto"
                      />
                  </ContInput>
                  
                  <ContInput label="Id Usuario" icono={"ico-usuario"}>
                      <input
                          type={"text"}
                          onChange={handleChange}
                          name="id_usuario"
                      />
                  </ContInput>
                  
                  <DownloadReporte downloadButton={downloadButton} data={datosCSV} tipo={true} />
                  </>
                ):idForm === 2 ?(
                  <>
                  <ContInput label="Id Máquina" icono={"ico-machine"}>
                    <input
                        type={"number"}
                        min={"1"}
                        onChange={handleChange}
                        name="id_maquina"
                    />
                  </ContInput>

                  <ContInput label="Id Usuario" icono={"ico-usuario"}>
                      <input
                          type={"text"}
                          onChange={handleChange}
                          name="id_usuario"
                      />
                  </ContInput>
                  
                  <DownloadReporte downloadButton={downloadButton} data={datosCSV} tipo={false} />
                  </>
                ): idForm === 3 ?(
                <>
                  <ContInput label="Cuarto" icono={"ico-room"}>
                    <input
                        type = {"number"}
                        min = {"1"}
                        max = {"2"}
                        onChange={handleChange}
                        name ="id_cuarto"
                    />
                  </ContInput>
                  <Download_RTH_Pesos downloadButton={downloadButton} data={datosCSV} tipo={true} />
                </>
                ):(
                  <>                 
                  <ContInput label="Id Producto" icono={"ico-product"}>
                      <input
                          type={"text"}
                          onChange={handleChange}
                          name="id_producto"
                      />
                  </ContInput>
                  
                  <ContInput label="Id Estación" icono={"ico-ruc"}>
                    <input
                        type={"number"}
                        min={"1"}
                        onChange={handleChange}
                        name="id_estacion"
                    />
                  </ContInput>

                  <ContInput label="Id Usuario" icono={"ico-usuario"}>
                      <input
                          type={"text"}
                          onChange={handleChange}
                          name="id_usuario"
                      />
                  </ContInput>
                  
                  <Download_RTH_Pesos downloadButton={downloadButton} data={datosCSV} tipo={false} />
                  </>
                )
                }
                <Button type="submit" label={"Descargar Excel"} onClick = {generarReporte} />
          </form>
        </>
      )}
    </div>
  );
}

export default FormFiltros;
