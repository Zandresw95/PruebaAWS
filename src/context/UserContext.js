import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const initialUserData = {
  idusuario: 0,
  id_persona: "",
  cedula: "",
  nombre: "",
  idperfil: "",
  perfil: "",
  role: "",
};

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    let temp = sessionStorage.getItem("userData");
    if (temp) {
      for (const key in temp) {
        if (Object.hasOwnProperty.call(temp, key)) {
          const el = temp[key];
          if (el === "") {
            return initialUserData;
            // setSesionActiva(false);
          }
        }
      }
      return JSON.parse(temp);
      // setSesionActiva(true);
    } else {
      return initialUserData;
    }
  });

  const [sesionActiva, setSesionActiva] = useState(() => {
    let temp = sessionStorage.getItem("userData");
    if (temp) {
      for (const key in temp) {
        if (Object.hasOwnProperty.call(temp, key)) {
          const el = temp[key];
          if (el === "") {
            return false;
          }
        }
      }
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    if (userData && userData !== "") {
      for (const key in initialUserData) {
        if (Object.hasOwnProperty.call(userData, key)) {
          const el = userData[key];
          if (el === "") {
            setSesionActiva(false);
            return;
          }
        } else {
          setSesionActiva(false);
          return;
        }
      }
      sessionStorage.setItem("userData", JSON.stringify(userData));
      setSesionActiva(true);
    } else {
      setSesionActiva(false);
    }
  }, [userData]);

  const cerrarSesion = () => {
    setUserData(initialUserData);
    sessionStorage.setItem("userData", "");
  };

  const data = {
    userData,
    setUserData,
    sesionActiva,
    cerrarSesion,
  };
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export { UserProvider };
export default UserContext;
