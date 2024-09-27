"use client";

import { AsciiRenderer, Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lights from "./3D/lights";

function TorusKnot() {
  return (
    <Float
      speed={1.5}
      rotationIntensity={10}
      floatIntensity={1}
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
