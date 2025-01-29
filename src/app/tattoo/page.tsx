"use client";
import { useTexture, Decal, OrbitControls, useGLTF } from "@react-three/drei";
import { Mesh, type Object3D, MeshStandardMaterial, Texture } from "three";
import { useLoader, Canvas } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import { useControls } from "leva";
import { Suspense } from "react";

type ModelType = "obj" | "glb";

interface ModelControls {
  modelUrl: string;
  type: ModelType;
  textureUrl?: string;
  translateX: number;
  translateY: number;
  translateZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  debug: boolean;
}

export default function Test() {
  const { ambientIntensity, pointIntensity } = useControls("Lighting", {
    ambientIntensity: { value: 10, min: 0, max: 20, step: 0.1 },
    pointIntensity: { value: 2, min: 0, max: 10, step: 0.1 },
  });

  return (
    <Canvas shadows camera={{ position: [-2.5, 6, -10], fov: 10 }}>
      <color attach="background" args={["#131313"]} />
      <ambientLight intensity={ambientIntensity} />
      <pointLight decay={0} position={[-10, 0, -5]} intensity={pointIntensity} />
      <pointLight decay={0} position={[10, 0, 5]} intensity={pointIntensity} />
      <group position={[0, -1, 0]}>
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
        }>
          <Hand />
        </Suspense>
      </group>
      <OrbitControls />
    </Canvas>
  );
}

function TattooControls() {
  const { model } = useControls("Model Selection", {
    model: {
      options: {
        New: {
          modelUrl: "https://utfs.io/f/aslkQcPvYvFBL3tCFa6uAyRUP8tvXNiaMIloWH6TLF4ZKqOY",
          type: "glb"
        },
        Patryk: {
          modelUrl: "https://utfs.io/f/Q2s6v1FdRkt7FG7KlGEJ5N6r0qv7g9uVe2yiCkfUztTcJ4oZ",
          textureUrl: "https://utfs.io/f/Q2s6v1FdRkt7AqzWwYEJpMmQNCTWd9cUPSHDoY7sxBIyegtV",
          type: "obj"
        },
        Eryk: {
          modelUrl: "https://utfs.io/f/Q2s6v1FdRkt7TXKdQhp9Q3CKLdNFWngbUuRVqBte8cEPsz2I",
          textureUrl: "https://utfs.io/f/Q2s6v1FdRkt7wC2NjEu0T16pfHmhqJKORySDMCWUlxd4wvar",
          type: "obj"
        },
      },
    },
  });

  const { translateX, translateY, translateZ } = useControls("Tattoo Placement", {
    translateX: { value:  0.5, min: -2, max: 2, step: 0.001 },
    translateY: { value: -0.5, min: -2, max: 2, step: 0.001 },
    translateZ: { value: -0.0, min: -2, max: 2, step: 0.001 },
  });

  const { rotX, rotY, rotZ } = useControls("Rotation", {
    rotX: { value:  0.0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotY: { value: 1.42, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotZ: { value:  0.0, min: -Math.PI, max: Math.PI, step: 0.01 },
  });

  const { scale } = useControls("Size", {
    scale: { value: 0.6, min: 0, max: 2, step: 0.01 },
  });

  const { debug } = useControls("Debug", {
    debug: { value: false },
  });

  return { ...model, translateX, translateY, translateZ, rotX, rotY, rotZ, scale, debug };
}

function Hand() {
  const controls = TattooControls() as ModelControls;
  const tattooDesign = useTexture("https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx");
  
  // Load both models but only use the one we need
  const obj = useLoader(OBJLoader, controls.type === "obj" ? controls.modelUrl : "");
  const gltf = useGLTF(controls.type === "glb" ? controls.modelUrl : "");
  
  // Load texture unconditionally at the top level
  const modelTexture = useTexture(controls.textureUrl ?? "");

  let mesh: Mesh | null = null;
  
  if (controls.type === "obj" && obj) {
    obj.traverse((child) => {
      if (child instanceof Mesh) {
        mesh = child;
      }
    });
  } else if (controls.type === "glb" && gltf) {
    gltf.scene.traverse((child) => {
      if (child instanceof Mesh) {
        mesh = child;
      }
    });
  }

  if (!mesh) {
    console.error("No mesh found in the model.");
    return null;
  }

  const material = controls.textureUrl ? 
    new MeshStandardMaterial({ map: modelTexture }) :
    (mesh as Mesh).material;

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={(mesh as Mesh).geometry}
      material={material}
      dispose={null}
      position={[0, 1, 0]}
    >
      <Decal
        debug={controls.debug}
        position={[controls.translateX, controls.translateY, controls.translateZ]}
        rotation={[controls.rotX, controls.rotY, controls.rotZ]}
        scale={controls.scale}
        map={tattooDesign}
      />
    </mesh>
  );
}