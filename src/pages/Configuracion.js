import { useReducer, useState } from "react";
import Inicio from "../components/configuracion/Inicio";
import Usuarios from "../components/configuracion/Usuarios";
import { useContext, useEffect } from "react";
import PantallaActivaContext from "../context/PantallaActivaContext";

let pantallas = {
  INICIO: "INICIO",
  USUARIOS: "USUARIOS",
};

function Configuracion() {
  const [pantallaActivaConfig, setPantallaActivaConfig] = useState(
    pantallas.INICIO
  );
  const { setPantallaActiva } = useContext(PantallaActivaContext);
  useEffect(() => {
    setPantallaActiva(100);
  }, []);

  const renderSwitch = () => {
    switch (pantallaActivaConfig) {
      case pantallas.INICIO:
        return (
          <Inicio
            pantallas={pantallas}
            setPantallaActiva={setPantallaActivaConfig}
          />
        );
      case pantallas.USUARIOS:
        return <Usuarios irAtras={irAtras} />;
      default:
        break;
    }
  };

  const irAtras = () => {
    setPantallaActivaConfig(pantallas.INICIO);
  };

  return <div className="cont-seccion animar-entrada">{renderSwitch()}</div>;
}

export default Configuracion;
