
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

// Sketchfab model URL for the Graveyard Angel statue
const STATUE_MODEL_URL = "https://sketchfab.com/models/bf55c6686ae7454181fa33662e7eca29/embed";

export const InteractiveGeometry = () => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Load the GLTF model with error handling
  let scene;
  try {
    const gltf = useGLTF(STATUE_MODEL_URL);
    scene = gltf.scene;
  } catch (error) {
    console.log("GLTF loading error:", error);
    scene = null;
  }

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  // If model fails to load, show a fallback geometry
  if (!scene) {
    return (
      <>
        <Environment preset="sunset" />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <mesh
            ref={meshRef}
            position={[0, 0, 0]}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial
              color={hovered ? "#8B5CF6" : "#E5E7EB"}
              metalness={0.3}
              roughness={0.4}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Float>
      </>
    );
  }

  // Clone the scene to avoid sharing the same geometry
  const clonedScene = scene.clone();
  
  // Apply materials to the cloned scene
  clonedScene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: hovered ? "#8B5CF6" : "#E5E7EB",
        metalness: 0.3,
        roughness: 0.4,
        transparent: true,
        opacity: 0.9
      });
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <>
      <Environment preset="sunset" />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <group
          ref={groupRef}
          scale={[2, 2, 2]}
          position={[0, -1, 0]}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <primitive object={clonedScene} />
        </group>
      </Float>
    </>
  );
};

// Preload the model
try {
  useGLTF.preload(STATUE_MODEL_URL);
} catch (error) {
  console.log("Preload error:", error);
}
