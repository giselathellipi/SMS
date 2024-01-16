//redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//axios
import axios from "axios";

export interface ProductProps {
  name: string;
  image?: any;
  id: number;
}

export type ProductsPropsState = {
  user: ProductProps[] | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: ProductsPropsState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

export const fetchProductsCategory = createAsyncThunk<ProductProps[]>(
  "product/productCategory",
  async () => {
    try {
      const response = await axios.get(
        "http://192.168.10.210:8081/SMS/productcategory"
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
const productCategorySlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsCategory.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchProductsCategory.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string | null;
      });
  },
});

export default productCategorySlice.reducer;
