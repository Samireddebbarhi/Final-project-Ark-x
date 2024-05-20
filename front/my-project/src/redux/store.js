import {configureStore} from "@reduxjs/toolkit"
import registerReducer from "./features/registerSlice";
import cartReducer from '../reducer/cartSlice';
import favReducer from '../reducer/favSlice';

const store = configureStore({
  reducer: {
    register: registerReducer,
    carts: cartReducer,
    fav: favReducer
  },
})

export default store
