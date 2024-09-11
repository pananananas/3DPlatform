import { Environment, Lightformer } from "@react-three/drei";

export default function Lights() {
  return (
    <Environment background blur={0.75}>
      <color attach="background" args={["#121212"]} />
      <Lightformer
        intensity={2}
        color="white"
        position={[0, -1, 5]}
        rotation={[0, 0, Math.PI / 3]}
        scale={[100, 0.1, 1]}
      />
      <Lightformer
        intensity={3}
        color="white"
        position={[-1, -1, 1]}
        rotation={[0, 0, Math.PI / 3]}
        scale={[100, 0.1, 1]}
      />
      <Lightformer
        intensity={3}
        color="white"
        position={[1, 1, 1]}
        rotation={[0, 0, Math.PI / 3]}
        scale={[100, 0.1, 1]}
      />
      <Lightformer
        intensity={10}
        color="white"
        position={[-10, 0, 14]}
        rotation={[0, Math.PI / 2, Math.PI / 3]}
        scale={[100, 10, 1]}
      />
    </Environment>
  );
}
