import React, { useState, useEffect } from 'react';
import { PickList } from 'primereact/picklist';
import { Dropdown } from 'primereact/dropdown';
import $ from "jquery";
import {dominio } from "../../../helpers/Dbdata";
import './PickListDemo.css';
import './AsigOpcPerfil.css';

const AsigOpcPerfiles = () => {
    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);
    const [mostrarCargando, setMostrarCargando] = useState(false);
    const [perfil, setPerfil] = useState("");
    const [perfiles, setPerfiles] = useState([]);

    useEffect(() => {
        obtenerPerfiles();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
        console.log(event.source);
        agregarOpciones(event.source, event.target);
        
    }

    const onChangeSelect = (e) => {
        
        setPerfil(e.value);
        obtenerAsignados(e.value);
        obtenerNoAsignados(e.value); 
   
    }

    const agregarOpciones = (asignadas, noAsignadas) => {
        for(const el of asignadas) {
            $.ajax({
                url: `http://${dominio}/api/tabla_opc_perfil/agregar/${perfil}`,
                type: "post",
                async: false,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({id_opcion: el['ID_OPCION']}),
                success: function (data) {
                    console.log(data.data);
                    let mensaje = data.data;
                    setMostrarCargando(false);
                },
                error: function (data) {
                    setMostrarCargando(false);
                    console.log(data.responseJSON.data);
                    let mensaje = data.responseJSON.data;
                    // if (data.status === 0)
                    // mostrarPopup(0, "No es posible conectarse al servidor Node JS");
                    // else mostrarPopup(2, mensaje);
                },
                });
        }
        noAsignadas.map((el) => {
            $.ajax({
                url: `http://${dominio}/api/tabla_opc_perfil/delete/${perfil}`,
                type: "delete",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({id_opcion: el['ID_OPCION']}),
                success: function (data) {
                    console.log(data.data);
                    let mensaje = data.data;
                    setMostrarCargando(false);
                },
                error: function (data) {
                    setMostrarCargando(false);
                    console.log(data.responseJSON.data);
                    let mensaje = data.responseJSON.data;
                    // if (data.status === 0)
                    // mostrarPopup(0, "No es posible conectarse al servidor Node JS");
                    // else mostrarPopup(2, mensaje);
                },
                });
        })
    }

    const obtenerPerfiles = () => {
        $.ajax({
            url: `http://${dominio}/api/tabla_perfiles/obtener/activos`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({}),
            success: function (data) {
              setPerfiles(data.data);
              setMostrarCargando(false);
            },
            error: function (data) {
              setMostrarCargando(false);
              console.log(data.responseJSON.data);
              let mensaje = data.responseJSON.data;
              // if (data.status === 0)
              // mostrarPopup(0, "No es posible conectarse al servidor Node JS");
              // else mostrarPopup(2, mensaje);
            },
        });
    }

    const obtenerAsignados = (perfil) => {
        $.ajax({
            url: `http://${dominio}/api/tabla_opc_perfil/obtener/opcAsig/${perfil}`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({}),
            success: function (data) {
              setSource(data.data);
              setMostrarCargando(false);
            },
            error: function (data) {
              setMostrarCargando(false);
              setSource([]);
              console.log(data.responseJSON.data);
              let mensaje = data.responseJSON.data;
              // if (data.status === 0)
              // mostrarPopup(0, "No es posible conectarse al servidor Node JS");
              // else mostrarPopup(2, mensaje);
            },
        });
    }

    const obtenerNoAsignados = (perfil) => {
        $.ajax({
            url: `http://${dominio}/api/tabla_opc_perfil/obtener/opcNotAsig/${perfil}`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({}),
            success: function (data) {
              setTarget(data.data);
              setMostrarCargando(false);
            },
            error: function (data) {
              setMostrarCargando(false);
              setTarget([]);
              console.log(data.responseJSON.data);
              let mensaje = data.responseJSON.data;
              // if (data.status === 0)
              // mostrarPopup(0, "No es posible conectarse al servidor Node JS");
              // else mostrarPopup(2, mensaje);
            },
        });
    }

    const opcionTemplate = (opcion) => {
        return (
            <div className="product-item">
                <div className="product-list-detail">
                    <h6 className="mb-2">{opcion['DESCRIPCION_OPCION']}</h6>
                </div>
            </div>
        );
    }

    return (
    <>
      {mostrarCargando ? (
        <div className="cont-loader-full-container">
          <div className="loader format-ico-loader"></div>
        </div>
      ) : (
        
        <div className="cont-asignaraa animar-zoom-min-to-max">
            <div className="barra-acciones-title">
                <h3 className="title">ASIGNAR OPCIONES</h3>
            </div>
            <div className="barra-acciones-perfil">
                <div className="dropdown-demo">
                    <h5>Perfiles</h5>
                    <Dropdown style={{width: '14rem'}} id='select-perfil' value={perfil} options={perfiles} onChange={onChangeSelect} placeholder="Selecciona un perfil"/>
                </div>
            </div>
            <div className="cont-contenido-opciones">
                <div className="picklist-demo">
                    <div className="card-1">
                        <PickList style={{marginTop: "80px", marginLeft: "78px", marginRight: "57px"}} source={source} target={target} itemTemplate={opcionTemplate}
                            sourceHeader="Opciones asignadas" targetHeader="Opciones no asignadas"
                            showSourceControls={false} showTargetControls={false} 
                            sourceStyle={{ height: '342px' }} targetStyle={{ height: '342px' }}
                            onChange={onChange}>
                        </PickList>
                    </div>
                </div>
            </div>
        </div>
        
      )}
    </>
    );
}

export default AsigOpcPerfiles;