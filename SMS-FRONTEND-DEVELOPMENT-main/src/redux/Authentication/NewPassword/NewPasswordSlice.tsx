import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface RecoverPass {
  password: string;
  token: string | null;
}
export type RegPasswordState = {
  userPassword: RecoverPass | null;
  isAuthenticated: boolean;
  error: string | null;
};
const initialState: RegPasswordState = {
  userPassword: null,
  isAuthenticated: false,
  error: null,
};

export const newPassword = createAsyncThunk(
  "new/newPassword",
  async (newPassword: object, { rejectWithValue }) => {
    const currentUrl = window.location.href;

    try {
      const url = new URL(currentUrl);

      const pathnameParts = url.pathname.split("/");
      console.log("pathname", pathnameParts);
      const token = pathnameParts[pathnameParts.length - 1];

      const response = await axios.post(
        `http://192.168.10.210:8081/SMS/savepassword/${token}`,

        newPassword
      );

      const responseData = response.data;
      console.log(responseData);
      if (response.status !== 200) {
        return rejectWithValue(responseData.error.message);
      }

      return responseData;
    } catch (error) {
      console.log("Error in  new password:", error);

      return rejectWithValue("New password failed");
    }
  }
);
const newPasswordSlice = createSlice({
  name: "newPassword",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<RecoverPass>) => {
      state.userPassword = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newPassword.fulfilled, (state, action) => {
        state.userPassword = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(newPassword.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.userPassword = null;
        state.error = action.payload as string | null;
      });
  },
});
export const { setUser } = newPasswordSlice.actions;
export default newPasswordSlice.reducer;
