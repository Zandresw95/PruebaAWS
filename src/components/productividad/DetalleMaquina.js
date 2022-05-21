import Button from "../generic/Button";
import $ from "jquery";
import { host, port } from "../../helpers/Dbdata";
import { useEffect, useState, useContext } from "react";
import PopupContext from "../../context/PopupContext";
import VerticalPB from "../generic/VerticalPB";
import "./Maquina";
import "./DetalleMaquina.css"

function DetalleMaquina({ salir, maquina }) {
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const [datosMaquina, setDatosMaquina] = useState([]);

  
  const { mostrarPopup } = useContext(PopupContext);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = () => {
    $.ajax({
      url: `http://${host}:${port}/api/tabla_maquinas/detalles/${maquina.id_maquina}`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({}),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        setMostrarCargando(false);
        console.log(data.data);
        setDatosMaquina(data.data);  
      },
      error: function (data) {
        setMostrarCargando(false);
        let mensaje = data.responseJSON.data;
        console.log(mensaje);
        mostrarPopup(2, mensaje);
      },
    });
  };

  const redondear = (num) => {
    return +(Math.round(num + "e+2")  + "e-2");
  }

  return (
    <div>
      <div className="barra-acciones-top">
        <Button label={"Atrás"} icono={"ico-atras"} onClick={salir} />
        {/* <Button onClick={mostrar} /> */}
      </div>
         { mostrarCargando ? (
            <div className="cont-loader-full-container">
              <div className="loader format-ico-loader"></div>
            </div>
          ) : (
          datosMaquina.map((el, i) => {
              return(
                <div className="cont-pr animar-zoom" key={"maq"+i}>
                  <div className="cont-card cont-resumen-pr animar-hover" key={"maquina"+i}>
                    <div className="titulo" 
                      style={{borderBottom: "1px dotted lightgray", paddingBottom: "10px" }}
                    >
                      <p
                        className="resumen-titulo"
                        style={{
                          textAlign: "center",
                          color: "rgb(0,0,0)",
                          fontSize: "0.9rem",
                          fontWeight: "bold"
                        }}
                      >
                        {el.nombre_maquina.toUpperCase()}
                      </p>
                      <span className={
                          "cont-circulo-estado " +
                          (parseInt(el.estado_actual) === 1 ? "color-estado-verde" : "color-estado-rojo")
                        }>
                      </span>
                    </div>
                    <div className="resumen-cont-magnitud-pr">
                      <div>
                        <div className="resumen-titulo-mangitud">
                            <p
                              style={{
                                color: "rgb(120,120,120)",
                              }}
                            >
                              {" "}
                              Resumen
                            </p>
                        </div>
                      

                        <div className="resumen-cont-grafico">
                            <VerticalPB
                              valor={redondear(parseFloat(el.eficiencia*100))}
                              color={"azul"}
                              unidad={"% Eficiencia"}
                            />
                        </div>

                        <div className="resumen-cont-valores">
                          <div>
                            <p>Turno</p>
                            <p>{el.turno}</p>
                          </div>
                          <div>
                            <p>Id producto</p>
                            <p>{el.id_producto}</p>
                          </div>
                          <div>
                            <p>Nombre Producto</p>
                            <p>{el.nombre_producto}</p>
                          </div>
                          <div>
                            <p>Meta (kg)</p>
                            <p>{el.meta_kg}</p>
                          </div>
                          <div>
                            <p>Meta (unidades)</p>
                            <p>{redondear(el.meta_unidades)}</p>
                          </div>
                          <div>
                            <p>Producción (kg)</p>
                            <p>{redondear(el.produccion_kg)}</p>
                          </div>
                          <div>
                            <p>Producción (unidades)</p>
                            <p>{redondear(el.produccion_unidades)}</p>
                          </div>
                          <div>
                            <p>Tiempo paros acumulado</p>
                            <p>{el.tiempo_paro_acumulado}</p>
                          </div>
                          <div>
                            <p>Tiempo prendido acumulado</p>
                            <p>{el.tiempo_estado_actual}</p>
                          </div>
                          <div>
                            <p>Número de paros:</p>
                            <p>{el.numero_paros}</p>
                          </div>
                        </div>
                      </div>  
                    </div> 
                  </div>
                </div>
              );
          }))
        }
        </div>
  );
}

export default DetalleMaquina;
