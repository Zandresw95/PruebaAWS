import { types } from "../types/types";

const initialState = {
  resumenUsuarios: [],
  estadorresumenUsuarios: false,
};

export const usuariosReducer = (state = initialState, action) => {
  // console.log(state);
  switch (action.type) {
    case types.getUsuarios:
      // console.log("ultimo ok")

      return {
        ...state,
        resumenUsuarios: action.payload.e,
        estadorresumenCuartos: true,
      };

    case types.getUsuario:
      // console.log("ultimo ok")
      // console.log(state);
      return {
        ...state,
        resumenUsuarios: action.payload.e,
        estadorresumenCuartos: true,
      };

    default:
      return state;
  }
};
