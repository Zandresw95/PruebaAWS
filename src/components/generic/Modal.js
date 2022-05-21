import "./Modal.css";

function Modal({ activo = false, cerrar, children }) {
  return (
    <>
      <div className={"cont-modal " + (activo ? "active" : "")}>{children}</div>
      <div
        className={"modal-fondo " + (activo ? "active" : "")}
        onClick={cerrar}
      ></div>
    </>
  );
}

export default Modal;
