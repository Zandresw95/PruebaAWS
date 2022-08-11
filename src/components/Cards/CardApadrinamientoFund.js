import { useState, useEffect } from 'react';
import $ from 'jquery';
import { Dialog } from 'primereact/dialog';
import { dominio } from '../../helpers/Dbdata'
import ContDetalleApa from '../Apadrinamiento/ContDetalleApa';
import {Avatar} from 'primereact/avatar';
import { useSelector } from "react-redux";
import "./CardDonacionFund.css";

function CardApadrinamientoFund({ datos }) {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [apadrinamiento, setApadrinamiento] = useState("");
    const { name, role } = useSelector((state) => state.auth);

    useEffect(() => {
        obtenerApadrinamientoCompleto();
    }, [datos.ID_APADRINAMIENTO])

    const obtenerApadrinamientoCompleto = () => {
        $.ajax({
            url: `${dominio}/api/tabla_apadrinamientos/obtenerApaCompleta/${datos.ID_APADRINAMIENTO}`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({}),
            beforeSend: function () {
            },
            success: function (data) {
                setApadrinamiento(data.data);
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
        console.log(apadrinamiento);
    }

    const onHide = (name) => {
        setDisplayBasic(false);
    }

    return (
        <>
            <Dialog header="Datos Apadrinamiento" visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')}>
                <ContDetalleApa
                    apa={apadrinamiento[0]}
                />
            </Dialog>
            <div
                className="cont-donacion animar-hover animar-entrada"
                onClick={() => { onClick('displayBasic') }}
            >
               <Avatar style={{alignSelf: "center"}} image={datos.FOTO_ANIMAL} className="mr-2" size="large" shape="circle" onImageError={(e) => { e.target.src = 'https://usuarios-fotos.s3.amazonaws.com/noDisponible.png'; e.target.width = 100; e.target.height = 80 }}/>
                <div className="donacion-textos">
                    {/* <p>{datos.tipo_donacion === "Monetaria" ? "$ " + datos.descripcion_donacion : datos.descripcion_donacion}</p> */}
                    {/* <p>{datos.tipo_donacion}</p> */}
                    <p>{datos.NOMBRE_ANIMAL}</p>
                    {role === "P002" ?
                        (<p>{datos.NOMBRE_PERSONA}</p>)
                        :(<p>{datos.NOMBRE_FUNDACION}</p>)
                    }
                    <p>{datos.FECHA_APADRINAMIENTO}</p>
                </div>
            </div>
        </>

    );
}

export default CardApadrinamientoFund;
