import { useContext, useEffect } from "react";
import Productos from "../components/mantenimiento/Productos";
import ProductosFallas from "../components/mantenimiento/ProductosFallas";
import PantallaActivaContext from "../context/PantallaActivaContext";
import "./Mantenimiento.css";

function Mantenimiento() {
  const { setPantallaActiva } = useContext(PantallaActivaContext);
  
  useEffect(() => {
    setPantallaActiva(4);
  }, []);
  
  return (
    <div className="cont-seccion animar-entrada">
      <div className="cont-productos">
        <div className="cont-card animar-hover cont-producto">
          <h3>Productos Confiteca Balanzas</h3>
          <Productos />
        </div>
        <div className="cont-card animar-hover cont-producto">
          <h3>Productos Confiteca Fallas</h3>
          <ProductosFallas />
        </div>
      </div>
    </div>
  );
}

export default Mantenimiento;
