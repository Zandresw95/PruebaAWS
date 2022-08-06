import React, { useEffect, useState, useMemo } from "react";
import ContInput from "../../generic/ContInput";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CardApadrinamientoFund from "../../Cards/CardApadrinamientoFund";
import $ from "jquery";
import { dominio } from "../../../helpers/Dbdata";

function UsuarioApadrinamiento() {
    const [apadrinamientoPer, setApadrinamientoPer] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const { name, role } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerApadrinamientoParaPersona(localStorage.getItem("idpersona"));
    }, [localStorage.getItem("idpersona")])

    const obtenerApadrinamientoParaPersona = (id_persona) => {
        $.ajax({
            url: `${dominio}/api/tabla_apadrinamientos/persona/${id_persona}`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({}),
            beforeSend: function () {

            },
            success: function (data) {
                console.log(data.data);
                setApadrinamientoPer(data.data);
            },
            error: function (data) {
                console.log(data.responseJSON.data);
            },
        });
    }

    const apadrinamientos = useMemo(
        () =>
          apadrinamientoPer.filter(
            (el) =>
              el.fecha_apadrinamiento.toLowerCase().includes(terminoBusqueda.toLowerCase())
          ),
        [terminoBusqueda, apadrinamientoPer]
      );

    return (
        <>
            { (role === "P001" || role === "P004" || role === "P003") ?  (
                <>
                    <div className="encabezado-nombre-barra-buscar">
                        <div className="cont-flex-gap">
                        <h3 className="titulo-pagina">Mis apadrinamientos</h3>
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
                             { apadrinamientos.length > 0 ?
                                apadrinamientos.map((el, i) => {
                                    return(
                                        <CardApadrinamientoFund
                                            key={"donacion" + i}
                                            datos={el}
                                        />
                                    )
                                })
                                : "No existen apadrinamientos"
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

export default UsuarioApadrinamiento;