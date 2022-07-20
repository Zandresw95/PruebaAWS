import "./Usuario.css";
import Estado from "../../generic/Estado";

function Usuario({ datos, abrirForm }) {
  return (
    <div
      className="cont-usuario animar-hover animar-entrada"
      onClick={() => abrirForm(datos.codai_usuario)}
    >
      {/* <p className="usuario-inicial">{datos.nombre[0].toUpperCase()}</p> */}
      <div
        className={
          "cont-ico-usuario-card-config " + ("borde-usuario-" + 2)
        }
      >
        <div className="ico-usuario format-ico-usuario-config"></div>
      </div>
      <div className="usuario-textos">
        <p>{datos.login_usuario}</p>
        <p>{datos.id_usuario}</p>
        <div className="usuario-cont-estado">
          <Estado estado={datos.estado_usuario} />
        </div>
      </div>
    </div>
  );
}

export default Usuario;
