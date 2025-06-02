
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface FloatingTextProps {
  text: string;
  position: [number, number, number];
  mousePosition: { x: number; y: number };
}

export const FloatingText = ({ text, position, mousePosition }: FloatingTextProps) => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      // Parallax effect based on mouse position
      textRef.current.position.x = position[0] + mousePosition.x * 0.5;
      textRef.current.position.y = position[1] + mousePosition.y * 0.3;
      
      // Gentle floating animation
      textRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
      
      // Subtle rotation
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      textRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={1.2}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      font="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap"
    >
      {text}
      <meshStandardMaterial
        color="#ffffff"
        emissive="#4c1d95"
        emissiveIntensity={0.2}
        transparent
        opacity={0.9}
      />
    </Text>
  );
};
