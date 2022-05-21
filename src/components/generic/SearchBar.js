import { useEffect, useState } from "react";

function SearchBar({ datos, setDatosFiltrados }) {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const handleChange = (e) => {
    e.target.value = e.target.value.toUpperCase();
    setTerminoBusqueda(e.target.value);
    let tempOptions = [];
    for (const el of datos) {
      tempOptions.push(el.toUpperCase());
    }
    setDatosFiltrados(
      tempOptions.filter((el) => el.includes(e.target.value.toUpperCase()))
    );
  };

  useEffect(() => {
    borrarBusqueda();
  }, [datos]);

  const borrarBusqueda = () => {
    setTerminoBusqueda("");
    setDatosFiltrados(datos);
  };
  return (
    <div>
      <input
        onChange={handleChange}
        placeholder="Buscar"
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
  );
}

export default SearchBar;
