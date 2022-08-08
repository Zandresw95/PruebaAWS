import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { Divider } from 'primereact/divider';
import { useSelector } from "react-redux";

function ContDetalleApa({ apa }) {
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
                    <p><span className="font-bold w-10">Nombre:</span> {apa["NOMBRE_FUNDACION"]}</p>
                    <p><span className="font-bold w-10">Dirección:</span> {apa["DIRECCION_FUNDACION"]}</p>
                    <p><span className="font-bold w-10">Correo electrónico:</span> {apa["EMAIL_FUNDACION"]}</p>
                    <p><span className="font-bold w-10">Teléfono:</span> {apa["TELEFONO_FUNDACION"]}</p>
                </>
            ) : (
                <>
                    <Divider align="center">
                        <div className="inline-flex align-items-center">
                            <i className="pi pi-user mr-2"></i>
                            <b>Datos Padrino</b>
                        </div>
                    </Divider>
                    <p><span className="font-bold w-10">Nombres:</span> {apa["NOMBRE_PERSONA"]}</p>
                    <p><span className="font-bold w-10">Apellidos:</span> {apa["APELLIDO_PERSONA"]}</p>
                    <p><span className="font-bold w-10">Correo electrónico:</span> {apa["EMAIL_PERSONA"]}</p>
                    <p><span className="font-bold w-10">Teléfono:</span> {apa["TELEFONO_PERSONA"]}</p>
                    <p><span className="font-bold w-10">Cédula:</span> {apa["CEDULA_PERSONA"]}</p>
                </>
            )}
            <Divider align="center">
                <div className="inline-flex align-items-center">
                    <i className="pi pi-home mr-2"></i>
                    <b>Datos Apadrinamiento</b>
                </div>
            </Divider>
            <>
                <div className='flex flex-row flex-wrap justify-content-around align-items-center'>
                    <div>
                        <img alt="Comprobante" width='200' height='160' src={apa["FOTO_ANIMAL"]} onError={(e) => { e.target.src = 'https://usuarios-fotos.s3.amazonaws.com/noDisponible.png'; e.target.width = 100; e.target.height = 80 }} />
                    </div>
                    <div>
                        <p><span className="font-bold w-10">Fecha:</span> {apa["FECHA_APADRINAMIENTO"]}</p>
                        <p><span className="font-bold w-10">Nombre: </span> {apa["NOMBRE_ANIMAL"]}</p>
                        <p><span className="font-bold w-10">Descripción: </span> {apa["DESCRIPCION_ANIMAL"]}</p>
                        <p><span className="font-bold w-10">Edad: </span>{apa["EDAD_ANIMAL"]}</p>
                        <p><span className="font-bold w-10">Sexo: </span>{apa["SEXO_ANIMAL"]}</p>
                        <p><span className="font-bold w-10">Monto mensual: </span>{apa["MONTO_APADRINAMIENTO"]}</p>
                        <br />
                    </div>
                </div>
            </>
        </>
    );
}

export default ContDetalleApa;