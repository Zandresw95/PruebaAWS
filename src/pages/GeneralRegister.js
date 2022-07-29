import React from "react";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import './GeneralRegister.css';
function GeneralRegister() {
    const navigate = useNavigate();
    return (
        <div className="cont-regGen">
            <div className="cont-general" >
                <Button className="p-button-rounded p-button-text ico-fundacion" onClick={() => { navigate("/registrar/fundacion")}} />
                <Button className="p-button-rounded p-button-text ico-usurio-nav" onClick={() => { navigate("/registrar/usuario")}} />
            </div>
        </div>
    );
}

export default GeneralRegister;