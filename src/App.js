import React, { useState } from 'react';
import './App.css';

let initialUsuario = {
  nombre_persona: "",
  apellido_persona: "",
  edad_persona: 0,
  fecha_nacimiento_persona: "",
  cedula_persona: ""
};

function App() {
  const [values, setValues] = React.useState({
    name: "",
    lastname: "",
    age: 0,
    fnac: "",
    ci: ""
  });
  const [person, setPerson] = React.useState("");
  const [usuario, setUsuario] = useState(initialUsuario);

  function handleSubmit(evt) {
    /*
      Previene el comportamiento default de los
      formularios el cual recarga el sitio
    */
    evt.preventDefault();
    // Aquí puedes usar values para enviar la información
    setPerson("Data: {\n Nombre: " + values.name + 
        "\nApellido: " + values.lastname + 
        "\nEdad: " + values.age + 
        "\nFecha de Nacimiento: "+values.fnac + 
        "\nCedula: " + values.ci);
    console.log("Data: {\n Nombre: " + values.name + 
    "\nApellido: " + values.lastname + 
    "\nEdad: " + values.age + 
    "\nFecha de Nacimiento: "+values.fnac + 
    "\nCedula: " + values.ci);
  }
  function handleChange(evt) {
    /*
      evt.target es el elemento que ejecuto el evento
      name identifica el input y value describe el valor actual
    */
    const { target } = evt;
    const { name, value } = target;
    /*
      Este snippet:
      1. Clona el estado actual
      2. Reemplaza solo el valor del
         input que ejecutó el evento
    */
    const newValues = {
      ...values,
      [name]: value,
    };
    // Sincroniza el estado de nuevo
    setValues(newValues);
  }

  const crearUsuario = () => {
    console.log("creando");
    $.ajax({
      url: `http://apinode-env.eba-pexpsn2k.us-east-1.elasticbeanstalk.com/api/tabla_personas/agregar`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...usuario }),
      beforeSend: function () {
        //setMostrarCargando(true);
      },
      success: function (data) {
        console.log(data);
        //setMostrarCargando(false);
        //mostrarPopup(1, data.mensaje);
        //cerrar();
      },
      error: function (data) {
        //setMostrarCargando(false);
        console.log(data.responseJSON.data);
        let mensaje = data.responseJSON.data;
        //if (data.status === 0)
         // mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        //else //mostrarPopup(2, mensaje);
      },
    });
  };

  return (
    <div className="container">
      <h1>CRUD PERSONAS</h1>
      <form onSubmit={handleSubmit}>
        <div className="ab-3">
          <label htmlFor="name" className="form-label">NombrePrueba</label>
          <input
            id="name"
            name="name"
            type="name"
            value={values.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="ab-3">
          <label htmlFor="lastname" className="form-label">Apellido</label>
          <input
            id="lastname"
            name="lastname"
            type="lastname"
            value={values.lastname}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="ab-3">
          <label htmlFor="age">Edad</label>
          <input
            id="age"
            name="age"
            type="age"
            value={values.age}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="ab-3">
          <label htmlFor="date" className="form-label">Fecha de Nacimiento:</label>
          <input
            id="date"
            name="date"
            type="date"
            value={values.fnac}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="ab-3">
          <label htmlFor="ci" className="form-label">Cedula:</label>
          <input
            id="ci"
            name="ci"
            type="ci"
            value={values.ci}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <br/>
        <button type="submit" className="btn btn-primary" onclick={crearUsuario}>Enviar</button>
        <br />
        {person}
      </form>
    </div>


  );
}

export default App;
