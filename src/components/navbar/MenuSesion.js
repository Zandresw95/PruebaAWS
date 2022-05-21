import { useContext, useEffect, useRef, useState } from "react";

import "./MenuSesion.css";

function MenuSesion({ activo, cerrar }) {
 

  return (
    <div style={{ position: "relative" }}>
      <div className={"cont-menu-sesion " + (activo ? "active" : "")}>
        <ul className="menu-sesion-lista">
   
          <li>Cambiar contraseña</li>
          <li>Cerrar sesión</li>
        </ul>
      </div>
    </div>
  );
}

export default MenuSesion;