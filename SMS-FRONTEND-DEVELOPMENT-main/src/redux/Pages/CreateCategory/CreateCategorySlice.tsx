import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Category {
  name: string;
  image: string;
  id?: number;
}

export type CreateCategoryState = {
  category: Category[] | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: CreateCategoryState = {
  category: null,
  isAuthenticated: false,
  error: null,
};

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (
    { categoryCredentials }: { categoryCredentials: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://192.168.10.210:8081/SMS/productcategory",
        categoryCredentials
      );

      const responseRegData = response.data;
      console.log("", responseRegData);

      // if (response.status !== 200) {
      //   return rejectWithValue(responseRegData.error);
      // }

      return responseRegData;
    } catch (error: any) {
      console.log("Error in register category:", error);

      return rejectWithValue("Category register failed");
    }
  }
);

//get category call
export const fetchCategories = createAsyncThunk<Category[]>(
  "getCategories/getAllCategories",
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

//delete category
export const deleteCategory = createAsyncThunk<Category[], number>(
  "delete/deleteCategory",
  async (categoryId: number) => {
    try {
      const response = await axios.delete(
        `http://192.168.10.210:8081/SMS/productcategory/${categoryId}`
      );
      console.log(response);
      console.log(categoryId);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const createCategorySlice = createSlice({
  name: "createCategory",
  initialState,
  reducers: {
    setCreateCategory: (state, action: PayloadAction<Category[]>) => {
      state.category = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.category = null;
        state.error = action.payload as string | null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.category = null;
        state.error = action.payload as string | null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.category = null;
        state.error = action.payload as string | null;
      });
  },
});

export const { setCreateCategory } = createCategorySlice.actions;
export default createCategorySlice.reducer;
