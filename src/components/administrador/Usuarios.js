import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stargetUsuarios } from "../../reduxStore/actions/auth";
import { useNavigate } from "react-router-dom";
import Button from "../generic/Button";
import ContInput from "../generic/ContInput";
import Modal from "../generic/Modal";
import $ from "jquery";
import {dominio } from "../../helpers/Dbdata";

import "./Usuarios.css";
import FormUsuario from "./usuarios/FormUsuario";
import Usuario from "./usuarios/Usuario";

let initialStateModal = {
  form: false,
};

let modalTypes = {
  OPEN_FORM: "OPEN_FORM",
  CLOSE_FORM: "CLOSE_FORM",
};

const Usuarios = () => {
  const [stateModal, dispatchModal] = useReducer(
    reducerModal,
    initialStateModal
  );
  const [idUsuario, setIdUsuario] = useState(0);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
 /* const [usuarios, setUsuarios] = useState([]);
  const [mostrarCargando, setMostrarCargando] = useState(false);*/
  // si los estados estan en true ya cargaron los datos del fetch
  // const { estadorresumenUsuarios } = useSelector(state => state.usuarios);
  const estadorresumenUsuarios = true;
   // data sin desestructurar desde store
   const data = useSelector((state) => state.usuarios.resumenUsuarios);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stargetUsuarios("noPayload"));
  }, []);
 
  function reducerModal(state, action) {
    switch (action.type) {
      case modalTypes.OPEN_FORM:
        return { ...state, form: true };
      case modalTypes.CLOSE_FORM:
        return { ...state, form: false };
      default:
        break;
    }
  }

  const abrirForm = (id) => {
    dispatchModal({ type: modalTypes.OPEN_FORM });
    setIdUsuario(id);
  };

  const cerrarForm = () => {
    dispatchModal({ type: modalTypes.CLOSE_FORM });
    setIdUsuario(0);
  };

  const usuarios = useMemo(
    () =>
      data.filter(
        (el) =>
          el.login_usuario.toLowerCase().includes(terminoBusqueda.toLowerCase())
      ),
    [terminoBusqueda, data]
  );

  const navigate = useNavigate();

  return (
    <>
      {//mostrarCargando
      false ? (
        <div className="cont-loader-full-container">
          <div className="loader format-ico-loader"></div>
        </div>
      ) : (
        <>
          <div className="encabezado-nombre-barra-buscar">
            <div className="cont-flex-gap">
              <h3 className="titulo-pagina">Usuarios</h3>
            </div>
              <div style={{ width: "200px", justifySelf: "left" }}>
                <ContInput icono={"ico-lupa"}>
                  <input
                    name="buscar"
                    onChange={(e) => setTerminoBusqueda(e.target.value)}
                    value={terminoBusqueda}
                    placeholder="Buscar"
                  />
                </ContInput>
              </div>
              <div style={{ width: "max-content" }}>
                  <Button
                    label={"Nuevo"}
                    icono="ico-anadir"
                    onClick={() => abrirForm(0)}
                  />
              </div>
          </div>

          <div className="contenedorPrincipal animar-zoom-min-to-max">
            <div className="contenedorContenido">
              <div className="contenedorPagina">
                <div className="cont-usuarios">
                  {usuarios.length > 0
                    ? usuarios.map((el, i) => {
                        return (
                          <Usuario
                            key={"usuario" + i}
                            datos={el}
                            abrirForm={() => abrirForm(el.codai_usuario)}
                          />
                        );
                      })
                    : "No existen Usuarios"
                  }
                </div>
              </div>
            </div>
          </div>
          <Modal activo={stateModal.form} cerrar={cerrarForm}>
            <FormUsuario
              idUsuario={idUsuario}
              cerrar={() =>{
                cerrarForm();
                dispatch(stargetUsuarios("noPayload"));
              }}
            />
          </Modal>
        </>
      )}
    </>
  );
}

export default Usuarios;
