import { createContext, useState } from "react";

const PopupContext = createContext();

const PopupProvider = ({ children }) => {
  let initialPopup = {
    activo: false,
    ico: 0,
    mensaje: "",
  };
  const [estado, setEstado] = useState(initialPopup);
  const mostrarPopup = (ico, mensaje) => {
    setEstado({
      activo: true,
      ico,
      mensaje,
    });
  };

  const data = { estado, setEstado, mostrarPopup };
  return <PopupContext.Provider value={data}>{children}</PopupContext.Provider>;
};

export { PopupProvider };
export default PopupContext;
