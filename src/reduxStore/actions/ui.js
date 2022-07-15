import { types } from "../types/types";

export const setError = (err) => ({
  type: types.iuSetError,
  payload: err,
});

export const removeError = (err) => ({
  type: types.iuRemoveError,
});

export const startLoading = () => ({
  type: types.iuStartLoading,
});
export const stopLoading = () => ({
  type: types.iuStopLoading,
});

export const setActiveNavbar = (e) => ({
  type: types.activeNavbar,
  payload: e,
});

// menuProductividad
export const getAreas = (e) => ({
  type: types.activeNavbar,
  payload: e,
});
