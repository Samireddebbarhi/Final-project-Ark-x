import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { customer_crud } from '../../utils/baseUrl';
import { config } from '../../utils/axiosConfig';

// Thunk for creating an order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ productId, quantityItem, paymentInfo }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${customer_crud}/order/new/${productId}`,
        {
          productId,
          quantity: quantityItem,
          paymentInfo,
        },
        config
      );
     if (response.data.orders){
      console.log("the response is", response.data.orders);
     }
      return response.data.orders; // Corrected: Use response.data directly
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  order: [], // Corrected: Order should be a single object, not an array
  isError: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "", // Corrected: Changed 'message' to 'errorMessage' for clarity
};

export const orderSlice = createSlice({
  name: "orders", // Corrected: Changed name to "orders"
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.order = action.payload; // Corrected: Assign action.payload to state.order
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload ? action.payload : action.error.message; // Corrected: Assign errorMessage based on payload or error message
      });
  },
});

export default orderSlice.reducer;
