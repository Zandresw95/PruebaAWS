import './BannerRegistro.css';
import BotonRegreso from './BotonRegreso';
import { useNavigate } from "react-router-dom";


const BannerRegistro = ({img, color, nombre}) => {
    const navigate = useNavigate();
    return (
        <div className='cont-reg__banner' style={{backgroundColor: color}}>
            <BotonRegreso/>
            {/*<div className='reg__banner__icon animar-hover' onClick={() => navigate(-1)}>
                <div className="ico-atras"></div>
    </div>*/}
            <img src={img} className='reg__banner__image' alt="Registrar"/>
            <div className='reg__banner__titulo'>
                <p>Registro</p>
                <p>{nombre}</p>
            </div>
        </div>
    );
}

export default BannerRegistro;