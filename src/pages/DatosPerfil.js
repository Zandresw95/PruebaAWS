import React, {useState, useEffect, useRef, useContext} from "react";
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { startLogout } from "../reduxStore/actions/auth";
import './DatosPerfil.css'
import Button from "../components/generic/Button";
import { dominio } from "../helpers/Dbdata";
import FormContrasena from "../components/administrador/usuarios/FormContrasena";
import Modal from "../components/generic/Modal";
import $ from 'jquery';
import FormFundacion from "../components/fundacion/FormFundacion";
import FormOrganizacion from "../components/organizacion/FormOrganizacion";
import FormDatos from "../components/generic/FormDatos";
import PopupContext from "../context/PopupContext";

const DatosPerfil = () => {
    const toast = useRef(null);
    const {role, uid} = useSelector((state) => state.auth);
    const [usuario, setUsuario] = useState({});
    const [formContrasenaActivo, setFormContrasenaActivo] = useState(false);
    const [formFundActivo, setFormFundActivo] = useState(false);
    const [formOrgActivo, setFormOrgActivo] = useState(false);
    const [formDatosActivo, setFormDatosActivo] = useState(false);

    const { mostrarPopup } = useContext(PopupContext);

    useEffect(() => {
        obtenerUsuario();
    }, [uid]);
    
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

    const dispatch = useDispatch();
    const cerrarSesion = () => {
      dispatch(startLogout());
    };

    const onBasicUploadAuto = () => {
        toast.current.show({severity: 'success', summary: 'Correcto', detail: 'Imagen actualizada con éxito'});
        obtenerUsuario();
    }

    return (
        <>
            <Toast ref={toast}></Toast>
            <Tooltip target=".file-button" content="Subir imagen" position="bottom" />

            <div className="info-users">
                <div className="info-title">
                    <h3>Datos Generales</h3>
                </div>
                <div className="info-body">
                    <div className="body-image-user">
                        <img src={usuario.FOTO_USUARIO} width={"220px"} height={"200px"} alt="Imagen Usuario"></img>
                        <FileUpload className="file-button" mode="basic" name="file" url= {`${dominio}/api/tabla_usuarios/subirImagen/${uid}`} id="img-user" accept="image/*" maxFileSize={1000000} onUpload={onBasicUploadAuto} auto chooseLabel="Cambiar imagen"/>
                    </div>
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
                            <>
                                <h5>Representante</h5>
                                <p><span className="font-bold w-10">Cargo:</span> {usuario.CARGO_REPRESENTANTE}</p>
                            </>
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
                    <Button icono={"pi pi-check"} label={"Cambiar Contraseña"} onClick={() => setFormContrasenaActivo(true)} />
                    {role === "P002" ? (<Button icono={"pi pi-ban"} label={"Editar Datos Fundación"}  onClick={() => setFormFundActivo(true)} />) : 
                    (role === "P003" && <Button icono={"pi pi-ban"} label={"Editar Datos Organización"} onClick={() => setFormOrgActivo(true)} />) }
                    {role === "P002" || role === "P003" ? (<Button icono={"pi pi-ban"} label={"Editar Datos Representante"} onClick={() => setFormDatosActivo(true)} />) : 
                    (<Button icono={"pi pi-ban"} label={"Editar Datos Personales"} onClick={() => setFormDatosActivo(true)} />)
                    }
                </div>
            </div>
            <Modal
                activo={formContrasenaActivo}
                cerrar={() => setFormContrasenaActivo(false)}
            >
                <FormContrasena
                    cerrar={() => {
                        setFormContrasenaActivo(false);
                        cerrarSesion();
                    }}
                />
            </Modal>
            <Modal
                activo={formFundActivo}
                cerrar={() => setFormFundActivo(false)}
            >
                <FormFundacion
                    id_fundacion = {usuario.CODAI_FUNDACION}
                    cerrar={() => {
                        setFormFundActivo(false);
                    }}
                    recargar={() => {
                        setFormFundActivo(false);
                        obtenerUsuario();
                    }}
                />
            </Modal>
            <Modal
                activo={formOrgActivo}
                cerrar={() => setFormOrgActivo(false)}
            >
                <FormOrganizacion
                    id_organizacion = {usuario.CODAI_ORGANIZACION}
                    cerrar={() => {
                        setFormOrgActivo(false);
                    }}
                    recargar={() => {
                        setFormOrgActivo(false);
                        obtenerUsuario();
                    }}
                />
            </Modal>
            <Modal
                activo={formDatosActivo}
                cerrar={() => setFormDatosActivo(false)}
            >
                <FormDatos
                    rol = {role}
                    idPersona = {usuario.ID_PERSONA}
                    codai_persona = {usuario.CODAI_PERSONA}
                    cerrar={() => {
                        setFormDatosActivo(false);
                    }}
                    recargar={() => {
                        setFormDatosActivo(false);
                        obtenerUsuario();
                    }}
                />
            </Modal>
      </>
    );
}

export default DatosPerfil;