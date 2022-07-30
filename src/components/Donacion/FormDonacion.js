import Button from "../../components/generic/Button";
import ContInput from "../../components/generic/ContInput";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import './FormDonacion.css'


const FormDonacion = ({ id_fundacion, cerrar, nombre }) => {
    const [bancos, setBancos] = useState([])
    const handleChange = (e) => {
        setBancos({ ...bancos, [e.target.name]: e.target.value });
    };

    const handleBlur = (e) => {
        setBancos({ ...bancos, [e.target.name]: e.target.value.trim() });
    };
    return (
        <div className="cont-form-donacion">
            <h3 className="titulo-donacion">{nombre}</h3>
            <div className="cont-form-donacion">
                <form>
                    <ContInput label="Banco" icono={"ico-usuario"}>
                        <select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="nombre_banco"
                            value={bancos.banco_cuenta}
                            
                        >
                            {console.log("valor bancos",bancos)}
                            { bancos.banco_cuenta === "" && <option disabled value={"NO existe"} />}
                            {bancos.length>0 ?
                                bancos.map((el, i) => {
                                    return (
                                        <option key={"banco"+i} value={el.value}>
                                            {el.label}
                                        </option>
                                    );
                                }) :
                                <option key={"inexistent"} disabled value={"No existen cuentas"} />
                            }
                        </select>

                    </ContInput>
                    <ContInput label="# Cuenta" icono={"ico-persona"}>
                        <input
                            value={""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="apellido_persona"
                            disabled={true}
                        />
                    </ContInput>
                    <Button label={"Confirmar"}/>
                    <Button label={"Cancelar"} onClick={cerrar}/>
                </form>

            </div>
        </div>
    );
}

export default FormDonacion;
