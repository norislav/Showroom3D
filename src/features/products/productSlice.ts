import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productsData from "./products.json";
import { Product } from "../../types";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: productsData,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedColor(
      state,
      action: PayloadAction<{ productID: string; colorCode: string }>,
    ) {
      const { productID, colorCode } = action.payload;

      const product = state.products.find(
        (product) => product.id === productID,
      );
      if (product) {
        product.selectedColor = colorCode;
      }
    },
  },
});

export const { setSelectedColor } = productSlice.actions;

export default productSlice.reducer;
