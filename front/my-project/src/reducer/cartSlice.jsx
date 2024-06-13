import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemList: [],
};

const cartSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    saveitem: (state, action) => {
      state.itemList.push(action.payload);

      const cartListItem = sessionStorage.getItem("cartList")
        ? JSON.parse(sessionStorage.getItem("cartList"))
        : [];
      cartListItem.push({
        id: action.payload.id,
        imageurl: action.payload.imageurl,
        name: action.payload.name,
        price: action.payload.price,
        quantity:1
      });
      sessionStorage.setItem("cartList", JSON.stringify(cartListItem));
    },
    additem: (state, action) => {
      state.itemList[action.payload].quantity++;

      const cartListItem = sessionStorage.getItem("cartList")
        ? JSON.parse(sessionStorage.getItem("cartList"))
        : [{}];
        cartListItem[action.payload].quantity++;
      sessionStorage.setItem("cartList", JSON.stringify(cartListItem));
    },
    subtratitem: (state, action) => {
      state.itemList[action.payload].quantity--;

      const cartListItem = sessionStorage.getItem("cartList")
        ? JSON.parse(sessionStorage.getItem("cartList"))
        : [{}];
        cartListItem[action.payload].quantity--;
      sessionStorage.setItem("cartList", JSON.stringify(cartListItem));
    },

    deleteitem: (state, action) => {
      const index = state.itemList.findIndex(
        (item) => item.id === action.payload
      );
      if (index > -1) {
        state.itemList.splice(index, 1);
      }
      const cartListItem = sessionStorage.getItem("cartList")
        ? JSON.parse(sessionStorage.getItem("cartList"))
        : [{}];
        const indexs = cartListItem.findIndex(
          (item) => item.id === action.payload
        );
        if (indexs > -1) {
          cartListItem.splice(indexs, 1);
        }
      sessionStorage.setItem("cartList", JSON.stringify(cartListItem));
    },
  },
});

export const { saveitem, deleteitem ,additem,subtratitem} = cartSlice.actions;
export const selectitemList = (state) => state.carts.itemList;
export default cartSlice.reducer;
