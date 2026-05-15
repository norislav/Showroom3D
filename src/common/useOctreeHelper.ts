import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export default function useOctreeHelper(octree: any) {
  const { scene } = useThree();

  useEffect(() => {
    // OctreeHelper and leva omitted — debug-only, not used in production
  }, [octree, scene]);
}
