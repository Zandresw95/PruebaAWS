import React, { useReducer, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Modal from '../generic/Modal';
import FormDonacionMonetaria from '../Donacion/FormDonacionMonetaria';
import FormDonacionFisica from '../Donacion/FormDonacionFisica';
import { Dialog } from 'primereact/dialog';
import './CardFundacion.css';

let initialStateModal = {
    form: false,
};

let modalTypes = {
    OPEN_FORM: "OPEN_FORM",
    CLOSE_USUARIOS: "CLOSE_FORM",
};

const CardFundacion = ({fundacion, tipo}) => {
    const [fundacionSelected,setFundacionSelected]= useState(fundacion);
    const [displayModal, setDisplayModal] = useState(false);
    const [tipoDonacion, setTipoDonacion] = useState("");

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
                <Button label="Apadrinar" icon="pi pi-check" className='p-button-info' />
                : tipo == 'donacion' ?
                    <Button label="Donar" icon="pi pi-check" className='p-button-help' onClick={() => onClick('displayModal')}/>
                    : tipo == 'adoptar' ?
                        <Button label="Adoptar" icon="pi pi-check" className="p-button-success" />
                        :
                        <></>
            }
        </div>
    );

    const onHide = (tipo) => {
        setDisplayModal(false);
        setTipoDonacion(tipo);
    }

    const onClick = (name, position) => {
        setDisplayModal(true);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Monetaria" icon="pi pi-dollar" onClick={() => {onHide("monetaria");abrirForm(fundacion.id_fundacion)}}  autoFocus/>
                <Button label="Física" icon="pi pi-home" onClick={() => {onHide("fisica");abrirForm(fundacion.id_fundacion)}}  />
            </div>
        );
    }

    return (
        <div className=''>
            <Card title={fundacion.nombre_fundacion} className='cardFoundacion' footer={footer} header={header}>
                <p className="m-0" style={{ lineHeight: '1.5' }}><strong>Teléfono:</strong> {fundacion.telefono_fundacion}</p>
                <p className="m-0" style={{ lineHeight: '1.5' }}><strong>Dirección:</strong>{fundacion.direccion_fundacion}</p>
            </Card>
            <Modal activo={stateModal.form} cerrar={cerrarForm}>
                {tipoDonacion === "monetaria" ? 
                    <FormDonacionMonetaria
                        id_fundacion={fundacion.id_fundacion}
                        cerrar={() => {
                            cerrarForm();
                        }}
                        nombre={fundacion.nombre_fundacion}
                    />
                    : <FormDonacionFisica 
                            id_fundacion={fundacion.id_fundacion}
                            cerrar={() => {
                                cerrarForm();
                            }}
                            nombre={fundacion.nombre_fundacion} 
                        />
                }
                
            </Modal>
            <Dialog header="Tipo Donación" visible={displayModal} modal={false} style={{ width: '50vw' }} footer={renderFooter('displayModal')} onHide={() => onHide()}>
                    <div>
                        <h5>Monetaria</h5>
                        <p>
                            Para realizar este tipo de donación se presentará un formulario
                            con datos de cuentas bancarias de la fundación para que
                            realices la transferencia o depósito. Recuerda subir el comprobante!
                        </p>
                    </div>
                    <div>
                        <h5>Física</h5>
                        <p> Para realizar este tipo de donación se presentará un formulario
                            para que especifiques lo que deseas donar, recuerda todo es bienvenido
                            desde comida, cobijas hasta colchones y un largo etcétera!</p>
                    </div>
            </Dialog>
        </div>
    );
}

export default CardFundacion;
