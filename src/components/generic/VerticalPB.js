import { useEffect, useState } from "react";
import "./VerticalPB.css";

let colores = {
  azul: "rgb(28, 191, 255)",
  rojo: "rgb(255, 124, 85)",
  verde: "rgb(0, 190, 133)",
};

function VerticalPB({
  valor,
  min = 0,
  max = 100,
  unidad = "",
  color = "azul",
}) {
  const [valorHeight, setValorHeight] = useState(0);

  useEffect(() => {
    let valorTemp = ((valor - min) * 100) / (100 - (100 - max + min));
    if (valorTemp < 0) valorTemp = 0;
    if (valorTemp > 100) valorTemp = 100;
    console.log(valorTemp);
    setValorHeight(valorTemp);
  }, [valor]);

  return (
    <div className="cont-progress">
      <div
        className="bar"
        style={{ height: valorHeight + "%", backgroundColor: colores[color] }}
      ></div>
      <p>
        <span>{valor}</span>
        <span>{unidad}</span>
      </p>
    </div>
  );
}

export default VerticalPB;
