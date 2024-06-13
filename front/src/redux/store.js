import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/LoginSlice";
import registerReducer from "./features/SignUpSlice";
import FavouriteReducer from "./features/FavouriteSlice";
import CartReducer from "./features/CartSlice";
import OrderReducer from "./features/OrderSlice";
export const store = configureStore({
  reducer: {
    auth: loginReducer,
    register: registerReducer,
    fav: FavouriteReducer,
    cart: CartReducer,
    orders: OrderReducer,
  },
});
