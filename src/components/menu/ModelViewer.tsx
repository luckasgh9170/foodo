"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

export const ModelViewer = ({ url }: { url: string }) => {
  return (
    <Canvas camera={{ position: [0, 1.2, 3], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Model url={url} />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enablePan={false} />
    </Canvas>
  );
};
