import Area from "./Area";
import "./Areas.css";
import $ from "jquery";
import { host, port } from "../../helpers/Dbdata";
import PopupContext from "../../context/PopupContext";
import { useEffect, useState, useContext } from "react";

function Areas({ mostrarDetalleMaquina, setArea, setMaquina }) {
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const [datosResumen, setDatosResumen] = useState([]);
  const { mostrarPopup } = useContext(PopupContext);

  useEffect(() => {
      obtenerDatos();
  }, []);

  const obtenerDatos = () => {
    $.ajax({
      url: `http://${host}:${port}/api/tabla_maquinas/areas`,
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
        mostrarPopup(2, mensaje);
      },
    });
  };

  return (
    <div className="cont-areas">
      { mostrarCargando ? (
          <div className="cont-loader-full-container" >
            <div className="loader format-ico-loader"></div>
          </div>
        ) : (  datosResumen.map((el, i) => {
         // if(el.estado_area === 1 ){ //mostrar solo areas con estado 1 activas
            return(
              <div key={"area" + i}>
                <Area data={el} mostrarDetalleMaquina={mostrarDetalleMaquina} setMaquina={setMaquina}  />
              </div>
            );
         // }
        }))
      }
    </div>
  );
}

export default Areas;
