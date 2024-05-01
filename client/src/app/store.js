import {configureStore} from '@reduxjs/toolkit'
import productReducer from "../features/product/productSlice"
import uploadReducer from "../features/upload/uploadSlice"

export const store = configureStore({
    reducer:{
        product: productReducer,
        upload: uploadReducer,
    },
});