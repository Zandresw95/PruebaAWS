import VerticalPB from "../generic/VerticalPB";
import "./Resumen.css";

function Resumen({ data }) {
  return (
    <div className="cont-card cont-resumen-rth animar-hover">
      <div
        style={{ borderBottom: "1px dotted lightgray", paddingBottom: "10px" }}
      >
        <p
          className="resumen-titulo"
          style={{
            textAlign: "center",
            color: "rgb(0,0,0)",
            fontSize: "0.9rem",
          }}
        >
          {data.NombreCuarto.toUpperCase()}
        </p>
      </div>
      <div className="resumen-cont-magnitud">
        <div>
          <div className="resumen-titulo-mangitud">
            <div className="ico-termometro format-ico-resumen-magnitud"></div>
            <p
              style={{
                color: "rgb(120,120,120)",
              }}
            >
              {" "}
              Temperatura
            </p>
          </div>
          <div className="resumen-cont-grafico">
            <VerticalPB
              valor={parseFloat(parseFloat(data.temp.actual).toFixed(1))}
              min={15}
              max={25}
              unidad={data.temp.unidad}
              color={"verde"}
            />
          </div>
          <div className="resumen-cont-valores">
            <div>
              <p>Hora</p>
              <p>{parseFloat(data.temp.hora).toFixed(1)}</p>
            </div>
            <div>
              <p>Día</p>
              <p>{parseFloat(data.temp.dia).toFixed(1)}</p>
            </div>
            <div>
              <p>Semana</p>
              <p>{parseFloat(data.temp.semana).toFixed(1)}</p>
            </div>
            <div>
              <p>Mes</p>
              <p>{parseFloat(data.temp.mes).toFixed(1)}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="resumen-titulo-mangitud flex-direction-row-reverse">
            <div className="ico-humedad format-ico-resumen-magnitud"></div>
            <p
              style={{
                color: "rgb(120,120,120)",
                marginRight: "3px",
              }}
            >
              Humedad
            </p>
          </div>
          <div className="resumen-cont-valores">
            <div>
              <p>Hora</p>
              <p>{parseFloat(data.hum.hora).toFixed(1)}</p>
            </div>
            <div>
              <p>Día</p>
              <p>{parseFloat(data.hum.dia).toFixed(1)}</p>
            </div>
            <div>
              <p>Semana</p>
              <p>{parseFloat(data.hum.semana).toFixed(1)}</p>
            </div>
            <div>
              <p>Mes</p>
              <p>{parseFloat(data.hum.mes).toFixed(1)}</p>
            </div>
          </div>
          <div>
            <VerticalPB
              valor={parseFloat(parseFloat(data.hum.actual).toFixed(1))}
              // valor={41}
              // min={20}
              // max={90}
              unidad={data.hum.unidad}
              color={"azul"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resumen;
