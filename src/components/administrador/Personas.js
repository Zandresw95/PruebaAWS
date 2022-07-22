import { useEffect, useMemo, useReducer, useState } from "react";
import Button from "../generic/Button";
import ContInput from "../generic/ContInput";
import Modal from "../generic/Modal";
import SearchBar from "../generic/SearchBar";
import $ from "jquery";
import { host, port, dominio } from "../../helpers/Dbdata";

import "./Personas.css";
import FormPersona from "./personas/FormPersona";
import Persona from "./personas/Persona";

let initialStateModal = {
  form: false,
};

let modalTypes = {
  OPEN_FORM: "OPEN_FORM",
  CLOSE_USUARIOS: "CLOSE_FORM",
};

const Personas = () => {
  const [stateModal, dispatchModal] = useReducer(
    reducerModal,
    initialStateModal
  );
  const [idUsuario, setIdUsuario] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [mostrarCargando, setMostrarCargando] = useState(false);

  const estadoResumenUsuarios = true;

  useEffect(() => {
    obtenerPersonas();
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

  const obtenerPersonas = () => {
    $.ajax({
      url: `${dominio}/api/tabla_personas`,
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

   const personas = useMemo(
    () =>
      usuarios.filter(
        (el) =>
          el.nombre_persona.toLowerCase().includes(terminoBusqueda.toLowerCase())
      ),
    [terminoBusqueda, usuarios]
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
              <h3 className="titulo-pagina">Personas</h3>
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
              {!estadoResumenUsuarios ? (
                <div className="loader format-ico-loader" />
              ) : (
                <div className="contenedorPagina">
                  <div className="cont-personas">
                    { personas.length > 0
                      ? personas.map((el, i) => {
                        return (
                          <Persona
                            key={"persona" + i}
                            datos={el}
                            abrirForm={() => abrirForm(el.codai_persona)}
                          />
                        )
                      })
                      : "No existen personas"
                  }
                  </div>
                </div>
              )}
            </div>
          </div>
          <Modal activo={stateModal.form} cerrar={cerrarForm}>
            <FormPersona
              idPersona={idUsuario}
              cerrar={() => {
                cerrarForm();
              }}
              recargar={() => {
                cerrarForm();
                obtenerPersonas();
              }}
            />
          </Modal>
        </>
      )}
    </>
  );
}

export default Personas;
