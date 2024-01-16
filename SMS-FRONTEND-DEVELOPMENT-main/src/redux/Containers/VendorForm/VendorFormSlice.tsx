import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Vendor {
  id?: number | string;
  companyName: string;
  email: string;
  phoneNumber: string;
  contactPersonName: string;
  notes: string;
  paymentTerms: string;
  bankName: string;
  createdDate: string;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
  modifiedBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export type VendorFormState = {
  vendor: Vendor[] | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: VendorFormState = {
  vendor: null,
  isAuthenticated: false,
  error: null,
};

export const vendorForm = createAsyncThunk(
  "vendor/vendorForm",
  async (
    { vendorCredentials }: { vendorCredentials: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://192.168.10.210:8081/SMS/vendor",
        vendorCredentials
      );

      const responseRegData = response.data;
      console.log("", responseRegData);
      //   if (response.status !== 200) {
      //     return rejectWithValue(responseRegData.error);
      //   }
      return responseRegData;
    } catch (error: any) {
      console.log("Error in register vendor:", error);

      return rejectWithValue("Vendor register failed");
    }
  }
);


//get vendors api
export const fetchVendors = createAsyncThunk<Vendor[]>(
  "vendors/getVendors",
  async () => {
    try {
      const response = await axios.get("http://192.168.10.210:8081/SMS/vendor");
      console.log("vendors", response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//get vendor by id
export const fetchVendorsById = createAsyncThunk<
  Vendor[],
  { vendorId: number },
  { rejectValue: string }
>("vendorById/getVendorById", async ({ vendorId }) => {
  try {
    const response = await axios.get(
      `http://192.168.10.210:8081/SMS/vendor/${vendorId}`
    );
    console.log("vendors by id", response);
    return [response.data];
  } catch (error) {
    console.error(error);
    throw error;
  }
});

//delete vendor
export const deleteVendor = createAsyncThunk<Vendor[], number>(
  "delete/deleteVendor",
  async (vendorId: number) => {
    try {
      const response = await axios.delete(
        `http://192.168.10.210:8081/SMS/vendor/${vendorId}`
      );
      console.log(response);
      console.log(vendorId);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const vendorFormSlice = createSlice({
  name: "vendorForm",
  initialState,
  reducers: {
    setVendorForm: (state, action: PayloadAction<Vendor[]>) => {
      state.vendor = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(vendorForm.fulfilled, (state, action) => {
        state.vendor = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(vendorForm.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.vendor = null;
        state.error = action.payload as string | null;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.vendor = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.vendor = null;
        state.error = action.payload as string | null;
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.vendor = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(deleteVendor.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.vendor = null;
        state.error = action.payload as string | null;
      })
      .addCase(fetchVendorsById.fulfilled, (state, action) => {
        state.vendor = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchVendorsById.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.vendor = null;
        state.error = action.payload as string | null;
      });
  },
});

export const { setVendorForm } = vendorFormSlice.actions;
export default vendorFormSlice.reducer;
