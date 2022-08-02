import React, { useEffect, useState, useMemo } from "react";
import { Button } from 'primereact/button';
import ContInput from "../components/generic/ContInput";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CardFundacion from "../components/Cards/CardFundacion";
import CardDonacionFund from "../components/Cards/CardDonacionFund";
import $ from "jquery";
import { dominio } from "../helpers/Dbdata";

function Fundaciones({tipo}) {
    const [fundaciones, setFundaciones] = useState([]);
    const [donacionesFund, setDonacionesFund] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const { name, role } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(role === "P002"){
            obtenerIdFundacion();
        }else{
            obtenerFundaciones();
        }
    }, [])

    const obtenerFundaciones = () => {
        $.ajax({
            url: `${dominio}/api/tabla_fundaciones`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({}),
            beforeSend: function () {

            },
            success: function (data) {
                console.log(data.data);
                setFundaciones(data.data);
            },
            error: function (data) {
                console.log(data.responseJSON.data);
            },
        });
    };

    const obtenerDonacionesParaFund = (id_fundacion) => {
        $.ajax({
            url: `${dominio}/api/tabla_donaciones/fundacion/${id_fundacion}`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({}),
            beforeSend: function () {

            },
            success: function (data) {
                console.log(data.data);
                setDonacionesFund(data.data);
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
                obtenerDonacionesParaFund(data.data);
            },
            error: function (data) {
                console.log(data.responseJSON.data);
            },
        });
    };

    const donaciones = useMemo(
        () =>
          donacionesFund.filter(
            (el) =>
              el.descripcion_donacion.toLowerCase().includes(terminoBusqueda.toLowerCase())
          ),
        [terminoBusqueda, donacionesFund]
      );

    return (
        <>
            { (role === "P001" || role === "P004") ? (
                <div className="flex flex-row flex-wrap gap-3">
                    {
                        fundaciones.length > 0 ?
                            fundaciones.map((el, i) => {
                                return (
                                    <CardFundacion
                                        key={"id"+i}
                                        fundacion={el}
                                        tipo={tipo}
                                    />
                                )
                            })
                        : "No existen Fundaciones"
                    }
                </div>
            )  
                : (role === "P002") ?  (
                <>
                    <div className="encabezado-nombre-barra-buscar">
                        <div className="cont-flex-gap">
                        <h3 className="titulo-pagina">Donaciones</h3>
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
                    </div>
                <div className="contenedorPrincipal animar-zoom-min-to-max">
                    <div className="contenedorContenido">
                        <div className="contenedorPagina">
                            <div className="cont-opciones">
                             { donaciones.length > 0 ?
                                donaciones.map((el, i) => {
                                    return(
                                        <CardDonacionFund
                                            key={"donacion" + i}
                                            datos={el}
                                            tipo={tipo}
                                        />
                                    )
                                })
                                : "No existen donaciones"
                             }   
                            </div>   
                        </div>
                    </div>
                </div>
                </>
                ) : (<></>)
            }
        </>
    );
}

export default Fundaciones;