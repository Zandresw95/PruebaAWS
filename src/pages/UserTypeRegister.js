import React from "react";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import './UserTypeRegister.css';
function UserTypeRegister() {
    const navigate = useNavigate();
    return (
        <div className="cont-regGenSpec">
            <div className="grid justify-content-around align-items-center gap-8" style={{ height: '100vh' }}>
                <Button className="p-button-rounded p-button-text ico-organizacion" onClick={() => { }} />
                <Button className="p-button-rounded p-button-text ico-usuarion-nav" onClick={() => { }} />
            </div>
        </div>
    );
}

export default UserTypeRegister;