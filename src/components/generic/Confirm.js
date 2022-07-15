import { useContext } from "react";
import ConfirmContext from "../../context/ConfirmContext";
import Button from "./Button";
import Modal from "./Modal";
import "./Confirm.css";

function Confirm({}) {
  const { estado, confirmar, cancelar } = useContext(ConfirmContext);

  return (
    <Modal
      activo={estado.activo}
      cerrar={cancelar}
      zIndex={120}
      temblar={estado.activo}
    >
      <div className={"cont-confirm "}>
        <p>{estado.mensaje}</p>
        <div className="confirm-btns">
          <Button
            onClick={confirmar}
            label={estado.textoPositivo}
            icono="ico-confirmar"
          />
          <Button
            onClick={cancelar}
            label={estado.textoNegativo}
            rojo={true}
            icono="ico-rechazar"
          />
        </div>
      </div>
    </Modal>
  );
}

export default Confirm;
