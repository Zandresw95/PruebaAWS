import React, { useEffect, useState  } from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { SplitButton } from 'primereact/splitbutton';
import MenuSesion from './MenuSesion';
import { dominio } from "../../helpers/Dbdata";
import { startLogout } from "../../reduxStore/actions/auth";
import $ from 'jquery';
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

export const MenuBar = () => {
    const {uid, role} = useSelector((state) => state.auth);
    const [usuario, setUsuario] = useState({});
    const navigate = useNavigate();
    let items;
    const itemsButton = [
        {
            label: 'Cerrar sesión',
            icon: 'pi pi-times',
            command: () => {
                cerrarSesion();
            }
        }
    ];

    useEffect(() => {
        obtenerUsuario();
    }, [uid]);

    const dispatch = useDispatch();
    const cerrarSesion = () => {
      dispatch(startLogout());
    };

    const obtenerUsuario = () => {
        $.ajax({
            url: `${dominio}/api/tabla_usuarios/fullID/${uid}`,
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

        if(role !== "P002"){
            items = [
                {
                    label: 'Mis donaciones',
                    icon: 'pi pi-dollar',
                    command: () => {navigate('/usuario/donaciones') }
                },
                {
                    label: 'Mis apadrinamientos',
                    icon: 'pi pi-home',
                    command: () => {navigate('/usuario/apadrinamientos') }
                },
                {
                    label: 'Mis adopciones',
                    icon: 'pi pi-home',
                    command: () => {navigate('/usuario/adopciones') }
                }
            ];
            
        }else{
            items = [
                {
                    label: 'Mis cuentas bancarias',
                    icon: 'pi pi-dollar',
                    command: () => {navigate('/cuentas') }
                },
                {
                    label: 'Mis centros de acopio',
                    icon: 'pi pi-home',
                    command: () => {navigate('/centros') }
                },
                {
                    label: 'Mis animales',
                    icon: 'pi pi-check',
                    command: () => {navigate('/animales') }
                }
            ];
        }

    const start = <img alt="logo" src="https://usuarios-fotos.s3.amazonaws.com/logoApp.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2" onClick={() => navigate("/")}></img>;
    const end = (
        <>
            <SplitButton label={<div className='flex align-items-center gap-1'><Avatar image={usuario.foto_usuario} shape="circle" onImageError={(e) => { e.target.src = 'https://usuarios-fotos.s3.amazonaws.com/janaranjo.png'; e.target.width = 100; e.target.height = 80 }}/>   {usuario.login_usuario}</div>} model={itemsButton} className="p-button-rounded p-button-info mr-2 mb-2">
            </SplitButton>
        </>
    )

    return (
        <div>
            <Menubar model={items} start={start} end={end} />
        </div>
    );
}