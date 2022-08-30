import React, { useState, useRef } from 'react';
import ContInputDon from '../generic/ContInputDon';
import {Button} from 'primereact/button';
import { Validar } from '../../helpers/Validar';
import Pdf from "react-to-pdf";
import { useSelector } from 'react-redux';
import { MultiSelect } from 'primereact/multiselect';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import './CuestionarioAdopcion.css';

let initialCuestionario = {
    // id_persona: localStorage.getItem("idpersona"),
    pregunta1: "",
    pregunta2: "",
    pregunta3: "",
    pregunta4: "",
    pregunta5: "",
    pregunta6: "",
    pregunta7: "",
    pregunta8: "",
    pregunta9: "",
    pregunta10: "",
    pregunta11: "",
    pregunta12: "",
    pregunta13: "",
    pregunta14: "",
    pregunta15: "",
    pregunta16: "",
};

const preguntas = {
    pregunta1: "1. ¿Ha tenido alguna mala experiencia con animales?",
    pregunta2: "2. ¿Explique el motivo para adoptar un animal de compañía?",
    pregunta3: "3. Si usted se cambiara de domicilio ¿Qué pasaría con su animal de compañía?",
    pregunta4: "4. Con relación a la pregunta anterior ¿Qué pasaría si los dueños de la nueva casa no aceptan animales de compañía?",
    pregunta5: "5. Si usted viaja por más de un día, el animal de compañía:",
    pregunta6: "6. ¿Cuánto tiempo en el día su animal de compañía pasará solo?",
    pregunta7: "7. ¿Dónde pasará durante el día y la noche?",
    pregunta8: "8. ¿Dónde dormirá el animal de compañía?",
    pregunta9: "9. ¿Qué comerá habitualmente el animal de compañía?",
    pregunta10: "10. Si su animal de compañía enferma usted:",
    pregunta11: "11. Estime cuánto dinero podría gastar en su animal de compañía, mensualmente:",
    pregunta12: "12. ¿Cuenta con los recursos para cubrir los gastos veterinarios del animal de compañía?",
    pregunta13: "12. ¿Está de acuerdo en que se haga una visita periódica a su domicilio para ver cómo se encuentra el adoptado?",
    pregunta14: "13. ¿Está de acuerdo en que el animal de compañía sea esterilizado? (operado para no tener más cachorros)",
    pregunta15: "15. ¿Está usted Informado y consiente sobre la ordenanza municipal acerca de la tenencia responsable de animales de compañía?",
    pregunta16: "14. ¿La adopción fue compartida con su familia?",
};

let initialFormValidado = {
    pregunta1: [false, ""],
    pregunta2: [false, ""],
    pregunta3: [false, ""],
    pregunta4: [false, ""],
    pregunta5: [false, ""],
    pregunta6: [false, ""],
    pregunta7: [false, ""],
    pregunta8: [false, ""],
    pregunta9: [false, ""],
    pregunta10: [false, ""],
    pregunta11: [false, ""],
    //pregunta12: [false, ""],
    pregunta13: [false, ""],
    pregunta14: [false, ""],
    //pregunta15: [false, ""],
    pregunta16: [false, ""],
};

const ref = React.createRef();

function CuestionarioAdopcion({idAnimal, cerrar, abrirForm, nombreAnimal}) {
    const [cuestionario, setCuestionario] = useState(initialCuestionario);
    const [formValidado, setFormValidado] = useState(initialFormValidado);
    const toast = useRef(null);

    const opcPregunta1 = [
        { name: 'Ataque', code: 'Ataque' },
        { name: 'Alergia', code: 'Alergia' },
        { name: 'Mordedura', code: 'Mordedura' },
        { name: 'Ninguna', code: 'Ninguna' },
    ];
    const opcPregunta9 = [
        { name: 'Balanceado', code: 'Balanceado' },
        { name: 'Comida Casera', code: 'Comida Casera' },
        { name: 'Restos', code: 'Restos' },
        { name: 'Otros', code: 'Otros' },
    ];

    const {name, role} = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setCuestionario({ ...cuestionario, [e.target.name]: e.target.value });
        actualizarValidacion(e);
    };
    
    const handleBlur = (e) => {
        setCuestionario({ ...cuestionario, [e.target.name]: e.target.value.trim() });
    };
    
    const actualizarValidacion = (e) => {
    let tempCampo = {};
    switch (e.target.name) {
        case "pregunta1":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break;
        case "pregunta2":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break;    
        case "pregunta3":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break;
        case "pregunta4":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break;
        case "pregunta5":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break;
        case "pregunta6":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break;
        case "pregunta7":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break;  
        case "pregunta8":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break; 
        case "pregunta9":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break;
        case "pregunta10":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break;    
        case "pregunta11":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break;
        case "pregunta12":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break;
        case "pregunta13":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break;
        case "pregunta14":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break;
        case "pregunta15":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break;  
        case "pregunta16":
        tempCampo = {
            [e.target.name]: Validar.general(e.target.value),
        };
        break; 
        default:
        break;
    }
    setFormValidado({
        ...formValidado,
        ...tempCampo,
    });
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Por favor llena todos lo campos', life: 3000});
    }

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Éxito', detail:'PDF generado, súbelo en la siguiente pantalla', life: 3000});
    }

    const validarForm = () => {
        for (const key in formValidado) {
          if (Object.hasOwnProperty.call(formValidado, key)) {
            const el = formValidado[key];
            if (!el[0]) return false;
          }
        }
        return true;
      };
    
      const abrirPantalla = ({toPdf}) => {
        if (validarForm()) {
            showSuccess();
            toPdf();
            cerrar();
            abrirForm(idAnimal);
        } else {
            showError();
        }
      };

    return (
        <>
            <Toast ref={toast} position="top-center"/>
            <div className="cont-form-cuestionario">
                <p>Recuerde responder con sinceridad</p>
                <div className="element-to-print" ref={ref}>
                    <div className='flex justify-content-center'>
                        <p>Solicitud de adopción para <span className='font-bold w-10'>{nombreAnimal}</span> por parte del usuario <span className='font-bold w-10'>{name}</span> {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className='flex justify-content-center page'>
                        <ContInputDon label={preguntas.pregunta1}>
                            <MultiSelect style={{background: "var(--color-fondo-input)", border: "0px", width:"100%"}} value={cuestionario.pregunta1} name="pregunta1" options={opcPregunta1} onChange={handleChange} optionLabel="name" placeholder="Selecciona" />
                        {!formValidado.pregunta1[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInputDon>
                        {!formValidado.pregunta1[0] && (
                        <p className="texto-validacion">{formValidado.pregunta1[1]}</p>
                        )}
                        <ContInputDon label={preguntas.pregunta2} icono={"ico-persona"}>
                        <input
                            value={cuestionario.pregunta2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="pregunta2"
                        />
                        {!formValidado.pregunta2[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInputDon>
                        {!formValidado.pregunta2[0] && (
                        <p className="texto-validacion">{formValidado.pregunta2[1]}</p>
                        )}
                        <ContInputDon label={preguntas.pregunta3} icono={"ico-persona"}>
                        <input
                            value={cuestionario.pregunta3}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="pregunta3"
                        />
                        {!formValidado.pregunta3[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInputDon>
                        {!formValidado.pregunta3[0] && (
                        <p className="texto-validacion">{formValidado.pregunta3[1]}</p>
                        )}
                        <ContInputDon label={preguntas.pregunta4} icono={"ico-persona"}>
                        <input
                            value={cuestionario.pregunta4}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="pregunta4"
                        />
                        {!formValidado.pregunta4[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInputDon>
                        {!formValidado.pregunta4[0] && (
                        <p className="texto-validacion">{formValidado.pregunta4[1]}</p>
                        )}
                        <ContInputDon label={preguntas.pregunta5} icono={"ico-persona"}>
                            <div className='flex flex-column justify-content-center w-100 gap-1'>
                                <div className="field-radiobutton">
                                    <RadioButton inputId="op1" name="pregunta5" value="Viaja con ud." onChange={handleChange} checked={cuestionario.pregunta5 === "Viaja con ud."} />
                                    <label htmlFor="op1">Viaja con ud.</label>
                                </div>
                                <div className="field-radiobutton">
                                    <RadioButton inputId="op2" name="pregunta5" value="Se queda con un familiar" onChange={handleChange} checked={cuestionario.pregunta5 === 'Se queda con un familiar'} />
                                    <label htmlFor="op2">Se queda con un familiar</label>
                                </div>
                                <div className="field-radiobutton">
                                    <RadioButton inputId="op3" name="pregunta5" value="Hospedaje" onChange={handleChange} checked={cuestionario.pregunta5 === 'Hospedaje'} />
                                    <label htmlFor="op3">Hospedaje</label>
                                </div>
                                <div className="field-radiobutton">
                                    <RadioButton inputId="op4" name="pregunta5" value="Lo deja solo" onChange={handleChange} checked={cuestionario.pregunta5 === 'Lo deja solo'} />
                                    <label htmlFor="op4">Lo deja solo</label>
                                </div>
                            </div>
                        {!formValidado.pregunta5[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInputDon>
                        {!formValidado.pregunta5[0] && (
                        <p className="texto-validacion">{formValidado.pregunta5[1]}</p>
                        )}
                        <div className='grid grid align-items-end'>
                            <div className='col'>
                                <ContInputDon label={preguntas.pregunta6} icono={"ico-persona"}>
                                <input
                                    value={cuestionario.pregunta6}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="pregunta6"
                                />
                                {!formValidado.pregunta6[0] && (
                                    <div className="ico-advertencia  format-ico-form-validacion"></div>
                                )}
                                </ContInputDon>
                                {!formValidado.pregunta6[0] && (
                                <p className="texto-validacion">{formValidado.pregunta6[1]}</p>
                                )}
                            </div>
                            <div className='col'>
                                <ContInputDon label={preguntas.pregunta7} icono={"ico-persona"}>
                                <input
                                    value={cuestionario.pregunta7}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="pregunta7"
                                />
                                {!formValidado.pregunta7[0] && (
                                    <div className="ico-advertencia  format-ico-form-validacion"></div>
                                )}
                                </ContInputDon>
                                {!formValidado.pregunta7[0] && (
                                <p className="texto-validacion">{formValidado.pregunta7[1]}</p>
                                )}
                            </div>
                            <div className='col'>
                                <ContInputDon label={preguntas.pregunta8} icono={"ico-persona"}>
                                <input
                                    value={cuestionario.pregunta8}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="pregunta8"
                                />
                                {!formValidado.pregunta8[0] && (
                                    <div className="ico-advertencia  format-ico-form-validacion"></div>
                                )}
                                </ContInputDon>
                                {!formValidado.pregunta8[0] && (
                                <p className="texto-validacion">{formValidado.pregunta8[1]}</p>
                                )}
                            </div>
                        </div>
                        <ContInputDon label={preguntas.pregunta9} icono={"ico-persona"}>
                            <MultiSelect value={cuestionario.pregunta9} name="pregunta9" style={{background: "var(--color-fondo-input)", border: "0px", width:"100%"}} options={opcPregunta9} onChange={handleChange} optionLabel="name" placeholder="Selecciona" />
                            {!formValidado.pregunta9[0] && (
                                <div className="ico-advertencia  format-ico-form-validacion"></div>
                            )}
                        </ContInputDon>
                        {!formValidado.pregunta9[0] && (
                        <p className="texto-validacion">{formValidado.pregunta9[1]}</p>
                        )}
                        <ContInputDon label={preguntas.pregunta10} icono={"ico-persona"}>
                            <div className='flex flex-column justify-content-center w-100 gap-1'>
                                <div className="field-radiobutton">
                                    <RadioButton inputId="op_10_1" name="pregunta10" value="Lo lleva al veterinario" onChange={handleChange} checked={cuestionario.pregunta10 === "Lo lleva al veterinario"} />
                                    <label htmlFor="op_10_1">Lo lleva al veterinario</label>
                                </div>
                                <div className="field-radiobutton">
                                    <RadioButton inputId="op_10_2" name="pregunta10" value="Lo medica usted mismo" onChange={handleChange} checked={cuestionario.pregunta10 === 'Lo medica usted mismo'} />
                                    <label htmlFor="op_10_2">Lo medica usted mismo</label>
                                </div>
                                <div className="field-radiobutton">
                                    <RadioButton inputId="op_10_3" name="pregunta10" value="Lo lleva al centro de salud" onChange={handleChange} checked={cuestionario.pregunta10 === 'Lo lleva al centro de salud'} />
                                    <label htmlFor="op_10_3">Lo lleva al centro de salud</label>
                                </div>
                                <div className="field-radiobutton">
                                    <RadioButton inputId="op_10_4" name="pregunta10" value="Espera que se sane solo" onChange={handleChange} checked={cuestionario.pregunta10 === 'Espera que se sane solo'} />
                                    <label htmlFor="op_10_4">Espera que se sane solo</label>
                                </div>
                            </div>
                        {!formValidado.pregunta10[0] && (
                            <div className="ico-advertencia  format-ico-form-validacion"></div>
                        )}
                        </ContInputDon>
                        {!formValidado.pregunta10[0] && (
                        <p className="texto-validacion">{formValidado.pregunta10[1]}</p>
                        )}
                        
                        <div className='grid'>
                            <div className='col'>
                                <ContInputDon label={preguntas.pregunta11} icono={"ico-persona"}>
                                    <div className='flex flex-column justify-content-center w-100 gap-1'>
                                        <div className="field-radiobutton">
                                            <RadioButton inputId="op_11_1" name="pregunta11" value="$5 a $20" onChange={handleChange} checked={cuestionario.pregunta11 === "$5 a $20"} />
                                            <label htmlFor="op_11_1">$5 a $20</label>
                                        </div>
                                        <div className="field-radiobutton">
                                            <RadioButton inputId="op_11_2" name="pregunta11" value="$21 a $50" onChange={handleChange} checked={cuestionario.pregunta11 === '$21 a $50'} />
                                            <label htmlFor="op_11_2">$21 a $50</label>
                                        </div>
                                        <div className="field-radiobutton">
                                            <RadioButton inputId="op_11_3" name="pregunta11" value="$51 en adelante" onChange={handleChange} checked={cuestionario.pregunta11 === '$51 en adelante'} />
                                            <label htmlFor="op_11_3">$51 en adelante</label>
                                        </div>
                                    </div>
                                {!formValidado.pregunta11[0] && (
                                    <div className="ico-advertencia  format-ico-form-validacion"></div>
                                )}
                                </ContInputDon>
                                {!formValidado.pregunta11[0] && (
                                <p className="texto-validacion">{formValidado.pregunta11[1]}</p>
                                )}
                            </div>
                            <div className='col'>
                                <ContInputDon label={preguntas.pregunta13} icono={"ico-persona"}>
                                    <div className='flex flex-column justify-content-center w-100 gap-1'>
                                        <div className="field-radiobutton">
                                            <RadioButton inputId="op_13_1" name="pregunta13" value="Si" onChange={handleChange} checked={cuestionario.pregunta13 === "Si"} />
                                            <label htmlFor="op_13_1">Si</label>
                                        </div>
                                        <div className="field-radiobutton">
                                            <RadioButton inputId="op_13_2" name="pregunta13" value="No" onChange={handleChange} checked={cuestionario.pregunta13 === 'No'} />
                                            <label htmlFor="op_13_2">No</label>
                                        </div>
                                    </div>
                                    {!formValidado.pregunta13[0] && (
                                        <div className="ico-advertencia  format-ico-form-validacion"></div>
                                    )}
                                </ContInputDon>
                                {!formValidado.pregunta13[0] && (
                                <p className="texto-validacion">{formValidado.pregunta13[1]}</p>
                                )}
                            </div>
                        </div>
                        <div className='grid align-items-end'>
                            <div className='col'>
                                <ContInputDon label={preguntas.pregunta14} icono={"ico-persona"}>
                                    <div className='flex flex-column justify-content-center w-100 gap-1'>
                                        <div className="field-radiobutton">
                                            <RadioButton inputId="op_14_1" name="pregunta14" value="Si" onChange={handleChange} checked={cuestionario.pregunta14 === "Si"} />
                                            <label htmlFor="op_14_1">Si</label>
                                        </div>
                                        <div className="field-radiobutton">
                                            <RadioButton inputId="op_14_2" name="pregunta14" value="No" onChange={handleChange} checked={cuestionario.pregunta14 === 'No'} />
                                            <label htmlFor="op_14_2">No</label>
                                        </div>
                                    </div>
                                    {!formValidado.pregunta14[0] && (
                                        <div className="ico-advertencia  format-ico-form-validacion"></div>
                                    )}
                                </ContInputDon>
                                {!formValidado.pregunta14[0] && (
                                <p className="texto-validacion">{formValidado.pregunta14[1]}</p>
                                )}
                            </div>
                            <div className='col'>
                                <ContInputDon label={preguntas.pregunta16} icono={"ico-persona"}>
                                    <div className='flex flex-column justify-content-center w-100 gap-1'>
                                        <div className="field-radiobutton">
                                            <RadioButton inputId="op_16_1" name="pregunta16" value="Si" onChange={handleChange} checked={cuestionario.pregunta16 === "Si"} />
                                            <label htmlFor="op_16_1">Si</label>
                                        </div>
                                        <div className="field-radiobutton">
                                            <RadioButton inputId="op_16_2" name="pregunta16" value="No" onChange={handleChange} checked={cuestionario.pregunta16 === 'No'} />
                                            <label htmlFor="op_16_2">No</label>
                                        </div>
                                    </div>
                                    {!formValidado.pregunta16[0] && (
                                        <div className="ico-advertencia  format-ico-form-validacion"></div>
                                    )}
                                </ContInputDon>
                                {!formValidado.pregunta16[0] && (
                                <p className="texto-validacion">{formValidado.pregunta16[1]}</p>
                                )}
                            </div>
                        </div>                       
                    </div>
                </div>
                <div className='flex justify-content-evenly'>
                    <Pdf targetRef={ref} filename={name+"-adop-"+nombreAnimal+".pdf"}>
                        {({ toPdf }) => <Button className="p-button-info" label="Generar Solicitud" icon="pi pi-check" onClick={() => { abrirPantalla({toPdf}); }} />}
                    </Pdf>
                    <Button className="p-button-success" label="Cerrar" icon="pi pi-ban" onClick={() => { cerrar();}} />
                </div>
            </div> 
        </>

    );
}

export default CuestionarioAdopcion;
