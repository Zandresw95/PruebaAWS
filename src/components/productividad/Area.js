import "./Area.css";
import Maquina from "./Maquina";
import $ from "jquery";
import { host, port } from "../../helpers/Dbdata";
import { useEffect, useState } from "react";

function Area({ data, mostrarDetalleMaquina, setMaquina }) {
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const [datosResumen, setDatosResumen] = useState([]);


  useEffect(() => {
      obtenerDatos();
  }, []);

const irA = (maquina) => {
  setMaquina(maquina);
  mostrarDetalleMaquina();
};

const obtenerDatos = () => {
  $.ajax({
    url: `http://${host}:${port}/api/tabla_maquinas/area/${data.id_area}`,
    type: "get",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({}),
    beforeSend: function () {
      setMostrarCargando(true);
    },
    success: function (data) {
      setMostrarCargando(false);
      console.log(data.data);
      setDatosResumen(data.data);

    },
    error: function (data) {
      setMostrarCargando(false);
      let mensaje = data.responseJSON.data;
      console.log(mensaje);
    },
  });
};


  return (
    <div className="cont-card animar-hover cont-area">
      <h3>{data.nombre_area}</h3>
      <div className="area-maquinas animar-zoom">
        { mostrarCargando ? (
          <div className="cont-loader-container" style={{textAlign: "center"}}>
            <div className="loader format-ico-loader"></div>
          </div>
        ) : (  datosResumen.map((el, i) => {
          // console.log(el);
            return (
            <div key={"maquina" + i} onClick={() => irA(el)}>
                <Maquina data={el} />
            </div>
            );
        }))}
      </div>
    </div>
  );
}

export default Area;
