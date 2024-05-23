import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  subTotal: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const { productId, quantity, price, total } = action.payload;
      const indexFound = state.items.findIndex(item => item.productId === productId);
      
      if (indexFound !== -1) {
        state.items[indexFound].quantity += quantity;
        state.items[indexFound].total += total;
      } else {
        state.items.push({
          productId,
          quantity,
          price,
          total,
        });
      }

      state.subTotal += total;
    },
    removeItem(state, action) {
      const productId = action.payload;
      const indexFound = state.items.findIndex(item => item.productId === productId);
      
      if (indexFound !== -1) {
        const itemTotal = state.items[indexFound].total;
        state.subTotal -= itemTotal;
        state.items.splice(indexFound, 1);
      }
    },
    emptyCart(state) {
      state.items = [];
      state.subTotal = 0;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  addItem,
  removeItem,
  emptyCart,
  setLoading,
  setError,
  clearError,
} = cartSlice.actions;

export default cartSlice.reducer;
