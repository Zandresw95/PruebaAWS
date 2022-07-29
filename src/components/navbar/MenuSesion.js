import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { startLogout } from "../../reduxStore/actions/auth";
import FormContrasena from "../administrador/usuarios/FormContrasena";
import Modal from "../generic/Modal";
import "./MenuSesion.css";
import { useDispatch } from "react-redux";

function MenuSesion() {
  const { name, role } = useSelector((state) => state.auth);

  const [menuActivo, setMenuActivo] = useState(false);
  const [formContrasenaActivo, setFormContrasenaActivo] = useState(false);

  const refCont = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (refCont.current && !refCont.current.contains(e.target)) {
        setMenuActivo(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [refCont]);

  const dispatch = useDispatch();
  const cerrarSesion = () => {
    dispatch(startLogout());
  };

  return (
    <>
      <div ref={refCont}>
        <div className={"cont-menu-sesion " + (menuActivo ? "active" : "")}>
          <div
            className={
              "ico-flecha-desplegar menu-sesion-flecha " +
              (menuActivo ? "oculto" : "")
            }
            onClick={() => {
              setMenuActivo(!menuActivo);
            }}
          ></div>
          <div className="cont-contenido-menu-sesion">
            <div className="cont-ico-usuario-card">
              <div className="ico-usuario format-ico-usuario-card"></div>
            </div>
            <div className="datos-usuario">
              <p
                onClick={() => {
                  setMenuActivo(!menuActivo);
                }}
              >
                {name}
              </p>
              <p
                onClick={() => {
                  setMenuActivo(!menuActivo);
                }}
              >
                {/* {userData.perfil.toUpperCase()} */}
              </p>
            </div>
          </div>
          <ul className="menu-sesion-lista">
            <li onClick={() => setFormContrasenaActivo(true)}>
              <span className="ico-candado format-ico-btn"></span>
              <span>Cambiar contraseña</span>
            </li>
            <li onClick={cerrarSesion}>
              <span className="ico-login format-ico-btn"></span>
              <span>Cerrar sesión</span>
            </li>
          </ul>
        </div>
      </div>
      <Modal
        activo={formContrasenaActivo}
        cerrar={() => setFormContrasenaActivo(false)}
      >
        <FormContrasena
          cerrar={() => {
            setFormContrasenaActivo(false);
            cerrarSesion();
          }}
        />
      </Modal>
    </>
  );
}

export default MenuSesion;
