"use client";
import { toast } from "sonner";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { type Model3D } from "~/types/models";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Lightformer,
} from "@react-three/drei";

type ModelProps = {
  url: string;
};

function Model({ url }: ModelProps) {
  const fileExtension = url.split(".").pop()?.toLowerCase();

  switch (fileExtension) {
    case "glb":
    case "gltf":
      return <GLTFModel url={url} />;
    case "usdz":
    case "usdc":
    case "usd":
      toast("USDZ models are not supported yet");
      return null;
    default:
      toast("Unsupported model format: " + fileExtension);
      return null;
  }
}

function GLTFModel({ url }: ModelProps) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default async function ViewModel({ model }: { model: Model3D }) {
  return (
    <Canvas camera={{ position: [10, 5, 13], fov: 25 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Suspense fallback={null}>
        <Model url={model.url} />
      </Suspense>
      <OrbitControls />
      <Environment background blur={0.75}>
        <color attach="background" args={["#121212"]} />
        <Lightformer
          intensity={2}
          color="white"
          position={[0, -1, 5]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[-1, -1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[1, 1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={10}
          color="white"
          position={[-10, 0, 14]}
          rotation={[0, Math.PI / 2, Math.PI / 3]}
          scale={[100, 10, 1]}
        />
      </Environment>
    </Canvas>
  );
}
