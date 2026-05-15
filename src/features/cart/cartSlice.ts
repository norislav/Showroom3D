import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../types";
import { RootState } from "../../app/rootReducer";

interface CartState {
  cartItems: CartItem[];
  totalCost: number;
}

const initialState: CartState = {
  cartItems: [],
  totalCost: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      if (typeof action.payload.id != "undefined") {
        const index = state.cartItems.findIndex((object) => {
          return (
            object.id === action.payload.id &&
            object.color === action.payload.color
          );
        });
        if (index == -1) {
          state.cartItems.push({
            id: action.payload.id,
            quantity: action.payload.quantity,
            basePrice: action.payload.basePrice,
            color: action.payload.color,
            price: action.payload.basePrice * action.payload.quantity,
          });
        } else {
          state.cartItems[index].quantity += action.payload.quantity;
          state.cartItems[index].price +=
            action.payload.basePrice * action.payload.quantity;
        }
        state.totalCost = parseFloat(
          (
            state.totalCost +
            action.payload.basePrice * action.payload.quantity
          ).toFixed(2),
        );
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string; color: string }>) => {
      const indexOfItem = state.cartItems.findIndex(
        (item) =>
          item.id === action.payload.id && item.color === action.payload.color,
      );
      if (indexOfItem != -1) {
        state.totalCost = parseFloat(
          (state.totalCost - state.cartItems[indexOfItem].basePrice).toFixed(2),
        );
        if (state.cartItems[indexOfItem].quantity == 1) {
          state.cartItems.splice(indexOfItem, 1);
        } else {
          state.cartItems[indexOfItem].quantity -= 1;
          state.cartItems[indexOfItem].price = parseFloat(
            (
              state.cartItems[indexOfItem].price -
              state.cartItems[indexOfItem].basePrice
            ).toFixed(2),
          );
        }
      }
    },
    removeAllItems: (state) => {
      state.cartItems.splice(0);
      state.totalCost = 0;
    },
  },
});
export const { addItem, removeItem, removeAllItems } = cartSlice.actions;
export const selectorCartItems = (state: RootState) => state.cart.cartItems;
export const selectorTotalCost = (state: RootState) => state.cart.totalCost;
export default cartSlice.reducer;
