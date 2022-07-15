import { createContext, useState } from "react";
import { createSearchParams } from "react-router-dom";

const ConfirmContext = createContext();
let resolveCallback;

const ConfirmProvider = ({ children }) => {
  let initialConfirm = {
    activo: false,
    mensaje: "¿Continuar?",
    textoPositivo: "Sí",
    textoNegativo: "No",
  };

  const [estado, setEstado] = useState(initialConfirm);

  const mostrarConfirm = (
    mensaje = "¿Continuar?",
    textoPositivo = "Sí",
    textoNegativo = "No"
  ) => {
    setEstado({
      activo: true,
      mensaje,
      textoPositivo,
      textoNegativo,
    });
    return new Promise((res, rej) => {
      resolveCallback = res;
    });
  };

  const cerrar = () => {
    setEstado(initialConfirm);
  };

  const confirmar = () => {
    cerrar();
    resolveCallback(true);
  };

  const cancelar = () => {
    cerrar();
    resolveCallback(false);
  };

  const data = { estado, mostrarConfirm, confirmar, cancelar };
  return (
    <ConfirmContext.Provider value={data}>{children}</ConfirmContext.Provider>
  );
};

export { ConfirmProvider };
export default ConfirmContext;
