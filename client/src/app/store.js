import {configureStore} from '@reduxjs/toolkit'
import productReducer, { addProduct } from "../features/product/productSlice"
import uploadReducer from "../features/upload/uploadSlice"
import addproductReducer from '../features/product/productSlice';
import pCategoryReducer from "../features/pcotegory/pcotegorySlice";
import customerReducer from "../features/customer/customerSlice"

export const store = configureStore({
    reducer:{
        product: productReducer,
        upload: uploadReducer,
        addProduct: addproductReducer, 
        pCategory: pCategoryReducer,
        customer: customerReducer,
    },
});