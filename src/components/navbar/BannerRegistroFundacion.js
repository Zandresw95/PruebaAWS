import './BannerRegistroFundacion.css';
import imgBanner from '../../media/img/regFundacion.png';
import { useNavigate } from "react-router-dom";


const BannerRegistroFundacion = () => {
    const navigate = useNavigate();
    return (
        <div className='cont-regFund__banner'>
            <div className='regFund__banner__icon animar-hover' onClick={() => navigate("/login")}>
                <div className="ico-atras"></div>
            </div>
            <img src={imgBanner} className='regFund__banner__image' alt="Registrar Fundacion"/>
            <div className='regFund__banner__titulo'>
                <p>Registro</p>
                <p>Fundación</p>
            </div>
        </div>
    );
}

export default BannerRegistroFundacion;