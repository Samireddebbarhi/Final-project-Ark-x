import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await axios.post("http://localhost:3001/api/v1/customer/login", credentials);
        

       if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));

       }
        // Save user information to local storage
       
        return response.data;
  
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to login');
      }
    }
);
const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
const loginSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "success loginnnnnnnnn";
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            });

    }
})
export default loginSlice.reducer;