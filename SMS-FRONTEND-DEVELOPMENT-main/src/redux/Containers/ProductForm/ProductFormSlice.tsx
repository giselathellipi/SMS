import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ProductForm {
  name: string;
  barcode: string | null;
  description: string;
  stockQuantity: number;
  price: number;
  threshold: number;
  productCategory: {
    id: number;
  };
  attributes: {
    attributeName: string;
    attributeValue: string;
  }[];
}

export type ProductFormState = {
  modal: ProductForm | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: ProductFormState = {
  modal: null,
  isAuthenticated: false,
  error: null,
};

export const productForm = createAsyncThunk(
  "product/productForm",
  async (
    { userCredentials }: { userCredentials: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://192.168.10.210:8081/SMS/product",
        userCredentials
      );

      const responseRegData = response.data;
      console.log("", responseRegData);

      // if (response.status !== 200) {
      //   return rejectWithValue(responseRegData.error);
      // }

      return responseRegData;
    } catch (error: any) {
      console.log("Error in register product:", error);

      return rejectWithValue("Product register failed");
    }
  }
);

const productFormSlice = createSlice({
  name: "productForm",
  initialState,
  reducers: {
    setProductForm: (state, action: PayloadAction<ProductForm>) => {
      state.modal = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productForm.fulfilled, (state, action) => {
        state.modal = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(productForm.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.modal = null;
        state.error = action.payload as string | null;
      });
  },
});

export const { setProductForm } = productFormSlice.actions;
export default productFormSlice.reducer;
