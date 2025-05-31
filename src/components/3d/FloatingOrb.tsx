
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingOrbProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}

export const FloatingOrb = ({ position, color, scale = 1, speed = 1 }: FloatingOrbProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
      
      // Add floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
    
    if (materialRef.current) {
      materialRef.current.emissive.setHex(
        parseInt(color.replace('#', ''), 16)
      );
      materialRef.current.emissiveIntensity = 
        0.2 + Math.sin(state.clock.elapsedTime * speed) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};
