"use client";
import { toast } from "sonner";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { type Model3D } from "~/types/models";
import { Splat, OrbitControls, useGLTF } from "@react-three/drei";
import Lights from "./lights";

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
    case "ply":
      toast("PLY models are not supported yet, convert to SPLAT");
      return null;
    case "splat":
      return (
        <Splat
          src={url}
          // rotation={[0.55 * Math.PI, 0.01 * Math.PI, 1.25 * Math.PI]}
          // toneMapped={false}
          // alphaTest={0.1}
          // alphaHash={true}
        />
      );
    default:
      toast("Unsupported model format: " + fileExtension);
      return null;
  }
}
function GLTFModel({ url }: ModelProps) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ViewModel({ model }: { model: Model3D }) {
  return (
    <Canvas camera={{ position: [10, 5, 13], fov: 25 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Suspense fallback={null}>
        <Model url={model.url} />
      </Suspense>
      <OrbitControls maxDistance={100} minDistance={1} />
      <Lights />
    </Canvas>
  );
}
