import React from "react";
import ReactExport from "react-export-excel-xlsx-fix";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Download_RTH_Pesos = ({ data, downloadButton, tipo }) => {
  if(tipo){
    return (
      <ExcelFile filename="ReporteRTH"
        element={<button ref={downloadButton} style={{ display: "none" }} />}
      >
        <ExcelSheet data={data} name="Hoja 1">
          <ExcelColumn label="FECHA" value="fecha" />
          <ExcelColumn label="DATA" value="cuarto" />
          <ExcelColumn label="MEDIDA" value="medida" />
        </ExcelSheet>
      </ExcelFile>
    );
  }else{
    return (
      <ExcelFile filename="ReportePesos"
        element={<button ref={downloadButton} style={{ display: "none" }} />}
      >
        <ExcelSheet data={data} name="Hoja 1">
          <ExcelColumn label="FECHA" value="FECHA" />
          <ExcelColumn label="ID PRODUCTO" value="ID PRODUCTO" />
          <ExcelColumn label="PESO PROMEDIO" value="PESO PROM" />
          <ExcelColumn label="ESTACION" value="ESTACION" />
          <ExcelColumn label="USUARIO" value="USUARIO" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
};

export default Download_RTH_Pesos;
