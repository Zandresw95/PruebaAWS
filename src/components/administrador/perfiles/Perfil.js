import "./Perfil.css";
import Estado from "../../generic/Estado";

function Perfil({ datos, abrirForm }) {
  return (
    <div
      className="cont-perfil animar-hover animar-entrada"
      onClick={() => abrirForm(datos.codai_perfil)}
    >
      {/* <p className="usuario-inicial">{datos.nombre[0].toUpperCase()}</p> */}
      <div
        className={
          "cont-ico-usuario-card-config "+ ("borde-opcion-" + 4)
        }
      >
        <div className="ico-perfil format-ico-perfil-config"></div>
      </div>
      <div className="perfil-textos">
      <p>{datos.descripcion_perfil}</p>
        <p>{datos.id_perfil}</p>
        <div className="perfil-cont-estado">
          <Estado estado={datos.estado_perfil} />
        </div>
      </div>
    </div>
  );
}

export default Perfil;
