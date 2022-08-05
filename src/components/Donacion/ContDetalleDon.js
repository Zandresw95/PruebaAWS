import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { Divider } from 'primereact/divider';
import { useSelector } from "react-redux";

function ContDetalleDon({don}) {
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
                    <p><span className="font-bold w-10">Nombre:</span> {don["NOMBRE_FUNDACION"]}</p>
                    <p><span className="font-bold w-10">Dirección:</span> {don["DIRECCION_FUNDACION"]}</p>
                    <p><span className="font-bold w-10">Correo electrónico:</span> {don["EMAIL_FUNDACION"]}</p>
                    <p><span className="font-bold w-10">Teléfono:</span> {don["TELEFONO_FUNDACION"]}</p>
                </>
            ) : (
                <>
                    <Divider align="center">
                        <div className="inline-flex align-items-center">
                            <i className="pi pi-user mr-2"></i>
                            <b>Datos Donante</b>
                        </div>
                    </Divider>
                    <p><span className="font-bold w-10">Nombres:</span> {don["NOMBRE_PERSONA"]}</p>
                    <p><span className="font-bold w-10">Apellidos:</span> {don["APELLIDO_PERSONA"]}</p>
                    <p><span className="font-bold w-10">Correo electrónico:</span> {don["EMAIL_PERSONA"]}</p>
                    <p><span className="font-bold w-10">Teléfono:</span> {don["TELEFONO_PERSONA"]}</p>
                    <p><span className="font-bold w-10">Cédula:</span> {don["CEDULA_PERSONA"]}</p>
                </>
            )}
            
            <Divider align="center">
                <div className="inline-flex align-items-center">
                    <i className="pi pi-home mr-2"></i>
                    <b>Datos Donación</b>
                </div>
            </Divider>
            <p><span className="font-bold w-10">Fecha:</span> {don["FECHA_DONACION"]}</p>
            {don["TIPO_DONACION"] === "Monetaria" ? (
                <>
                    <p><span className="font-bold w-10">Descripción:</span> ${don["DESCRIPCION_DONACION"]}</p>
                    <p><span className="font-bold w-10">Cuenta cepositada:</span> {don["BANCO_CUENTA"]+" "+don["NUMERO_CUENTA"]+" "+don["TIPO_CUENTA"] }</p>
                    <p><span className="font-bold w-10">Comprobante</span></p>
                    <br/>
                    <Inplace  className="justify-content-center">
                        <InplaceDisplay>
                            <span className="inline-flex align-items-center">
                                <span className="pi pi-search"></span>
                                <span className="ml-2">Ver comprobante</span>
                            </span>
                        </InplaceDisplay>
                        <InplaceContent className="flex justify-content-center">
                            <img alt="Comprobante" src={don["OBSERVACION_DONACION"]} onError={(e) => {e.target.src='https://usuarios-fotos.s3.amazonaws.com/noDisponible.png'; e.target.width=500; e.target.height=300}} />
                        </InplaceContent>
                    </Inplace>
                </>
            ): (
                <>
                    <p><span className="font-bold w-10">Descripción:</span> {don["DESCRIPCION_DONACION"]}</p>
                    <p><span className="font-bold w-10">Centro almacenamiento escogido:</span> {don["NOMBRE_CENTRO_ALMACENAMIENTO"]+" "+don["HORARIO_CENTRO_ALMACENAMIENTO"]}</p>
                    <p><span className="font-bold w-10">Observaciones: </span>{don["OBSERVACION_DONACION"]}</p>
                    <br/>
                </>
            )}
        </>
    );
}
 
export default ContDetalleDon;