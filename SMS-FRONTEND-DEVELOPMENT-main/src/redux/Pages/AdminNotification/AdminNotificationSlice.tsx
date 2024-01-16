//redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//axios
import axios from "axios";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Product {
  id: number;
  productName: string;
}

export interface Notification {
  id?: number;
  notificationDateTime: string;
  notificationMessage: string;
  notificationType: string;
  priorityLevel: string;
  product: Product;
  user: User;
}
export type NotificationPropsState = {
  notification: Notification[] | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: NotificationPropsState = {
  notification: null,
  isAuthenticated: false,
  error: null,
};

export const fetchAdminNotification = createAsyncThunk<
  Notification[],
  { userId: number },
  { rejectValue: string }
>("notification/adminNotification", async ({ userId }) => {
  try {
    const response = await axios.get(
      `http://192.168.10.210:8081/SMS/notification/user/${userId}`
    );
    console.log(response);
    return [response.data];
  } catch (error) {
    console.error(error);
    throw error;
  }
});

//delete api
export const deleteNotification = createAsyncThunk<Notification[], number>(
  "delete/deleteNotification",
  async (notificationId: number) => {
    try {
      const response = await axios.delete(
        `http://192.168.10.210:8081/SMS/notification/${notificationId}`
      );
      console.log(response);
      console.log(notificationId);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//read or unread api 
export const NotificationRead = createAsyncThunk<Notification[], number>(
  "read/readNotification",
  async (notificationId: number) => {
    try {
      const response = await axios.put(
        `http://192.168.10.210:8081/SMS/notification/readNotification/${notificationId}`
      );
      console.log(response);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const adminNotificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminNotification.fulfilled, (state, action) => {
        state.notification = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchAdminNotification.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.notification = null;
        state.error = action.payload as string | null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notification = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.notification = null;
        state.error = action.payload as string | null;
      })
      .addCase(NotificationRead.fulfilled, (state, action) => {
        state.notification = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(NotificationRead.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.notification = null;
        state.error = action.payload as string | null;
      });
  },
});

export default adminNotificationSlice.reducer;
