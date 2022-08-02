import "./CardDonacionFund.css";

function CardDonacionFund({ datos, tipo }) {
  return (
    <div
      className="cont-donacion animar-hover animar-entrada"
    >
      {/* <p className="usuario-inicial">{datos.nombre[0].toUpperCase()}</p> */}
      <div
        className={ datos.tipo_donacion === "Monetaria" ?
          "cont-ico-usuario-card-config "+ ("borde-donacion-" + 3) : "cont-ico-usuario-card-config "+ ("borde-donacion-" + 4)
        }
      >
        {
            datos.tipo_donacion === "Monetaria" ? (<div className="ico-configuracion format-ico-donacion-config"></div>) : (<div className="ico-casa format-ico-donacion-config"></div>)
        }
        
      </div>
      <div className="donacion-textos">
        <p>{datos.tipo_donacion === "Monetaria" ? "$ "+datos.descripcion_donacion: datos.descripcion_donacion}</p>
        <p>{datos.tipo_donacion}</p>
        <p>{datos.fecha_donacion}</p>
      </div>
    </div>
  );
}

export default CardDonacionFund;
