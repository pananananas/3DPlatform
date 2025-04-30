"use client";

import { useTexture, Decal, OrbitControls, useGLTF } from "@react-three/drei";
import { useLoader, Canvas, type ThreeEvent } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, Vector3, Euler } from "three";
import { Suspense, useState, useRef } from "react";
import { OBJLoader } from "three-stdlib";
import { useControls } from "leva";
import * as THREE from "three";

type ModelType = "obj" | "glb";

interface ModelControls {
  modelUrl: string;
  type: ModelType;
  textureUrl?: string;
  translateX: number;
  translateY: number;
  translateZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  debug: boolean;
}

export default function Tattoo() {
  const { ambientIntensity, pointIntensity } = useControls("Lighting", {
    ambientIntensity: { value: 10, min: 0, max: 20, step: 0.1 },
    pointIntensity: { value: 2, min: 0, max: 10, step: 0.1 },
  });

  return (
    <Canvas shadows camera={{ position: [10, 4, 10], fov: 10 }}>
      <color attach="background" args={["#131313"]} />
      <ambientLight intensity={ambientIntensity} />
      <pointLight
        decay={0}
        position={[-10, 0, -5]}
        intensity={pointIntensity}
      />
      <pointLight decay={0} position={[10, 0, 5]} intensity={pointIntensity} />
      <group position={[0, -1, 0]}>
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
            </mesh>
          }
        >
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
        New: {
          modelUrl:
            "https://utfs.io/f/aslkQcPvYvFBL3tCFa6uAyRUP8tvXNiaMIloWH6TLF4ZKqOY",
          type: "glb",
          textureUrl: undefined,
        },
        Patryk: {
          modelUrl:
            "https://utfs.io/f/Q2s6v1FdRkt7FG7KlGEJ5N6r0qv7g9uVe2yiCkfUztTcJ4oZ",
          textureUrl:
            "https://utfs.io/f/Q2s6v1FdRkt7AqzWwYEJpMmQNCTWd9cUPSHDoY7sxBIyegtV",
          type: "obj",
        },
        Eryk: {
          modelUrl:
            "https://utfs.io/f/Q2s6v1FdRkt7TXKdQhp9Q3CKLdNFWngbUuRVqBte8cEPsz2I",
          textureUrl:
            "https://utfs.io/f/Q2s6v1FdRkt7wC2NjEu0T16pfHmhqJKORySDMCWUlxd4wvar",
          type: "obj",
        },
      },
    },
  });

  const { scale } = useControls("Size", {
    scale: { value: 0.6, min: 0, max: 2, step: 0.01 },
  });

  const { debug } = useControls("Debug", {
    debug: { value: false },
  });

  return {
    ...model,
    scale,
    debug,
  };
}

function Hand() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const controls = TattooControls();
  const tattooDesign = useTexture(
    "https://utfs.io/f/Q2s6v1FdRkt7t06Vve512ofBlHsJOiWUvRm80PyeXnFIZEdx",
  );

  const [decalPosition, setDecalPosition] = useState<Vector3 | null>(null);
  const [decalRotation, setDecalRotation] = useState<Euler | null>(null);

  const obj = useLoader(
    OBJLoader,
    controls.type === "obj" ? controls.modelUrl : "",
    (loader) => {
      // Optional: Configure loader if needed
    },
  );
  const gltf = useGLTF(controls.type === "glb" ? controls.modelUrl : "");

  const modelTexture = useTexture(controls.textureUrl ?? "");

  let meshGeometry: THREE.BufferGeometry | null = null;
  let meshMaterial: THREE.Material | THREE.Material[] | undefined;

  const model = controls.type === "obj" ? obj : gltf.scene;

  model.traverse((child) => {
    if (!meshGeometry && child instanceof Mesh) {
      meshGeometry = (child as Mesh).geometry;
      meshMaterial = (child as Mesh).material;
      if (
        !(meshMaterial instanceof MeshStandardMaterial) &&
        controls.textureUrl
      ) {
        // console.warn(
        //   "Model material might not be ideal for decals, applying new standard material.",
        // );
        meshMaterial = new MeshStandardMaterial({ map: modelTexture });
      } else if (
        !controls.textureUrl &&
        !(meshMaterial instanceof MeshStandardMaterial)
      ) {
        // console.warn(
        //   "Model material might not be ideal for decals, applying basic standard material.",
        // );
        meshMaterial = new MeshStandardMaterial({ color: 0xcccccc });
      } else if (
        controls.textureUrl &&
        meshMaterial instanceof MeshStandardMaterial
      ) {
        meshMaterial.map = modelTexture;
        meshMaterial.needsUpdate = true;
      }
    }
  });

  if (!meshGeometry) {
    console.error("No mesh geometry found in the model.");
    return (
      <mesh>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  const material =
    controls.textureUrl && meshMaterial instanceof MeshStandardMaterial
      ? meshMaterial
      : (meshMaterial ??
        new MeshStandardMaterial({
          map: controls.textureUrl ? modelTexture : undefined,
          color: 0xcccccc,
        }));

  const handleMeshClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    const { point, face, object } = event;

    if (!face || !meshRef.current) {
      // console.log("Click did not hit a face or mesh ref is not ready.");
      return;
    }

    // console.log("--- Mesh Click Raycast ---");
    // console.log("Intersection Point (World Space):", point.toArray());
    // console.log("Face Normal (Local Space):", face.normal.toArray());

    const worldNormal = face.normal
      .clone()
      .transformDirection(object.matrixWorld)
      .normalize();
    // console.log("Face Normal (World Space):", worldNormal.toArray());

    // 3. Calculate Local Position (for Decal placement)
    // Add a small offset along the world normal *before* converting to local
    const offsetDistance = 0.01; // Small offset to prevent z-fighting
    const pointWithOffset = point
      .clone()
      .add(worldNormal.clone().multiplyScalar(offsetDistance)); // Clone worldNormal here
    const localPosition = meshRef.current.worldToLocal(pointWithOffset.clone());
    // console.log("Target Decal Position (Local Space):",localPosition.toArray());
    setDecalPosition(localPosition);

    // 4. Calculate Rotation based on World Normal
    const rotationMatrix = new THREE.Matrix4();
    const upVector = new THREE.Vector3(0, 1, 0); // World up vector
    const eyePosition = new THREE.Vector3().addVectors(point, worldNormal); // A point slightly "outside" the surface along the normal

    // Use lookAt to create a rotation matrix. The object looks from 'eyePosition' towards 'point'.
    // This orients the object's -Z axis towards the surface (along the negative normal).
    rotationMatrix.lookAt(eyePosition, point, upVector);

    // Extract Euler rotation from the matrix
    const calculatedRotation = new THREE.Euler().setFromRotationMatrix(
      rotationMatrix,
    );

    // // console.log(
    //   "Calculated Decal Rotation (Euler):",
    //   calculatedRotation.toArray().slice(0, 3),
    // ); // Log X, Y, Z
    setDecalRotation(calculatedRotation);
  };

  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      geometry={meshGeometry}
      material={material}
      dispose={null}
      position={[0, 1, 0]}
      onClick={handleMeshClick}
    >
      {decalPosition && decalRotation && (
        <Decal
          position={decalPosition}
          rotation={decalRotation}
          scale={controls.scale}
          map={tattooDesign}
          debug={controls.debug}
        />
      )}
    </mesh>
  );
}
