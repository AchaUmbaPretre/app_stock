import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    produits: [],
    quantite: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantite += 1;
      state.produits.push(action.payload);
      state.total += action.payload.price * action.payload.quantite;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;