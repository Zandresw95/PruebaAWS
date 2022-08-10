import React, { useReducer, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Dialog } from 'primereact/dialog';
import Pdf from "react-to-pdf";
import { useSelector } from 'react-redux';
import Modal from '../generic/Modal';
import './CardAnimal.css';
import FormApadrinamiento from '../Apadrinamiento/FormApadrinamiento';
import FormAdopcion from '../Adopcion/FormAdopcion';
import CuestionarioAdopcion from '../CuestionarioAdopcion/CuestionarioAdopcion';

let initialStateModal = {
    form: false,
};

let modalTypes = {
    OPEN_FORM: "OPEN_FORM",
    CLOSE_USUARIOS: "CLOSE_FORM",
};

const ref = React.createRef();

const CardAnimal = ({ animal, idFundacion, tipo }) => {
    const [displayModal, setDisplayModal] = useState(false);
    const [displayModalAdopcion, setDisplayModalAdopcion] = useState(false);
    const [animalSelected, setAnimalSelected] = useState(animal);
    const {uid, role} = useSelector((state) => state.auth);


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

    const onHideAdopcion = () => {
        setDisplayModal(false);
        setDisplayModalAdopcion(false);
    }

    const onClick = () => {
        setDisplayModal(true);
    }
    const onClickAdopcion = () => {
        setDisplayModalAdopcion(true);
    }



    let idPersona = localStorage.getItem("idpersona");

    const renderFooter = () => {
        return (
            <div>
                {tipo === "apadrinar" ?
                    <Button label="¡Quiero Apadrinarlo!" icon="pi pi-home" onClick={() => { onHide(); abrirForm(animal.id_animal) }} />
                    : tipo === "adoptar" ? <Button label="¡Quiero Adoptarlo!" icon="pi pi-home" onClick={() => { onClickAdopcion() }} /> : <></>
                }

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
                    <p><span className='font-bold w-10'>Edad:</span> {animal.edad_animal} meses</p>
                </Card>
            </div>
            <Modal activo={stateModal.form} cerrar={cerrarForm}>
                {tipo === "apadrinar" ? (
                    <FormApadrinamiento
                        id_fundacion={idFundacion}
                        id_animal={animal.id_animal}
                        cerrar={() => {
                            cerrarForm();
                        }}
                        nombre={animal.nombre_animal}
                    />
                ) : (
                    <FormAdopcion
                        id_fundacion={idFundacion}
                        id_animal={animal.id_animal}
                        cerrar={() => {
                            cerrarForm();
                        }}
                        nombre={animal.nombre_animal}
                     />
                )}
            </Modal>
            <Dialog header={animal.nombre_animal} visible={displayModal} modal={true} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => onHide()}>
                <div className="flex flex-row justify-content-around">
                    <Image src={animal.foto_animal} alt="Image" width="250" height='180' />
                    <div className="flex flex-column m-2">
                        <h6><strong>Descripción</strong></h6>
                        <p>{animal.descripcion_animal}</p>
                        <h6><strong>Edad</strong></h6>
                        <p>{animal.edad_animal} Meses</p>
                        <h6><strong>Sexo</strong></h6>
                        <p>{animal.sexo_animal}</p>
                    </div>
                </div>
            </Dialog>
            <Dialog header="Solicitud adopción" style={{maxWidth: "785px"}} visible={displayModalAdopcion} modal={true} onHide={() => onHideAdopcion()}>
                <CuestionarioAdopcion 
                    idAnimal={animal.id_animal} 
                    cerrar = { () => onHideAdopcion()} 
                    abrirForm = {() => abrirForm()}
                    nombreAnimal = {animal.nombre_animal}
                />
            </Dialog>
        </>
    );
}

export default CardAnimal;
