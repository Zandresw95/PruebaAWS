import React, { useEffect, useState, useMemo } from "react";
import ContInput from "../../generic/ContInput";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CardDonacionFund from "../../Cards/CardDonacionFund";
import $ from "jquery";
import { dominio } from "../../../helpers/Dbdata";

function UsuarioDonaciones() {
    const [donacionesPer, setDonacionesPer] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const { name, role } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerDonacionesParaPersona(localStorage.getItem("idpersona"));
    }, [localStorage.getItem("idpersona")])

    const obtenerDonacionesParaPersona = (id_persona) => {
        $.ajax({
            url: `${dominio}/api/tabla_donaciones/persona/${id_persona}`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({}),
            beforeSend: function () {

            },
            success: function (data) {
                console.log(data.data);
                setDonacionesPer(data.data);
            },
            error: function (data) {
                console.log(data.responseJSON.data);
            },
        });
    }

    const donaciones = useMemo(
        () =>
          donacionesPer.filter(
            (el) =>
              el.descripcion_donacion.toLowerCase().includes(terminoBusqueda.toLowerCase())
          ),
        [terminoBusqueda, donacionesPer]
      );

    return (
        <>
            { (role === "P001" || role === "P004" || role === "P003") ?  (
                <>
                    <div className="encabezado-nombre-barra-buscar">
                        <div className="cont-flex-gap">
                        <h3 className="titulo-pagina">Mis donaciones</h3>
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

export default UsuarioDonaciones;