
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface SkillOrbProps {
  position: [number, number, number];
  color: string;
  skill: string;
  hovered: boolean;
}

export const SkillOrb = ({ position, color, skill, hovered }: SkillOrbProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.scale.setScalar(hovered ? 1.2 : 1);
    }
    
    if (materialRef.current) {
      materialRef.current.emissive.setHex(parseInt(color.replace('#', ''), 16));
      materialRef.current.emissiveIntensity = hovered ? 0.3 : 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={groupRef} position={position}>
        <Sphere args={[0.4, 32, 32]}>
          <meshStandardMaterial
            ref={materialRef}
            color={color}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.8}
          />
        </Sphere>
        {hovered && (
          <Text
            position={[0, 0.7, 0]}
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            {skill}
          </Text>
        )}
      </group>
    </Float>
  );
};
