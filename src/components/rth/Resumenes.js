import Resumen from "./Resumen";

import "./Resumenes.css";
import $ from "jquery";
import { host, port } from "../../helpers/Dbdata";
import { useEffect, useState } from "react";

function Resumenes({ mostrarDetalle, setCuartoActivo }) {
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const [datosResumen, setDatosResumen] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const irA = (numCuarto) => {
    // alert(datosResumen[numCuarto].NombreCuarto);
    setCuartoActivo([numCuarto, datosResumen[numCuarto].NombreCuarto]);
    mostrarDetalle();
  };

  const obtenerDatos = () => {
    $.ajax({
      url: `http://${host}:${port}/api/hostname_PROMEDIOHU_data/resumenAll`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        // fechaActual: parseInt(new Date().getTime() / 1000),
        // columna: "data_format_19",
      }),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        console.log(data);
        setMostrarCargando(false);
        setDatosResumen(data);
        // if ("cedula" in data) {
        //   setUserData(data);
        // } else {
        //   mostrarPopup(2, data);
        // }
      },
      error: function (data) {
        setMostrarCargando(false);
        console.log(data.responseJSON.data);
        let mensaje = data.responseJSON.data;
        // if (data.status === 0)
        //   mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        // else mostrarPopup(2, mensaje);
      },
    });
  };
  return (
    <>
      {mostrarCargando ? (
        <div className="cont-loader-full-container">
          <div className="loader format-ico-loader"></div>
        </div>
      ) : (
        <div className="cont-rth animar-zoom">
          {datosResumen.map((el, i) => {
            console.log(el);
            return (
              <div key={"resumenRth" + i} onClick={() => irA(i)}>
                <Resumen data={el} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Resumenes;
