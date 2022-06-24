import "./Opcion.css";

function Opcion({ datos, abrirForm }) {
  return (
    <div
      className="cont-card cont-opcion animar-hover"
      onClick={() => abrirForm(datos.codai_opcion)}
    >
      {/* <p className="usuario-inicial">{datos.nombre[0].toUpperCase()}</p> */}
      <div className="cont-ico-opcion">
        <div className="ico-opcion format-ico-opcion-card"></div>
      </div>
      <div className="opcion-textos">
        <div className="opcion-estado">
            <p>{datos.descripcion_opcion}</p>
            <div
                className={
                    "cont-circulo-estado " +
                    (datos.estado_opcion === true ? "color-estado-verde" : "color-estado-rojo")
                }
                >
            </div>
        </div>
        <p>{datos.id_opcion}</p>
      </div>
      
    </div>
  );
}

export default Opcion;
