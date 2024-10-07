"use client";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Decal,
  OrbitControls,
} from "@react-three/drei";
import type { Mesh } from "three";
import { useControls } from 'leva'

export default function Test() {
  return (
    <Canvas shadows camera={{ position: [-2.5, 1, 10], fov: 17 }}>
      <color attach="background" args={["#131313"]} />
      <ambientLight intensity={0.25 * Math.PI} />
      <spotLight decay={0} position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight decay={0} position={[-10, 0, -5]} intensity={6} />
      <group position={[0, -1, 0]}>
        <Bun />
        {/* <Pose /> */}
      </group>
      <OrbitControls />
    </Canvas>
  );
}

function Bun() {
  const { x,y,z } = useControls({
    x: {
      value: 0.5,
      min: -2,
      max: 2,
      step: 0.001,
    },
    y: {
      value: 1,
      min: -2,
      max: 2,
      step: 0.001,
    },
    z: {
      value: 0,
      min: -2,
      max: 2,
      step: 0.001,
    },
  })
  

  const { nodes } = useGLTF(
    "https://utfs.io/f/Q2s6v1FdRkt7PZrPQhODpXaogRnTBA36Shfk7GvZOIMiQrKw",
  );

  const texture = useTexture(
    "https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx",
  );

  const bunny = nodes.bunny as Mesh | undefined;

  if (!bunny) {
    console.error("Bunny node not found in the GLTF model.");
    return null;
  }

  return (
    <mesh castShadow receiveShadow geometry={bunny.geometry} dispose={null}>
      <meshStandardMaterial color="red" transparent={false} opacity={0.5} />
      <Decal position={[x,y,z]} scale={0.7} map={texture} />
    </mesh>
  );
}

// import { useEffect } from "react";

// function Pose() {
//   const { nodes } = useGLTF(
//     "https://utfs.io/f/Q2s6v1FdRkt7gBKvwsqhJchCTLuHzKWOd43UB18D9QeNym6w",
//   );
//   const texture = useTexture(
//     "https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx",
//   );
//   console.log("Nodes:", nodes);

//   const pose = nodes.Geode as Mesh | undefined;

//   useEffect(() => {
//     if (pose?.geometry.attributes) {
//       console.log("Geometry Attributes:", pose.geometry.attributes);
//     }
//   }, [pose]);

//   if (!pose) {
//     console.error("Pose node not found in the GLTF model.");
//     return null;
//   }

//   return (
//     <mesh
//       castShadow
//       receiveShadow
//       geometry={pose.geometry}
//       material={pose.material}
//       dispose={null}
//     >
//       {/* <Decal
//         position={[0, 0, 0.1]} // Slightly offset along the Z-axis
//         rotation={[0, 0, 0]} // Ensure rotation is set
//         scale={0.7}
//         map={texture}
//       /> */}
//     </mesh>
//   );
// }


// face       https://utfs.io/f/Q2s6v1FdRkt7W1EeK8tXjQ48RWtOfl6cTA5MokFHvgyaJEsK

// Pose       https://utfs.io/f/Q2s6v1FdRkt7qwjCVERyaRsbH48WglVkmGOEZc1zUfujr2hq

// Human      https://utfs.io/f/Q2s6v1FdRkt7gBKvwsqhJchCTLuHzKWOd43UB18D9QeNym6w