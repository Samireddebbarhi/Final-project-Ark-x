import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemList: JSON.parse(localStorage.getItem("cartList")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveitem: (state, action) => {
      const existingItem = state.itemList.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.itemList.push({ ...action.payload, quantity: 1 });
      }
      const cartListItem = JSON.parse(localStorage.getItem("cartList")) || [];
      cartListItem.push({ ...action.payload, quantity: 1 });
      localStorage.setItem("cartList", JSON.stringify(cartListItem));
    },
    additem: (state, action) => {
      const item = state.itemList.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
        const cartListItem = JSON.parse(localStorage.getItem("cartList")) || [];
        const cartItem = cartListItem.find(
          (item) => item.id === action.payload
        );
        if (cartItem) {
          cartItem.quantity++;
          localStorage.setItem("cartList", JSON.stringify(cartListItem));
        }
      }
    },
    subtractitem: (state, action) => {
      const item = state.itemList.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
          const cartListItem =
            JSON.parse(localStorage.getItem("cartList")) || [];
          const cartItem = cartListItem.find(
            (item) => item.id === action.payload
          );
          if (cartItem) {
            cartItem.quantity--;
            localStorage.setItem("cartList", JSON.stringify(cartListItem));
          }
        } else {
          const index = state.itemList.findIndex(
            (item) => item.id === action.payload
          );
          if (index > -1) {
            state.itemList.splice(index, 1);
          }
          const cartListItem =
            JSON.parse(localStorage.getItem("cartList")) || [];
          const cartIndex = cartListItem.findIndex(
            (item) => item.id === action.payload
          );
          if (cartIndex > -1) {
            cartListItem.splice(cartIndex, 1);
            localStorage.setItem("cartList", JSON.stringify(cartListItem));
          }
        }
      }
    },
    deleteitem: (state, action) => {
      const index = state.itemList.findIndex(
        (item) => item.id === action.payload
      );
      if (index > -1) {
        state.itemList.splice(index, 1);
      }
      const cartListItem = JSON.parse(localStorage.getItem("cartList")) || [];
      const indexs = cartListItem.findIndex(
        (item) => item.id === action.payload
      );
      if (indexs > -1) {
        cartListItem.splice(indexs, 1);
        localStorage.setItem("cartList", JSON.stringify(cartListItem));
      }
    },
  },
});

export const { saveitem, deleteitem, additem, subtractitem } =
  cartSlice.actions;
export const selectitemList = (state) => state.cart.itemList;
export default cartSlice.reducer;
