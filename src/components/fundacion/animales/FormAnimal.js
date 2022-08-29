import Button from "../../generic/Button";
import ContInput from "../../generic/ContInput";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { dominio } from "../../../helpers/Dbdata";
import { Validar } from "../../../helpers/Validar";

import "./FormAnimal.css";
import PopupContext from "../../../context/PopupContext";
import ConfirmContext from "../../../context/ConfirmContext";

let initialanimal = {
  id_fundacion: "",
  id_tipo_animal: "",
  nombre_animal: "",
  descripcion_animal: "",
  edad_animal: "",
  foto_animal: "",
  sexo_animal: "",
  estado_animal: "0",
};

let initialFormValidado = {
  id_tipo_animal: [false, ""],
  nombre_animal: [false, ""],
  descripcion_animal: [false, ""],
  edad_animal: [false, ""],
  foto_animal: [true, ""],
  sexo_animal: [false, ""],
};

function FormAnimal({ id_fundacion, idanimal, cerrar, recargar }) {
  const [mounted, setMounted] = useState(true);
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const [animal, setanimal] = useState(initialanimal);
  const [tempanimal, setTempanimal] = useState(initialanimal);
  const [formValidado, setFormValidado] = useState(initialFormValidado);
  const [editando, setEditando] = useState(false);
  const [tipos, setTipos] = useState([]);
  
  const { mostrarConfirm } = useContext(ConfirmContext);
  const { mostrarPopup } = useContext(PopupContext);


  useEffect(() => {
    obtenerTipos();
    return () => setMounted(false);
  }, [])

  useEffect(() => {
    if (idanimal === 0){
      setEditando(true);
      setFormValidado(initialFormValidado);
      setanimal(initialanimal);
    }else{
      setEditando(false);
      obteneranimal();
    }
    
  }, [idanimal]);

  const handleChange = (e) => {
    setanimal({ ...animal, [e.target.name]: e.target.value });
    actualizarValidacion(e);
  };

  const handleBlur = (e) => {
    setanimal({ ...animal, [e.target.name]: e.target.value.trim() });
  };

  const actualizarValidacion = (e) => {
    let tempCampo = {};
    switch (e.target.name) {
      case "id_tipo_animal":
      tempCampo = {
        [e.target.name]: Validar.general(e.target.value),
      };
      break;
      case "nombre_animal":
      tempCampo = {
        [e.target.name]: Validar.general(e.target.value),
      };
      break;
      case "descripcion_animal":
      tempCampo = {
        [e.target.name]: Validar.general(e.target.value),
      };
      break;
      case "edad_animal":
      tempCampo = {
        [e.target.name]: Validar.general(e.target.value),
      };
      break;
      case "sexo_animal":
      tempCampo = {
        [e.target.name]: Validar.general(e.target.value),
      };
      break;
      case "foto_animal":
      tempCampo = {
        [e.target.name]: Validar.general(e.target.value),
      };
      break;
      
      default:
        break;
    }
    setFormValidado({
      ...formValidado,
      ...tempCampo,
    });
  };

  const validarForm = () => {
    for (const key in formValidado) {
      if (Object.hasOwnProperty.call(formValidado, key)) {
        const el = formValidado[key];
        if (!el[0]) return false;
      }
    }
    return true;
  };

  const validarTodo = (data) => {
    let tempFormValidado = formValidado;
    for (const key in data) {
      if (Object.hasOwnProperty.call(initialanimal, key)) {
        const el = data[key];
        tempFormValidado = { ...tempFormValidado, [key]: Validar.general(el) };
      }
    }
    setFormValidado(tempFormValidado);
  };

  const guardaranimal = () => {
    if (validarForm()) {
      if (editando && idanimal !== 0) {
        actualizaranimal();
      } else {
        crearanimal();
      }
    } else {
      mostrarPopup(2, "Llena todos los datos");
    }
  };

  const editaranimal = () => {
    setTempanimal(animal);
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setanimal(tempanimal);
    setEditando(false);
  };

  const obtenerTipos = () => {
    $.ajax({
      url: `${dominio}/api/tabla_tipo_animal`,
      type: "get",
      dataType: "json",
      contentType: "application/json",
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        if (mounted) {
          setMostrarCargando(false);
          setTipos(
            data.data.map((el) => {
              return { label: el['nombre_tipo_animal'], value: el['id_tipo_animal'] };
            })
          );
        }
      },
      error: function (data) {
        setMostrarCargando(false);
        console.log(data.responseJSON.data);
        // if (data.status === 0)
        // mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        // else mostrarPopup(2, mensaje);
      },
    });
  };

  const subirArchivo = (id_animal, imagen) => {
    const formData = new FormData();
    formData.append('bucket', "fundaciones-animales");
    formData.append('file', imagen);
    console.log(id_animal);
    $.ajax({
      url: `${dominio}/api/tabla_animal/subirImagen/${id_animal}`,
      type: "post",
      contentType: false,
      cache: false,
      processData:false,
      data: formData,
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
          console.log(data);
          setMostrarCargando(false);
          mostrarPopup(1, data.mensaje);
          recargar();
      },
      error: function (data) {
          setMostrarCargando(false);
          console.log(data.responseJSON.mensaje);
          let mensaje = data.responseJSON.mensaje;
          if (data.status === 0)
          mostrarPopup(0, "No es posible conectarse al servidor Node JS");
          else mostrarPopup(2, mensaje);
      },
      });
  }

  const obteneranimal = () => {
    if (idanimal && idanimal > 0) {
      $.ajax({
        url: `${dominio}/api/tabla_animal/${idanimal}`,
        type: "get",
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
          setMostrarCargando(true);
        },
        success: function (data) {
          setMostrarCargando(false);
          let formatedData = {
            id_fundacion: data.data.id_fundacion,
            id_tipo_animal: data.data.id_tipo_animal,
            nombre_animal: data.data.nombre_animal,
            descripcion_animal: data.data.descripcion_animal,
            edad_animal: data.data.edad_animal,
            foto_animal: data.data.foto_animal,
            sexo_animal: data.data.sexo_animal,
            estado_animal: data.data.estado_animal,
          };
          setanimal(formatedData);
          validarTodo(formatedData);
          // if ("cedula" in data) {
          //   setUserData(data);
          // } else {
          //   mostrarPopup(2, data);
          // }
        },
        error: function (data) {
          setMostrarCargando(false);
          console.log(data.responseJSON.data);
          let mensaje = data.responseJSON.data;
          if (data.status === 0)
            mostrarPopup(0, "No es posible conectarse al servidor Node JS");
          else mostrarPopup(2, mensaje);
        },
      });
    } else {
      setanimal(initialanimal);
    }
  };

  const crearanimal = () => {
    animal.id_fundacion = id_fundacion;
    const imagen = document.querySelector('#animal'+idanimal).files[0];
    $.ajax({
      url: `${dominio}/api/tabla_animal/agregar`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...animal }),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        console.log(data.id_animal);
        setMostrarCargando(false);
        subirArchivo(data.id_animal, imagen)
      },
      error: function (data) {
        setMostrarCargando(false);
        console.log(data.responseJSON.data);
        let mensaje = data.responseJSON.data;
        if (data.status === 0)
          mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        else mostrarPopup(2, mensaje);
      },
    });
  };

  const actualizaranimal = () => {
    const imagen = document.querySelector('#animal'+idanimal).files[0];
    console.log(imagen);
    $.ajax({
      url: `${dominio}/api/tabla_animal/edit/${idanimal}`,
      type: "put",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...animal }),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        setMostrarCargando(false);
        if(imagen === undefined || imagen === null){
          cerrar();
          mostrarPopup(1, "Actualizado correctamente!");
        }else{
          subirArchivo(data.id_animal, imagen);
        }
      },
      error: function (data) {
        setMostrarCargando(false);
        console.log(data.responseJSON.data);
        let mensaje = data.responseJSON.data;
        if (data.status === 0)
          mostrarPopup(0, "No es posible conectarse al servidor Node JS");
        else mostrarPopup(2, mensaje);
      },
    });
  };

  const eliminaranimal = async () => {
    if (await mostrarConfirm("¿Seguro que deseas eliminar el animal de su fundación?"))
      $.ajax({
        url: `${dominio}/api/tabla_animal/delete/${idanimal}`,
        type: "delete",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(),
        beforeSend: function () {
          setMostrarCargando(true);
        },
        success: function (data) {
          setMostrarCargando(false);
          mostrarPopup(1, data.mensaje);
          recargar();
        },
        error: function (data) {
          setMostrarCargando(false);
          console.log(data.responseJSON.data);
          let mensaje = data.responseJSON.data;
          if (data.status === 0)
            mostrarPopup(0, "No es posible conectarse al servidor Node JS");
          else mostrarPopup(2, mensaje);
        },
      });
  };

  return (
    <div className="cont-form-animal">
      {mostrarCargando ? (
        <div className="cont-loader-full-container">
          <div className="loader format-ico-loader"></div>
        </div>
      ) : (
        <>
          <h3 className="titulo-animal">{idanimal === 0 ? "NUEVO ANIMAL" : !editando ? "VER ANIMAL": "EDITAR ANIMAL" }</h3>
          <div className="form-animal-acciones" style={{ width: "max-content", alignSelf: "center" }}>
            {idanimal && idanimal !== 0 && !editando ? (
              <>
                <Button
                  label={"Editar"}
                  icono={"ico-lapiz"}
                  onClick={editaranimal}
                  editar={true}
                />
                <Button
                  label={"Eliminar"}
                  icono={"ico-eliminar"}
                  onClick={eliminaranimal}
                  borrar={true}
                  rojo = {true}
                />
              </>
            ) : (
              ""
            )}
          </div>
          <form>
          <ContInput label="Tipo Animal" icono={"ico-asa"}>
              <select
                onChange={handleChange}
                onBlur={handleBlur}
                name="id_tipo_animal"
                disabled={!editando}
                value={animal.id_tipo_animal}
              >
                {animal.id_tipo_animal === "" && <option disabled value={""} />}
                {tipos &&
                  tipos.map((el, i) => {
                    return (
                      <option key={"id_tipo_animal" + i} value={el.value}>
                        {el.label}
                      </option>
                    );
                  })}
              </select>
              {!formValidado.id_tipo_animal[0] && (
                <div className="ico-advertencia format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.id_tipo_animal[0] && (
              <p className="texto-validacion">{formValidado.id_tipo_animal[1]}</p>
            )}

            <ContInput label="Nombre" icono={"ico-animal"}>
              <input
                value={animal.nombre_animal}
                onChange={handleChange}
                onBlur={handleBlur}
                name="nombre_animal"
                disabled={!editando}
              />
              {!formValidado.nombre_animal[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.nombre_animal[0] && (
              <p className="texto-validacion">{formValidado.nombre_animal[1]}</p>
            )}
            <ContInput label="Descripción" icono={"ico-animal"}>
              <input
                value={animal.descripcion_animal}
                onChange={handleChange}
                onBlur={handleBlur}
                name="descripcion_animal"
                disabled={!editando}
                placeholder={"Ej. juguetón"}
              />
              {!formValidado.descripcion_animal[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.descripcion_animal[0] && (
              <p className="texto-validacion">{formValidado.descripcion_animal[1]}</p>
            )}
            <ContInput label="Edad" icono={"ico-animal"}>
              <input
                value={animal.edad_animal}
                onChange={handleChange}
                onBlur={handleBlur}
                name="edad_animal"
                disabled={!editando}
              />
              {!formValidado.edad_animal[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.edad_animal[0] && (
              <p className="texto-validacion">{formValidado.edad_animal[1]}</p>
            )}
            <ContInput label="Foto" icono={"ico-animal"}>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="foto_animal"
                id={"animal"+idanimal}
                disabled={!editando}
                type={"file"}
              />
              {!formValidado.foto_animal[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.foto_animal[0] && (
              <p className="texto-validacion">{formValidado.foto_animal[1]}</p>
            )}
            <ContInput label="Sexo" icono={"ico-animal"}>
              <select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="sexo_animal"
                    disabled={!editando}
                    value={animal.sexo_animal}
                >
                  {animal.sexo_animal === "" && <option disabled value={""} />}
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                </select>
              {!formValidado.sexo_animal[0] && (
                <div className="ico-advertencia  format-ico-form-validacion"></div>
              )}
            </ContInput>
            {!formValidado.sexo_animal[0] && (
              <p className="texto-validacion">{formValidado.sexo_animal[1]}</p>
            )}
            <div className="form-animal-acciones" style={{ width: "max-content", alignSelf: "center" }}>
               
              {idanimal && idanimal !== 0 && editando ? (
                <>
                 {/*Editando la animal*/}
                 <Button icono="pi pi-check" label={"Aceptar"} onClick={guardaranimal} aceptar={true}/>
                 <Button icono="pi pi-ban" label={"Cancelar"} onClick={cancelarEdicion} cancelar={true}/>
                </>
              ) : idanimal && idanimal !== 0 && !editando ? (
                /*Ver la animal*/
                ""
              ):(
                <>
                {/*Nueva animal*/}
                <Button icono="pi pi-check" label={"Aceptar"} onClick={guardaranimal} aceptar={true}/>
                <Button icono="pi pi-ban" label={"Cancelar"} onClick={cerrar} cancelar={true}/>
                </>
              )}
              
            </div>
            
          </form>
        </>
      )}
    </div>
  );
}

export default FormAnimal;
