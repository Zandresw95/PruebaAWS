import { useEffect, useMemo, useReducer, useState } from "react";
import Button from "../generic/Button";
import ContInput from "../generic/ContInput";
import Modal from "../generic/Modal";
import $ from "jquery";
import { dominio } from "../../helpers/Dbdata";

import "./Perfiles.css";
import FormPerfil from "./perfiles/FormPerfil";
import Perfil from "./perfiles/Perfil";

let initialStateModal = {
  form: false,
};

let modalTypes = {
  OPEN_FORM: "OPEN_FORM",
  CLOSE_FORM: "CLOSE_FORM",
};

const Perfiles = () => {
  const [stateModal, dispatchModal] = useReducer(
    reducerModal,
    initialStateModal
  );
  const [idPerfil, setIdPerfil] = useState(0);
  const [perfiles, setPerfiles] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
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

  const perfils = useMemo(
    () =>
      perfiles.filter(
        (el) =>
          el.descripcion_perfil.toLowerCase().includes(terminoBusqueda.toLowerCase())
      ),
    [terminoBusqueda, perfiles]
  );

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
              <h3 className="titulo-pagina">Perfiles</h3>
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
                <div className="cont-perfiles">
                  {perfils.length > 0
                    ? perfils.map((el, i) => {
                        return (
                          <Perfil
                            key={"usuario" + i}
                            datos={el}
                            abrirForm={() => abrirForm(el.codai_perfil)}
                          />
                        );
                      })
                    : "No existen perfiles"
                  }
                </div>
              </div>
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
