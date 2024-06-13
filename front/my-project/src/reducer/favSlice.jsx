import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favList: [],
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    savefav: (state, action) => {
      state.favList.push(action.payload);
      const favListItem = sessionStorage.getItem("favList")
        ? JSON.parse(sessionStorage.getItem("favList"))
        : [];
      favListItem.push( {
        id: action.payload.id,
        imageurl: action.payload.imageurl,
        name: action.payload.name,
        price: action.payload.price,
        quantity:1
      });
      sessionStorage.setItem("favList", JSON.stringify(favListItem))     
      
    
    },
    addfav: (state,action)=>{
      state.favList[action.payload].quantity++;
      const favListItem = sessionStorage.getItem("favList")
        ? JSON.parse(sessionStorage.getItem("favList"))
        : [];
        favListItem[action.payload].quantity++;
        sessionStorage.setItem("favList", JSON.stringify(favListItem))  
    },

    deletefav: (state, action) => {
      const index = state.favList.findIndex(
        (item) => item.id === action.payload
      );
      if (index > -1) {
        state.favList.splice(index, 1);
      }
      const cartListItem = sessionStorage.getItem("favList")
      ? JSON.parse(sessionStorage.getItem("favList"))
      : [{}];
      const indexs = cartListItem.findIndex(
        (item) => item.id === action.payload
      );
      if (indexs > -1) {
        cartListItem.splice(indexs, 1);
      }
    sessionStorage.setItem("favList", JSON.stringify(cartListItem));
    },
  },
});

export const { savefav, deletefav,addfav } = favSlice.actions;
export const selectfavList = (state) => state.fav.favList;
export default favSlice.reducer;
