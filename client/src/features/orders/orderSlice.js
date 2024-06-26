import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { order_url } from "../../utils/baseUrl"; // Assuming you have the order URL defined
import { config } from "../../utils/axiosconfig";

// Async thunk for getting all orders
export const getAllOrders = createAsyncThunk(
  "orders/viewOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${order_url}/getAll`, config);
      return response.data; // Assuming the response contains the orders data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for updating an order
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${order_url}/${id}`,
        { status },
        config
      );
      return response.data.order; // Assuming the response contains the updated order data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  list: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.list = action.payload.orders;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update the order in the state
        const index = state.list.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default orderSlice.reducer;
