import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { removeAllItems, selectorCartItems } from "./cartSlice";
import { selectorTotalCost } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";

const Cart = () => {
  const items = useSelector(selectorCartItems);
  const totalCost = useSelector(selectorTotalCost);
  const dispatch = useDispatch();

  useEffect(() => {
    addEventListener("wheel", (e: WheelEvent) => {
      if (e.deltaY > 0) {
        document.getElementsByClassName("item-scroll")[0].scrollBy(0, 80);
      } else if (e.deltaY < 0) {
        document.getElementsByClassName("item-scroll")[0].scrollBy(0, -80);
      }
    });
  }, []); // empty array = runs once on mount, cleanup runs on unmount

  return (
    <div id="cart">
      <h2 id="cart-title">Shopping Cart</h2>
      <ul className="item-scroll">
        {items.map((cartitem) => {
          return (
            <li key={cartitem.id}>
              <CartItem
                name={cartitem.id}
                quantity={cartitem.quantity}
                price={cartitem.price}
                color={cartitem.color}
              />
            </li>
          );
        })}
      </ul>
      <hr id="separator-cart" />
      <p id="total-cost">Total: {totalCost.toFixed(2)} €</p>
      <div id="group-cart">
        <button id="remove-all" onClick={() => dispatch(removeAllItems())}>
          Remove all
        </button>
        <button id="fakebuy">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
