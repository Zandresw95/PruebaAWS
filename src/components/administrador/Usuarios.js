import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stargetUsuarios } from "../../reduxStore/actions/auth";
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
  // si los estados estan en true ya cargaron los datos del fetch
  // const { estadorresumenUsuarios } = useSelector(state => state.usuarios);
  const estadorresumenUsuarios = true;
   // data sin desestructurar desde store
   const data = useSelector((state) => state.usuarios.resumenUsuarios);
   // console.log(data)

   // extrae los perfiles sin repetirlos
  const perfiles = [...new Set(data.map((item) => item.perfil))];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(stargetUsuarios("noPayload"));
  }, []);
 
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarCargando, setMostrarCargando] = useState(false);

  useEffect(() => {
    obtenerUsuarios();
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

  const obtenerUsuarios = () => {
    $.ajax({
      url: `http://${dominio}/api/tabla_usuarios`,
      type: "get",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({}),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        console.log(data.data);
        setUsuarios(data.data);
        setMostrarCargando(false);
        // if ("cedula" in data) {
        //   setUserData(data);
        // } else {
        //   mostrarPopup(2, data);
        // }
      },
      error: function (data) {
        setMostrarCargando(false);
        console.log(data.responseJSON.data);
        let mensaje = data.responseJSON.data;
        // if (data.status === 0)
        // mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        // else mostrarPopup(2, mensaje);
      },
    });
  };
  return (
    <>
      {mostrarCargando ? (
        <div className="cont-loader-full-container">
          <div className="loader format-ico-loader"></div>
        </div>
      ) : (
        <>
          <div className="cont-usuarios animar-zoom-min-to-max">
            <div className="barra-acciones-title">
              <h3 className="title">Usuarios</h3>
            </div>
            <div className="barra-acciones-botones">
              <div className="barra-acciones-lupa" style={{width:"200px"}}>
                {/* <SearchBar /> */}
                <ContInput icono={"ico-lupa"}>
                <input
                  name="buscar"
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
                  value={terminoBusqueda}
                  placeholder="Buscar"
                />
                </ContInput>
              </div>
              <div className="barra-acciones-lupa barra-acciones-nuevo"  style={{width:"max-content"}}>
                  <Button
                    label={"Nuevo"}
                    icono="ico-anadir"
                    onClick={() => abrirForm(0)}
                  />
                </div>
            </div>
            <div className="cont-contenido-usuarios">
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
                : "No existen Usuarios"}
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
