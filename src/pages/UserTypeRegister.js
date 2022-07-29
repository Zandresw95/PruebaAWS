import React from "react";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import BotonRegreso from "../components/navbar/BotonRegreso";
import './UserTypeRegister.css';
function UserTypeRegister() {
    const navigate = useNavigate();
    return (
        <div className="cont-regGenSpec">
            <BotonRegreso/>
            <div className="cont-general">
                <Button className="p-button-rounded p-button-text ico-organizacion" onClick={() => { navigate("/registrar/organizacion")}} />
                <Button className="p-button-rounded p-button-text ico-usuarion-nav" onClick={() => { navigate("/registrar/usuario") }} />
            </div>
        </div>
    );
}

export default UserTypeRegister;