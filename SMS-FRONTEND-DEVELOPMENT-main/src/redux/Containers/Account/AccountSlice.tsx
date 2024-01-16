import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Account {
  accountId?: number;
  accountName?: string;
  email?: string;
  accountNumber?: string;
  industry?: string;
  accountPriority?: string;
  phone?: number;
  website?: string;
  employeesNumber?: number;
  description?: string;
  billingAddress: {
    id?: number;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  shippingAddress: {
    id: 2;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  createdBy: {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  modifiedBy: {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  createdDate?: string;
  modifiedDate?: string;
  accountType?: string;
}

export type AccountState = {
  account: Account[] | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: AccountState = {
  account: null,
  isAuthenticated: false,
  error: null,
};

export const fetchAccountDetails = createAsyncThunk<Account[]>(
  "account/accountProp",
  async () => {
    try {
      const response = await axios.get(
        "http://192.168.10.210:8081/SMS/account"
      );
      console.log(response);
      return [response.data];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountDetails.fulfilled, (state, action) => {
        state.account = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchAccountDetails.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.account = null;
        state.error = action.payload as string | null;
      });
  },
});

export default accountSlice.reducer;
