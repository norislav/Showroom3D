import { useEffect } from "react";
import { Environment } from "@react-three/drei";
import Map from "../map/Map";
import PointerLock from "../pointerLock/pointerLock";

interface SceneProps {
  sceneIsLoad: (loaded: boolean) => void;
}

const Scene = ({ sceneIsLoad }: SceneProps) => {
  useEffect(() => {
    sceneIsLoad(true);
  }, []);

  return (
    <>
      <PointerLock />
      <Environment
        files={[
          "/assets/map/enviroment/px.png",
          "/assets/map/enviroment/nx.png",
          "/assets/map/enviroment/py.png",
          "/assets/map/enviroment/ny.png",
          "/assets/map/enviroment/pz.png",
          "/assets/map/enviroment/nz.png",
        ]}
        background
      />
      <Map />
    </>
  );
};

export default Scene;
