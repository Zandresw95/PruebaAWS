import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { Divider } from 'primereact/divider';
import { useSelector } from "react-redux";

function ContDetalleAdo({ ado }) {
    const { name, role } = useSelector((state) => state.auth);
    return (
        <>
            {(role !== "P002") ? (
                <>
                    <Divider align="center">
                        <div className="inline-flex align-items-center">
                            <i className="pi pi-user mr-2"></i>
                            <b>Datos Fundación</b>
                        </div>
                    </Divider>
                    <p><span className="font-bold w-10">Nombre:</span> {ado["NOMBRE_FUNDACION"]}</p>
                    <p><span className="font-bold w-10">Dirección:</span> {ado["DIRECCION_FUNDACION"]}</p>
                    <p><span className="font-bold w-10">Correo electrónico:</span> {ado["EMAIL_FUNDACION"]}</p>
                    <p><span className="font-bold w-10">Teléfono:</span> {ado["TELEFONO_FUNDACION"]}</p>
                </>
            ) : (
                <>
                    <Divider align="center">
                        <div className="inline-flex align-items-center">
                            <i className="pi pi-user mr-2"></i>
                            <b>Datos Adoptante</b>
                        </div>
                    </Divider>
                    <p><span className="font-bold w-10">Nombres:</span> {ado["NOMBRE_PERSONA"]}</p>
                    <p><span className="font-bold w-10">Apellidos:</span> {ado["APELLIDO_PERSONA"]}</p>
                    <p><span className="font-bold w-10">Correo electrónico:</span> {ado["EMAIL_PERSONA"]}</p>
                    <p><span className="font-bold w-10">Teléfono:</span> {ado["TELEFONO_PERSONA"]}</p>
                    <p><span className="font-bold w-10">Cédula:</span> {ado["CEDULA_PERSONA"]}</p>
                </>
            )}
            <Divider align="center">
                <div className="inline-flex align-items-center">
                    <i className="pi pi-home mr-2"></i>
                    <b>Datos Adopción</b>
                </div>
            </Divider>
            <>
                <div className='flex flex-row flex-wrap justify-content-around align-items-center'>
                    <div>
                        <img alt="Comprobante" width='200' height='160' src={ado["FOTO_ANIMAL"]} onError={(e) => { e.target.src = 'https://usuarios-fotos.s3.amazonaws.com/noDisponible.png'; e.target.width = 100; e.target.height = 80 }} />
                    </div>
                    <div>
                        <p><span className="font-bold w-10">Fecha:</span> {ado["FECHA_APADRINAMIENTO"]}</p>
                        <p><span className="font-bold w-10">Nombre: </span> {ado["NOMBRE_ANIMAL"]}</p>
                        <p><span className="font-bold w-10">Descripción: </span> {ado["DESCRIPCION_ANIMAL"]}</p>
                        <p><span className="font-bold w-10">Edad: </span>{ado["EDAD_ANIMAL"]}</p>
                        <p><span className="font-bold w-10">Sexo: </span>{ado["SEXO_ANIMAL"]}</p>
                        <p><span className="font-bold w-10">Monto mensual: </span>{ado["MONTO_APADRINAMIENTO"]}</p>
                        <br />
                    </div>
                </div>
            </>
        </>
    );
}

export default ContDetalleAdo;