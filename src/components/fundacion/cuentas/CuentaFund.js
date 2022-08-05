import "./CuentaFund.css";

function CuentaFund({ datos, abrirForm }) {
  return (
    <div
      className="cont-cuenta animar-hover animar-entrada"
      onClick={() => abrirForm(datos.codai_cuenta)}
    >
      {/* <p className="usuario-inicial">{datos.nombre[0].toUpperCase()}</p> */}
      <div
        className={
          "cont-ico-usuario-card-config "+ ("borde-cuenta-" + 3)
        }
      >
        <div className="ico-configuracion format-ico-cuenta-config"></div>
      </div>
      <div className="cuenta-textos">
        <p>{datos.banco_cuenta}</p>
        <p>{datos.tipo_cuenta}</p>
        <p>{datos.numero_cuenta}</p>
      </div>
    </div>
  );
}

export default CuentaFund;
