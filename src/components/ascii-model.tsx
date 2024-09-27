"use client";

import { AsciiRenderer, Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from 'three';
import Lights from "./3D/lights";
import { useRef } from "react";


function TorusKnot() {
  const ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.5;
      ref.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={10} // XYZ rotation intensity, defaults to 1
      floatIntensity={1} // Up/down float intensity, defaults to 1
    >
    <mesh scale={[1.5, 1.5, 1.5]}>
      <torusKnotGeometry args={[1, 0.2, 128, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
</Float>
  );
}

export default function AsciiModel() {
  return (
    <div className="absolute left-0 top-0 h-full w-full" style={{ zIndex: -1 }}>
      <Canvas className="z-1">
        <AsciiRenderer
          characters="  :-=+*#%@"
          fgColor={'#2A6265'}
          bgColor="transparent"
        />
        <Lights />
        <TorusKnot />
      </Canvas>
    </div>
  );
}
