import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//axios
import axios from "axios";

interface LeadSource {
  id: number;
  name: string;
}

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

export interface ContactProps {
  contactId: number;
  id: number;
  name: string;
  firstName?: string;
  lastName?: string;
  phone: string;
  fax: string;
  email: string;
  birthdate: string;
  account: {
    // accountId: number;
    accountName: string;
    accountType: string;
    firstName: string;
    id: number;
    lastName: string;
  };
  leadSource: LeadSource;
  address: Address;
  description: string;
  createdBy: User;
  modifiedBy: User;
}
export type ContactState = {
  contact: ContactProps[] | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: ContactState = {
  contact: null,
  isAuthenticated: false,
  error: null,
};

//add new contact
export const addContact = createAsyncThunk(
  "contact/addContact",
  async (
    { contactCredentials }: { contactCredentials: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://192.168.10.210:8081/SMS/contact",
        contactCredentials
      );

      const responseContactCredentials = response.data;
      console.log("", responseContactCredentials);

      return responseContactCredentials;
    } catch (error: any) {
      console.log("Error in register contact items:", error);

      return rejectWithValue("Contact item register failed");
    }
  }
);

//get all contacts
export const fetchContacts = createAsyncThunk<ContactProps[]>(
  "contacts/getAllContacts",
  async () => {
    try {
      const response = await axios.get(
        "http://192.168.10.210:8081/SMS/contact"
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//get all lead source
export const getLeadSource = createAsyncThunk<ContactProps[]>(
  "leadSource/getLeadSource",
  async () => {
    try {
      const response = await axios.get(
        "http://192.168.10.210:8081/SMS/leadSource"
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//get accounts by id
export const fetchContactById = createAsyncThunk(
  "contact/contactById",
  async (contactId: number) => {
    try {
      const response = await axios.get(
        `http://192.168.10.210:8081/SMS/contact/${contactId}`
      );
      console.log("Response from API:", response.data);
      return [response.data];
    } catch (error) {
      console.error("Error fetching contact details:", error);
      throw error;
    }
  }
);

//delete account by id
export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (contactId: number) => {
    try {
      const response = await axios.delete(
        `http://192.168.10.210:8081/SMS/contact/${contactId}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addContact.fulfilled, (state, action) => {
        state.contact = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.contact = null;
        state.error = action.payload as string | null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contact = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.contact = null;
        state.error = action.payload as string | null;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.contact = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.contact = null;
        state.error = action.payload as string | null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contact = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.contact = null;
        state.error = action.payload as string | null;
      })
      .addCase(getLeadSource.fulfilled, (state, action) => {
        state.contact = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getLeadSource.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.contact = null;
        state.error = action.payload as string | null;
      });
  },
});

export default contactSlice.reducer;
