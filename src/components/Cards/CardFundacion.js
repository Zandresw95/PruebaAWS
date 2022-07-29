import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';


const CardFundacion = ({fundacion,tipo}) => {
    console.log("lo que llega",tipo)
    const header = (
        <div className='flex justify-content-center'>
            <div className='ico-fundacion-default w-6 h-6'></div>
        </div>
    );
    const footer = (
        <div className='flex flex-row flex-wrap card-container justify-content-evenly '>
            {tipo == 'apadrinamiento' ?
                <Button label="Apadrinar" icon="pi pi-check" className='p-button-info' />
                : tipo == 'donacion' ?
                    <Button label="Donar" icon="pi pi-check" className='p-button-help' />
                    : tipo == 'adoptar' ?
                        <Button label="Adoptar" icon="pi pi-check" className="p-button-success" />
                        :
                        <></>
            }
        </div>
    );

    return (
        <div className=''>
            <Card title={fundacion.nombre_fundacion} style={{ width: '28em' }} footer={footer} header={header}>
                <p className="m-0" style={{ lineHeight: '1.5' }}><strong>Telefnono:</strong> {fundacion.telefono_fundacion}</p>
                <p className="m-0" style={{ lineHeight: '1.5' }}><strong>Dirección:</strong>{fundacion.direccion_fundacion}</p>
            </Card>
        </div>
    );
}

export default CardFundacion;
