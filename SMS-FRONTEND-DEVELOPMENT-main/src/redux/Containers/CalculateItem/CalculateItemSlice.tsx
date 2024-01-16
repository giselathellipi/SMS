import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
}

interface OrderItem {
  quantity: number;
  unitPrice: number;
  product: Product;
}

export interface OrderItemList {
  orderItemList: OrderItem[];
}

export type CalculateItem = {
  calculateitem: OrderItemList | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: CalculateItem = {
  calculateitem: null,
  isAuthenticated: false,
  error: null,
};

//calculate item post api
export const calculateItem = createAsyncThunk(
  "calculate/calculateItem",
  async (
    {
      itemCredentials
    }: { itemCredentials: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://192.168.10.210:8081/SMS/order/calculateItem",
        itemCredentials
      );

      const responseRegData = response.data;
      console.log("", responseRegData);

      if (response.status !== 200) {
        return rejectWithValue(responseRegData.error);
      }

      return responseRegData;
    } catch (error: any) {
      console.log("Error in calculate item:", error);

      return rejectWithValue("Calculate item register failed");
    }
  }
);

const calculateItemSlice = createSlice({
  name: "calculate",
  initialState,
  reducers: {
    setCalculatedItem: (state, action: PayloadAction<OrderItemList>) => {
      state.calculateitem = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateItem.fulfilled, (state, action) => {
        state.calculateitem = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(calculateItem.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.calculateitem = null;
        state.error = action.payload as string | null;
      });
  },
});

export const { setCalculatedItem } = calculateItemSlice.actions;
export default calculateItemSlice.reducer;
