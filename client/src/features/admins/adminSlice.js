import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAdmins,
  deleteAdmins as deleteAdminsService,
  updateAdmins as updateAdminsService,
  createAdmins as createAdminsService,
} from "./adminService";

export const getAdmins = createAsyncThunk(
  "admins/get-admins",
  async (_, thunkAPI) => {
    try {
      return await fetchAdmins();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAdminsById = createAsyncThunk(
  "admins/delete-admins",
  async (idAdmin, thunkAPI) => {
    try {
      return await deleteAdminsService(idAdmin);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAdminById = createAsyncThunk(
  "admins/update-admin",
  async ({ idAdmin, admin }, thunkAPI) => {
    try {
      return await updateAdminsService(idAdmin, admin);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAdmins = createAsyncThunk(
  "admins/create-admins",
  async (admin, thunkAPI) => {
    try {
      return await createAdminsService(admin);
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
  name: "admin",
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
      })
      .addCase(createAdmins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.admins = [...state.admins, action.payload.data];
      })
      .addCase(createAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message || "An error occurred.";
      })
      .addCase(updateAdminById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdminById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.admins = state.admins.map((admin) =>
          admin.id === action.payload.data.id ? action.payload.data : admin
        );
      })
      .addCase(updateAdminById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message || "An error occurred.";
      })
      .addCase(deleteAdminsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdminsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.admins = state.admins.filter(
          (admin) => admin.id !== action.payload.data.id
        );
      })
      .addCase(deleteAdminsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message || "An error occurred.";
      });
  },
});

export default adminSlice.reducer;
