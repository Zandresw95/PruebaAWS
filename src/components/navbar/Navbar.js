import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PantallaActivaContext from "../../context/PantallaActivaContext";

import "./NavBar.css";

function Navbar() {
  const navigate = useNavigate();
  const { pantallaActiva, setPantallaActiva } = useContext(
    PantallaActivaContext
  );

  const navegar = (pagina) => {
    navigate(pagina);
  };
  return (
    <div className="cont-navbar">
      <ul className="navbar-list">
        <li
          className={pantallaActiva === 0 ? "active" : ""}
          onClick={() => {
            setPantallaActiva(0);
            navegar("/");
          }}
        >
          <div className="ico-casa format-ico-navbar"></div>
          <p>Inicio</p>
        </li>
        <li
          className={pantallaActiva === 1 ? "active" : ""}
          onClick={() => {
            setPantallaActiva(1);
            navegar("/personas");
          }}
        >
          <div className="ico-usuario format-ico-navbar"></div>
          <p>Personas</p>
        </li>
        <li
          className={pantallaActiva === 2 ? "active" : ""}
          onClick={() => {
            setPantallaActiva(2);
            navegar("/opciones");
          }}
        >
          <div className="ico-configuracion format-ico-navbar"></div>
          <p>Opciones</p>
        </li>
        <li
          className={pantallaActiva === 3 ? "active" : ""}
          onClick={() => {
            setPantallaActiva(3);
            navegar("/asigOpcPerfil");
          }}
        >
          <div className="ico-lapiz format-ico-navbar"></div>
          <p>Asignar Opciones</p>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
