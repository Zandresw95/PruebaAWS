import "./Maquina.css";



function Maquina({ data }) {

  const redondear = (num) => {
    return +(Math.round(num + "e+2")  + "e-2");
  }

  return (
    <div className="cont-card animar-hover area-maquina2">
      <div className="area-maquina">
        <p>Nombre: {data.nombre_maquina}</p>
        <div
                className={
                  "cont-circulo-estado " +
                  (parseInt(data.estado_actual) === 1 ? "color-estado-verde" : "color-estado-rojo")
                }
              >

              </div>
      </div>
      <p>Turno: {data.turno}</p>
      <p>Tiempo paro acumulado: {data.tiempo_paro_acumulado}</p>
      <p>Tiempo encendido acumulado: {data.tiempo_encendido_acumulado}</p>
      <p>Eficiencia: {redondear(parseFloat(data.eficiencia)*100)} %</p>
      
    </div>
  );
}

export default Maquina;
