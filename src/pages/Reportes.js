import { useContext, useEffect, useReducer, useState } from "react";
import PantallaActivaContext from "../context/PantallaActivaContext";
import Modal from "../components/generic/Modal";
import Button from "../components/generic/Button";
import FormFiltros from "../components/reportes/FormFiltros";
import "./Reportes.css";

let initialStateModal = {
  form: false,
};

let modalTypes = {
  OPEN_FORM: "OPEN_FORM",
  CLOSE_USUARIOS: "CLOSE_FORM",
};

function Reportes() {
  
  const [idForm, setIdForm] = useState(0);
  const [stateModal, dispatchModal] = useReducer(
    reducerModal,
    initialStateModal
  );

  const { setPantallaActiva } = useContext(PantallaActivaContext);
  
  useEffect(() => {
    setPantallaActiva(5);
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
    setIdForm(id);
  };

  const cerrarForm = () => {
    dispatchModal({ type: modalTypes.CLOSE_FORM });
    setIdForm(0);
  };

  return (
    <div className="cont-seccion animar-entrada">
      <h2>Reportes</h2>
      <div className="cont-reportes">
        <div className="cont-card animar-hover cont-reporte">
          <h3>Productividad</h3>
          <Button
            label={"Reporte de turnos"}
            icono="ico-descargar"
            onClick={() => abrirForm(1)}
          />
           <Button
            label={"Reporte de fallas"}
            icono="ico-descargar"
            onClick={() => abrirForm(2)}
          />
        </div>
        <div className="cont-card animar-hover cont-reporte">
          <h3>RTH</h3>
          <Button
              label={"Reporte de rth"}
              icono="ico-descargar"
              onClick={() => abrirForm(3)}
            />
        </div>
        <div className="cont-card animar-hover cont-reporte">
          <h3>Pesos</h3>
          <Button
              label={"Reporte de pesos"}
              icono="ico-descargar"
              onClick={() => abrirForm(4)}
            />
        </div>
      </div>
      <Modal activo={stateModal.form} cerrar={cerrarForm}>
        <FormFiltros
          idForm={idForm}
          cerrar={() => {
            cerrarForm()
          }}
        />
      </Modal>
    </div>
    
  ); 
  
}

export default Reportes;
