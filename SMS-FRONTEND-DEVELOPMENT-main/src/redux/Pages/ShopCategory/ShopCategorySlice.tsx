//redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//axios
import axios from "axios";

interface Attribute {
  id: number;
  attributeName: string;
  attributeValue: string;
}

interface ProductCategory {
  id: number;
  name: string;
}

export interface ShopCategoryProductProps {
  attributeId: number;
  id: number;
  name: string;
  barcode: string | null;
  description: string;
  stockQuantity: number;
  price: number;
  threshold: number;
  creationDate: string;
  modificationDate: string;
  attributes: Attribute[];
  productCategory: ProductCategory;
}

export type ShopProductPropsState = {
  user: ShopCategoryProductProps[] | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: ShopProductPropsState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

//get product category
export const fetchShopProductCategory = createAsyncThunk<
  ShopCategoryProductProps[],
  number
>("shopProduct/shopProductCategory", async (productId: number) => {
  try {
    const response = await axios.get(
      `http://192.168.10.210:8081/SMS/productcategory/${productId}/products`
    );
    console.log(response);
    console.log(productId);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

//delete product
export const deleteProduct = createAsyncThunk<
  ShopCategoryProductProps[],
  number
>("delete/deleteProduct", async (productId: number) => {
  try {
    const response = await axios.delete(
      `http://192.168.10.210:8081/SMS/product/${productId}`
    );
    console.log(response);
    console.log(productId);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

//edit product attribute
export const editAttribute = createAsyncThunk(
  "edit/editAttribute",
  async (
    { attributeValues }: { attributeValues: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://192.168.10.210:8081/SMS/productAttribute",
        attributeValues
      );

      const responseRegData = response.data;
      console.log("", responseRegData);

      return responseRegData;
    } catch (error: any) {
      console.log("Error in register attribute values:", error);

      return rejectWithValue("Attribute register failed");
    }
  }
);

//delete attribute
export const deleteAttribute = createAsyncThunk<
  ShopCategoryProductProps[],
  number
>("deleteAttribute/deleteProductAttribute", async (attributeId: number) => {
  try {
    const response = await axios.delete(
      `http://192.168.10.210:8081/SMS/productAttribute/${attributeId}`
    );
    console.log(response);
    console.log(attributeId);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const shopProductSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopProductCategory.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchShopProductCategory.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string | null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string | null;
      })
      .addCase(editAttribute.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(editAttribute.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string | null;
      })
      .addCase(deleteAttribute.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(deleteAttribute.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string | null;
      });
  },
});

export default shopProductSlice.reducer;
