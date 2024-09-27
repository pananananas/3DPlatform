"use client";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Decal,
  OrbitControls,
  RandomizedLight,
  AccumulativeShadows,
} from "@react-three/drei";
import type { Mesh } from "three";


export default function Test() {
  return (
    <Canvas shadows camera={{ position: [-2.5, 1, 10], fov: 17 }}>
      <color attach="background" args={["#131313"]} />
      <ambientLight intensity={0.25 * Math.PI} />
      <spotLight decay={0} position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight decay={0} position={[-10, 0, -5]} intensity={6} />
      <group position={[0, -0.75, 0]}>
        <Bun />
        {/* <Pose /> */}
        {/* <Dodecahedron scale={1} position={[-0.9, 2, 4]} /> */}
        <AccumulativeShadows
          frames={80}
          color="black"
          opacity={1}
          scale={12}
          position={[0, 0.04, 0]}
        >
          <RandomizedLight
            amount={8}
            radius={5}
            ambient={0.5}
            position={[5, 6, -10]}
            bias={0.001}
          />
        </AccumulativeShadows>
      </group>
      <OrbitControls makeDefault />
    </Canvas>
  );
}
function Bun() {
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
      <mesh
        castShadow
        receiveShadow
        geometry={bunny.geometry}
        dispose={null}
      >
        <meshStandardMaterial color="red" />
        <Decal position={[0.5, 0.5, 0.5]} scale={0.7} map={texture} />
      </mesh>
    );
  }
  

// function Dodecahedron() {
//   const meshRef = useRef()
//   const texture = useTexture('https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx')
//   const [hovered, hover] = useState(false)
//   const [clicked, click] = useState(false)
//   useCursor(hovered)
//   // useFrame((state, delta) => (meshRef.current.rotation.x = meshRef.current.rotation.y += delta))
//   return (
//     <group {...props}>
//       <mesh
//         ref={meshRef}
//         scale={clicked ? 2.25 : 1.75}
//         onClick={() => click(!clicked)}
//         onPointerOver={() => hover(true)}
//         onPointerOut={() => hover(false)}>
//         <dodecahedronGeometry args={[0.75]} />
//         <Image transparent position={[0, 0, 0]} url="https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx" />
//         <meshStandardMaterial color={hovered ? 'hotpink' : 'goldenrod'} />
//         <Decal polygonOffsetFactor={-0} position={[0.2, -0.8, 0.2]} scale={0.75} map={texture} />
//       </mesh>
//     </group>
//   )
// }

// function Pose() {
//   const { nodes } = useGLTF(
//     "https://utfs.io/f/Q2s6v1FdRkt7qwjCVERyaRsbH48WglVkmGOEZc1zUfujr2hq",
//   );
//   const texture = useTexture(
//     "https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx",
//   );
// console.log(nodes);
//   return (
//     <mesh castShadow receiveShadow geometry={nodes.geometry} dispose={null}>
//       <meshStandardMaterial color="red" />
//       <Decal position={[0.5, 0.5, 0.5]} scale={0.7} map={texture} />
//     </mesh>
//   );
// }
