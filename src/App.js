import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  HashRouter,
  Outlet,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import Navbar from "./components/navbar/Navbar";
import Inicio from "./pages/Inicio";
import { PantallaActivaProvider } from "./context/PantallaActivaContext";
import Error404 from "./pages/Error404";
import Personas from "./pages/Personas";
import Opcione from "./pages/Opcione";
import Perfile from "./pages/Perfile";
import AsigOpcPerfil from "./pages/AsigOpcPerfil";
import AsigPerfil from "./pages/AsigPerfUsuario";
import Usuarios from "./pages/Usuario";
import RegistroFundacion from "./pages/RegistroFundacion";
import RegistroUsuario from "./pages/RegistroUsuario";
import { startchekLogin } from "./reduxStore/actions/auth";
import { PopupProvider } from "./context/PopupContext";

// css
import "./css/contenedores.css";
import "./css/iconos.css";
import "./css/general.css";
import "./css/alineaciones.css";
import "./css/animaciones.css";
import "./css/normalize.css";
import "./css/textos.css";
import "./css/tablas.css";
import Popup from "./components/popup/Popup";
import Confirm from "./components/generic/Confirm";
//primefaces
import "/node_modules/primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

const ProtectedRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.auth.name);
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


const App = () => {
  const estadoModal = useSelector((state) => state.modales);
  const isLogin = useSelector((state) => state.auth.name);
  const [checked, setChecked] = useState(false);

  var uid;
  var nombre;

  const dispatch = useDispatch();
  useEffect(() => {
    // verificando si el usuario está logeado
    uid = localStorage.getItem("iduser");
    nombre = localStorage.getItem("nombre");
    if (uid && nombre) {
      dispatch(startchekLogin(uid, nombre));
      setChecked(true);
    } else {
      setChecked(true);
    }
  }, []);

  if (!checked) {
    return <></>;
  }

  return (
    <>
      <HashRouter>
        <div className="cont-app">
          {isLogin && <Navbar />}
          <div className="cont-contenido-app" id="cont-contenido-app">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Inicio />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/personas"
                element={
                  <ProtectedRoute>
                    <Personas />
                  </ProtectedRoute>
                }
              >
              </Route>
              <Route
                path="/opciones"
                element={
                  <ProtectedRoute>
                    <Opcione />
                  </ProtectedRoute>
                }
              >
              </Route>
              <Route
                path="/perfiles"
                element={
                  <ProtectedRoute>
                    <Perfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/usuarios"
                element={
                  <ProtectedRoute>
                    <Usuarios />
                  </ProtectedRoute>
                }
              >
              </Route>
              <Route
                path="/asignarOpc"
                element={
                  <ProtectedRoute>
                    <AsigOpcPerfil />
                  </ProtectedRoute>
                }
              >
              </Route>

              <Route
                path="*"
                element={
                  <ProtectedRoute>
                    <Navigate to="/" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    {isLogin && <Navigate to="/" replace />}
                    <Login />
                  </>
                }
              />
              <Route
                path="/asigPerf"
                element={
                  <ProtectedRoute>
                    <AsigPerfil />
                  </ProtectedRoute>
                }
              >
              </Route>
              <Route
                path="/registrar/fundacion"
                element={
                  <RegistroFundacion />
                }
              />
              <Route
                path="/registrar/usuario"
                element={
                  <RegistroUsuario />
                }
              />
            </Routes>
          </div>
        </div>
      </HashRouter>
      <Confirm />
      <Popup />
    </>
  );
}

export default App;
