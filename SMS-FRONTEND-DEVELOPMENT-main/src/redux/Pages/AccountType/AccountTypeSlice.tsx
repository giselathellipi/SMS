import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//axios
import axios from "axios";

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface User {
  id: number;
}

export interface AccountTypeProps {
  accountId: number;
  accountName: string;
  accountNumber: string;
  website: string;
  employeesNumber: string;
  firstName?: string;
  lastName?: string;
  email: string;
  industry: string;
  accountPriority: string;
  phone: string;
  description: string;
  billingAddress: Address;
  shippingAddress: Address;
  createdBy: User;
  modifiedBy: User;
  accountType: string;
}
export type AccountTypeState = {
  accountType: AccountTypeProps[] | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: AccountTypeState = {
  accountType: null,
  isAuthenticated: false,
  error: null,
};

//add new account
export const addAccount = createAsyncThunk(
  "addOrder/addOrderItem",
  async (
    { accountCredentials }: { accountCredentials: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://192.168.10.210:8081/SMS/account",
        accountCredentials
      );

      const responseAccountCredentials = response.data;
      console.log("", responseAccountCredentials);

      return responseAccountCredentials;
    } catch (error: any) {
      console.log("Error in register account items:", error);

      return rejectWithValue("Account item register failed");
    }
  }
);

//get accounts details
export const getAccountByType = createAsyncThunk(
  "getAccount/getAccountByType",
  async (
    { accountTypeCredentials }: { accountTypeCredentials: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        "http://192.168.10.210:8081/SMS/account",
        accountTypeCredentials
      );

      const responseAccountTypeCredentials = response.data;
      console.log("", responseAccountTypeCredentials);

      return responseAccountTypeCredentials;
    } catch (error: any) {
      console.log("Error in register account items:", error);

      return rejectWithValue("Account item register failed");
    }
  }
);

//get accounts by id
export const fetchAccountDetailsById = createAsyncThunk(
  "account/accountById",
  async (accountId: number) => {
    try {
      console.log("Fetching account details...");
      const response = await axios.get(
        `http://192.168.10.210:8081/SMS/account/${accountId}`
      );
      console.log("Response from API:", response.data);
      return [response.data];
    } catch (error) {
      console.error("Error fetching account details:", error);
      throw error;
    }
  }
);

//delete account by id
export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async (accountId: number) => {
    try {
      const response = await axios.delete(
        `http://192.168.10.210:8081/SMS/account/${accountId}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const accountTypeSlice = createSlice({
  name: "accountType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAccount.fulfilled, (state, action) => {
        state.accountType = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(addAccount.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.accountType = null;
        state.error = action.payload as string | null;
      })
      .addCase(getAccountByType.fulfilled, (state, action) => {
        state.accountType = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getAccountByType.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.accountType = null;
        state.error = action.payload as string | null;
      })
      .addCase(fetchAccountDetailsById.fulfilled, (state, action) => {
        state.accountType = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchAccountDetailsById.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.accountType = null;
        state.error = action.payload as string | null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.accountType = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.accountType = null;
        state.error = action.payload as string | null;
      });
  },
});

export default accountTypeSlice.reducer;
