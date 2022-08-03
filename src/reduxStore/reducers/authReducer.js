import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
        idpersona: action.payload.idpersona,
        role: action.payload.role,
      };
    case types.logout:
      return {};
    default:
      return state;
  }
};
