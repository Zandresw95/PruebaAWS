import './BannerRegistro.css';
import { useNavigate } from "react-router-dom";


const BotonRegreso = () => {
    const navigate = useNavigate();
    return (
        <div className='reg__banner__icon animar-hover' onClick={() => navigate(-1)}>
            <div className="ico-atras"></div>
        </div>
    );
}

export default BotonRegreso;