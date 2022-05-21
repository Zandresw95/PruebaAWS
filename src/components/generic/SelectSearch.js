import { useEffect, useRef, useState } from "react";
import "./SelectSearch.css";

function SelectSearch({
  options,
  nombreInput,
  setVariable,
  validar = true,
  disabled = false,
}) {
  const [seleccion, setSeleccion] = useState({ index: 0, valor: "" });
  const [optionsFiltered, setOptionsFiltered] = useState(undefined);
  const [selectActivo, setSelectActivo] = useState(false);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const select = useRef();
  const flotante = useRef();
  const refCont = useRef();
  const campoBusqueda = useRef();

  useEffect(() => {
    borrarBusqueda();
    if (!options) {
      setVariable("");
    }
    // if (!options || (options && options.length <= 0)) {
    //   setVariable("");
    // }
  }, [options]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        selectActivo &&
        refCont.current &&
        !refCont.current.contains(e.target)
      ) {
        setSelectActivo(false);
        borrarBusqueda();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [selectActivo]);

  const desplegar = () => {
    if (!disabled) setSelectActivo(!selectActivo);
  };
  const handleChange = (e) => {
    e.target.value = e.target.value.toUpperCase();
    setTerminoBusqueda(e.target.value);
    let tempOptions = [];
    for (const el of options) {
      tempOptions.push(el.toUpperCase());
    }
    setOptionsFiltered(
      tempOptions.filter((el) => el.includes(e.target.value.toUpperCase()))
    );
  };

  const handleClick = (e) => {
    select.current.value = e.target.innerText;
    setSeleccion({
      index: select.current.selectedIndex,
      valor: select.current.value,
    });
    setSelectActivo(false);
    borrarBusqueda();
  };

  const borrarBusqueda = () => {
    setTerminoBusqueda("");
    setOptionsFiltered(options);
  };

  useEffect(() => {
    setVariable && setVariable(seleccion.valor);
  }, [seleccion]);

  return (
    <div
      className={"cont-select-search " + (disabled ? "disabled" : "")}
      ref={refCont}
    >
      <div className="cont-select-search-select">
        <select
          ref={select}
          className={"estiloInput " + (disabled ? "disabled" : "")}
          type="text"
          placeholder="Empresa"
          name={nombreInput}
          //   onChange={handleSelectEmpresa}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={desplegar}
          //   value={datosFormIngreso.empresa}
          autoFocus
          // style={{ width: "max-content" }}
        >
          <option>Buscar</option>
          {options
            ? options.map((el, i) => {
                return (
                  <option value={el} key={nombreInput + "" + i}>
                    {el}
                  </option>
                );
              })
            : ""}
        </select>
        {seleccion.index <= 0 ? (
          <div className="icoAdvertencia formatIcoValidacion"></div>
        ) : (
          ""
        )}
      </div>
      {selectActivo && (
        <div className="select-search animarSalida" ref={flotante}>
          <div>
            <input
              onChange={handleChange}
              placeholder="Buscar"
              ref={campoBusqueda}
              value={terminoBusqueda}
              autoFocus
            />
            {terminoBusqueda !== "" ? (
              <div
                className="icoCerrar formatIcoCinta"
                onClick={borrarBusqueda}
              ></div>
            ) : (
              ""
            )}
          </div>
          <ul>
            {optionsFiltered !== undefined
              ? optionsFiltered.map((el, i) => {
                  return (
                    <li key={i} onClick={handleClick}>
                      {el}
                    </li>
                  );
                })
              : ""}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectSearch;
