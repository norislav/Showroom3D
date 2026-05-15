import { useSelector } from "react-redux";
import type { RootState } from "../../../app/rootReducer";
import "../ui.css";

const Crosshair = () => {
  const intersectedProductID = useSelector(
    (state: RootState) => state.raycaster.intersectedProductID
  );

  let crosshairClass = "crosshair";
  if (intersectedProductID === "decoration") {
    crosshairClass += " crosshair-red-x";
  } else if (intersectedProductID) {
    crosshairClass += " crosshair-yellow";
  }

  return <div className={crosshairClass}></div>;
};

export default Crosshair;
