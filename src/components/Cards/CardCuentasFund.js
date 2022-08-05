import {useState, useEffect} from 'react';
import $ from 'jquery';
import { Dialog } from 'primereact/dialog';
import {dominio} from '../../helpers/Dbdata'
import ContDetalleDon from '../cuenta/ContDetalleDon'
import "./CardCuentaFund.css";

function CardCuentasFund({datos}) {
  const [displayBasic, setDisplayBasic] = useState(false);

  const onClick = (name, position) => {
    setDisplayBasic(true);
  }

  const onHide = (name) => {
      setDisplayBasic(false);
  }

  return (
    <>
      <Dialog header="Datos Cuenta" visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')}>
        <ContDetalleDon
          don = {cuenta[0]}
        />
      </Dialog>
      <div
        className="cont-cuenta animar-hover animar-entrada"
        onClick={() => {onClick('displayBasic')}}
      >
        {/* <p className="usuario-inicial">{datos.nombre[0].toUpperCase()}</p> */}
        <div
          className={ datos.tipo_cuenta === "Monetaria" ?
            "cont-ico-usuario-card-config "+ ("borde-cuenta-" + 3) : "cont-ico-usuario-card-config "+ ("borde-cuenta-" + 4)
          }
        >
          {
              datos.tipo_cuenta === "Monetaria" ? (<div className="pi pi-money-bill text-3xl text-center format-ico-cuenta-config"></div>) : (<div className="pi pi-home text-3xl w-10 format-ico-cuenta-config"></div>)
          }
          
        </div>
        <div className="cuenta-textos">
          <p>{datos.tipo_cuenta === "Monetaria" ? "$ "+datos.descripcion_cuenta: datos.descripcion_cuenta}</p>
          <p>{datos.tipo_cuenta}</p>
          <p>{datos.fecha_cuenta}</p>
        </div>
      </div>
    </>

  );
}

export default CardCuentasFund;
