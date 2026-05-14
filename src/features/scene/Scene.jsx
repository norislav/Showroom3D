import React, {useEffect} from "react";
import { Environment } from "@react-three/drei";

import Map from "../map/Map";
import PointerLock from "../pointerLock/pointerLock";

const Scene = (props) => {
  useEffect(()=>{
    props.sceneIsLoad(true);
    console.log("la scena e' stata caricata");
  },[]);

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
