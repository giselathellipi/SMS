// slice-snackbar.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackBarOptions } from "./slice-snackbar.types";


// slice-snackbar.d.ts

interface SnackbarData extends SnackBarOptions {
  id: string;
}

export interface SnackbarState {
  items: SnackbarData[];
}

const initialState: SnackbarState = {
  items: [],
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setItem: (state, action: PayloadAction<SnackbarData[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setItem } = snackbarSlice.actions;

export default snackbarSlice.reducer;
