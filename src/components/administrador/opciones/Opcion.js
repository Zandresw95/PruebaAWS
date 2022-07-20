import "./Opcion.css";
import Estado from "../../generic/Estado";

function Opcion({ datos, abrirForm }) {
  return (
    <div
      className="cont-opcion animar-hover animar-entrada"
      onClick={() => abrirForm(datos.codai_opcion)}
    >
      {/* <p className="usuario-inicial">{datos.nombre[0].toUpperCase()}</p> */}
      <div
        className={
          "cont-ico-usuario-card-config "+ ("borde-opcion-" + 3)
        }
      >
        <div className="ico-configuracion format-ico-opcion-config"></div>
      </div>
      <div className="opcion-textos">
        <p>{datos.descripcion_opcion}</p>
        <p>{datos.id_opcion}</p>
        <div className="opcion-cont-estado">
          <Estado estado={datos.estado_opcion} />
        </div>
      </div>
    </div>
  );
}

export default Opcion;
