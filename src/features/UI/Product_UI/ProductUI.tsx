import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsSidebarVisible } from "../uiSlice";
import ProductInteractionPrompt from "./ProductInteractionPrompt";
import ProductSidebar from "./ProductSidebar";
import type { RootState } from "../../../app/rootReducer";
import type { Product } from "../../../types";

const ProductUI = () => {
  const dispatch = useDispatch();
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const intersectedProductID = useSelector(
    (state: RootState) => state.raycaster.intersectedProductID,
  );
  const isSidebarVisible = useSelector(
    (state: RootState) => state.ui.isSidebarVisible,
  );
  const products = useSelector((state: RootState) => state.product.products);

  const [lastInteractedProduct, setLastInteractedProduct] =
    useState<Product | null>(null);

  useEffect(() => {
    if (intersectedProductID === "decoration") {
      setLastInteractedProduct(null);
    }
    if (intersectedProductID) {
      const product = products.find((p) => p.id === intersectedProductID);
      setLastInteractedProduct(product ?? null);
    }
  }, [intersectedProductID, products]);

  const handleLeftClick = (event: MouseEvent) => {
    if (event.button === 0) {
      if (
        isSidebarVisible &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        dispatch(setIsSidebarVisible(false));
      } else if (
        intersectedProductID &&
        intersectedProductID !== "decoration"
      ) {
        dispatch(setIsSidebarVisible(true));
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleLeftClick);
    return () => {
      document.removeEventListener("mousedown", handleLeftClick);
    };
  }, [intersectedProductID, isSidebarVisible]);

  return (
    <>
      {intersectedProductID &&
        (lastInteractedProduct || intersectedProductID === "decoration") && (
          <ProductInteractionPrompt
            productTitle={lastInteractedProduct?.title}
            intersectedProductID={intersectedProductID}
          />
        )}
      <ProductSidebar
        ref={sidebarRef}
        product={lastInteractedProduct}
        isVisible={isSidebarVisible}
      />
    </>
  );
};

export default ProductUI;
