import { useThree, useFrame } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { setIntersectedProductID } from "./raycasterSlice";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { RootState } from "../../app/rootReducer";

const Raycaster = ({
  productObjects,
  decorObjects,
}: {
  productObjects: THREE.Object3D[];
  decorObjects: THREE.Object3D[];
}) => {
  const { camera, raycaster } = useThree();
  const dispatch = useDispatch();
  const isSidebarVisible = useSelector(
    (state: RootState) => state.ui.isSidebarVisible,
  );

  const center = useMemo(() => new THREE.Vector2(0, 0), []);
  const lastProductID = useRef<string | null>(null);

  raycaster.far = 8;

  useFrame(() => {
    if (isSidebarVisible) return;

    raycaster.setFromCamera(center, camera);
    const intersects = raycaster.intersectObjects(
      [...productObjects, ...decorObjects],
      true,
    );

    const newID = intersects.length > 0
      ? (intersects[0].object as any).productID ?? null
      : null;

    if (newID !== lastProductID.current) {
      lastProductID.current = newID;
      dispatch(setIntersectedProductID(newID));
    }
  });

  return null;
};

export default Raycaster;
