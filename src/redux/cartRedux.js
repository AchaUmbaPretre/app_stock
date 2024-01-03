import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantite: 0,
    total:0,
  },
  reducers: {
    addProduct: (state, action) => {
        state.quantite += 1;
        state.products.push(action.payload);
        state.total += action.payload[0].prix * action.payload.quantite;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;