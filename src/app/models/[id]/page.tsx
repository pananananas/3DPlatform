// app/models/[id]/page.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

export default function ModelPage({ params }: { params: { id: string } }) {
  function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
  }
  const modelUrl =
    "https://utfs.io/f/39b96c6c-d41b-4969-acd4-fc837bdb9c1a-1t8nbd.glb";

  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Model url={modelUrl} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
