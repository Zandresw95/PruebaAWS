import { types } from "../types/types";

const initialState = {
  modalUsuario: false,
  modalCambioPassword: false,
};

export const modalesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.modalSesion:
      // console.log("ultimo ok")

      return {
        ...state,
        modalUsuario: action.payload.e,
      };
    case types.modalCambioPass:
      // console.log("ultimo ok")

      return {
        ...state,
        modalCambioPassword: action.payload.e,
      };

    default:
      return state;
  }
};
