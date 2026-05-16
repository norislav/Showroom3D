import { useRef, useEffect, useMemo, useContext } from "react";
import { Capsule } from "three/examples/jsm/math/Capsule.js";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import useKeyboard from "../../common/useKeyboard";

import { useSelector, useDispatch } from "react-redux";
import { setPosition, setRotation } from "./playerSlice";

import { RootState } from "../../app/rootReducer";
import * as THREE from "three";

const GRAVITY = 30;
const STEPS_PER_FRAME = 5;

export default function Player({ octree }: { octree: any }) {
  const isSidebarVisible = useSelector(
    (state: RootState) => state.ui.isSidebarVisible,
  );
  const playerPosition = useSelector(
    (state: RootState) => state.player.position,
  );

  const lastPositionDispatchTime = useRef(0);
  const lastRotationDispatchTime = useRef(0);

  const playerOnFloor = useRef(false);
  const playerVelocity = useMemo(() => new Vector3(), []);
  const playerDirection = useMemo(() => new Vector3(), []);
  const initialPos = useRef(playerPosition);
  const capsule = useMemo(
    () =>
      new Capsule(
        new Vector3(initialPos.current.x, initialPos.current.y - 1, initialPos.current.z),
        new Vector3(initialPos.current.x, initialPos.current.y, initialPos.current.z),
        0.5,
      ),
    [],
  );

  const dispatch = useDispatch();

  const onPointerDown = () => {};

  useEffect(() => {
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const keyboard = useKeyboard();

  function getForwardVector(
    camera: THREE.Camera,
    playerDirection: THREE.Vector3,
  ) {
    camera.getWorldDirection(playerDirection);
    playerDirection.y = 0;
    playerDirection.normalize();
    return playerDirection;
  }

  function getSideVector(camera: THREE.Camera, playerDirection: THREE.Vector3) {
    camera.getWorldDirection(playerDirection);
    playerDirection.y = 0;
    playerDirection.normalize();
    playerDirection.cross(camera.up);
    return playerDirection;
  }

  function controls(
    camera: THREE.Camera,
    delta: number,
    playerVelocity: THREE.Vector3,
    playerOnFloor: boolean,
    playerDirection: THREE.Vector3,
  ) {
    if (isSidebarVisible) {
      return;
    }
    const speedDelta = delta * (playerOnFloor ? 25 : 8);
    keyboard["KeyA"] &&
      playerVelocity.add(
        getSideVector(camera, playerDirection).multiplyScalar(-speedDelta),
      );
    keyboard["ArrowLeft"] &&
      playerVelocity.add(
        getSideVector(camera, playerDirection).multiplyScalar(-speedDelta),
      );
    keyboard["KeyD"] &&
      playerVelocity.add(
        getSideVector(camera, playerDirection).multiplyScalar(speedDelta),
      );
    keyboard["ArrowRight"] &&
      playerVelocity.add(
        getSideVector(camera, playerDirection).multiplyScalar(speedDelta),
      );
    keyboard["KeyW"] &&
      playerVelocity.add(
        getForwardVector(camera, playerDirection).multiplyScalar(speedDelta),
      );
    keyboard["ArrowUp"] &&
      playerVelocity.add(
        getForwardVector(camera, playerDirection).multiplyScalar(speedDelta),
      );
    keyboard["KeyS"] &&
      playerVelocity.add(
        getForwardVector(camera, playerDirection).multiplyScalar(-speedDelta),
      );
    keyboard["ArrowDown"] &&
      playerVelocity.add(
        getForwardVector(camera, playerDirection).multiplyScalar(-speedDelta),
      );
    if (playerOnFloor) {
      if (camera.position.y <= 4) {
        if (keyboard["Space"]) {
          playerVelocity.y = 15;
        }
      }
    }
  }

  function updatePlayer(
    camera: THREE.Camera,
    delta: number,
    octree: any,
    capsule: any,
    playerVelocity: THREE.Vector3,
    playerOnFloor: boolean,
  ) {
    let damping = Math.exp(-4 * delta) - 1;
    if (!playerOnFloor) {
      playerVelocity.y -= GRAVITY * delta;
      damping *= 0.1; // small air resistance
    }
    playerVelocity.addScaledVector(playerVelocity, damping);
    const deltaPosition = playerVelocity.clone().multiplyScalar(delta);
    capsule.translate(deltaPosition);
    playerOnFloor = playerCollisions(capsule, octree, playerVelocity);
    camera.position.copy(capsule.end);

    const currentTime = performance.now();
    const positionUpdateDelay = 1500;

    if (currentTime - lastPositionDispatchTime.current > positionUpdateDelay) {
      dispatch(
        setPosition({ x: capsule.end.x, y: capsule.end.y, z: capsule.end.z }),
      );
      lastPositionDispatchTime.current = currentTime;
    }

    return playerOnFloor;
  }

  function playerCollisions(
    capsule: any,
    octree: any,
    playerVelocity: THREE.Vector3,
  ) {
    if (!octree) return false; // <-- add this check

    const result = octree.capsuleIntersect(capsule);
    let playerOnFloor = false;
    if (result) {
      playerOnFloor = result.normal.y > 0;
      if (!playerOnFloor) {
        playerVelocity.addScaledVector(
          result.normal,
          -result.normal.dot(playerVelocity),
        );
      }
      capsule.translate(result.normal.multiplyScalar(result.depth));
    }
    return playerOnFloor;
  }

  function teleportPlayerIfOob(
    camera: THREE.Camera,
    capsule: any,
    playerVelocity: THREE.Vector3,
  ) {
    if (camera.position.y <= -100) {
      playerVelocity.set(0, 0, 0);
      capsule.start.set(0, 10, 0);
      capsule.end.set(0, 11, 0);
      camera.position.copy(capsule.end);
      camera.rotation.set(0, 0, 0);
      // Throttle position and rotation updates
      const currentTime = performance.now();
      const positionUpdateDelay = 1500;

      if (
        currentTime - lastPositionDispatchTime.current >
        positionUpdateDelay
      ) {
        dispatch(
          setPosition({ x: capsule.end.x, y: capsule.end.y, z: capsule.end.z }),
        );
        lastPositionDispatchTime.current = currentTime;
      }
    }
  }

  useFrame(({ camera }, delta) => {
    controls(
      camera,
      delta,
      playerVelocity,
      playerOnFloor.current,
      playerDirection,
    );
    const deltaSteps = Math.min(0.05, delta) / STEPS_PER_FRAME;
    for (let i = 0; i < STEPS_PER_FRAME; i++) {
      playerOnFloor.current = updatePlayer(
        camera,
        deltaSteps,
        octree,
        capsule,
        playerVelocity,
        playerOnFloor.current,
      );
    }
    teleportPlayerIfOob(camera, capsule, playerVelocity);
  });

  return null;
}
