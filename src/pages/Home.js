import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { useSelector } from "react-redux";
function Home() {
  const { name, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div >
      <div className="grid justify-content-around align-items-center gap-8">
        <Button className="p-button-rounded p-button-text ico-apadrinamiento" onClick={() => navigate("/fundacionesApadrinar")} />
        <Button className="p-button-rounded p-button-text ico-adopcion" onClick={() => navigate("/fundacionesAdoptar")} />
        <Button className="p-button-rounded p-button-text ico-donacion" onClick={() => navigate("/fundacionesDonar")} />
        {(role === "P001") && <Button className="p-button-rounded p-button-text ico-fundaciones" onClick={() => navigate("/fundacionesExistentes")} /> }
        <Button className="p-button-rounded p-button-text ico-usurio-nav" onClick={() => navigate("/datos")} />
        {(role === "P001") && <Button className="p-button-rounded p-button-text ico-administracion" onClick={() => { navigate("/administrador/inicio") }} />}
      </div>
    </div>
  );
}

export default Home;