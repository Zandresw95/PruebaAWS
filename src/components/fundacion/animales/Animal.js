import "./Animal.css";

function Animal({ datos, abrirForm }) {
  return (
    <div
      className="cont-animal animar-hover animar-entrada"
      onClick={() => abrirForm(datos.codai_animal)}
    >
      {/* <p className="usuario-inicial">{datos.nombre[0].toUpperCase()}</p> */}
      <div
        className={
          "cont-ico-usuario-card-config "+ ("borde-animal-" + 3)
        }
      >
        <div className=""><img src={datos.foto_animal} height={"45px"} width={"90px"}></img></div>
      </div>
      <div className="animal-textos">
        <p>{datos.nombre_animal}</p>
        <p>Edad: {datos.edad_animal} meses</p>
      </div>
    </div>
  );
}

export default Animal;
