import { useContext, useEffect, useState } from "react";
import Areas from "../components/productividad/Areas";
import DetalleMaquina from "../components/productividad/DetalleMaquina";
import PantallaActivaContext from "../context/PantallaActivaContext";

function Productividad() {
  const { setPantallaActiva } = useContext(PantallaActivaContext);

  useEffect(() => {
    setPantallaActiva(3);
  }, []);

  const [pantallaProductividad, setPantallaProductividad] = useState(0);
  const [area, setArea] = useState(0);
  const [maquina, setMaquina] = useState(0);

  const mostrarDetalleMaquina = () => {
    setPantallaProductividad(1);
  };

  const mostrarAreas = () => {
    setPantallaProductividad(0);
  };

  const renderSwitch = () => {
    switch (pantallaProductividad) {
      case 0:
        return <Areas mostrarDetalleMaquina={mostrarDetalleMaquina} setArea={setArea} setMaquina={setMaquina} />;
      case 1: 
        return <DetalleMaquina salir={mostrarAreas} maquina={maquina} />
      default:
        break;
    }
  };
  return (
    <div className="cont-seccion animar-entrada" style={{ overflowY: "auto" }}>
      {renderSwitch()}
    </div>
  );
}

export default Productividad;
