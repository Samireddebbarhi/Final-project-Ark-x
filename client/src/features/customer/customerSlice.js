import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
<<<<<<< HEAD
import { cust_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

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
      });
  },
=======
import { cust_url} from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

// get all customers
export  const getCustomers = createAsyncThunk("users/getCustomers", async (_, {rejectWithValue}) =>{
   try{
    const response= await axios.get(`${cust_url}/customers/All` , config)
    console.log(response)
    return response.data
   }catch(error){
    return rejectWithValue(error.response.data.message);
   }
})
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
            .addCase(getCustomers.pending, (state) =>{
                state.isLoading= true;
            })
            .addCase(getCustomers.fulfilled, (state, action) =>{
                state.isLoading= false;
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

    }
>>>>>>> a85132681e307261995b03843ce68c4ca45f8b70
});
export default customerSlice.reducer;
