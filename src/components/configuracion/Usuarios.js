import { useEffect, useReducer, useState } from "react";
import Button from "../generic/Button";
import ContInput from "../generic/ContInput";
import Modal from "../generic/Modal";
import SearchBar from "../generic/SearchBar";
import $ from "jquery";
import { host, port, dominio } from "../../helpers/Dbdata";

import "./Usuarios.css";
import FormUsuario from "./usuarios/FormUsuario";
import Usuario from "./usuarios/Usuario";

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
  CLOSE_USUARIOS: "CLOSE_FORM",
};

function Usuarios({ irAtras }) {
  const [stateModal, dispatchModal] = useReducer(
    reducerModal,
    initialStateModal
  );
  const [idUsuario, setIdUsuario] = useState(0);
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
      url: `http://${dominio}/api/tabla_personas`,
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
              <h3>Usuarios</h3>
              <div style={{ width: "max-content" }}>
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
                        abrirForm={() => abrirForm(el.id_persona)}
                      />
                    );
                  })
                : "No existen usuarios"}
            </div>
          </div>
          <Modal activo={stateModal.form} cerrar={cerrarForm}>
            <FormUsuario
              idUsuario={idUsuario}
              cerrar={() => {
                cerrarForm();
                obtenerUsuarios();
              }}
            />
          </Modal>
        </>
      )}
    </>
  );
}

export default Usuarios;
