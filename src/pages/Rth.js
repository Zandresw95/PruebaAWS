import { useContext, useEffect, useState } from "react";
import Detalle from "../components/rth/Detalle";
import Resumenes from "../components/rth/Resumenes";

import PantallaActivaContext from "../context/PantallaActivaContext";

import "./Rth.css";

let initialCuartoActivo = [0, ""];

function Rth() {
  const { setPantallaActiva } = useContext(PantallaActivaContext);
  const [pantallaActivaRTH, setPantallaActivaRTH] = useState(0);
  const [cuartoActivo, setCuartoActivo] = useState(initialCuartoActivo);
  useEffect(() => {
    setPantallaActiva(2);
  }, []);

  const mostrarDetalle = () => {
    setPantallaActivaRTH(1);
  };

  const mostrarResumenes = () => {
    setPantallaActivaRTH(0);
  };

  const renderSwitch = () => {
    switch (pantallaActivaRTH) {
      case 0:
        return (
          <Resumenes
            mostrarDetalle={mostrarDetalle}
            setCuartoActivo={setCuartoActivo}
          />
        );
      case 1:
        return <Detalle salir={mostrarResumenes} cuarto={cuartoActivo} />;
      default:
        break;
    }
  };

  return (
    <div className="cont-seccion animar-entrada" style={{ padding: 0 }}>
      {renderSwitch()}
    </div>
  );
}

export default Rth;
