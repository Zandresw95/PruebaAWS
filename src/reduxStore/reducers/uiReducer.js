import { types } from "../types/types";

const initialState = {
  loading: false,
  msgError: null,
  activeNavbar: "Inicio",
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.iuSetError:
      return {
        ...state,
        msgError: action.payload,
      };
    case types.iuRemoveError:
      return {
        ...state,
        msgError: null,
      };
    case types.iuStartLoading:
      return {
        ...state,
        loading: true,
      };
    case types.iuStopLoading:
      return {
        ...state,
        loading: false,
      };
    case types.activeNavbar:
      return {
        ...state,
        activeNavbar: action.payload,
      };

    default:
      return state;
  }
};
