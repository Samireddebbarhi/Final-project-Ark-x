import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemList: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveitem: (state, action) => {
      state.itemList.push(action.payload);

      localStorage.setItem("cartList", JSON.stringify(state.itemList));
    },
    additem: (state, action) => {
      const index = action.payload;
      state.itemList[index].quantity++;

      localStorage.setItem("cartList", JSON.stringify(state.itemList));
    },
    subtratitem: (state, action) => {
      const index = action.payload;
      state.itemList[index].quantity--;

      localStorage.setItem("cartList", JSON.stringify(state.itemList));
    },
    deleteitem: (state, action) => {
      const index = state.itemList.findIndex(
        (item) => item.id === action.payload
      );
      if (index > -1) {
        state.itemList.splice(index, 1);
      }

      localStorage.setItem("cartList", JSON.stringify(state.itemList));
    },
  },
});

export const { saveitem, deleteitem, additem, subtratitem } = cartSlice.actions;
export const selectitemList = (state) => state.cart.itemList;
export default cartSlice.reducer;
