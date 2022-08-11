import "./CentroAlm.css";

function CentroAlm({ datos, abrirForm }) {
  return (
    <div
      className="cont-centro animar-hover animar-entrada"
      onClick={() => abrirForm(datos.codai_centro_almacenamiento)}
    >
      {/* <p className="usuario-inicial">{datos.nombre[0].toUpperCase()}</p> */}
      <div
        className={
          "cont-ico-usuario-card-config "+ ("borde-centro-" + 3)
        }
      >
        <div className="pi pi-home text-3xl w-10 format-ico-donacion-config"></div>
      </div>
      <div className="centro-textos">
        <p>{datos.nombre_centro_almacenamiento}</p>
        <p>{datos.horario_centro_almacenamiento}</p>
      </div>
    </div>
  );
}

export default CentroAlm;
