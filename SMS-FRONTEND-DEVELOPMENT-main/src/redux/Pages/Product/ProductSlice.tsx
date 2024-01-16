//redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//axios
import axios from "axios";

export interface ProductDetailss {
  id?: number;
  name: string;
  barcode: string | null;
  barcodeimage: string | null;
  description: string;
  stockQuantity: number;
  price: number;
  threshold: number;
  creationDate: string;
  modificationDate: string;
  productName?: string;
  attributes: {
    id: number;
    attributeName: string;
    attributeValue: string;
  }[];
  productCategory: {
    id: number;
    name: string;
  };
  primaryImage: string;
}

export type ProductState = {
  product: ProductDetailss[] | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: ProductState = {
  product: null,
  isAuthenticated: false,
  error: null,
};

//get product details
export const fetchProductDetails = createAsyncThunk<ProductDetailss[], number>(
  "product/productProp",
  async (productId: number) => {
    try {
      const response = await axios.get(
        `http://192.168.10.210:8081/SMS/product/${productId}`
      );
      console.log(response);
      return [response.data];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//get all products
export const fetchAllProducts = createAsyncThunk<ProductDetailss[]>(
  "allProduct/fetchAllProducts",
  async () => {
    try {
      const response = await axios.get(
        "http://192.168.10.210:8081/SMS/product"
      );
      console.log(response);
      return [response.data];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.product = null;
        state.error = action.payload as string | null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.product = null;
        state.error = action.payload as string | null;
      });
  },
});

export default productSlice.reducer;
