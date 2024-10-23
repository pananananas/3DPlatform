// "use client";

// import React, { useRef, useEffect, useMemo } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useTexture, Decal, useAspect } from "@react-three/drei";
// import * as THREE from "three";
// import { useControls } from "leva";

// function HandMesh() {
//   const meshRef = useRef<THREE.Mesh>(null);

//   const [handTexture, depthTexture, tattooTexture] = useTexture(
//     [
//       "https://utfs.io/f/Q2s6v1FdRkt7ewCZTt6cfv9M4Ix0mkURyEYdlHjaBiTgp1bA",
//       "https://utfs.io/f/Q2s6v1FdRkt7fLPGVycLbcim4grM2VhdIHWsq3Ztoy1nQ0E9",   // DepthAnything
//     // "https://utfs.io/f/Q2s6v1FdRkt7ORtBZSTeXcmia5HKA3otjnFO9pEvZhIfrqPu",   // DepthPro
//       "https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx",
//     ]
//   );

//   const controls = useTattooControls();

//   // Calculate aspect ratio
//   const [width, height] = useAspect(
//     handTexture.image.width,
//     handTexture.image.height,
//     1 // optional scaling factor
//   );

//   // Create geometry without manual displacement
//   const geometry = useMemo(() => {
//     const planeGeometry = new THREE.PlaneGeometry(1, 1, 128, 128);
//     return planeGeometry;
//   }, []);

//   useEffect(() => {
//     if (meshRef.current) {
//       meshRef.current.scale.set(width, height, 1);
//       // Recompute normals after scaling if necessary
//       // meshRef.current.geometry.computeVertexNormals();
//     }
//   }, [width, height]);

//   return (
//     <mesh ref={meshRef} geometry={geometry} receiveShadow castShadow>
//       <meshStandardMaterial
//         map={handTexture}
//         displacementMap={depthTexture}
//         displacementScale={1} // Adjust as needed for visible depth
//         displacementBias={-0.25} // Optional: Adjust to fine-tune displacement
//         side={THREE.DoubleSide} // Ensure both sides are rendered
//         metalness={0.5}
//         roughness={0.5}
//       />
//       {/* Wireframe for Debugging */}
//       {/* <meshBasicMaterial
//         wireframe
//         color="black"
//         transparent
//         opacity={0.2}
//       /> */}
//       <Decal
//         position={[controls.posX, controls.posY, controls.posZ]}
//         rotation={[0, 0, controls.rotation]}
//         scale={controls.scale}
//         // depthOffset={0.1} // Slightly offset to prevent z-fighting
//         map={tattooTexture}
//       />
//         {/* <meshStandardMaterial
//           map={tattooTexture}
//           transparent={true}
//           depthTest={false} // Disable depth test to render on top
//           depthWrite={true}  // Enable depth write
//           polygonOffset={true}
//           polygonOffsetFactor={-4} // Adjust as needed
//         />
//       </Decal> */}
//     </mesh>
//   );
// }

// function useTattooControls() {
//   return useControls({
//     posX: { value: 0, min: -0.5, max: 0.5, step: 0.01 },
//     posY: { value: 0, min: -0.5, max: 0.5, step: 0.01 },
//     posZ: { value: 0.05, min: -0.5, max: 0.5, step: 0.001 }, // Slightly above the surface
//     rotation: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
//     scale: { value: 0.2, min: 0.1, max: 0.5, step: 0.01 },
//   });
// }

export default function Home() {
  return (
    <div className="h-screen w-full text-center flex justify-center items-center">
      {/* <Canvas camera={{ position: [0, 0, 2], fov: 75 }} shadows orthographic={false}>
        <OrbitControls enableZoom={true} enablePan={true} />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <HandMesh />
      </Canvas> */}
      Nothing to see here...
    </div>
  );
}
