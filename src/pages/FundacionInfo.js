import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CardFundacion from "../components/Cards/CardFundacion";
import $ from "jquery";
import { dominio } from "../helpers/Dbdata";
function FundacionInfo() {
    const [animales, setAnimales] = useState([]);
    const { name, role } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    let { idFundacion } = useParams();
    // useEffect(() => {
    //     obtenerAnimalesFundacion();
    // }, [])

    // const obtenerAnimalesFundacion = () => {
    //     $.ajax({
    //         url: `${dominio}/api/tabla_animales/animalesFundacion/${fundacion}`,
    //         type: "get",
    //         dataType: "json",
    //         contentType: "application/json",
    //         data: JSON.stringify({}),
    //         beforeSend: function () {

    //         },
    //         success: function (data) {
    //             console.log(data.data);
    //             setFundaciones(data.data);
    //         },
    //         error: function (data) {
    //             console.log(data.responseJSON.data);
    //         },
    //     });
    // };

    return (
        <div className="flex flex-row flex-wrap gap-3">
            <p>{idFundacion}</p>
            {/* {animales.length > 0
                ? animales.map((el, i) => {
                    return (
                        <CardFundacion
                            fundacion={el}
                            tipo={tipo}
                        />
                    )
                })
                : <></>
            } */}
        </div>
    );
}

export default FundacionInfo;