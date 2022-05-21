import { useContext, useEffect, useRef, useState } from "react";
import PopupContext from "../../context/PopupContext";
import "./Popup.css";

// function Popup({ estado, setEstado }) {
function Popup() {
  // function Popup({ activarPopup, setActivarPopup, ico, mensaje }) {
  const [icono, setIcono] = useState(1);
  const [activo, setActivo] = useState(false);

  const { estado, setEstado } = useContext(PopupContext);

  let timeout = useRef();
  useEffect(() => {
    if (estado.activo) {
      setActivo(true);
      if (timeout.current != null) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        setActivo(false);
      }, 2500);
      setEstado({
        ...estado,
        activo: false,
      });

      setIcono(() => {
        switch (estado.ico) {
          case 0:
            return "ico-error";
          case 1:
            return "ico-exito";
          case 2:
            return "ico-advertencia";
          default:
            return "ico-error";
        }
      });
    }
  }, [estado]);

  return (
    <div className={"popup " + (activo ? "mostrarpopup" : "")}>
      <div className={"icoPopup " + icono}></div>
      <div className="mensajePopup">{estado.mensaje}</div>
    </div>
  );
}

export default Popup;
