import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ResetPass {
  password: string;
  email: string;
  token: string | null;
}
export type ResetPasswordState = {
  userResetPassword: ResetPass | null;
  isAuthenticated: boolean;
  error: string | null;
};
const initialState: ResetPasswordState = {
  userResetPassword: null,
  isAuthenticated: false,
  error: null,
};

export const resetPassword = createAsyncThunk(
  "reset/resetPassword",
  async (resetPassword: object, { rejectWithValue }) => {
    const currentUrl = window.location.href;

    try {
      const url = new URL(currentUrl);
      const pathnameParts = url.pathname.split("/");
      console.log("pathname", pathnameParts);
      const token = pathnameParts[pathnameParts.length - 1];

      const response = await axios.put(
        `http://192.168.10.210:8081/SMS/user/resetPassword/${token}`,
        resetPassword
      );

      const responseData = response.data;
      console.log(responseData);
      if (response.status !== 200) {
        return rejectWithValue(responseData.error.message);
      }

      return responseData;
    } catch (error) {
      console.log("Error in  reset password:", error);

      return rejectWithValue("Reset password failed");
    }
  }
);

//forgot password
export const forgotPassword = createAsyncThunk<ResetPass, string>(
    "forgot/forgotPassword",
    async (email: string, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `http://192.168.10.210:8081/SMS/user/forgetPassword/${email}`
        );
   
        const responseData = response.data;
  
        console.log("forgot pass response", responseData);
  
        localStorage.setItem("email", JSON.stringify(responseData));
  
        if (response.status !== 200) {
          return rejectWithValue(responseData.error.message);
        }
  
        return responseData;
      } catch (error) {
        console.log("Error in forgot pass:", error);
  
        return rejectWithValue("Forgot pass failed!");
      }
    }
  );
  
const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ResetPass>) => {
      state.userResetPassword = action.payload;
      state.isAuthenticated = true;
    },
    setForgotPass: (state, action: PayloadAction<ResetPass>) => {
      state.userResetPassword = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.userResetPassword = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.userResetPassword = null;
        state.error = action.payload as string | null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.userResetPassword = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.userResetPassword = null;
        state.error = action.payload as string | null;
      });
  },
});
export const { setUser } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
