import React, { useEffect, useState  } from 'react';
import { Menubar } from 'primereact/menubar';
import MenuSesion from './MenuSesion';
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';

export const MenuBar = () => {
    const {role} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    let items;

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
    const end = <MenuSesion/>

    return (
        <div>
            <Menubar model={items} start={start} end={end} />
        </div>
    );
}