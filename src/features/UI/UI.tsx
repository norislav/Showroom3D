import PlayerPosition from "./UI_elements/PlayerPosition";
import Crosshair from "./UI_elements/Crosshair";
import ProductUI from "./Product_UI/ProductUI";
import Cart from "../cart/Cart";

const UI = () => {
  return (
    <>
      <div>
        <Crosshair />
        <PlayerPosition />
        <ProductUI />
        <Cart />
      </div>
    </>
  );
};

export default UI;
