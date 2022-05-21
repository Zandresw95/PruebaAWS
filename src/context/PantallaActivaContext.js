import { createContext, useState } from "react";

const PantallaActivaContext = createContext();

const PantallaActivaProvider = ({ children }) => {
  const [pantallaActiva, setPantallaActiva] = useState(0);

  const data = { pantallaActiva, setPantallaActiva };
  return (
    <PantallaActivaContext.Provider value={data}>
      {children}
    </PantallaActivaContext.Provider>
  );
};

export { PantallaActivaProvider };
export default PantallaActivaContext;
