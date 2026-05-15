import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Decoration as DecorationType } from "../../types";
import * as THREE from "three";

interface DecorationProps {
  decoration: DecorationType;
  onRendered: (obj: THREE.Object3D) => void;
  octree: any;
}

const Decoration = ({ decoration, onRendered, octree }: DecorationProps) => {
  const glb = useGLTF(decoration.modelURL);
  const clonedScene = glb.scene.clone();

  const modelRef = useRef<THREE.Object3D | null>(null);

  const positionArray = [
    decoration.position.x,
    decoration.position.y,
    decoration.position.z,
  ];

  useEffect(() => {
    if (modelRef.current) {
      (modelRef.current as any).productID = "decoration";
      onRendered(modelRef.current);
    }
  }, []);

  useEffect(() => {
    octree.fromGraphNode(clonedScene);
  }, []);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        (child as any).productID = "decoration";
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene, decoration.id]);

  return (
    <>
      <primitive
        ref={modelRef}
        object={clonedScene}
        scale={decoration.scale}
        position={positionArray}
      />
    </>
  );
};

export default Decoration;
