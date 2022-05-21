import Button from "../generic/Button";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import "./Detalle.css";
import Tabs from "../generic/Tabs";
import { useState, useEffect } from "react";
import $ from "jquery";
import { host, port } from "../../helpers/Dbdata";

let timeframes = {
  m3: 0,
  m: 1,
  s: 2,
  h8: 3,
};

function Detalle({ salir, cuarto }) {
  const [timeFrameTabs, setTimeFrameTabs] = useState(timeframes.h8);
  const [datosHumedad, setDatosHumedad] = useState([]);
  const [datosTemperatura, setDatosTemperatura] = useState([]);
  useEffect(() => {
    obtenerDatos();
  }, [timeFrameTabs]);

  const obtenerDatos = () => {
    let fechaAnterior = obtenerFechaAnterior();
    console.log(fechaAnterior);
    let fechaActual = Math.trunc(new Date().getTime() / 1000).toString();
    console.log(fechaActual);

    $.ajax({
      url: `http://${host}:${port}/api/hostname_PROMEDIOHU_data/graficas`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        fechafin: fechaActual,
        fechainicio: fechaAnterior,
        // fechafin: "1632503061",
        // fechainicio: "1632501000",
        cantidad: 50,
        columna: cuarto[1],
        sistema: "temp",
      }),
      beforeSend: function () {
        // setMostrarCargando(true);
      },
      success: function (data) {
        console.log(data);
        setDatosTemperatura(data);
        // setMostrarCargando(false);
        // if ("cedula" in data) {
        //   setUserData(data);
        // } else {
        //   mostrarPopup(2, data);
        // }
      },
      error: function (data) {
        // setMostrarCargando(false);
        console.log(data.responseJSON.data);
        let mensaje = data.responseJSON.data;
        // if (data.status === 0)
        // mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        // else mostrarPopup(2, mensaje);
      },
    });
    $.ajax({
      url: `http://${host}:${port}/api/hostname_PROMEDIOHU_data/graficas`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        fechafin: fechaActual,
        fechainicio: fechaAnterior,
        // fechafin: "1632503061",
        // fechainicio: "1632501000",
        cantidad: 50,
        columna: cuarto[1],
        sistema: "hum",
      }),
      beforeSend: function () {
        // setMostrarCargando(true);
      },
      success: function (data) {
        console.log(data);
        setDatosHumedad(data);
        // setMostrarCargando(false);
        // if ("cedula" in data) {
        //   setUserData(data);
        // } else {
        //   mostrarPopup(2, data);
        // }
      },
      error: function (data) {
        // setMostrarCargando(false);
        console.log(data.responseJSON.data);
        let mensaje = data.responseJSON.data;
        // if (data.status === 0)
        // mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        // else mostrarPopup(2, mensaje);
      },
    });
  };

  const obtenerFechaAnterior = () => {
    let fecha = new Date();
    switch (timeFrameTabs) {
      case timeframes.h8:
        fecha = new Date().setHours(new Date().getHours() - 8);
        break;
      case timeframes.s:
        fecha = new Date().setDate(new Date().getDate() - 7);
        break;
      case timeframes.m:
        fecha = new Date().setMonth(new Date().getMonth() - 1);
        break;
      case timeframes.m3:
        fecha = new Date().setMonth(new Date().getMonth() - 3);
        break;
      default:
        fecha = new Date().setHours(new Date().getHours() - 8);
        break;
    }
    return Math.trunc(fecha / 1000);
  };

  const colorAleatorio = () => {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return "rgb(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ")";
  };

  return (
    <div className="cont-detalle">
      <div className="barra-acciones-top">
        <Button label={"Atrás"} icono={"ico-atras"} onClick={salir} />
        {/* <Button onClick={mostrar} /> */}
        <Tabs
          lista={["M3", "M", "S", "H8"]}
          selected={timeFrameTabs}
          setSelected={setTimeFrameTabs}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
        }}
      >
        <div className="detalle-chart">
          <Line
            data={{
              labels: datosTemperatura.map((el) => {
                if (timeFrameTabs === timeframes.h8) {
                  return new Date(parseInt(el["time@timestamp"] * 1000))
                    .toISOString()
                    .substring(11, 16);
                } else {
                  return new Date(parseInt(el["time@timestamp"] * 1000))
                    .toISOString()
                    .substring(0, 10);
                }
              }),
              datasets: [
                {
                  label: "Temperatura",
                  yAxisID: "axisTemperatura",
                  data: datosTemperatura.map((el) => {
                    return el[cuarto[1]];
                  }),
                  borderColor: `rgb(100,220,100)`,
                  tension: 0.4,
                },
              ],
            }}
            //   height={400}
            //   width={400}
            options={{
              scales: {
                axisTemperatura: {
                  type: "linear",
                  position: "left",
                  suggestedMax: 23,
                  suggestedMin: 18,
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div>
          <Line
            data={{
              labels: datosHumedad.map((el) => {
                if (timeFrameTabs === timeframes.h8) {
                  return new Date(parseInt(el["time@timestamp"] * 1000))
                    .toISOString()
                    .substring(11, 16);
                } else {
                  return new Date(parseInt(el["time@timestamp"] * 1000))
                    .toISOString()
                    .substring(0, 10);
                }
              }),
              datasets: [
                {
                  label: "Humedad",
                  yAxisID: "axisHumedad",
                  data: datosHumedad.map((el) => {
                    return el[cuarto[1]] * 1.1;
                  }),
                  borderColor: datosHumedad.map(() => {
                    return `rgb(100,200,250)`;
                  }),
                  tension: 0.4,
                },
              ],
            }}
            //   height={400}
            //   width={400}
            options={{
              scales: {
                axisHumedad: {
                  type: "linear",
                  position: "right",
                  suggestedMax: 75,
                  suggestedMin: 40,
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Detalle;
