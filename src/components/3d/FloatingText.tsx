
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export const FloatingText = () => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 2;
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group>
      <Text
        ref={textRef}
        position={[0, 2, 0]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap"
      >
        Digital Creator
      </Text>
      
      <Text
        position={[-3, 1, -2]}
        fontSize={0.3}
        color="#06b6d4"
        anchorX="center"
        anchorY="middle"
      >
        React
      </Text>
      
      <Text
        position={[3, 1.5, -1]}
        fontSize={0.3}
        color="#8b5cf6"
        anchorX="center"
        anchorY="middle"
      >
        Three.js
      </Text>
      
      <Text
        position={[0, 0.5, -3]}
        fontSize={0.3}
        color="#ec4899"
        anchorX="center"
        anchorY="middle"
      >
        Blender
      </Text>
    </group>
  );
};
