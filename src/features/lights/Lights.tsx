const Lights = () => {
  return (
    <>
      <directionalLight
        castShadow={true}
        position={[-20, 30, 0]}
        intensity={0.75}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={120}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
      />
    </>
  );
};

export default Lights;
