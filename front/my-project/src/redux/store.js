import {configureStore} from "@reduxjs/toolkit"
import registerReducer from "./features/registerSlice";
import loginReducer from "./features/loginSlice";
import cartReducer from '../reducer/cartSlice';
import favReducer from '../reducer/favSlice';

const store = configureStore({
  reducer: {
    register: registerReducer,
    carts: cartReducer,
    fav: favReducer,
    auth: loginReducer
  },
})

export default store
