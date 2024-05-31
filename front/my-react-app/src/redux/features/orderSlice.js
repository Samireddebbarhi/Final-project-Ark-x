import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customer_crud } from '../../utils/baseUrl';
import { config } from '../../utils/axiosConfig';

// Thunk for creating an order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ productId, quantityItem, paymentInfo }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${customer_crud}/order/new/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers you might need, like authorization headers
          ...config.headers
        },
        body: JSON.stringify({
          productId,
          quantity: quantityItem,
          paymentInfo,
        }),
        
      });

      const data = await response.json();
      console.log("data ", data);

      if (!response.ok) {
        // If response is not ok, handle the error
        throw new Error(data.message || 'Something went wrong');
      }

      if (data.orders) {
        console.log("the response is", data.orders);
      }

      return data.orders;
    } catch (error) {
      if (error.message) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

const initialState = {
  order: {}, // Single order object
  isError: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "", // Clear error message
};

export const orderSlice = createSlice({
  name: 'orders', // Slice name
  initialState,
  reducers: {},
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
        state.order = action.payload; // Assign the order data to state.order
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload || action.error.message; // Assign errorMessage
      });
  },
});

export default orderSlice.reducer;
