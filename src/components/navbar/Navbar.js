import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [userNavigates, setUserNavigates] = useState(false);

  const alertarNavegacion = () => {
    setUserNavigates(true);
  };

  useEffect(() => {
    if (userNavigates) setUserNavigates(false);
  }, [userNavigates]);

  return (
    <div className="cont-navbar">
      <NavLink
          className="logo-empresa"
          to="/"
          onClick={alertarNavegacion}
        >
          <div className="pi pi-arrow-left format-ico-navbar" style={{'fontSize':"1.5em"}}></div>
        </NavLink>
      <div className="cont-buttons">
        <NavLink
          className="button-menu animar-hover"
          to="inicio"
          onClick={alertarNavegacion}
        >
          <div className="ico-casa format-ico-navbar"></div>
          <p>Inicio</p>
        </NavLink>
        <NavLink
          className="button-menu animar-hover"
          to="personas"
          onClick={alertarNavegacion}
        >
          <div className="ico-usuario format-ico-navbar"></div>
          <p>Personas</p>
        </NavLink>
        <NavLink
          className="button-menu animar-hover"
          to="opciones"
          onClick={alertarNavegacion}
        >
          <div className="ico-configuracion format-ico-navbar"></div>
          <p>Opciones</p>
        </NavLink>

        <NavLink
          className="button-menu animar-hover"
          to="asignarOpc"
          onClick={alertarNavegacion}
        >
          <div className="ico-lapiz format-ico-navbar"></div>
          <p>Asignar Opciones</p>
        </NavLink>

        <NavLink
          className="button-menu animar-hover"
          to="usuarios"
          onClick={alertarNavegacion}
        >
          <div className="ico-usuarios format-ico-navbar"></div>
          <p>Usuarios</p>
        </NavLink>

        <NavLink
          className="button-menu animar-hover"
          to="perfiles"
          onClick={alertarNavegacion}
        >
          <div className="pi pi-user-plus format-ico-navbar" style={{'fontSize': '2em'}}></div>
          <p>Perfiles</p>
        </NavLink>

        <NavLink
          className="button-menu animar-hover"
          to="asigPerf"
          onClick={alertarNavegacion}
        >
          <div className="pi pi-book format-ico-navbar" style={{'fontSize': '2em'}}></div>
          <p>Asignar Usuarios</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
