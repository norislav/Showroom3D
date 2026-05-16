import CartItem from "./CartItem";
import { removeAllItems, selectorCartItems, selectorTotalCost } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";

const Cart = () => {
  const items = useSelector(selectorCartItems);
  const totalCost = useSelector(selectorTotalCost);
  const dispatch = useDispatch();

  return (
    <div id="cart">
      <div id="cart-header">
        <h2 id="cart-title">Cart</h2>
        {items.length > 0 && (
          <span id="cart-badge">{items.length}</span>
        )}
      </div>

      {items.length === 0 ? (
        <div id="cart-empty">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <ul className="item-scroll">
          {items.map((cartitem) => (
            <li key={cartitem.id}>
              <CartItem
                name={cartitem.id}
                quantity={cartitem.quantity}
                price={cartitem.price}
                color={cartitem.color}
              />
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <>
          <hr id="separator-cart" />
          <p id="total-cost">Total: <span>{totalCost.toFixed(2)} €</span></p>
          <div id="group-cart">
            <button id="remove-all" onClick={() => dispatch(removeAllItems())}>
              Remove all
            </button>
            <button id="fakebuy">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
