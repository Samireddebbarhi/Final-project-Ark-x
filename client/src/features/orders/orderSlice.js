import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { order_url } from "../../utils/baseUrl"; // Assuming you have the order URL defined
import { config } from "../../utils/axiosconfig";

// Async thunk for getting all orders
export const getAllOrders = createAsyncThunk(
  "orders/viewOrders",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(`${order_url}/viewOrders`, config); 
      console.log("respone is ", response)
      return response.data; // Assuming the response contains the orders data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
    orders: [],
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
            .addCase(getAllOrders.pending, (state) =>{
                state.isLoading= true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) =>{
                state.isLoading =false,
                state.isError= false,
                state.isSuccess= true,
                state.orders= action.payload;
               
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
              })

    }

});
export default orderSlice.reducer;
//  // state.isLoading= false;
                // state.isError = false;
                // state.isSuccess = true;
                // state.orderss= action.payload.oreders;