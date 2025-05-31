
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
  imageUrl?: string;
}

export const WorkPortalCard = ({ 
  position, 
  rotation, 
  title, 
  description, 
  color, 
  index,
  hovered,
  imageUrl = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
}: WorkPortalCardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const portalRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const imageRef = useRef<THREE.Mesh>(null);
  
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

  // Glass morphism material
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 0.3,
      roughness: 0.1,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      transparent: true
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1);
    }
    
    if (portalRef.current) {
      portalRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
    
    if (groupRef.current) {
      // Enhanced cylindrical rotation with smooth rolling effect
      const radius = 5;
      const angle = (index / 5) * Math.PI * 2 + state.clock.elapsedTime * 0.3;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(state.clock.elapsedTime * 0.2 + index) * 0.5;
      
      groupRef.current.position.set(x, y, z);
      groupRef.current.rotation.y = angle + Math.PI;
      
      // Add rolling rotation
      groupRef.current.rotation.z = -angle * 0.5;
    }

    // Update portal shader
    if (portalMaterial.uniforms) {
      portalMaterial.uniforms.time.value = state.clock.elapsedTime;
      portalMaterial.uniforms.hovered.value = hovered ? 1.0 : 0.0;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Main card with image */}
      <mesh ref={meshRef}>
        <boxGeometry args={[2.5, 3, 0.15]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Image plane */}
      <mesh ref={imageRef} position={[0, 0.3, 0.08]}>
        <planeGeometry args={[2.2, 1.5]} />
        <meshBasicMaterial>
          <primitive attach="map" object={new THREE.TextureLoader().load(imageUrl)} />
        </meshBasicMaterial>
      </mesh>
      
      {/* Glass morphism overlay in corner */}
      <mesh position={[0.8, 1.2, 0.09]}>
        <circleGeometry args={[0.3, 16]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>
      
      {/* Portal effect in center */}
      <mesh ref={portalRef} position={[0, -0.3, 0.1]}>
        <circleGeometry args={[0.6, 32]} />
        <primitive object={portalMaterial} attach="material" />
      </mesh>
      
      {/* Card content */}
      <Text
        position={[0, -1.2, 0.11]}
        fontSize={0.18}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
      >
        {title}
      </Text>
      
      <Text
        position={[0, -1.5, 0.11]}
        fontSize={0.08}
        color="#a0a0a0"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        font="/fonts/inter.woff"
      >
        {description}
      </Text>
    </group>
  );
};
