
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Interactive3DCardProps {
  position: [number, number, number];
  color: string;
  text?: string;
  hovered: boolean;
}

export const Interactive3DCard = ({ position, color, text, hovered }: Interactive3DCardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1);
      
      // Add floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 0.8, 0.1]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.1}
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={hovered ? 0.2 : 0.1}
      />
    </mesh>
  );
};
