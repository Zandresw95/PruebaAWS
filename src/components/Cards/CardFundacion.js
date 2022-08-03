import React, { useReducer, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import Modal from '../generic/Modal';
import FormDonacion from '../Donacion/FormDonacion';
import './CardFundacion.css';
let initialStateModal = {
    form: false,
};

let modalTypes = {
    OPEN_FORM: "OPEN_FORM",
    CLOSE_USUARIOS: "CLOSE_FORM",
};

const CardFundacion = ({fundacion,tipo}) => {
    const navigate = useNavigate();
    const [fundacionSelected,setFundacionSelected]= useState(fundacion)
    const [stateModal, dispatchModal] = useReducer(
        reducerModal,
        initialStateModal
    );


    function reducerModal(state, action) {
        switch (action.type) {
            case modalTypes.OPEN_FORM:
                return { ...state, form: true };
            case modalTypes.CLOSE_FORM:
                return { ...state, form: false };
            default:
                break;
        }
    }


    const abrirForm = (id) => {
        dispatchModal({ type: modalTypes.OPEN_FORM });
        setFundacionSelected(id);
    };

    const cerrarForm = () => {
        dispatchModal({ type: modalTypes.CLOSE_FORM });
        setFundacionSelected(0);
    };
    const header = (
        <div className='flex justify-content-center'>
            <div className='ico-fundacion-default w-5 h-5'></div>
        </div>
    );
    const footer = (
        <div className='flex flex-row flex-wrap card-container justify-content-evenly '>
            {tipo == 'apadrinamiento' ?
                <Button label="Apadrinar" icon="pi pi-check" className='p-button-info' onClick={()=>{
                    navigate(`/fundacionesApadrinar/${fundacion.id_fundacion}`);
                }}/>
                : tipo == 'donacion' ?
                    <Button label="Donar" icon="pi pi-check" className='p-button-help' onClick={()=>{
                        abrirForm(fundacion.id_fundacion);
                    }}/>
                    : tipo == 'adoptar' ?
                        <Button label="Adoptar" icon="pi pi-check" className="p-button-success" onClick={()=>{
                            navigate(`/fundacionesApadrinar/${fundacion.id_fundacion}`);
                        }}/>
                        :
                        <></>
            }
        </div>
    );

    return (
        <div className=''>
            <Card title={fundacion.nombre_fundacion} className='cardFoundacion' footer={footer} header={header}>
                <p className="m-0" style={{ lineHeight: '1.5' }}><strong>Telefnono:</strong> {fundacion.telefono_fundacion}</p>
                <p className="m-0" style={{ lineHeight: '1.5' }}><strong>Dirección:</strong>{fundacion.direccion_fundacion}</p>
            </Card>
            <Modal activo={stateModal.form} cerrar={cerrarForm}>
                <FormDonacion
                    id_fundacion={fundacion.id_fundacion}
                    cerrar={() => {
                        cerrarForm();
                    }}
                    nombre={fundacion.nombre_fundacion}
                />
            </Modal>
        </div>
    );
}

export default CardFundacion;
