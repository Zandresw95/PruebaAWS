import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CardFundacion from "../components/Cards/CardFundacion";
import $ from "jquery";
import { dominio } from "../helpers/Dbdata";
function Fundaciones({tipo}) {
    const [fundaciones, setFundaciones] = useState([]);
    const { name, role } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerFundaciones();
    }, [])

    const obtenerFundaciones = () => {
        $.ajax({
            url: `${dominio}/api/tabla_fundaciones`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({}),
            beforeSend: function () {

            },
            success: function (data) {
                console.log(data.data);
                setFundaciones(data.data);
            },
            error: function (data) {
                console.log(data.responseJSON.data);
            },
        });
    };

    return (
        <div className="flex flex-row flex-wrap gap-3">
            {fundaciones.length > 0
                ? fundaciones.map((el, i) => {
                    return (
                        <CardFundacion
                            fundacion={el}
                            tipo={tipo}
                        />
                    )
                })
                : <></>
            }
        </div>
    );
}

export default Fundaciones;