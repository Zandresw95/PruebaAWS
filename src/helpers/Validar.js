export const Validar = {
  general(texto) {
    return validarVacio(texto);
  },

  texto(texto) {
    let val = validarVacio(texto);
    if (!val[0]) {
      return val;
    } else {
      var expression = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      return expression.test(texto) ? [true, ""] : [false, "Solo letras"];
    }
  },

  numeros(texto) {
    let val = validarVacio(texto);
    if (!val[0]) {
      return val;
    } else {
      var expression = /^[0-9]{1,10000}([,][0-9]{1,10000})?$/;
      return expression.test(texto)
        ? [true, ""]
        : [false, "Solo números con coma"];
    }
  },

  cedula(texto) {
    let val = validarVacio(texto);
    if (!val[0]) {
      return val;
    } else {
      var expression = /^[0-9]{10,13}?$/;
      return expression.test(texto)
        ? [true, ""]
        : [false, "Ingresa una cédula válida"];
    }
  },

  direccion(texto) {
    let val = validarVacio(texto);
    if (!val[0]) {
      return val;
    } else {
      var expression = /^.{1,100}$/;
      return expression.test(texto)
        ? [true, ""]
        : [false, "Máximo 100 caracteres"];
    }
  },

  email(texto) {
    let val = validarVacio(texto);
    if (!val[0]) {
      return val;
    } else {
      var expression = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
      return expression.test(texto)
        ? [true, ""]
        : [false, "Ingresa un email válido"];
    }
  },

  telefono(texto) {
    let val = validarVacio(texto);
    if (!val[0]) {
      return val;
    } else {
      var expression =
        /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{1,6}$/im;
      return expression.test(texto)
        ? [true, ""]
        : [false, "Ingresa un teléfono válido"];
    }
  },

  noCero(texto) {
    let val = validarVacio(texto);
    if (!val[0]) {
      return val;
    } else {
      return parseInt(texto) !== 0
        ? [true, ""]
        : [false, "Selecciona una opción"];
    }
  },

  fechaDesde(fechaD, fechaH){
    const fd = new Date(`${fechaD} 00:00:00`);
    const fh = new Date(`${fechaH} 23:59:59`);
    let val = validarVacio(fechaH);
    let val2 = validarVacio(fechaD);
    if (!val[0]) { //fecha Hasta esta vacio
      if(!val2[0]){ //fecha Desde esta vacio
        return {["fechaDesde"]: [true, ""],["fechaHasta"]: [true, ""]};
      } 
      else{ //fecha Desde tiene datos y fecha hasta vacio
        return {["fechaHasta"]: val};
      } 
    } else {    //fecha Hasta tiene datos
      if(!val2[0]){ //fecha Desde esta vacio
        return {["fechaDesde"]: val2};
      } 
      else{ //fecha Desde tiene datos y fecha hasta tiene datos
        return fd < fh
        ? {["fechaDesde"]: [true, ""],["fechaHasta"]: [true, ""]}
        : {["fechaHasta"]: [false, "Fecha Hasta debe ser mayor que fecha Desde"]};
      } 
    }
  },
};

function validarVacio(texto) {
  if (texto.length === 0) return [false, "No puede estar vacío"];
  else return [true, ""];
}
