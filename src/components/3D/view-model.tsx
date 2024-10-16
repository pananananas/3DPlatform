"use client";
import { Splat, OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { extractExtension } from "~/utils/filenames";
import { type Model3D } from "~/server/db/schema"
import { type Vector3 } from "~/types/models";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { toast } from "sonner";

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
          position={[
            translation?.x ?? 0,
            translation?.y ?? 0,
            translation?.z ?? 0,
          ]}
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
function GLTFModel({
  url,
  rotation,
  translation,
}: ModelProps) {
  const { scene } = useGLTF(url);
  return (
    <primitive
      object={scene}
      rotation={[rotation?.x ?? 0, rotation?.y ?? 0, rotation?.z ?? 0]}
      position={[
        translation?.x ?? 0,
        translation?.y ?? 0,
        translation?.z ?? 0,
      ]}
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

  const modelCenter: Vector3 = {
    x: model.centerX,
    y: model.centerY,
    z: model.centerZ,
  };

  return (
    <Canvas>
      <PerspectiveCamera makeDefault fov={25} position={[10, 5, 13]} />
      <ambientLight intensity={0.5} />

      <Suspense fallback={null}>
        <Model
          url={model.url}
          modelName={model.name}
          rotation={modelRotation}
          translation={modelTranslation}
        />
      </Suspense>
      <OrbitControls maxDistance={100} minDistance={0.2}  target={[modelCenter.x, modelCenter.y, modelCenter.z]} />
      <ambientLight intensity={0.25 * Math.PI} />
      <spotLight decay={0} position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight decay={0} position={[-10, 0, -5]} intensity={6} />
    </Canvas>
  );
}
