"use client";
import { useTexture, Decal, OrbitControls } from "@react-three/drei";
import { Mesh, type Object3D, MeshStandardMaterial } from "three";
import { useLoader, Canvas } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import { useControls } from "leva";
import { Suspense } from "react";


export default function Test() {
  return (
    <Canvas shadows camera={{ position: [-2.5, 6, -10], fov: 10 }}>
      <color attach="background" args={["#131313"]} />
      <ambientLight intensity={0.25 * Math.PI} />
      <pointLight decay={0} position={[-10, 0, -5]} intensity={2} />
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
        Patryk: {
          objUrl: "https://utfs.io/f/Q2s6v1FdRkt7FG7KlGEJ5N6r0qv7g9uVe2yiCkfUztTcJ4oZ",
          textureUrl: "https://utfs.io/f/Q2s6v1FdRkt7AqzWwYEJpMmQNCTWd9cUPSHDoY7sxBIyegtV",
        },
        Eryk: {
          objUrl: "https://utfs.io/f/Q2s6v1FdRkt7TXKdQhp9Q3CKLdNFWngbUuRVqBte8cEPsz2I",
          textureUrl: "https://utfs.io/f/Q2s6v1FdRkt7wC2NjEu0T16pfHmhqJKORySDMCWUlxd4wvar",
        },
      },
    },
  });

  const { translateX, translateY, translateZ } = useControls("Tattoo Placement", {
    translateX: { value: 0.1, min: -2, max: 2, step: 0.001 },
    translateY: { value: 0.05, min: -2, max: 2, step: 0.001 },
    translateZ: { value: -0.1, min: -2, max: 2, step: 0.001 },
  });

  const { rotX, rotY, rotZ } = useControls("Rotation", {
    rotX: { value: 0.4, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotY: { value: 0.3, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotZ: { value: -1.2, min: -Math.PI, max: Math.PI, step: 0.01 },
  });

  const { scale } = useControls("Size", {
    scale: { value: 0.38, min: 0, max: 2, step: 0.01 },
  });

  const { debug } = useControls("Debug", {
    debug: { value: false },
  });

  return { ...model, translateX, translateY, translateZ, rotX, rotY, rotZ, scale, debug };
}

function isMesh(child: Object3D): child is Mesh {
  return child instanceof Mesh;
}


function Hand() {
  const controls = TattooControls();

  const obj = useLoader(OBJLoader, controls.objUrl);
  const modelTexture = useTexture(controls.textureUrl);

  const tattooDesign = useTexture("https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx");     // Tattoo design

  console.log(obj);

  let mesh: Mesh | null = null;
  obj.traverse((child) => {
    if (child instanceof Mesh) {
      mesh = child;
    }
  });

  if (!mesh) {
    console.error("No mesh found in the OBJ model.");
    return null;
  }
  
  const material = new MeshStandardMaterial({ map: modelTexture });

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