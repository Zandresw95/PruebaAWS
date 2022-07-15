import "./Usuario.css";

function Usuario({ datos, abrirForm }) {
  return (
    <div
      className="cont-card cont-usuario animar-hover"
      onClick={() => abrirForm(datos.codai_usuario)}
    >
      {/* <p className="usuario-inicial">{datos.nombre[0].toUpperCase()}</p> */}
      <div className="cont-ico-usuario">
        <div className="ico-usuario format-ico-usuario-card"></div>
      </div>
      <div className="usuario-textos">
        <div className="usuario-estado">
            <p>{"hola"}</p>
            <div
                className={
                    "cont-circulo-estado " +
                    (datos.estado_usuario === true ? "color-estado-verde" : "color-estado-rojo")
                }
                >
            </div>
        </div>
        <p>{"hola2"}</p>
      </div>
    </div>
  );
}

export default Usuario;
