import React, { useEffect, useState, useReducer, useMemo } from "react";
import Button from "../generic/Button";
import ContInput from "../generic/ContInput";
import Modal from "../generic/Modal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import $ from "jquery";
import Animal from "./animales/Animal";
import FormAnimal from "./animales/FormAnimal";
import { dominio } from "../../helpers/Dbdata";

let initialStateModal = {
    form: false,
};
  
let modalTypes = {
    OPEN_FORM: "OPEN_FORM",
    CLOSE_FORM: "CLOSE_FORM",
};

function Animales() {
    const [stateModal, dispatchModal] = useReducer(
        reducerModal,
        initialStateModal
    );
    const [animalFund, setanimalFund] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const [idAnimal, setIdAnimal] = useState("");
    const [idFund, setIdFund] = useState("");
    const { name, role } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerIdFundacion();
    }, [])

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
        setIdAnimal(id);
    };
    
    const cerrarForm = () => {
        dispatchModal({ type: modalTypes.CLOSE_FORM });
        setIdAnimal(0);
    };
    

    const obteneranimalParaFund = (id_fundacion) => {
        $.ajax({
            url: `${dominio}/api/tabla_animal/animalesFundacion/${id_fundacion}`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({}),
            beforeSend: function () {

            },
            success: function (data) {
                console.log(data.data);
                setanimalFund(data.data);
            },
            error: function (data) {
                console.log(data.responseJSON.data);
            },
        });
    }

    const obtenerIdFundacion = () => {
        const id_persona = localStorage.getItem("idpersona");
        $.ajax({
            url: `${dominio}/api/tabla_fundaciones/persona/${id_persona}`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({}),
            beforeSend: function () {

            },
            success: function (data) {
                console.log(data.data);
                setIdFund(data.data);
                obteneranimalParaFund(data.data);
            },
            error: function (data) {
                console.log(data.responseJSON.data);
            },
        });
    };

    const animal = useMemo(
        () =>
          animalFund.filter(
            (el) =>
              el.nombre_animal.toLowerCase().includes(terminoBusqueda.toLowerCase())
          ),
        [terminoBusqueda, animalFund]
      );

    return (
        <>
            { (role === "P001" || role === "P002") ?  (
                <>
                    <div className="encabezado-nombre-barra-buscar">
                        <div className="cont-flex-gap">
                        <h3 className="titulo-pagina">Mis animalitos</h3>
                        </div>
                        <div style={{ width: "200px", justifySelf: "left" }}>
                        <ContInput icono={"ico-lupa"}>
                            <input
                            name="buscar"
                            onChange={(e) => setTerminoBusqueda(e.target.value)}
                            value={terminoBusqueda}
                            placeholder="Buscar"
                            />
                        </ContInput>
                        </div>
                        <div style={{ width: "max-content" }}>
                            <Button
                            label={"Nuevo"}
                            icono="ico-anadir"
                            onClick={() => abrirForm(0)}
                            />
                        </div>
                    </div>
                <div className="contenedorPrincipal animar-zoom-min-to-max">
                    <div className="contenedorContenido">
                        <div className="contenedorPagina">
                            <div className="cont-opciones">
                             { animal.length > 0 ?
                                animal.map((el, i) => {
                                    return(
                                        <Animal
                                            key={"centro" + i}
                                            datos={el}
                                            abrirForm={abrirForm}
                                        />
                                    )
                                })
                                : "No existen animales"
                             }   
                            </div>   
                        </div>
                    </div>
                </div>
                <Modal activo={stateModal.form} cerrar={cerrarForm}>
                    <FormAnimal
                        id_fundacion={idFund}
                        idanimal={idAnimal}
                        cerrar={cerrarForm}
                        recargar={() =>{
                            cerrarForm();
                            obtenerIdFundacion();
                        }}
                    />
                </Modal>
                </>
                ) : (<></>)
            }
        </>
    );
}

export default Animales;