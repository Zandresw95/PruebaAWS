import React, { useEffect, useState, useReducer, useMemo } from "react";
import Button from "../generic/Button";
import ContInput from "../generic/ContInput";
import Modal from "../generic/Modal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import $ from "jquery";
import CentroAlm from './centrosAlm/CentroAlm';
import FormCentroAlm from "./centrosAlm/FormCentroAlm";
import { dominio } from "../../helpers/Dbdata";

let initialStateModal = {
    form: false,
};
  
let modalTypes = {
    OPEN_FORM: "OPEN_FORM",
    CLOSE_FORM: "CLOSE_FORM",
};

function CentrosAlm() {
    const [stateModal, dispatchModal] = useReducer(
        reducerModal,
        initialStateModal
    );
    const [centrosFund, setcentrosFund] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const [idcentro, setIdcentro] = useState("");
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
        setIdcentro(id);
    };
    
    const cerrarForm = () => {
        dispatchModal({ type: modalTypes.CLOSE_FORM });
        setIdcentro(0);
    };
    

    const obtenercentrosParaFund = (id_fundacion) => {
        $.ajax({
            url: `${dominio}/api/tabla_centro_almacenamiento/fundacion/${id_fundacion}`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({}),
            beforeSend: function () {

            },
            success: function (data) {
                console.log(data.data);
                setcentrosFund(data.data);
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
                obtenercentrosParaFund(data.data);
            },
            error: function (data) {
                console.log(data.responseJSON.data);
            },
        });
    };

    const centros = useMemo(
        () =>
          centrosFund.filter(
            (el) =>
              el.nombre_centro_almacenamiento.toLowerCase().includes(terminoBusqueda.toLowerCase())
          ),
        [terminoBusqueda, centrosFund]
      );

    return (
        <>
            { (role === "P001" || role === "P002") ?  (
                <>
                    <div className="encabezado-nombre-barra-buscar">
                        <div className="cont-flex-gap">
                        <h3 className="titulo-pagina">Mis centros de acopio</h3>
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
                             { centros.length > 0 ?
                                centros.map((el, i) => {
                                    return(
                                        <CentroAlm
                                            key={"centro" + i}
                                            datos={el}
                                            abrirForm={abrirForm}
                                        />
                                    )
                                })
                                : "No existen centros"
                             }   
                            </div>   
                        </div>
                    </div>
                </div>
                <Modal activo={stateModal.form} cerrar={cerrarForm}>
                    <FormCentroAlm
                        id_fundacion={idFund}
                        idcentro={idcentro}
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

export default CentrosAlm;