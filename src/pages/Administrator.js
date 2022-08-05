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
import Login from "../pages/Login";
import Navbar from "../components/navbar/Navbar";
import Popup from "../components/popup/Popup";
import Confirm from "../components/generic/Confirm";
import Personas from "./Personas";
import Opcione from './Opcione';
import Perfile from './Perfile';
import AsigPerfil from './AsigPerfUsuario';
import Usuarios from './Usuario'
import AsigOpcPerfil from './AsigOpcPerfil';
import Footer from "../components/Footer/Footer";
import Inicio from "./Inicio";
import './Administrator.css'
import { startchekLogin } from "../reduxStore/actions/auth";

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

export const Administrator = () => {
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
    return(
       <>

        <div className="cont-app-administrator">
                <Navbar/>
                <div className="cont-app-administator-cont">
                        <Routes>
                            <Route
                                path="inicio"
                                element={
                                    <ProtectedRouteAdmin>
                                        <Inicio />
                                    </ProtectedRouteAdmin>
                                }
                            />
                            <Route
                                path="personas"
                                element={
                                <ProtectedRouteAdmin>
                                    <Personas />
                                </ProtectedRouteAdmin>
                                }
                            >
                            </Route>
                            <Route
                                path="opciones"
                                element={
                                <ProtectedRouteAdmin>
                                    <Opcione />
                                </ProtectedRouteAdmin>
                                }
                            >
                            </Route>
                            <Route
                                path="perfiles"
                                element={
                                <ProtectedRouteAdmin>
                                    <Perfile />
                                </ProtectedRouteAdmin>
                                }
                            />
                            <Route
                                path="usuarios"
                                element={
                                <ProtectedRouteAdmin>
                                    <Usuarios />
                                </ProtectedRouteAdmin>
                                }
                            >
                            </Route>
                            <Route
                                path="asignarOpc"
                                element={
                                <ProtectedRouteAdmin>
                                    <AsigOpcPerfil />
                                </ProtectedRouteAdmin>
                                }
                            >
                            </Route>
                            <Route
                                path="asigPerf"
                                element={
                                <ProtectedRouteAdmin>
                                    <AsigPerfil />
                                </ProtectedRouteAdmin>
                                }
                            >
                            </Route>
                        </Routes>
                </div>
                {isLogin && isRole && <Footer/>}
            </div>
        <Confirm />
        <Popup />
        </>
    );
}