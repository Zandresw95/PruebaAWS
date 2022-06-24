import "./Usuario.css";

function Usuario({ datos, abrirForm }) {
  return (
    <div
      className="cont-card cont-usuario animar-hover"
      onClick={() => abrirForm(datos.codai_persona)}
    >
      {/* <p className="usuario-inicial">{datos.nombre[0].toUpperCase()}</p> */}
      <div className="cont-ico-usuario">
        <div className="ico-usuario format-ico-usuario-card"></div>
      </div>
      <div className="usuario-textos">
        <p>{datos.nombre_persona} {datos.apellido_persona}</p>
        <p>{datos.fechanac_persona}</p>
        <p>{datos.direccion_persona}</p>
      </div>
    </div>
  );
}

export default Usuario;
