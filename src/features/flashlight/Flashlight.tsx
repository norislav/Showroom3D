import { useState, useRef, useEffect } from "react";
import { Vector3, Object3D } from "three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

function Flashlight() {
  const ref = useRef<THREE.SpotLight | null>(null);
  const { scene, camera } = useThree();
  const vector = new Vector3(0, 0.29, 0);
  const target = new Object3D();
  const [onOff, setOnOff] = useState(0);

  target.position.copy(vector);
  camera.add(target);

  useEffect(() => {
    if (ref.current) {
      camera.add(ref.current);
      scene.add(camera);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "KeyF") {
        if (onOff === 0) {
          if (ref.current) ref.current.intensity = 10;
          setOnOff(1);
        } else {
          if (ref.current) ref.current.intensity = 0;
          setOnOff(0);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOff]);

  //useHelper(ref, SpotLightHelper, 'cyan')

  return (
    <spotLight
      ref={ref}
      color={"#dcfafc"}
      position={[0, 0.25, 0.2]}
      angle={Math.PI / 8}
      penumbra={0.3}
      intensity={0}
      decay={0}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.0001}
      target={target}
    />
  );
}

export default Flashlight;
