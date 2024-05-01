import { configureStore } from "@reduxjs/toolkit";
import pCategoryReducer from "../features/pcategory/pcategorySlice";

export const store = configureStore({
  reducer: {
    pCategory: pCategoryReducer,
  },
});
