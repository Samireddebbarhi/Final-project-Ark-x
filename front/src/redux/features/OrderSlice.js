import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { customer_crud } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

// Thunk for creating an order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ productId, quantity, payment }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${customer_crud}/order/new/${productId}`,
        {
          quantityItem: quantity,
          paymentInfo: payment,
        },
        config
      );

      const data = response.data;
      if (!response.status === 200) {
        // If response is not ok, handle the error
        throw new Error(data.message || "Something went wrong");
      }

      return { order: data.orders, productId }; // Return order data and productId
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occurred"
      );
    }
  }
);

const initialState = {
  order: {}, // Single order object
  isError: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "", // Clear error message
  orderedItems: {}, // Store ordered status of items
};

export const orderSlice = createSlice({
  name: "orders", // Slice name
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.order = action.payload.order; // Assign the order data to state.order
        state.orderedItems[action.payload.productId] = true; // Set ordered status to true
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload || action.error.message; // Assign errorMessage
      });
  },
});

export const { resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;
