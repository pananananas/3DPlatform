"use client";

import { AsciiRenderer, Float, OrbitControls, Shadow } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lights from "./lights";

function TorusKnot() {
  return (
    <Float speed={1.5} rotationIntensity={10} floatIntensity={1}>
      <mesh scale={[0.2, 0.2, 0.2]}>
        <torusKnotGeometry args={[10, 2, 128, 30, 3, 5]} />
        <meshStandardMaterial color="white" />
        
      </mesh>
    </Float>
  );
}

export default function AsciiModel() {
  return (
    <>
      <div
        className="absolute left-0 top-0 h-full w-full"
        style={{ zIndex: -2 }}
      >
        <Canvas className="z-1">
          <AsciiRenderer
            characters="  :-=+*#%@"
            fgColor={"#2A6265"}
            bgColor="transparent"
          />
          <Lights />
          <TorusKnot />
          <OrbitControls />
          <Shadow />
        </Canvas>
      </div>
      <div
        className="absolute left-0 top-0 h-full w-full bg-background/40"
        style={{ zIndex: -1 }}
      ></div>
    </>
  );
}
