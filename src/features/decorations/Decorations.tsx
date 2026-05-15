import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Decoration from "./Decoration";
import { RootState } from "../../app/rootReducer";
import * as THREE from "three";

interface DecorationsProps {
  onRendered: (objects: THREE.Object3D[]) => void;
  octree: any;
}

const Decorations = ({ onRendered, octree }: DecorationsProps) => {
  const decorations = useSelector(
    (state: RootState) => state.decoration.decorations,
  );

  const renderedObjects = useRef<THREE.Object3D[]>([]);

  const handleModelRendered = (modelObject: THREE.Object3D) => {
    renderedObjects.current = [...renderedObjects.current, modelObject];
    if (renderedObjects.current.length === decorations.length) {
      onRendered(renderedObjects.current);
    }
  };

  return (
    <>
      {decorations.map((decoration) => {
        const position = [
          decoration.position.x,
          decoration.position.y,
          decoration.position.z,
        ];

        return (
          <Decoration
            octree={octree}
            key={decoration.id}
            decoration={decoration}
            onRendered={handleModelRendered}
          />
        );
      })}
    </>
  );
};

export default Decorations;
