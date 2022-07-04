import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Navbar from "./components/navbar/Navbar";
import Inicio from "./pages/Inicio";

import Popup from "./components/popup/Popup";
import { PopupProvider } from "./context/PopupContext";

import { Outlet } from "react-router-dom";

// css
import "./css/contenedores.css";
import "./css/iconos.css";
import "./css/input.css";
import "./css/normalize.css";

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 
import { PantallaActivaProvider } from "./context/PantallaActivaContext";
import Error404 from "./pages/Error404";
import Personas from "./pages/Personas";
import Opcione from "./pages/Opcione";
import Perfile from "./pages/Perfile";
import AsigOpcPerfil from "./pages/AsigOpcPerfil";

const NavLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  return (
    <div>
      <PopupProvider>
        <PantallaActivaProvider>
          <div className="cont-app">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Error404 />} />
              <Route element={<NavLayout />}>
                <Route index element={<Inicio />} />
                <Route path="/personas" element={<Personas />} />
                <Route path="/opciones" element={<Opcione />} />
                <Route path="/perfiles" element={<Perfile />} />
                <Route path="/asigOpcPerfil" element={<AsigOpcPerfil />} />
              </Route>
            </Routes>
          </div>
        </PantallaActivaProvider>
        <Popup />
      </PopupProvider>
    </div>
  );
}

export default App;
