import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number | null;
  accessToken: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string | null;
}

export type LoginState = {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: LoginState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

export const UserLogin = createAsyncThunk(
  "user/loginUser",
  async (userCredentials: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.10.210:8081/SMS/auth/login",
        userCredentials
      );

      const responseData = response.data.body;

      console.log("response slice", responseData);

      localStorage.setItem("user", JSON.stringify(responseData));

      if (response.status !== 200) {
        return rejectWithValue(responseData.error.message);
      }

      return responseData;
    } catch (error) {
      console.log("Error in user login:", error);

      return rejectWithValue("Login failed!");
    }
  }
);

//logout
export const UserLogout = createAsyncThunk<void, number | null>(
  "user/userLogout",
  async (incomingUserId: number | null, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      console.log("user local storage", user);
      if (!user) {
        throw new Error("User data not found in localStorage");
      }
      const userData = JSON.parse(user);
      const userIdFromLocalStorage = userData.id;
      console.log(userIdFromLocalStorage);
      if (!userIdFromLocalStorage) {
        throw new Error("User ID not found in user data");
      }
      const response = await axios.post(
        `http://192.168.10.210:8081/SMS/auth/logout/${userIdFromLocalStorage}`
      );

      console.log("Logout response:", response.data);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error in user logout:", error);

      return rejectWithValue("Logout failed");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
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
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string | null;
      })
      .addCase(UserLogout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(UserLogout.rejected, (state, action) => {
        state.error = action.payload as string | null;
      });
  },
});

export const { setUser, clearUser } = loginSlice.actions;
export default loginSlice.reducer;
