import { useMemo } from "react";
import { Octree } from "three/examples/jsm/math/Octree.js";
import * as THREE from "three";

export default function useOctree(scene: THREE.Group) {
  const octree = useMemo(() => {
    return new Octree().fromGraphNode(scene);
  }, [scene]);

  return octree;
}
