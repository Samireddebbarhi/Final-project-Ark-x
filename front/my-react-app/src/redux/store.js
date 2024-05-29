import { configureStore } from "@reduxjs/toolkit";
//import registerReducer from "./features/auth/registerSlice";
import loginReducer from "./features/auth/loginSlice";
import orderReducer from "./features/orderSlice"

const store = configureStore({
  reducer: {
    //register: registerReducer,
    auth: loginReducer,
    orders: orderReducer,
  },
});

export default store;
