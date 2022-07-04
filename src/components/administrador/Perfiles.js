import { useEffect, useReducer, useState } from "react";
import Button from "../generic/Button";
import ContInput from "../generic/ContInput";
import Modal from "../generic/Modal";
import $ from "jquery";
import { dominio } from "../../helpers/Dbdata";

import "./Perfiles.css";
import FormPerfil from "./perfiles/FormPerfil";
import Perfil from "./perfiles/Perfil";

// let dataUsuario = {
//   id: 1,
//   nombre: "Nicolás Carvajal",
//   cargo: "ADMINISTRADOR",
//   estado: 1,
// };

let initialStateModal = {
  form: false,
};

let modalTypes = {
  OPEN_FORM: "OPEN_FORM",
  CLOSE_FORM: "CLOSE_FORM",
};

function Perfiles({ irAtras }) {
  const [stateModal, dispatchModal] = useReducer(
    reducerModal,
    initialStateModal
  );
  const [idPerfil, setIdPerfil] = useState(0);
  const [perfiles, setPerfiles] = useState([]);
  const [mostrarCargando, setMostrarCargando] = useState(false);

  useEffect(() => {
    obtenerperfiles();
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
    setIdPerfil(id);
  };

  const cerrarForm = () => {
    dispatchModal({ type: modalTypes.CLOSE_FORM });
    setIdPerfil(0);
  };

  const obtenerperfiles = () => {
    $.ajax({
      url: `http://${dominio}/api/tabla_perfiles`,
      type: "get",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({}),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        console.log(data.data);
        setPerfiles(data.data);
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
          <div className="cont-perfiles animar-zoom-min-to-max">
            <div className="barra-acciones-top">
              <Button icono="ico-atras" label={"Atrás"} onClick={irAtras} />
              <div style={{ width: "200px" }}>
                {/* <SearchBar /> */}
                <ContInput icono={"ico-lupa"}>
                  <input placeholder="Buscar" />
                </ContInput>
              </div>
            </div>

            <div className="barra-acciones-top">
              <h3>Perfiles</h3>
              <div style={{ width: "max-content" }}>
                <Button
                  label={"Nuevo"}
                  icono="ico-anadir"
                  onClick={() => abrirForm(0)}
                />
              </div>
            </div>
            <div className="cont-contenido-perfiles">
              {perfiles.length > 0
                ? perfiles.map((el, i) => {
                    return (
                      <Perfil
                        key={"usuario" + i}
                        datos={el}
                        abrirForm={() => abrirForm(el.codai_perfil)}
                      />
                    );
                  })
                : "No existen perfiles"}
            </div>
          </div>
          <Modal activo={stateModal.form} cerrar={cerrarForm}>
            <FormPerfil
              idPerfil={idPerfil}
              cerrar={() => {
                cerrarForm();
                obtenerperfiles();
              }}
            />
          </Modal>
        </>
      )}
    </>
  );
}

export default Perfiles;
