import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";
// get all products
export const getProducts = createAsyncThunk("users/getProducts", async (_, {rejectWithValue}) => {
    return axios.get(`${base_url}/getAllProducts`)
    .then((res) => {
      console.log(res);
      return res.data
    })
    .catch((err) => rejectWithValue(err.response.data.message));
});
//add product
export const addProduct = createAsyncThunk("products/addProduct", async (_newProduct, {rejectWithValue}) => {
  // return axios.post(`${base_url}/createProduct`, _newProduct)
  // .then((res) => {
  //   console.log(res);
  //   return res.data
  // })
  // .catch((err) => rejectWithValue(err.response.data.message));
  try  {
    const response = await axios.post(`${base_url}/createProduct`, _newProduct)
    
    return response.data
  } catch (error){
    return rejectWithValue(error.response.data.message);
  }
});
// delete product 
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${base_url}/deleteProduct/${productId}`);
      return productId;
    } catch (error) {
      // If the request fails, reject the promise with the error message
      return rejectWithValue(error.response.data.message);
    }
  }
);
// update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, updatedProduct }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_url}/updateProduct/${productId}`,
        updatedProduct
      );

      if (response.status !== 200 || !response.data) {
        throw new Error("Failed to update product. Invalid response data.");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
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
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // Assuming the API returns the updated product
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
        console.log('updatestate', state)
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });

  },
});
export default productSlice.reducer;