import { useState, forwardRef } from "react";
import "../ui.css";
import { useDispatch } from "react-redux";
import { addItem } from "../../cart/cartSlice";
import { setSelectedColor } from "../../products/productSlice";
import type { Product } from "../../../types";

interface ProductSidebarProps {
  product: Product | null;
  isVisible: boolean;
}

const ProductSidebar = forwardRef<HTMLDivElement, ProductSidebarProps>(
  ({ product, isVisible }, ref) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    if (!product) return null;

    const visibleClass = isVisible ? "visible" : "";
    const selectedColor = product.selectedColor;

    const handleIncrement = () => setQuantity(quantity + 1);
    const handleDecrement = () => setQuantity(quantity - 1);

    return (
      <div
        ref={ref}
        id="product-sidebar"
        className={`product-sidebar ${visibleClass}`}
      >
        <div className="general-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-desc">{product.description}</p>
          <div className="product-specs">
            <p className="product-dimensions">dimensioni: 20x30x10cm</p>
            <p className="product-weight">peso: 244g</p>
          </div>
        </div>
        <div className="color-selection">
          <p>Seleziona il colore:</p>
          {product.variants.map((variant) => (
            <div key={variant.colorName} className="color-option">
              <label htmlFor={`color-${variant.colorName}`}>
                {variant.colorName}
              </label>
              <input
                type="radio"
                id={`color-${variant.colorName}`}
                name="color"
                className="radio-color"
                value={variant.colorName}
                checked={variant.colorName === selectedColor}
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.checked && variant.colorName === selectedColor) {
                    target.checked = false;
                    dispatch(
                      setSelectedColor({
                        productID: product.id,
                        colorName: "standard",
                      }),
                    );
                  } else {
                    dispatch(
                      setSelectedColor({
                        productID: product.id,
                        colorName: variant.colorName,
                      }),
                    );
                  }
                }}
                onChange={() => {}}
              />
            </div>
          ))}
        </div>
        <div className="product-quantity">
          <p>quantita': </p>
          <div className="quantity-number-input">
            <button onClick={handleDecrement} className="decrement">
              &lt;
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="number-input"
            />
            <button onClick={handleIncrement} className="increment">
              &gt;
            </button>
          </div>
        </div>
        <div className="product-cost">
          <p>costo: </p>
          <p className="amount">{product.price}€</p>
        </div>
        <div className="add-to-cart">
          <button
            className="add-btn"
            onClick={() =>
              dispatch(
                addItem({
                  id: product.title,
                  basePrice: product.price,
                  quantity,
                  price: product.price * quantity,
                  color: selectedColor,
                }),
              )
            }
          >
            Aggiungi al carrello
          </button>
        </div>
      </div>
    );
  },
);

export default ProductSidebar;
