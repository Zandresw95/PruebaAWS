import React, { useReducer, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Dialog } from 'primereact/dialog';
import { useParams } from "react-router-dom";
import Modal from '../generic/Modal';
import './CardAnimal.css';
import FormApadrinamiento from '../Apadrinamiento/FormApadrinamiento';

let initialStateModal = {
    form: false,
};

let modalTypes = {
    OPEN_FORM: "OPEN_FORM",
    CLOSE_USUARIOS: "CLOSE_FORM",
};
const CardAnimal = ({ animal, idFundacion }) => {
    const [displayModal, setDisplayModal] = useState(false);
    const [animalSelected, setAnimalSelected] = useState(animal);


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
        setAnimalSelected(id);
    };

    const cerrarForm = () => {
        dispatchModal({ type: modalTypes.CLOSE_FORM });
        setAnimalSelected(0);
    };

    const onHide = () => {
        setDisplayModal(false);
    }

    const onClick = () => {
        setDisplayModal(true);
    }



    let idPersona = localStorage.getItem("idpersona");

    const renderFooter = () => {
        return (
            <div>
                <Button label="¡Quiero Apadrinarlo!" icon="pi pi-home" onClick={() => { onHide(); abrirForm(animal.id_animal) }} />
            </div>
        );
    }

    const header = (
        <Image src={animal.foto_animal} alt="Image" width="250" height='180' />
    );

    return (
        <>
            <div className='animar-hover animar-entrada' onClick={() => { onClick() }}>
                <Card title={animal.nombre_animal} className='cardAnimal' header={header}>
                    <p className="m-0" style={{ lineHeight: '1.5' }}><strong>Edad:</strong>{animal.edad_animal}</p>
                </Card>
            </div>
            <Modal activo={stateModal.form} cerrar={cerrarForm}>
                <FormApadrinamiento
                    id_fundacion={idFundacion}
                    id_animal={animal.id_animal}
                    cerrar={() => {
                        cerrarForm();
                    }}
                    nombre={animal.nombre_animal}
                />
            </Modal>
            <Dialog header={animal.nombre_animal} visible={displayModal} modal={true} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => onHide()}>
                <div class="flex flex-row justify-content-around">
                    <Image src={animal.foto_animal} alt="Image" width="250" height='180' />
                    <div class="flex flex-column m-2">
                        <h6><strong>Descripción</strong></h6>
                        <p>{animal.descripcion_animal}</p>
                        <h6><strong>Edad</strong></h6>
                        <p>{animal.edad_animal} Meses</p>
                        <h6><strong>Sexo</strong></h6>
                        <p>{animal.sexo_animal}</p>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default CardAnimal;
