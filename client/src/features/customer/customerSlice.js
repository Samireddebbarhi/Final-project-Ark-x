import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { cust_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

// get all customers
export const getCustomers = createAsyncThunk(
  "users/getCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${cust_url}/customers/All`, config);

      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// delete customer  by id
export const deleteCustomerById = createAsyncThunk(
  "users/deleteCustomers",
  async (customerId, { rejectWithValue }) => {
    try {
      console.log("customer id", customerId);
      await axios.delete(`${cust_url}/customers/${customerId}`, config);

      return customerId; // Return the ID of the deleted customer upon success
    } catch (error) {
      // If an error occurs during the deletion process, handle it
      console.error("Error deleting customer:", error);
      // Return rejected value with error message
      return rejectWithValue(error.response.data.message);
    }
  }
);
//
const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const customerSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload.users;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteCustomerById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomerById.fulfilled, (state, action) => {
        // Filter out the deleted customer from the state based on customerId
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteCustomerById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default customerSlice.reducer;
