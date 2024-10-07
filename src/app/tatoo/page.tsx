"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useTexture, Decal, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import type { Mesh } from "three";

export default function Test() {
  return (
    <Canvas shadows camera={{ position: [-2.5, 1, 10], fov: 17 }}>
      <color attach="background" args={["#131313"]} />
      <ambientLight intensity={0.25 * Math.PI} />
      <spotLight decay={0} position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight decay={0} position={[-10, 0, -5]} intensity={6} />
      <group position={[0, -1, 0]}>
        <Bun />
        {/* <Snail /> */}
        {/* <Face /> */}
      </group>
      <OrbitControls />
    </Canvas>
  );
}


function TatooControls() {

  const { orbitX, orbitY, orbitZ } = useControls("Tatoo Placement", {
    orbitX: {
      name: "X",
      value: 0,
      min: -2,
      max: 2,
      step: 0.001,
    },
    orbitY: {
      value: 0.8,
      min: -2,
      max: 2,
      step: 0.001,
    },
    orbitZ: {
      value: 0.8,
      min: -2,
      max: 2,
      step: 0.001,
    },
  });

  const { rotX, rotY, rotZ } = useControls("Rotation", {
    rotX: {
      value: 0,
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
    },
    rotY: {
      value: 0,
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
    },
    rotZ: {
      value: 0,
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
    },
  });

  const { scale } = useControls("Size", {
    scale: {
      value: 0.7,
      min: 0,
      max: 2,
      step: 0.01,
    },
  });
  return {orbitX, orbitY, orbitZ, rotX, rotY, rotZ, scale};
}


function Bun() {
  const controls = TatooControls();
  
  const { nodes } = useGLTF(
    "https://utfs.io/f/Q2s6v1FdRkt7PZrPQhODpXaogRnTBA36Shfk7GvZOIMiQrKw",
  );

  const texture = useTexture(
    "https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx",
  );
  const bunny = nodes.bunny as Mesh | undefined;
  
  console.log(nodes)
  
  if (!bunny) {
    console.error("Bunny node not found in the GLTF model.");
    return null;
  }

  return (
    <mesh castShadow receiveShadow geometry={bunny.geometry} dispose={null}>
      <meshStandardMaterial color="red" transparent={false} opacity={0.5} />
      <Decal
        position={[controls.orbitX, controls.orbitY, controls.orbitZ]}
        rotation={[controls.rotX, controls.rotY, controls.rotZ]}
        scale={controls.scale}
        map={texture}
      />
    </mesh>
  );
}


// function Snail() {
//   const controls = TatooControls();
  
//   const { nodes } = useGLTF(
//     "https://utfs.io/f/Q2s6v1FdRkt7fFGzgYIcLbcim4grM2VhdIHWsq3Ztoy1nQ0E",
//   );

//   const texture = useTexture(
//     "https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx",
//   );
//   const snail = nodes.Mesh_0_Material_0_0 as Mesh | undefined;
//   console.log(nodes)
//   if (!snail) {
//     console.log(nodes)
//     console.error("Bunny node not found in the GLTF model.");
//     return null;
//   }

//   return (
//     <mesh castShadow receiveShadow geometry={snail.geometry} >
//       <meshStandardMaterial color="red" transparent={false} opacity={0.5} />
//       <Decal
//         position={[controls.orbitX, controls.orbitY, controls.orbitZ]}
//         rotation={[controls.rotX, controls.rotY, controls.rotZ]}
//         scale={controls.scale}
//         map={texture}
//       />
//     </mesh>
//   );
// }


// function Face() {
//   const controls = TatooControls();
  
//   const { nodes } = useGLTF(
//     "https://utfs.io/f/Q2s6v1FdRkt7W1EeK8tXjQ48RWtOfl6cTA5MokFHvgyaJEsK",
//   );

//   const texture = useTexture(
//     "https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx",
//   );
//   const face = nodes.mesh_0 as Mesh | undefined;

//   console.log(nodes)
//   if (!face) {
//     console.error("Bunny node not found in the GLTF model.");
//     return null;
//   }

//   return (
//     <mesh castShadow receiveShadow geometry={face.geometry} dispose={null}>
//       <Decal
//         position={[controls.orbitX, controls.orbitY, controls.orbitZ]}
//         rotation={[controls.rotX, controls.rotY, controls.rotZ]}
//         scale={controls.scale}
//         map={texture}
//       />
//     </mesh>

//   );
// }

// face       https://utfs.io/f/Q2s6v1FdRkt7W1EeK8tXjQ48RWtOfl6cTA5MokFHvgyaJEsK

// Pose       https://utfs.io/f/Q2s6v1FdRkt7qwjCVERyaRsbH48WglVkmGOEZc1zUfujr2hq