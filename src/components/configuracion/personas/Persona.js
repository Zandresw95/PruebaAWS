import "./Persona.css";

function Persona({ datos, abrirForm }) {
  return (
    <div
      className="cont-persona animar-hover animar-entrada"
      onClick={() => abrirForm(datos.codai_persona)}
    >
      {/* <p className="persona-inicial">{datos.nombre[0].toUpperCase()}</p> */}
      <div
        className={
          "cont-ico-persona-card-config " + ("borde-persona-" + 1)
        }
      >
        <div className="ico-persona format-ico-persona-config"></div>
      </div>
      <div className="persona-textos">
        <p>{datos.nombre_persona.split(" ",1)} {datos.apellido_persona.split(" ",1)}</p>
        <p>{datos.cedula_persona}</p>
      </div>
    </div>
  );
}

export default Persona;
