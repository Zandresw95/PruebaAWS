import { useContext, useEffect } from "react";
import PantallaActivaContext from "../context/PantallaActivaContext";

function Inicio() {
  const { setPantallaActiva } = useContext(PantallaActivaContext);
  useEffect(() => {
    setPantallaActiva(0);
  }, []);
  return <div className="cont-seccion animar-entrada"></div>;
}

export default Inicio;
