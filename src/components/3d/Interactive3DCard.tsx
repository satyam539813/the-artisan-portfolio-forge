
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text3D, MeshDistortMaterial } from "@react-three/drei";
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
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={hovered ? 0.3 : 0.1}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};
