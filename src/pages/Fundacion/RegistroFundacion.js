import './RegistroFundacion.css';
import {FormFundacion} from './FormFundacion';


const RegistroFundacion = () => {
    return (
        <div className='cont-app'>
            <div className='banner'>
                <div className='icon'>Icono</div>
                <picture src="" className='image'></picture>
                <div className='title'><p>Registro</p><p>Fundación</p></div>
            </div>
            <div className='cont-register'>
                <h2>Ingresa los datos de la fundación</h2>
                <div className='form-registro'>
                    <FormFundacion></FormFundacion>
                </div>
            </div>
        </div>
    );
}

export default RegistroFundacion;