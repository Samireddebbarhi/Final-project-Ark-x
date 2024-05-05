import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";
// get all products
export const getProducts = createAsyncThunk(
  "users/getProducts",
  async (_, { rejectWithValue }) => {
    return axios
      .get(`${base_url}/getAllProducts`, config)
      .then((res) => {
        console.log(res);

        return res.data;
      })
      .catch((err) => rejectWithValue(err.response.data.message));
  }
);
// add product
export const addProduct = createAsyncThunk(
  "users/addProduct",
  async (_newProduct, { rejectWithValue }) => {
    // return axios.post(`${base_url}/createProduct`, _newProduct)
    // .then((res) => {
    //   console.log(res);
    //   return res.data
    // })
    // .catch((err) => rejectWithValue(err.response.data.message));
    try {
      const response = await axios.post(
        `${base_url}/createProduct`,
        _newProduct,
        config
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const productSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload.product;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default productSlice.reducer;
