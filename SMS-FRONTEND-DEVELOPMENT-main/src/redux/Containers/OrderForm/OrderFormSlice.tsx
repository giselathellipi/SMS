import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: number;
  country: string;
}

interface Product {
  id: number;
}

interface OrderItem {
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: Product;
}

export interface Order {
  totalAmount: number;
  orderNotes: string;
  shippingAddress: Address;
  orderItemList: OrderItem[];
  orderClient: {
    id: number;
  };
  createdBy: {
    id: number;
  };
}

export type OrderFormState = {
  order: Order | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: OrderFormState = {
  order: null,
  isAuthenticated: false,
  error: null,
};

export const orderForm = createAsyncThunk(
  "order/orderForm",
  async (
    { userCredentials }: { userCredentials: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://192.168.10.210:8081/SMS/order",
        userCredentials
      );

      const responseRegData = response.data;
      console.log("", responseRegData);

      // if (response.status !== 200) {
      //   return rejectWithValue(responseRegData.error);
      // }

      return responseRegData;
    } catch (error: any) {
      console.log("Error in register order:", error);

      return rejectWithValue("Order register failed");
    }
  }
);

const orderFormSlice = createSlice({
  name: "orderForm",
  initialState,
  reducers: {
    setProductForm: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderForm.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(orderForm.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.order = null;
        state.error = action.payload as string | null;
      });
  },
});

export const { setProductForm } = orderFormSlice.actions;
export default orderFormSlice.reducer;
