
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
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
      
      // Add floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.2;
    }
    
    if (materialRef.current) {
      materialRef.current.emissive.setHex(parseInt(color.replace('#', ''), 16));
      materialRef.current.emissiveIntensity = hovered ? 0.3 : 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};
