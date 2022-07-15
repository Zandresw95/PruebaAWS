import "./Persona.css";

function Persona({ datos, abrirForm }) {
  return (
    <div
      className="cont-usuario animar-hover animar-entrada"
      onClick={() => abrirForm(datos.codai_persona)}
    >
      {/* <p className="usuario-inicial">{datos.nombre[0].toUpperCase()}</p> */}
      <div
        className={
          "cont-ico-usuario-card-config " + ("borde-usuario-" + 1)
        }
      >
        <div className="ico-usuario format-ico-usuario-config"></div>
      </div>
      <div className="usuario-textos">
        <p>{datos.nombre_persona.split(" ",1)} {datos.apellido_persona.split(" ",1)}</p>
        <p>{datos.cedula_persona}</p>
        <p>{datos.codai_persona}</p>
      </div>
    </div>
  );
}

export default Persona;
