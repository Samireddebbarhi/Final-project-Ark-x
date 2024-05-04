import {configureStore} from '@reduxjs/toolkit'
import productReducer from "../features/product/productSlice"
import uploadReducer from "../features/upload/uploadSlice"
import addproductReducer from '../features/product/productSlice';
import pCategoryReducer from "../features/pcotegory/pcotegorySlice";
import customerReducer from "../features/customer/customerSlice";
import deleteproductReduced from "../features/product/productSlice"

export const store = configureStore({
    reducer:{
        product: productReducer,
        upload: uploadReducer,
        addProduct: addproductReducer, 
        pCategory: pCategoryReducer,
        customer: customerReducer,
        deleteProduct : deleteproductReduced,
    },
});