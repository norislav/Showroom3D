import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Model from "./model/Model";
import * as THREE from "three";
import { RootState } from "../../app/rootReducer";

interface ModelsProps {
  onRendered: (objects: THREE.Object3D[]) => void;
  octree: any;
}

const Models = ({ onRendered, octree }: ModelsProps) => {
  const products = useSelector((state: RootState) => state.product.products);
  const renderedObjects = useRef<THREE.Object3D[]>([]);

  const handleModelRendered = (modelObject: THREE.Object3D) => {
    renderedObjects.current = [...renderedObjects.current, modelObject];
    if (renderedObjects.current.length === products.length) {
      onRendered(renderedObjects.current);
    }
  };

  return (
    <>
      {products.map((product) => {
        return (
          <Model
            octree={octree}
            key={product.id}
            product={product}
            onRendered={handleModelRendered}
          />
        );
      })}
    </>
  );
};

export default Models;
