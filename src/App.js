import React, { useState } from 'react';
import './App.css';

function App() {
  const [values, setValues] = React.useState({
    name: "",
    lastname: "",
    age:0,
  });
  const [fullData,setFullData]= React.useState("");
  function handleSubmit(evt) {
    /*
      Previene el comportamiento default de los
      formularios el cual recarga el sitio
    */
    evt.preventDefault();
    // Aquí puedes usar values para enviar la información
    setFullData("valores: " + values.name + " " +values.lastname + " " + values.age);
    console.log("valores: " + values.name + " " +values.lastname + " " + values.age);
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
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre</label>
      <input
        id="name"
        name="name"
        type="name"
        value={values.name}
        onChange={handleChange}
      />
      <br/>
      <label htmlFor="password">Apellido</label>
      <input
        id="lastname"
        name="lastname"
        type="lastname"
        value={values.lastname}
        onChange={handleChange}
      />
      <br/>
      <label htmlFor="password">Edad</label>
      <input
        id="age"
        name="age"
        type="age"
        value={values.age}
        onChange={handleChange}
      />
      <button type="submit">Enviar</button>
      <br/>
      {fullData}
    </form>
      
  );
}

export default App;
