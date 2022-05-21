import "./Usuario.css";

function Usuario({ datos, abrirForm }) {
  return (
    <div
      className="cont-card cont-usuario animar-hover"
      onClick={() => abrirForm(datos.id_persona)}
    >
      {/* <p className="usuario-inicial">{datos.nombre[0].toUpperCase()}</p> */}
      <div className="cont-ico-usuario">
        <div className="ico-usuario format-ico-usuario-card"></div>
      </div>
      <div className="usuario-textos">
        <p>{datos.nombre_persona} {datos.apellido_persona}</p>
        <p>{datos.edad_persona}</p>
        <p>{datos.cedula_persona}</p>
      </div>
    </div>
  );
}

export default Usuario;
