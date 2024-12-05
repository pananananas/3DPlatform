"use client";
import { useTexture, Decal, OrbitControls } from "@react-three/drei";
import { type Group, Mesh, type Object3D, MeshStandardMaterial } from "three";
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

  return { translateX, translateY, translateZ, rotX, rotY, rotZ, scale, debug };
}

function isMesh(child: Object3D): child is Mesh {
  return child instanceof Mesh;
}


function Hand() {
  const controls = TattooControls();

  const objUrl = "https://utfs.io/f/Q2s6v1FdRkt7FG7KlGEJ5N6r0qv7g9uVe2yiCkfUztTcJ4oZ";
  const modelTexture = useTexture("https://utfs.io/f/Q2s6v1FdRkt7AqzWwYEJpMmQNCTWd9cUPSHDoY7sxBIyegtV");

  const obj = useLoader(OBJLoader, objUrl);
  const texture = useTexture("https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx");

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
        map={texture}
      />
    </mesh>
  );
}
// "use client";
// import { useLoader } from "@react-three/fiber";
// import { OBJLoader, MTLLoader } from "three-stdlib";
// import { useTexture, Decal, OrbitControls } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { useControls } from "leva";
// import { Suspense } from "react";
// import { Group } from "three";



// export default function Test() {
//   console.log("Test");
//   return (
//     <Canvas shadows camera={{ position: [-2.5, 1, 10], fov: 17 }}>
//       <color attach="background" args={["#131313"]} />
//       <ambientLight intensity={0.25 * Math.PI} />
//       <spotLight decay={0} position={[10, 10, 10]} angle={0.15} penumbra={1} />
//       <pointLight decay={0} position={[-10, 0, -5]} intensity={6} />
//       <group position={[0, -1, 0]}>
//         <Suspense fallback={
//           <mesh>
//             <Box args={[1, 1, 1]} />
//           </mesh>
//         }>
//           <Hand />
//         </Suspense>
//       </group>
//       <OrbitControls />
//     </Canvas>
//   );
// }

// function TattooControls() {
//   const { translateX, translateY, translateZ } = useControls("Tattoo Placement", {
//     translateX: { value: 0.6, min: -2, max: 2, step: 0.001 },
//     translateY: { value: 0.2, min: -2, max: 2, step: 0.001 },
//     translateZ: { value: -0.4, min: -2, max: 2, step: 0.001 },
//   });

//   const { rotX, rotY, rotZ } = useControls("Rotation", {
//     rotX: { value: 0.4, min: -Math.PI, max: Math.PI, step: 0.01 },
//     rotY: { value: 0.2, min: -Math.PI, max: Math.PI, step: 0.01 },
//     rotZ: { value: -1.0, min: -Math.PI, max: Math.PI, step: 0.01 },
//   });

//   const { scale } = useControls("Size", {
//     scale: { value: 0.7, min: 0, max: 2, step: 0.01 },
//   });

//   return { translateX, translateY, translateZ, rotX, rotY, rotZ, scale };
// }

// function Hand() {
//   const controls = TattooControls();

//   // Replace the URL with your actual OBJ model URL
//   const objUrl = "https://utfs.io/f/Q2s6v1FdRkt7FG7KlGEJ5N6r0qv7g9uVe2yiCkfUztTcJ4oZ";

//   // Load the OBJ model
//   // const obj = useLoader(OBJLoader, objUrl);
//   // const obj = useLoader<OBJLoader, Group>(OBJLoader, objUrl);
//   const obj = useLoader(OBJLoader, objUrl) as Group;



//   // Load the texture for the decal
//   const texture = useTexture("https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx");

//   // Inspect the loaded OBJ object
//   console.log(obj);

//   // Function to traverse the OBJ and find the first mesh
//   let mesh = null;
//   obj.traverse((child) => {
//     if (child.isMesh) {
//       mesh = child;
//     }
//   });

//   if (!mesh) {
//     console.error("No mesh found in the OBJ model.");
//     return null;
//   }

//   return (
//     <mesh
//       castShadow
//       receiveShadow
//       geometry={mesh.geometry}
//       material={mesh.material}
//       dispose={null}
//     >
//       {/* Apply Decal */}
//       <Decal
//         debug={true}
//         position={[controls.translateX, controls.translateY, controls.translateZ]}
//         rotation={[controls.rotX, controls.rotY, controls.rotZ]}
//         scale={controls.scale}
//         map={texture}
//       />
//     </mesh>
//   );
// }


// // export default function Test() {
// //   return (
// //     <Canvas shadows camera={{ position: [-2.5, 1, 10], fov: 17 }}>
// //       <color attach="background" args={["#131313"]} />
// //       <ambientLight intensity={0.25 * Math.PI} />
// //       <spotLight decay={0} position={[10, 10, 10]} angle={0.15} penumbra={1} />
// //       <pointLight decay={0} position={[-10, 0, -5]} intensity={6} />
// //       <group position={[0, -1, 0]}>
// //         {/* <Bun /> */}
// //         <Hand />
// //       </group>
// //       <OrbitControls />
// //     </Canvas>
// //   );
// // }

// // function TattooControls() {
// //   const { orbitX, orbitY, orbitZ } = useControls("Tattoo Placement", {
// //     orbitX: {
// //       name: "X",
// //       value: 0,
// //       min: -2,
// //       max: 2,
// //       step: 0.001,
// //     },
// //     orbitY: {
// //       value: 0.8,
// //       min: -2,
// //       max: 2,
// //       step: 0.001,
// //     },
// //     orbitZ: {
// //       value: 0.8,
// //       min: -2,
// //       max: 2,
// //       step: 0.001,
// //     },
// //   });

// //   const { rotX, rotY, rotZ } = useControls("Rotation", {
// //     rotX: {
// //       value: 0,
// //       min: -Math.PI,
// //       max: Math.PI,
// //       step: 0.01,
// //     },
// //     rotY: {
// //       value: 0,
// //       min: -Math.PI,
// //       max: Math.PI,
// //       step: 0.01,
// //     },
// //     rotZ: {
// //       value: 0,
// //       min: -Math.PI,
// //       max: Math.PI,
// //       step: 0.01,
// //     },
// //   });

// //   const { scale } = useControls("Size", {
// //     scale: {
// //       value: 0.7,
// //       min: 0,
// //       max: 2,
// //       step: 0.01,
// //     },
// //   });
// //   return { orbitX, orbitY, orbitZ, rotX, rotY, rotZ, scale };
// // }

// // function Hand() {
// //   const controls = TattooControls();

// //   const { nodes } = useGLTF(
// //     // "https://utfs.io/f/Q2s6v1FdRkt7RQ9iTZX54vlPIwhOT97X3afAKDQe12VjmrYu",   // .glb
// //     "https://utfs.io/f/Q2s6v1FdRkt7PsLlkQODpXaogRnTBA36Shfk7GvZOIMiQrKw"
// //   );

// //   const texture = useTexture(
// //     "https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx",
// //   );
// //   console.log(nodes);

// //   const bunny = nodes.Node1 as Mesh | undefined;


// //   if (!bunny) {
// //     console.error("Bunny node not found in the GLTF model.");
// //     return null;
// //   }
// //   // console.log(bunny.geometry.attributes);

// //   // if (!bunny.geometry.attributes.position) {
// //   //   console.error("The geometry is missing the position attribute.");
// //   //   return null;
// //   // }
// //   // bunny.geometry.computeBoundingBox();
// //   // bunny.geometry.computeBoundingSphere();

// //   // console.log("Position Attribute:", bunny.geometry.attributes.position);
// //   // console.log("UV Attribute:", bunny.geometry.attributes.uv);

// //   return (
// //     <mesh castShadow receiveShadow geometry={bunny.geometry} dispose={null}>
// //       <meshStandardMaterial color="red" transparent={false} opacity={0.5} />
// //       <Decal
// //         debug={true}
// //         position={[controls.orbitX, controls.orbitY, controls.orbitZ]}
// //         rotation={[controls.rotX, controls.rotY, controls.rotZ]}
// //         scale={controls.scale}
// //         map={texture}
// //       />
// //     </mesh>
// //   );
// // }

// // function Bun() {
// //   const controls = TattooControls();

// //   const { nodes } = useGLTF(
// //     "https://utfs.io/f/Q2s6v1FdRkt7PZrPQhODpXaogRnTBA36Shfk7GvZOIMiQrKw",
// //   );

// //   const texture = useTexture(
// //     "https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx",
// //   );
// //   const bunny = nodes.bunny as Mesh | undefined;

// //   console.log(nodes)

// //   if (!bunny) {
// //     console.error("Bunny node not found in the GLTF model.");
// //     return null;
// //   }

// //   return (
// //     <mesh castShadow receiveShadow geometry={bunny.geometry} dispose={null}>
// //       <meshStandardMaterial color="red" transparent={false} opacity={0.5} />
// //       <Decal
// //         position={[controls.orbitX, controls.orbitY, controls.orbitZ]}
// //         rotation={[controls.rotX, controls.rotY, controls.rotZ]}
// //         scale={controls.scale}
// //         map={texture}
// //       />
// //     </mesh>
// //   );
// // }

// // function Snail() {
// //   const controls = TattooControls();

// //   const { nodes } = useGLTF(
// //     "https://utfs.io/f/Q2s6v1FdRkt7fFGzgYIcLbcim4grM2VhdIHWsq3Ztoy1nQ0E",
// //   );

// //   const texture = useTexture(
// //     "https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx",
// //   );
// //   const snail = nodes.Mesh_0_Material_0_0 as Mesh | undefined;
// //   console.log(nodes)
// //   if (!snail) {
// //     console.log(nodes)
// //     console.error("Bunny node not found in the GLTF model.");
// //     return null;
// //   }

// //   return (
// //     <mesh castShadow receiveShadow geometry={snail.geometry} >
// //       <meshStandardMaterial color="red" transparent={false} opacity={0.5} />
// //       <Decal
// //         position={[controls.orbitX, controls.orbitY, controls.orbitZ]}
// //         rotation={[controls.rotX, controls.rotY, controls.rotZ]}
// //         scale={controls.scale}
// //         map={texture}
// //       />
// //     </mesh>
// //   );
// // }

// // function Face() {
// //   const controls = TattooControls();

// //   const { nodes } = useGLTF(
// //     "https://utfs.io/f/Q2s6v1FdRkt7W1EeK8tXjQ48RWtOfl6cTA5MokFHvgyaJEsK",
// //   );

// //   const texture = useTexture(
// //     "https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx",
// //   );
// //   const face = nodes.mesh_0 as Mesh | undefined;

// //   console.log(nodes)
// //   if (!face) {
// //     console.error("Bunny node not found in the GLTF model.");
// //     return null;
// //   }

// //   return (
// //     <mesh castShadow receiveShadow geometry={face.geometry} dispose={null}>
// //       <Decal
// //         position={[controls.orbitX, controls.orbitY, controls.orbitZ]}
// //         rotation={[controls.rotX, controls.rotY, controls.rotZ]}
// //         scale={controls.scale}
// //         map={texture}
// //       />
// //     </mesh>

// //   );
// // }

// // function Bear() {
// //   const controls = TattooControls();

// //   const { nodes } = useGLTF(
// //     "https://utfs.io/f/Q2s6v1FdRkt7p7AiGzqzTHgxL2AS4J93cqmsMWtjeaUD1KIw",
// //   );

// //   const texture = useTexture(
// //     "https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx",
// //   );
// //   console.log(nodes)
// //   const bear = nodes.geometry_0 as Mesh | undefined;

// //   if (!bear) {
// //     console.log(nodes)
// //     console.error("Bunny node not found in the GLTF model.");
// //     return null;
// //   }

// //   return (
// //     <mesh castShadow receiveShadow geometry={bear.geometry} >
// //       <meshStandardMaterial color="red" transparent={false} opacity={0.5} />
// //       <Decal
// //         position={[controls.orbitX, controls.orbitY, controls.orbitZ]}
// //         rotation={[controls.rotX, controls.rotY, controls.rotZ]}
// //         scale={controls.scale}
// //         map={texture}
// //       />
// //     </mesh>
// //   );
// // }

// // Bear       https://utfs.io/f/Q2s6v1FdRkt7p7AiGzqzTHgxL2AS4J93cqmsMWtjeaUD1KIw

// // face       https://utfs.io/f/Q2s6v1FdRkt7W1EeK8tXjQ48RWtOfl6cTA5MokFHvgyaJEsK

// // Pose       https://utfs.io/f/Q2s6v1FdRkt7qwjCVERyaRsbH48WglVkmGOEZc1zUfujr2hq

