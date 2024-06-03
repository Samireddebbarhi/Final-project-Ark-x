import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favList: JSON.parse(localStorage.getItem("favList")) || [],
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    savefav: (state, action) => {
      const newItem = {
        id: action.payload.id,
        imageurl: action.payload.imageurl,
        name: action.payload.name,
        price: action.payload.price,
        stock: action.payload.stock,
        quantity: 1,
      };
      state.favList.push(newItem);
      localStorage.setItem("favList", JSON.stringify(state.favList));
    },
    addfav: (state, action) => {
      const item = state.favList.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
        localStorage.setItem("favList", JSON.stringify(state.favList));
      }
    },
    deletefav: (state, action) => {
      const index = state.favList.findIndex(
        (item) => item.id === action.payload
      );
      if (index > -1) {
        state.favList.splice(index, 1);
        localStorage.setItem("favList", JSON.stringify(state.favList));
      }
    },
  },
});

export const { savefav, deletefav, addfav } = favSlice.actions;
export const selectfavList = (state) => state.fav.favList;
export default favSlice.reducer;
