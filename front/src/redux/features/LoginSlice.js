import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/customer/login",
        credentials
      );

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("isAuthenticated", true);
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response ? err.response.data : "Failed To Login"
      );
    }
  }
);

const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  isAuthenticated: !!localStorage.getItem("isAuthenticated"),
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const LoginSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.message = "Successfully logged In";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { logout } = LoginSlice.actions;
export default LoginSlice.reducer;
