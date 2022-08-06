import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import './DatosPerfil.css'
import Button from "../components/generic/Button";
import { dominio } from "../helpers/Dbdata";
import $ from 'jquery';

const DatosPerfil = () => {
    const {role, uid} = useSelector((state) => state.auth);
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        obtenerUsuario();
    }, []);
    
    const obtenerUsuario = () => {
        $.ajax({
            url: `${dominio}/api/tabla_usuarios/datos/${uid}`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({}),
            beforeSend: function () {

            },
            success: function (data) {
                console.log(data.data);
                setUsuario(data.data);
            },
            error: function (data) {
                console.log(data.responseJSON.data);
            },
        });
    }


    return (
        <div className="info-users">
            <div className="info-title">
                <h3>Datos Generales</h3>
            </div>
            <div className="info-body">
                <img src={usuario.FOTO_USUARIO} width={"220px"} height={"200px"} alt="Imagen Usuario"></img>
                {role === "P002" ? 
                    (
                        <div className="body-fund-org">
                            <h5>Fundación</h5>
                            <p><span className="font-bold w-10">Nombre:</span> {usuario.NOMBRE_FUNDACION}</p>
                            <p><span className="font-bold w-10">Teléfono:</span> {usuario.TELEFONO_FUNDACION}</p>
                            <p><span className="font-bold w-10">Dirección:</span> {usuario.DIRECCION_FUNDACION}</p>
                            <p><span className="font-bold w-10">Correo:</span> {usuario.EMAIL_FUNDACION}</p>
                            <p><span className="font-bold w-10">Fecha creación:</span> {usuario.FECHA_CREACION_FUNDACION}</p>
                        </div>
                    ) : (role === "P003") && 
                    (
                        <div className="body-fund-org">
                            <h5>Organización</h5>
                            <p><span className="font-bold w-10">Nombre:</span> {usuario.NOMBRE_ORGANIZACION}</p>
                            <p><span className="font-bold w-10">Teléfono:</span> {usuario.TELEFONO_ORGANIZACION}</p>
                            <p><span className="font-bold w-10">Dirección:</span> {usuario.DIRECCION_ORGANIZACION}</p>
                        </div>
                    )
                }
                <div className="body-person">
                    {(role == "P001" || role === "P004") ? (
                        <h5>Persona</h5>
                    ) : (
                        <h5>Representante</h5>
                    )}
                    <p><span className="font-bold w-10">Nombres:</span> {usuario.NOMBRE_PERSONA}</p>
                    <p><span className="font-bold w-10">Apellidos:</span> {usuario.APELLIDO_PERSONA}</p>
                    <p><span className="font-bold w-10">Dirección:</span> {usuario.DIRECCION_PERSONA}</p>
                    <p><span className="font-bold w-10">Teléfono:</span> {usuario.TELEFONO_PERSONA}</p>
                    <p><span className="font-bold w-10">Correo:</span> {usuario.EMAIL_PERSONA}</p>
                    <p><span className="font-bold w-10">Fecha Nacimiento:</span> {usuario.FECHANAC_PERSONA}</p>
                    <p><span className="font-bold w-10">Instrucción:</span> {usuario.INSTRUCCION_PERSONA}</p>
                    <p><span className="font-bold w-10">Cédula:</span> {usuario.CEDULA_PERSONA}</p>
                    
                </div>
            </div>
            <div className="info-buttons">
                <Button icono={"pi pi-check"} label={"Cambiar Contraseña"}/>
                <Button icono={"pi pi-ban"} label={"Editar Perfil"}/>
            </div>
        </div>
    );
}

export default DatosPerfil;