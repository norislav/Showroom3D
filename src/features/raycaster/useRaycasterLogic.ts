import { useState, useEffect } from "react";
import * as THREE from "three";

const useRaycasterLogic = (
  camera: THREE.Camera,
  raycaster: THREE.Raycaster,
  productObjects: THREE.Object3D[],
  decorObjects: THREE.Object3D[],
) => {
  const [intersects, setIntersects] = useState<THREE.Intersection[]>([]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);

      const newIntersects = raycaster.intersectObjects([
        ...productObjects,
        ...decorObjects,
      ]);
      setIntersects(newIntersects);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera, raycaster, productObjects, decorObjects]);

  return intersects;
};

export default useRaycasterLogic;
