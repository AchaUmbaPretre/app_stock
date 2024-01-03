import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantite: 0,
    total:0,
    totalPere: 0,
  },
  reducers: {
    addProduct: (state, action) => {
        state.quantite += 1;
        state.products.push(action.payload);
        state.total += action.payload[0].prix * action.payload.quantite;

        console.log(action.payload.quantite)

              // Calcul du total du produit père
      const sousProduits = action.payload[0]; 
      console.log('bonjour', sousProduits)
      // Tableau des sous-produits du produit père
      if (sousProduits) {
        const totalSousProduits = sousProduits.reduce(
          (total, sousProduit) =>
            total + sousProduit.prix * sousProduit.quantite,
          0
        );
        state.totalPere += totalSousProduits;
      }
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;