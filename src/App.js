import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  HashRouter,
  Outlet,useParams
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import { MenuBar } from "./components/navbar/MenuBar";
import Error404 from "./pages/Error404";
import { Administrator } from "./pages/Administrator";
import RegistroGeneral from "./pages/GeneralRegister";
import UserTypeRegister from "./pages/UserTypeRegister";
import RegistroFundacion from "./pages/RegistroFundacion";
import Home from "./pages/Home";
import Fundaciones from "./pages/Fundaciones";
import RegistroUsuario from "./pages/RegistroUsuario";
import RegistroOrganizacion from "./pages/RegistrarOrganizacion";
import Footer from "./components/Footer/Footer";
import FundacionInfo from "./pages/FundacionInfo";
import UsuarioDonaciones from "./components/Donacion/usuarioDonacion/UsuarioDonaciones";
import CuentasFund from "./components/fundacion/CuentasFund";
import CentrosAlm from "./components/fundacion/CentrosAlm";
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

const ProtectedRouteAdmin = ({ children }) => {
  const isLogin = useSelector((state) => state.auth.name);
  const isRole = useSelector((state) => state.auth.role);
  if (!(isLogin && isRole)) {
    return <Navigate to="/" replace />;
  }else{
    if(isRole !== "P001"){
      return <Navigate to="/" replace />;
    }
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
          {isLogin && isRole && <MenuBar />}
          <div className="cont-contenido-app" id="cont-contenido-app">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/administrador/*"
                element={
                  <ProtectedRouteAdmin>
                    <Administrator />
                  </ProtectedRouteAdmin>
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
                path="/donaciones/usuario"
                element={
                  <ProtectedRoute>
                    <UsuarioDonaciones />
                  </ProtectedRoute>
                }
              >
              </Route>
              <Route
                path="/cuentas"
                element={
                  <ProtectedRoute>
                    <CuentasFund />
                  </ProtectedRoute>
                }
              >
              </Route>
              <Route
                path="/centros"
                element={
                  <ProtectedRoute>
                    <CentrosAlm />
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
                path="/fundacionesApadrinar/:idFundacion/:estadoAnimal"
                element={
                  <ProtectedRoute>
                    <FundacionInfo tipo={"apadrinar"}/>
                  </ProtectedRoute>
                }
              >
              </Route>
              <Route
                path="/fundacionesAdoptar/:idFundacion/:estadoAnimal"
                element={
                  <ProtectedRoute>
                    <FundacionInfo tipo={"adoptar"}/>
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
          {isLogin && isRole && <Footer />}
        </div>
      </HashRouter>
      <Confirm />
      <Popup />
    </>
  );
}

export default App;
