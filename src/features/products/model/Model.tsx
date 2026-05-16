import { useRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { Product } from "../../../types";

interface ModelProps {
  product: Product;
  onRendered: (obj: THREE.Object3D) => void;
  octree: any;
}

const Model = ({ product, onRendered, octree }: ModelProps) => {
  const glb = useGLTF(product.modelURL) as any;
  const modelRef = useRef<THREE.Object3D | null>(null);

  const color = product.variants.find(
    (v) => v.colorName === product.selectedColor,
  )?.colorCode;

  const clonedScene = useMemo(() => {
    const clone = glb.scene.clone();
    clone.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material as THREE.MeshStandardMaterial;
        if (
          Object.prototype.hasOwnProperty.call(glb.materials, material.name)
        ) {
          child.material = material.clone();
        }
        (child as any).productID = product.id;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [glb.scene, product.id]);

  const positionArray = useMemo(
    () => [product.position.x, product.position.y, product.position.z],
    [product.position.x, product.position.y, product.position.z],
  );

  useEffect(() => {
    octree.fromGraphNode(clonedScene);
    if (modelRef.current) {
      (modelRef.current as any).productID = product.id;
      onRendered(modelRef.current);
    }
  }, [clonedScene]);

  useEffect(() => {
    if (!color) return;
    clonedScene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        (child.material as THREE.MeshStandardMaterial).color.set(color);
      }
    });
  }, [color, clonedScene]);

  return (
    <primitive
      ref={modelRef}
      object={clonedScene}
      scale={product.scale}
      position={positionArray}
      renderOrder={1}
    />
  );
};

export default Model;
