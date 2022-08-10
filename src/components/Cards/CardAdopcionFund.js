import { useState, useEffect } from 'react';
import $ from 'jquery';
import { Dialog } from 'primereact/dialog';
import { dominio } from '../../helpers/Dbdata'
import ContDetalleDon from '../Donacion/ContDetalleDon'
import "./CardDonacionFund.css";

function CardAdopcionFund({ datos }) {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [adopcion, setAdopcion] = useState("");

    useEffect(() => {
        obtenerAdopcionCompleta();
    }, [datos.id_adopcion])

    const obtenerAdopcionCompleta = () => {
        $.ajax({
            url: `${dominio}/api/tabla_adopciones/obtenerDonCompleta/${datos.id_adopcion}`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({}),
            beforeSend: function () {
            },
            success: function (data) {
                setAdopcion(data.data);
            },
            error: function (data) {
                console.log(data.responseJSON.data);
                let mensaje = data.responseJSON.data;
                // if (data.status === 0)
                // mostrarPopup(0, "No es posible conectarse al servidor Node JS");
                // else mostrarPopup(2, mensaje);
            },
        });
    };

    const onClick = (name, position) => {
        setDisplayBasic(true);
        console.log(adopcion);
    }

    const onHide = (name) => {
        setDisplayBasic(false);
    }

    return (
        <>
            <Dialog header="Datos Adopción" visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')}>
                <ContDetalleDon
                    ado={adopcion[0]}
                />
            </Dialog>
            <div
                className="cont-donacion animar-hover animar-entrada"
                onClick={() => { onClick('displayBasic') }}
            >
                {/* <p className="usuario-inicial">{datos.nombre[0].toUpperCase()}</p> */}
                <div
                    className={datos.tipo_donacion === "Monetaria" ?
                        "cont-ico-usuario-card-config " + ("borde-donacion-" + 3) : "cont-ico-usuario-card-config " + ("borde-donacion-" + 4)
                    }
                >
                    {
                        datos.tipo_donacion === "Monetaria" ? (<div className="pi pi-money-bill text-3xl text-center format-ico-donacion-config"></div>) : (<div className="pi pi-home text-3xl w-10 format-ico-donacion-config"></div>)
                    }

                </div>
                <div className="donacion-textos">
                    {/* <p>{datos.tipo_donacion === "Monetaria" ? "$ " + datos.descripcion_donacion : datos.descripcion_donacion}</p> */}
                    {/* <p>{datos.tipo_donacion}</p> */}
                    <p>{datos.fecha_solicitud}</p>
                </div>
            </div>
        </>

    );
}

export default CardAdopcionFund;
