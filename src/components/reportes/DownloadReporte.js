import React from "react";
import ReactExport from "react-export-excel-xlsx-fix";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const DownloadReporte = ({ data, downloadButton, tipo }) => {
  if(tipo){
    return (
      <ExcelFile filename="ReporteTurnos"
        element={<button ref={downloadButton} style={{ display: "none" }} />}
      >
        <ExcelSheet data={data} name="Hoja 1">
          <ExcelColumn label="fecha" value="fecha" />
          <ExcelColumn label="turno_numero" value="turno_numero" />
          <ExcelColumn label="id_maquina" value="id_maquina" />
          <ExcelColumn label="nombre_maquina" value="nombre_maquina" />
          <ExcelColumn label="turno" value="turno" />
          <ExcelColumn label="id_producto" value="id_producto" />
          <ExcelColumn label="nombre_producto" value="nombre_producto" />
          <ExcelColumn label="meta_kg" value="meta_kg" />
          <ExcelColumn label="meta_unidades" value="meta_unidades" />
          <ExcelColumn label="produccion_kg" value="produccion_kg" />
          <ExcelColumn label="produccion_unidades" value="produccion_unidades" />
          <ExcelColumn label="estado_actual" value="estado_actual" />
          <ExcelColumn label="tiempo_estado_actual" value="tiempo_estado_actual" />
          <ExcelColumn label="tiempo_paro_acumulado" value="tiempo_paro_acumulado" />
          <ExcelColumn label="tiempo_encendido_acumulado" value="tiempo_encendido_acumulado" />
          <ExcelColumn label="numero_paros" value="numero_paros" />
          <ExcelColumn label="velocidad_kg" value="velocidad_kg" />
          <ExcelColumn label="velocidad_unidades" value="velocidad_unidades" />
          <ExcelColumn label="eficiencia" value="eficiencia" />
          <ExcelColumn label="id_usuario" value="id_usuario" />
        </ExcelSheet>
      </ExcelFile>
    );
  }else{
    return (
      <ExcelFile filename="ReporteFallas"
        element={<button ref={downloadButton} style={{ display: "none" }} />}
      >
        <ExcelSheet data={data} name="Hoja 1">
          <ExcelColumn label="FECHA" value="FECHA" />
          <ExcelColumn label="PRODUCTO" value="PRODUCTO" />
          <ExcelColumn label="DESCRIPCION" value="DESCRIPCION" />
          <ExcelColumn label="DURACION" value="DURACION" />
          <ExcelColumn label="CAUSA" value="CAUSA" />
          <ExcelColumn label="UNIDAD" value="UNIDAD" />
          <ExcelColumn label="ID_USUARIO" value="ID_USUARIO" />
          <ExcelColumn label="NOMBRE_USUARIO" value="NOMBRE_USUARIO" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
};

export default DownloadReporte;
