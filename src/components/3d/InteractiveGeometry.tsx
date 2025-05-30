
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Using a free statue model from Sketchfab (CC licensed)
const STATUE_MODEL_URL = "https://threejs.org/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb";

export const InteractiveGeometry = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Load the GLTF model
  const { scene } = useGLTF(STATUE_MODEL_URL);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

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
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group
        ref={groupRef}
        scale={[1.5, 1.5, 1.5]}
        position={[0, -0.5, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
};

// Preload the model
useGLTF.preload(STATUE_MODEL_URL);
