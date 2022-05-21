import IcoApp from "../generic/IcoApp";

import "./Inicio.css";

function Inicio({ pantallas, setPantallaActiva }) {
  return (
    <div className="animar-zoom">
      <div>
        <h3>General</h3>
        <div className="inicio-contenido">
          <IcoApp
            label="Usuarios"
            icono="ico-usuario"
            onClick={() => {
              setPantallaActiva(pantallas.USUARIOS);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Inicio;
