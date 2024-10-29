import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
// import pCategoryService from './pcotegoryservice';
import { base_url } from "../../utils/baseUrl";
import axios from "axios";
import { config } from "../../utils/axiosconfig";

export const getCategories = createAsyncThunk(
  "productCategory/get-categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/getAllCategory`, config);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createCategory = createAsyncThunk(
  "productCategory/create-category",
  async (name, { rejectWithValue }) => {
    try {
      console.log(name);
      const response = await axios.post(
        `http://localhost:3001/api/v2/admin/addCategory`,
        { name: name },
        config
      );
      console.log(response);
      return response.data.category;
    } catch (error) {
      console.log(error);
      return rejectWithValue(response.data.error);
    }
  }
);

export const updateAProductCategory = createAsyncThunk(
  "productCategory/update-category",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_url}/updateCategory/${category.id}`,
        { name: category.name },
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAProductCategory = createAsyncThunk(
  "productCategory/delete-category",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${base_url}/deleteCategory/${id}`, config);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const getAProductCategory = createAsyncThunk(
//   "productCategory/get-product-category",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(`${base_url}getCategory/${id}`, config);
//       return await pCategoryService.getProductCategory(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
export const resetState = createAction("RevertAll");

const initialState = {
  pCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const pCategorySlice = createSlice({
  name: "pCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCategory = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
      })
      .addCase(updateAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategories = state.pCategories.filter(
          (category) => category._id !== action.payload
        );
      })
      .addCase(deleteAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      //   .addCase(getAProductCategory.pending, (state) => {
      //     state.isLoading = true;
      //   })
      //   .addCase(getAProductCategory.fulfilled, (state, action) => {
      //     state.isLoading = false;
      //     state.isError = false;
      //     state.isSuccess = true;
      //     state.categoryName = action.payload.title;
      //   })
      //   .addCase(getAProductCategory.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.isError = true;
      //     state.isSuccess = false;
      //     state.message = action.error;
      //   })
      .addCase(resetState, () => initialState);
  },
});
export default pCategorySlice.reducer;
