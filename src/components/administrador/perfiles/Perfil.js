import "./Perfil.css";

function Perfil({ datos, abrirForm }) {
  return (
    <div
      className="cont-card cont-perfil animar-hover"
      onClick={() => abrirForm(datos.codai_opcion)}
    >
      {/* <p className="usuario-inicial">{datos.nombre[0].toUpperCase()}</p> */}
      <div className="cont-ico-perfil">
        <div className="ico-perfil format-ico-perfil-card"></div>
      </div>
      <div className="perfil-textos">
        <div className="perfil-estado">
          <p>{datos.descripcion_perfil}</p>
          <div
            className={
              "cont-circulo-perfil " +
              (datos.estado_perfil === true
                ? "color-estado-verde"
                : "color-estado-rojo")
            }
          ></div>
        </div>
        <p>{datos.id_perfil}</p>
      </div>
    </div>
  );
}

export default Perfil;
