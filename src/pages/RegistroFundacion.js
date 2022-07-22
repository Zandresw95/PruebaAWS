import { useNavigate } from "react-router-dom";
import BannerRegistroFundacion from "../components/navbar/BannerRegistroFundacion";
import FormRegistroFundacion from "../components/Fundacion/FormFundacion";
import FormRegistroRepresentante from "../components/Representante/FormRepresentante";
import { TabView, TabPanel } from 'primereact/tabview';
import './RegistroFundacion.css';


const RegistroFundacion = () => {
    return (

        <div className='cont-regFund animar-zoom-max-to-min'>
            <BannerRegistroFundacion/>
            <div className="tabview-demo" style={{width: "100%"}}>
                <h5 className="tabview-title">Por favor completa todos los datos </h5>
                <div className="card">
                    <TabView >
                        <TabPanel header="Fundacion" >
                            <FormRegistroFundacion/>
                        </TabPanel>
                        <TabPanel header="Representante">
                            <FormRegistroRepresentante/>
                        </TabPanel>
                        <TabPanel header="Usuario">
                            
                        </TabPanel>
                    </TabView>
                </div>
            </div>

        </div>
    );
}

export default RegistroFundacion;