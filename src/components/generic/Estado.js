import { useMemo } from "react";
import "./Estado.css";

function Estado({ estado }) {
  const colorEstado = useMemo(() => {
    switch (estado) {
      case false:
        return "color-estado-rojo";
      case true:
        return "color-estado-verde";
      default:
        return "color-estado-default";
    }
  }, [estado]);

  const textEstado = useMemo(() => {
    return estado === true ? "Activo" : "Inactivo";
  }, [estado]);

  return (
    <div className="cont-status">
      <div className={"cont-circulo-status " + colorEstado}></div>
      <p className={"status-label"}>{textEstado}</p>
    </div>
  );
}

export default Estado;
