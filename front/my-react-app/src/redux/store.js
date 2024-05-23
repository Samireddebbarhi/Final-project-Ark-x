import { configureStore } from "@reduxjs/toolkit";
//import registerReducer from "./features/auth/registerSlice";
import loginReducer from "./features/auth/loginSlice";
import cartReducer from "./features/cartSlice"

const store = configureStore({
  reducer: {
    //register: registerReducer,
    auth: loginReducer,
    cart: cartReducer,
  },
});

export default store;
