import { useRef, useEffect } from "react";
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
  const clonedScene = glb.scene.clone();
  const modelRef = useRef<THREE.Object3D | null>(null);
  const positionArray = [
    product.position.x,
    product.position.y,
    product.position.z,
  ];

  const selectedColorName = product.selectedColor;
  const selectedColor = product?.variants.find(
    (variant) => variant.colorName === selectedColorName,
  );
  const color = selectedColor?.colorCode;

  useEffect(() => {
    if (modelRef.current) {
      (modelRef.current as any).productID = product.id;
      onRendered(modelRef.current);
    }
  }, []);

  useEffect(() => {
    octree.fromGraphNode(clonedScene);
  }, []);

  clonedScene.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      const mesh = child;
      const material = mesh.material as THREE.MeshStandardMaterial;
      const materialName = material.name;
      if (glb.materials.hasOwnProperty(materialName)) {
        mesh.material = material.clone();
        if (color) {
          (mesh.material as THREE.MeshStandardMaterial).color.set(color);
        }
      }
    }
  });

  useEffect(() => {
    clonedScene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child as THREE.Mesh;
        (mesh as any).productID = product.id;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });
  }, [clonedScene, product.id]);

  useEffect(() => {
    if (color && modelRef.current) {
      modelRef.current.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          const mesh = child as THREE.Mesh;
          (mesh.material as THREE.MeshStandardMaterial).color.set(color);
        }
      });
    }
  }, [color, modelRef]);

  return (
    <>
      <primitive
        ref={modelRef}
        object={clonedScene}
        scale={product.scale}
        position={positionArray}
        renderOrder={1}
      />
    </>
  );
};

export default Model;
