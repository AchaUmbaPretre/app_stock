import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
      products: [],
      quantite: 0,
      total: 0,
      totalPere: 0, // Nouvelle propriété pour le total du produit père
    },
    reducers: {
      addProduct: (state, action) => {
        state.quantite += 1;
        state.products.push(action.payload);
        state.total += action.payload[0].prix * action.payload.quantite;
  
        const sousProduits = action.payload[0].prix; // Accéder au tableau des sous-produits du produit père
            const quantiteProduitPere = action.payload.quantite; // Récupérer la quantité du produit père

            if (Array.isArray(sousProduits)) {
            const totalSousProduits = sousProduits.reduce(
                (total, sousProduit) =>
                total + sousProduit.prix * sousProduit.quantite * quantiteProduitPere,
                0
            );
            state.totalPere += totalSousProduits;
            }
                },
    },
  });

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;