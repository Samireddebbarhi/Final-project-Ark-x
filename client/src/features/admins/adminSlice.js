import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

export const getAdmins = createAsyncThunk(
  "admins/get-admins",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAdmins();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  admins: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const adminSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdmins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.admins = action.payload.data;
      })
      .addCase(getAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message || "An error occurred.";
      });
  },
});

export default adminSlice.reducer;
