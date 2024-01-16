// redux
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

//axios
import axios from "axios";

interface RegisterState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roleId: string;
  roleName: string | null;
  token: string | null;
}

export type AuthRegState = {
  user: RegisterState | null;
  isAuthenticated: boolean;
  error: string | null;
  token: string | null;
};

const initialState: AuthRegState = {
  user: null,
  isAuthenticated: false,
  error: null,
  token: null,
};
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userCredentials: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.10.210:8081/SMS/registration",
        userCredentials
      );

      const responseRegData = response.data.body;

      if (response.status !== 200) {
        return rejectWithValue(responseRegData.error);
      }

      return responseRegData;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue("Register failed");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<RegisterState>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string | null;
      });
  },
});

export const { setUser, clearUser } = registerSlice.actions;
export default registerSlice.reducer;
