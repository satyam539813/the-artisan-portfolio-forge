
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface FloatingOrbProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}

export const FloatingOrb = ({ position, color, scale = 1, speed = 1 }: FloatingOrbProps) => {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.emissive.setHex(
        parseInt(color.replace('#', ''), 16)
      );
      materialRef.current.emissiveIntensity = 
        0.2 + Math.sin(state.clock.elapsedTime * speed) * 0.1;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={1}>
      <Sphere args={[0.3 * scale, 32, 32]} position={position}>
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.7}
        />
      </Sphere>
    </Float>
  );
};
