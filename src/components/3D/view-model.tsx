"use client";
import Lights from "./lights";
import { toast } from "sonner";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { type Model3D, type Vector3 } from "~/types/models";
import { Splat, OrbitControls, useGLTF } from "@react-three/drei";
import { extractExtension } from "~/utils/filenames";

type ModelProps = {
  url: string;
  modelName: string;
  rotation?: Vector3;
  translation?: Vector3;
};

function Model({ url, rotation, translation, modelName }: ModelProps) {
  const fileExtension = extractExtension(modelName);

  switch (fileExtension) {
    case "glb":
    case "gltf":
      return <GLTFModel url={url} modelName={""} rotation={rotation} />;
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
          rotation={[rotation?.x ?? 0, rotation?.y ?? 0, rotation?.z ?? 0]}
          // rotation={[0, Math.PI, Math.PI]}
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
function GLTFModel({ url, rotation, translation, modelName }: ModelProps) {
  const { scene } = useGLTF(url);
  return (
    <primitive
      object={scene}
      rotation={[rotation?.x ?? 0, rotation?.y ?? 0, rotation?.z ?? 0]}
    />
  );
}

export default function ViewModel({ model }: { model: Model3D }) {
  const modelRotation: Vector3 = {
    x: model.rotateX,
    y: model.rotateY,
    z: model.rotateZ,
  };

  const modelTranslation: Vector3 = {
    x: model.translateX,
    y: model.translateY,
    z: model.translateZ,
  };

  return (
    <Canvas camera={{ position: [10, 5, 13], fov: 25 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Suspense fallback={null}>
        <Model
          url={model.url}
          modelName={model.name}
          rotation={modelRotation}
          translation={modelTranslation}
        />
      </Suspense>
      <OrbitControls maxDistance={100} minDistance={1} />
      <Lights />
    </Canvas>
  );
}
