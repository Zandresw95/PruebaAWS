import { useState, useEffect } from 'react';
import $ from 'jquery';
import { Dialog } from 'primereact/dialog';
import { dominio } from '../../helpers/Dbdata'
import ContDetalleDon from '../Donacion/ContDetalleDon'
import "./CardDonacionFund.css";

let initialCuestionario = {
    // id_persona: localStorage.getItem("idpersona"),
    pregunta1: [],
    pregunta2: "",
    pregunta3: "",
    pregunta4: "",
    pregunta5: "",
    id_anima6: "",
    pregunta7: "",
    pregunta8: "",
    pregunta9: [],
    pregunta10: "",
    id_animal1: "",
    pregunta12: "",
    pregunta13: "",
    pregunta14: "",
    pregunta15: "",
    id_animal6: "",
};

function CuestionarioAdopcion() {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [cuestionario, setCuestionario] = useState(initialCuestionario);

    const onClick = (name, position) => {
        setDisplayBasic(true);
        console.log(adopcion);
    }

    const onHide = (name) => {
        setDisplayBasic(false);
    }

    return (
        <>
            <Dialog header="Formulario Adopción" visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')}>
                <ContDetalleDon
                    ado={adopcion[0]}
                />
            </Dialog>
        </>

    );
}

export default CuestionarioAdopcion;
