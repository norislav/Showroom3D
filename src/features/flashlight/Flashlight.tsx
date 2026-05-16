import { useState, useRef, useEffect, useMemo } from "react";
import { Object3D } from "three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

function Flashlight() {
  const ref = useRef<THREE.SpotLight | null>(null);
  const { scene, camera } = useThree();
  const target = useMemo(() => {
    const obj = new Object3D();
    obj.position.set(0, 0.29, 0);
    return obj;
  }, []);

  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (ref.current) {
      camera.add(target);
      camera.add(ref.current);
      scene.add(camera);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "KeyF") {
        setIsOn((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <spotLight
      ref={ref}
      color={"#dcfafc"}
      position={[0, 0.25, 0.2]}
      angle={Math.PI / 8}
      penumbra={0.3}
      intensity={isOn ? 8 : 0}
      decay={0}
      castShadow={isOn}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.0001}
      target={target}
    />
  );
}

export default Flashlight;
