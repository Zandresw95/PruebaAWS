import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CardAnimal from "../components/animal/CardAnimal";
import $ from "jquery";
import { dominio } from "../helpers/Dbdata";
function FundacionInfo() {
    const [animales, setAnimales] = useState([]);
    const { name, role } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    let { idFundacion, estadoAnimal } = useParams();
    useEffect(() => {
        obtenerAnimalesFundacion();
    }, [])

    const obtenerAnimalesFundacion = () => {
        $.ajax({
            url: `${dominio}/api/tabla_animal/animalesDisponibles/${idFundacion}/${estadoAnimal}`,
            type: "get",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({}),
            beforeSend: function () {

            },
            success: function (data) {
                console.log(data.data);
                setAnimales(data.data);
            },
            error: function (data) {
                console.log(data.responseJSON.data);
            },
        });
    };

    return (
        <div className="flex flex-row flex-wrap gap-3">
            {animales.length > 0
                ? animales.map((el, i) => {
                    return (
                        <CardAnimal
                            key={"id" + i}
                            animal={el}
                            idFundacion={idFundacion}
                            tipo={"adoptar"}
                        />
                    )
                })
                : <></>
            }
        </div>
    );
}

export default FundacionInfo;