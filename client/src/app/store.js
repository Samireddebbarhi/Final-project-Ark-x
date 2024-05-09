import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import uploadReducer from "../features/upload/uploadSlice";
import authReducer from "../features/auth/authSlice";
import addproductReducer from "../features/product/productSlice";
import customerReducer from "../features/customer/customerSlice";
import deleteproductReducer from "../features/product/productSlice";
import editproductReducer from "../features/product/productSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    upload: uploadReducer,
    addproduct: addproductReducer,
    customer: customerReducer,
    deleteProduct: deleteproductReducer,
    editeProduct: editproductReducer,
    auth: authReducer,
  },
});
