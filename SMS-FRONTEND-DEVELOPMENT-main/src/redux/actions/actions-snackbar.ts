// types
import { AppDispatch, RootState } from "../store";
import { SnackBarOptions } from "../slices/slice-snackbar.types";
import { v4 as uuidv4 } from "uuid";

// slice actions
import { setItem } from "../slices/slice-snackbar";

export const addSnackbar = (snackbarOptions: SnackBarOptions) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { items } = getState().snackbar;
    const newItems = [
      ...items,
      {
        ...snackbarOptions,
        id: uuidv4(),
      },
    ];
    dispatch(setItem(newItems));
  };
};

export const removeSnackbarByID = (snackbarID: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { items } = getState().snackbar;
    const newItems = [...items];
    newItems.shift();
    dispatch(setItem(newItems));
  };
};

export const removeFirstSnackbar = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { items } = getState().snackbar;
    const newItems = [...items];
    newItems.shift();
    dispatch(setItem(newItems));
  };
};
