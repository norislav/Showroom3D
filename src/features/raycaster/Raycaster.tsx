import { useThree, useFrame } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { setIntersectedProductID } from "./raycasterSlice";
import useRaycasterLogic from "./useRaycasterLogic";
import * as THREE from "three";
import { RootState } from "../../app/rootReducer";

const Raycaster = ({
  productObjects,
  decorObjects,
}: {
  productObjects: THREE.Object3D[];
  decorObjects: THREE.Object3D[];
}) => {
  const { camera, raycaster: threeRaycaster } = useThree();
  //raycaster.far = 5;

  const intersectedProductID = useSelector(
    (state: RootState) => state.raycaster.intersectedProductID,
  );
  const dispatch = useDispatch();
  const isSidebarVisible = useSelector(
    (state: RootState) => state.ui.isSidebarVisible,
  );
  const intersects = useRaycasterLogic(
    camera,
    threeRaycaster,
    productObjects,
    decorObjects,
  );

  useFrame(() => {
    if (!isSidebarVisible) {
      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object as any;
        let intersectedProductID = intersectedObject.productID;

        if (intersectedObject) {
          dispatch(setIntersectedProductID(intersectedProductID));
        }
      } else {
        dispatch(setIntersectedProductID(null));
      }
    }
  });

  return null;
};

export default Raycaster;
