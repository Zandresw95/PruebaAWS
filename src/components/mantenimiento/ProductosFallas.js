import { useEffect, useRef, useState, useContext } from "react";
import Button from "../generic/Button";
import $ from "jquery";
import { host, port } from "../../helpers/Dbdata";
import Download from "./Download";
import PopupContext from "../../context/PopupContext";
import * as xlsx from "xlsx";


let initialProducto = {
  ID: "",
  CODIGO: "",
  DESCRIPCION: "",
  KG_TURNO_8: 0.0,
  UNIDADES_8: 0.0,
  KG_TURNO_12: 0.0,
  UNIDADES_12: 0.0,
  UNIDADES_MINUTO: 0.0,
  KILOS_MINUTO: 0.0,
  PESO_UNITARIO: 0.0,
  ID_CHAR: "",
};

function ProductosFallas() {

  const downloadButton = useRef();
  const uploadButton = useRef();
  const [descargar, setDescargar] = useState(false);
  const [cargar, setCargar] = useState(false);
  const [mostrarCargando, setMostrarCargando] = useState(false);

  const [producto, setProducto] = useState(initialProducto);
  const [datosCSV, setDatosCSV] = useState([]);
  const [datosBase, setDatosBase] = useState([]);
  const [productos, setProductos] = useState([]);
  

  const { mostrarPopup } = useContext(PopupContext);

  const obtenerProductos = () => {
    $.ajax({
      url: `http://${host}:${port}/api/tabla_productos_fallas`,
      type: "get",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({}),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        setMostrarCargando(false);
        generarCSV(data.data);
      },
      error: function (data) {
        let mensaje = data.responseJSON.data;
        console.log(mensaje);
      },
    });
  };

  const obtenerProductosCargar = () => {
    if(productos.length > 0){
      $.ajax({
        url: `http://${host}:${port}/api/tabla_productos_fallas`,
        type: "get",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({}),
        beforeSend: function () {
          setMostrarCargando(true);
        },
        success: function (data) {
          if(data.data.length > 0 ){
            cargarDatos(data.data);
            setMostrarCargando(false);
          }
        },
        error: function (data) {
          let mensaje = data.responseJSON.data;
          console.log(mensaje);
        },
      });
    }else{
      mostrarPopup(2, "Elija un archivo!");
    }    
  };

  const generarCSV = (data) => {
    if (data.length > 0) {
      setDatosCSV(data);
      setDescargar(true);
      mostrarPopup(1, "Descargando Archivo");
    } else {
      mostrarPopup(2, "No existen productos");
    }
  };

  const cargarDatos = (data) => {
    if (data.length > 0) {
      setDatosBase(data);
      setCargar(true);
      mostrarPopup(1, "Subiendo archivo");
    } else {
      mostrarPopup(2, "No existen productos");
    }
  };
  
  useEffect(() => {
    if (datosBase.length > 0 && cargar) {
      uploadButton.current.click();
      setTimeout(() => {
        setDatosBase([]);
        setProductos([]);
        setCargar(false);
      }, 1000);
    }
  }, [datosBase, cargar]);

  useEffect(() => {
    if (datosCSV.length > 0 && descargar) {
      downloadButton.current.click();
      setTimeout(() => {
        setDescargar(false);
        setDatosCSV([]);
      }, 1000);
    }
  }, [datosCSV, descargar]);

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);
            setProductos(json);           
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
  }
  const crearProducto = () => {
    $.ajax({
      url: `http://${host}:${port}/api/tabla_productos_fallas/agregar`,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...producto }),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        console.log(data);
        setMostrarCargando(false);
        mostrarPopup(1, data.mensaje);
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

  const actualizarProducto = () => {
    $.ajax({
      url: `http://${host}:${port}/api/tabla_productos_fallas/edit/${producto.ID_CHAR}`,
      type: "put",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ ...producto }),
      beforeSend: function () {
        setMostrarCargando(true);
      },
      success: function (data) {
        setMostrarCargando(false);
        mostrarPopup(1, data.mensaje);
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
  };

  const cargarProductos = () => {
    if(datosBase.length > 0 && productos.length > 0){
      let cambios = false;
      for (const prodSubir of productos) {
            let bandera = false;
            for (const prodBase of datosBase) {
                if(prodSubir.ID+prodSubir.CODIGO === prodBase.ID_CHAR){
                    bandera = true;
                    if(prodSubir.ID !== prodBase.ID || prodSubir.CODIGO !== prodBase.CODIGO || 
                    prodSubir.DESCRIPCION !== prodBase.DESCRIPCION || 
                    prodSubir.KG_TURNO_8 !== prodBase.KG_TURNO_8 ||prodSubir.UNIDADES_8 !== prodBase.UNIDADES_8 || 
                    prodSubir.UNIDADES_MINUTO !== prodBase.UNIDADES_MINUTO || prodSubir.KILOS_MINUTO !== prodBase.KILOS_MINUTO || 
                    prodSubir.PESO_UNITARIO !== prodBase.PESO_UNITARIO || 
                    !prodBase.ID_CHAR){
                        if(prodSubir.ID !== prodBase.ID || prodSubir.CODIGO !== prodBase.CODIGO ||
                            !prodBase.ID_CHAR){
                            producto.ID_CHAR = prodSubir.ID+prodSubir.CODIGO;
                        }else{
                            producto.ID_CHAR = prodBase.ID_CHAR;
                        }
                    
                        //ACTUALIZAMOS PRODUCTO
                        producto.ID = prodSubir.ID;
                        producto.CODIGO = prodSubir.CODIGO;
                        producto.DESCRIPCION = prodSubir.DESCRIPCION;
                        producto.KG_TURNO_8 = prodSubir.KG_TURNO_8;
                        producto.UNIDADES_8 = prodSubir.UNIDADES_8;
                        producto.KG_TURNO_12 = (parseFloat(prodSubir.KG_TURNO_8) * 12) / 8;
                        producto.UNIDADES_12 = (parseFloat(prodSubir.UNIDADES_8) * 12) / 8;
                        producto.KILOS_MINUTO = prodSubir.KILOS_MINUTO;
                        producto.UNIDADES_MINUTO = prodSubir.UNIDADES_MINUTO;
                        producto.PESO_UNITARIO = prodSubir.PESO_UNITARIO;
                        
                        actualizarProducto();
                        cambios = true;
                        break;
                    }
                }
            }

            if(!bandera){
            //AGREGAR PRODUCTO
                producto.ID = prodSubir.ID;
                producto.CODIGO = prodSubir.CODIGO;
                producto.DESCRIPCION = prodSubir.DESCRIPCION;
                producto.KG_TURNO_8 = prodSubir.KG_TURNO_8;
                producto.UNIDADES_8 = prodSubir.UNIDADES_8;
                producto.KG_TURNO_12 = (parseFloat(prodSubir.KG_TURNO_8) * 12) / 8;
                producto.UNIDADES_12 = (parseFloat(prodSubir.UNIDADES_8) * 12) / 8;
                producto.KILOS_MINUTO = prodSubir.KILOS_MINUTO;
                producto.UNIDADES_MINUTO = prodSubir.UNIDADES_MINUTO;
                producto.PESO_UNITARIO = prodSubir.PESO_UNITARIO;
                producto.ID_CHAR = prodSubir.ID+prodSubir.CODIGO;

                crearProducto();
            }
        }

      if(cambios === false){
        mostrarPopup(1, "No hay cambios!");
      }
    }
  };

  return (
    <div className="card-body">
      {mostrarCargando ? (
        <div className="cont-loader-full-container">
          <div className="loader format-ico-loader"></div>
          <>
          <button ref={uploadButton}  style={{ display: "none" }} onClick={cargarProductos}/>
          </>
        </div>
      ) : ( 
      <div className="cont-seccion-mantenimiento">
        <div>
          <input
            type="file"
            name="upload"
            id="upload"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={readUploadFile}
          />
        </div>
        
        <div>
          <Button
              label={"Cargar productos"}
              icono={"ico-cargar"}
              onClick={() => {
                obtenerProductosCargar();
              }}
          />
          <Button
              label={"Descargar productos"}
              icono={"ico-descargar"}
              onClick={() => {
                obtenerProductos();
              }}
          />
          <Download downloadButton={downloadButton} data={datosCSV} tipo={true} />
        </div>
      </div>
      )}
    </div>
  );
}

export default ProductosFallas;