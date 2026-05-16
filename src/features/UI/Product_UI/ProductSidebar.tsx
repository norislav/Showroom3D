import { useState, forwardRef } from "react";
import "../ui.css";
import { useDispatch } from "react-redux";
import { addItem } from "../../cart/cartSlice";
import { setSelectedColor } from "../../products/productSlice";
import { setIsSidebarVisible } from "../uiSlice";
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

    const selectedColor = product.selectedColor;

    return (
      <div
        ref={ref}
        id="product-sidebar"
        className={`product-sidebar ${isVisible ? "visible" : ""}`}
      >
        <div className="sidebar-header">
          <h2 className="product-title">{product.title}</h2>
          <button
            className="sidebar-close"
            onClick={() => dispatch(setIsSidebarVisible(false))}
          >
            ×
          </button>
        </div>

        <p className="product-desc">{product.description}</p>

        <div className="sidebar-section">
          <p className="sidebar-label">Color</p>
          <div className="color-picker-wrapper">
            <input
              type="color"
              value={selectedColor === "standard" ? "#ffffff" : selectedColor}
              onChange={(e) =>
                dispatch(setSelectedColor({ productID: product.id, colorCode: e.target.value }))
              }
            />
            {selectedColor !== "standard" && (
              <button
                className="reset-color-btn"
                onClick={() =>
                  dispatch(setSelectedColor({ productID: product.id, colorCode: "standard" }))
                }
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">Quantity</p>
          <div className="quantity-row">
            <div className="quantity-number-input">
              <button className="decrement" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <input type="number" value={quantity} readOnly className="number-input" />
              <button className="increment" onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">Price</p>
          <div className="price-row">
            <p className="price-amount">{(product.price * quantity).toFixed(2)} €</p>
          </div>
        </div>

        <div className="sidebar-cta">
          <button
            className="add-btn"
            onClick={() =>
              dispatch(addItem({
                id: product.title,
                basePrice: product.price,
                quantity,
                price: product.price * quantity,
                color: selectedColor,
              }))
            }
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  },
);

export default ProductSidebar;
