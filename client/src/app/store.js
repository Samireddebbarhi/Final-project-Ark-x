import {configureStore} from '@reduxjs/toolkit'
import productReducer from "../features/product/productSlice"

import pCategoryReducer from "../features/pcotegory/pcotegorySlice";
import customerReducer from "../features/customer/customerSlice";
import authReducer from "../features/auth/authSlice";
import orderReducer from "../features/orders/orderSlice"

export const store = configureStore({
    reducer:{
        product: productReducer,
       
        pCategory: pCategoryReducer,
        customer: customerReducer,
        auth: authReducer,
        vOrder: orderReducer,
    },
});