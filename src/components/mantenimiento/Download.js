import React from "react";
import ReactExport from "react-export-excel-xlsx-fix";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Download = ({ data, downloadButton, tipo }) => {

  if(tipo){
    return (
      <ExcelFile filename="ProductosFallas"
        element={<button ref={downloadButton} style={{ display: "none" }} />}
      >
        <ExcelSheet data={data} name="Hoja 1">
          <ExcelColumn label="ID" value="ID" />
          <ExcelColumn label="CODIGO" value="CODIGO" />
          <ExcelColumn label="DESCRIPCION" value="DESCRIPCION" />
          <ExcelColumn label="KG_TURNO_8" value="KG_TURNO_8" />
          <ExcelColumn label="UNIDADES_8" value="UNIDADES_8" />
          <ExcelColumn label="UNIDADES_MINUTO" value="UNIDADES_MINUTO" />
          <ExcelColumn label="KILOS_MINUTO" value="KILOS_MINUTO" />
          <ExcelColumn label="PESO_UNITARIO" value="PESO_UNITARIO" />
          
        </ExcelSheet>
      </ExcelFile>
    );
  }else{
    return (
      <ExcelFile filename="Productos"
        element={<button ref={downloadButton} style={{ display: "none" }} />}
      >
        <ExcelSheet data={data} name="Hoja 1">
          <ExcelColumn label="ID_PRODUCTOS" value="id_productos" />
          <ExcelColumn label="ID" value="ID" />
          <ExcelColumn label="CODIGO" value="CODIGO" />
          <ExcelColumn label="DESCRIPCION" value="DESCRIPCION" />
          <ExcelColumn label="NOMINAL" value="NOMINAL" />
          <ExcelColumn label="MINIMO" value="MINIMO" />
          <ExcelColumn label="MAXIMO" value="MAXIMO" />
          <ExcelColumn label="ESTADO" value="ESTADO" />
          
        </ExcelSheet>
      </ExcelFile>
    );
  }
};

export default Download;
