import {configureStore} from '@reduxjs/toolkit'
import productReducer from "../features/product/productSlice"
import uploadReducer from "../features/upload/uploadSlice"
import addproductReducer from '../features/product/productSlice';
import pCategoryReducer from "../features/pcotegory/pcotegorySlice";
import customerReducer from "../features/customer/customerSlice";
import deleteproductReducer from "../features/product/productSlice"
import editproductReducer from "../features/product/productSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer:{
        product: productReducer,
        upload: uploadReducer,
        addProduct: addproductReducer, 
        pCategory: pCategoryReducer,
        customer: customerReducer,
        deleteProduct : deleteproductReducer,
        editeProduct : editproductReducer,
        auth: authReducer,
    },
});