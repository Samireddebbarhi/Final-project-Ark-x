import {configureStore} from '@reduxjs/toolkit'
import productReducer from "../features/product/productSlice"
import uploadReducer from "../features/upload/uploadSlice"
import addproductReducer from '../features/product/productSlice';

export const store = configureStore({
    reducer:{
        product: productReducer,
        upload: uploadReducer,
        addproduct: addproductReducer, 
    },
});