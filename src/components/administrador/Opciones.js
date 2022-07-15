import { useEffect, useReducer, useState } from "react";
import Button from "../generic/Button";
import ContInput from "../generic/ContInput";
import Modal from "../generic/Modal";
import $ from "jquery";
import {dominio } from "../../helpers/Dbdata";

import "./Opciones.css";
import FormOpcion from "./opciones/FormOpcion";
import Opcion from "./opciones/Opcion";

let initialStateModal = {
  form: false,
};

let modalTypes = {
  OPEN_FORM: "OPEN_FORM",
  CLOSE_FORM: "CLOSE_FORM",
};

function Opciones() {
  const [stateModal, dispatchModal] = useReducer(
    reducerModal,
    initialStateModal
  );
  const [idOpcion, setIdOpcion] = useState(0);
  const [opciones, setOpciones] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [mostrarCargando, setMostrarCargando] = useState(false);

  const estadorresumenUsuarios = true;

  useEffect(() => {
    obteneropciones();
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
    setIdOpcion(id);
  };

  const cerrarForm = () => {
    dispatchModal({ type: modalTypes.CLOSE_FORM });
    setIdOpcion(0);
  };

  const obteneropciones = () => {
    $.ajax({
      url: `http://${dominio}/api/tabla_opciones`,
      type: "get",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({}),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        console.log(data.data);
        setOpciones(data.data);
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
          <div className="encabezado-nombre-barra-buscar">
            <div className="cont-flex-gap">
              <h3 className="titulo-pagina">Opciones</h3>
            </div>
            <div className="cont-flex-gap">
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
          </div>

          <div className="contenedorPrincipal animar-zoom-min-to-max">
            <div className="contenedorContenido">
              <div className="contenedorPagina">
                <div className="cont-opciones">
                  {opciones.length > 0
                    ? opciones.map((el, i) => {
                        return (
                          <Opcion
                            key={"usuario" + i}
                            datos={el}
                            abrirForm={() => abrirForm(el.codai_opcion)}
                          />
                        );
                      })
                    : "No existen opciones"
                  }
                </div>
              </div>
            </div>
          </div>

          <Modal activo={stateModal.form} cerrar={cerrarForm}>
            <FormOpcion
              idOpcion={idOpcion}
              cerrar={cerrarForm}
              recargar={() =>{
                cerrarForm();
                obteneropciones();
              }}
            />
          </Modal>
        </>
      )}
    </>
  );
}

export default Opciones;
