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
import Error404 from "./pages/Error404";
import Personas from "./pages/Personas";
import Opcione from "./pages/Opcione";
import Perfile from "./pages/Perfile";
import AsigOpcPerfil from "./pages/AsigOpcPerfil";
import AsigPerfil from "./pages/AsigPerfUsuario";
import Usuarios from "./pages/Usuario";
import RegistroGeneral from "./pages/GeneralRegister";
import UserTypeRegister from "./pages/UserTypeRegister";
import RegistroFundacion from "./pages/RegistroFundacion";
import Home from "./pages/Home";
import Fundaciones from "./pages/Fundaciones";
import RegistroUsuario from "./pages/RegistroUsuario";
import RegistroOrganizacion from "./pages/RegistrarOrganizacion";
import Footer from "./components/Footer/Footer";
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
  const isRole = useSelector((state) => state.auth.role);
  if (!(isLogin && isRole)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


const App = () => {
  const estadoModal = useSelector((state) => state.modales);
  const isLogin = useSelector((state) => state.auth.name);
  const isRole = useSelector((state) => state.auth.role);
  const [checked, setChecked] = useState(false);

  var uid;
  var nombre;
  var role;

  const dispatch = useDispatch();
  useEffect(() => {
    // verificando si el usuario está logeado
    uid = localStorage.getItem("iduser");
    nombre = localStorage.getItem("nombre");
    role = localStorage.getItem("role");
    if (uid && nombre && role) {
      dispatch(startchekLogin(uid, nombre,role));
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
          {isLogin && isRole && <Navbar />}
          <div className="cont-contenido-app" id="cont-contenido-app">
            <Routes>
              <Route
                path="/inicio"
                element={
                  <ProtectedRoute>
                    <Inicio />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
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
                path="/fundacionesExistentes"
                element={
                  <ProtectedRoute>
                    <Fundaciones tipo={""} />
                  </ProtectedRoute>
                }
              >
              </Route>

              <Route
                path="/fundacionesDonar"
                element={
                  <ProtectedRoute>
                    <Fundaciones tipo={"donacion"} />
                  </ProtectedRoute>
                }
              >
              </Route>

              <Route
                path="/fundacionesAdoptar"
                element={
                  <ProtectedRoute>
                    <Fundaciones tipo={"adoptar"} />
                  </ProtectedRoute>
                }
              >
              </Route>

              <Route
                path="/fundacionesApadrinar"
                element={
                  <ProtectedRoute>
                    <Fundaciones tipo={"apadrinamiento"} />
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
                    {isLogin && isRole && <Navigate to="/" replace />}
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
                path="/registrar"
                element={
                  <RegistroGeneral />
                }
              />
              <Route
                path="/registrar/usuarioSeleccion"
                element={
                  <UserTypeRegister />}
              />

              <Route
                path="/registrar/usuario"
                element={
                  <RegistroUsuario />
                }
              />
              <Route
                path="/registrar/organizacion"
                element={
                  <RegistroOrganizacion />
                }
              />
            </Routes>
          </div>
        </div>
        {isLogin && isRole && <Footer />}

      </HashRouter>
      <Confirm />
      <Popup />
    </>
  );
}

export default App;
