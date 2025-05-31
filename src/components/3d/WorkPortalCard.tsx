
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface WorkPortalCardProps {
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
  description: string;
  color: string;
  index: number;
  hovered: boolean;
}

export const WorkPortalCard = ({ 
  position, 
  rotation, 
  title, 
  description, 
  color, 
  index,
  hovered 
}: WorkPortalCardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const portalRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Create portal shader material
  const portalMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 newPosition = position;
          newPosition.z += sin(newPosition.x * 4.0 + time) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float hovered;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vec2 uv = vUv - 0.5;
          float dist = length(uv);
          
          // Create portal effect
          float angle = atan(uv.y, uv.x);
          float spiral = sin(angle * 8.0 + time * 2.0 - dist * 10.0) * 0.5 + 0.5;
          
          vec3 portalColor = mix(color, vec3(1.0), spiral);
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          
          // Add hover distortion
          float distortion = hovered * sin(dist * 20.0 - time * 3.0) * 0.2;
          portalColor += distortion;
          
          gl_FragColor = vec4(portalColor, alpha);
        }
      `,
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        hovered: { value: hovered ? 1.0 : 0.0 }
      },
      transparent: true,
      side: THREE.DoubleSide
    });
  }, [color, hovered]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1);
    }
    
    if (portalRef.current) {
      portalRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
    
    if (groupRef.current) {
      // Cylindrical rotation around Y axis
      const angle = (index / 5) * Math.PI * 2 + state.clock.elapsedTime * 0.2;
      groupRef.current.position.x = Math.cos(angle) * 4;
      groupRef.current.position.z = Math.sin(angle) * 4;
      groupRef.current.rotation.y = angle + Math.PI;
    }

    // Update portal shader
    if (portalMaterial.uniforms) {
      portalMaterial.uniforms.time.value = state.clock.elapsedTime;
      portalMaterial.uniforms.hovered.value = hovered ? 1.0 : 0.0;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Main card */}
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2.5, 0.1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Portal effect in center */}
      <mesh ref={portalRef} position={[0, 0, 0.06]}>
        <circleGeometry args={[0.8, 32]} />
        <primitive object={portalMaterial} attach="material" />
      </mesh>
      
      {/* Card content */}
      <Text
        position={[0, -1, 0.11]}
        fontSize={0.2}
        color="white"
        anchorX="middle"
        anchorY="middle"
      >
        {title}
      </Text>
      
      <Text
        position={[0, -1.3, 0.11]}
        fontSize={0.1}
        color="#a0a0a0"
        anchorX="middle"
        anchorY="middle"
        maxWidth={1.8}
      >
        {description}
      </Text>
    </group>
  );
};
