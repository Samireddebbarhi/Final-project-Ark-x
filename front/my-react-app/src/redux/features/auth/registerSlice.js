import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialState = {
  user: getUserfromLocalStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  // register: [],
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/customer/register", user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/customer/login", user);
      console.log(response)
      return response.data;

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const registerSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.register = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading= false;
        state.isError = action.payload;
      })
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
});

export default registerSlice.reducer;