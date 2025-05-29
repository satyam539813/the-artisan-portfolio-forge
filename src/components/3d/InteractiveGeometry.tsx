
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";

export const InteractiveGeometry = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere
          args={[0.8, 32, 32]}
          position={[-2, 0, 0]}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={hovered ? "#8B5CF6" : "#3B82F6"}
            wireframe={hovered}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <Box args={[1.2, 1.2, 1.2]} position={[2, 1, -1]}>
          <meshStandardMaterial
            color="#EC4899"
            transparent
            opacity={0.7}
          />
        </Box>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={3}>
        <Torus args={[0.8, 0.3, 16, 32]} position={[0, -2, 1]}>
          <meshStandardMaterial
            color="#10B981"
            transparent
            opacity={0.6}
          />
        </Torus>
      </Float>

      <points>
        <sphereGeometry args={[4, 80, 80]} />
        <pointsMaterial
          color="#6366F1"
          size={0.015}
          transparent
          opacity={0.6}
        />
      </points>
    </group>
  );
};
