
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
  const expandedGroupRef = useRef<THREE.Group>(null);
  
  // Enhanced portal shader material with improved effects
  const portalMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        uniform float hovered;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 newPosition = position;
          // Enhanced wave distortion
          newPosition.z += sin(newPosition.x * 6.0 + time * 2.0) * 0.15 * (1.0 + hovered * 0.5);
          newPosition.x += cos(newPosition.y * 4.0 + time * 1.5) * 0.1 * hovered;
          
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
          
          // Enhanced portal effect with multiple layers
          float angle = atan(uv.y, uv.x);
          float spiral1 = sin(angle * 12.0 + time * 3.0 - dist * 15.0) * 0.5 + 0.5;
          float spiral2 = cos(angle * 8.0 - time * 2.0 + dist * 8.0) * 0.3 + 0.7;
          
          // Energy rings
          float rings = sin(dist * 20.0 - time * 4.0) * 0.5 + 0.5;
          rings *= (1.0 - smoothstep(0.0, 0.5, dist));
          
          vec3 portalColor = mix(color, vec3(1.0, 0.8, 1.0), spiral1 * spiral2);
          portalColor += rings * vec3(0.5, 0.8, 1.0) * 0.6;
          
          // Enhanced hover distortion with color shift
          float distortion = hovered * (sin(dist * 25.0 - time * 5.0) * 0.3 + cos(angle * 10.0 + time * 3.0) * 0.2);
          portalColor += distortion * vec3(1.0, 0.5, 0.8);
          
          float alpha = (1.0 - smoothstep(0.0, 0.5, dist)) * (0.7 + hovered * 0.3);
          
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

  // Enhanced glass morphism material
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      opacity: 0.2,
      roughness: 0.05,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      transparent: true,
      ior: 1.4
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth scaling and subtle rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.15;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3 + index) * 0.05;
      
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
    
    if (portalRef.current) {
      portalRef.current.rotation.z = state.clock.elapsedTime * 0.8;
    }
    
    if (groupRef.current) {
      // Enhanced circular rolling animation
      const radius = 6;
      const speed = 0.25;
      const angle = (index / 5) * Math.PI * 2 + state.clock.elapsedTime * speed;
      
      // Circular path with gentle vertical movement
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(state.clock.elapsedTime * 0.15 + index * 0.8) * 0.8;
      
      groupRef.current.position.set(x, y, z);
      
      // Rolling rotation - cards rotate as they move around the circle
      groupRef.current.rotation.y = angle + Math.PI;
      groupRef.current.rotation.z = -angle * 0.3; // Rolling effect
      
      // Subtle tilt based on position
      groupRef.current.rotation.x = Math.sin(angle) * 0.1;
    }

    // Update expanded content visibility
    if (expandedGroupRef.current) {
      expandedGroupRef.current.visible = hovered;
      if (hovered) {
        expandedGroupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.15);
      } else {
        expandedGroupRef.current.scale.lerp(new THREE.Vector3(0.8, 0.8, 0.8), 0.15);
      }
    }

    // Update portal shader uniforms
    if (portalMaterial.uniforms) {
      portalMaterial.uniforms.time.value = state.clock.elapsedTime;
      portalMaterial.uniforms.hovered.value = hovered ? 1.0 : 0.0;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Main card container */}
      <mesh ref={meshRef}>
        <boxGeometry args={[3, 4, 0.2]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>
      
      {/* Project image */}
      <mesh ref={imageRef} position={[0, 0.5, 0.11]}>
        <planeGeometry args={[2.6, 2]} />
        <meshBasicMaterial>
          <primitive attach="map" object={new THREE.TextureLoader().load(imageUrl)} />
        </meshBasicMaterial>
      </mesh>
      
      {/* Glass morphism overlay in corner */}
      <mesh position={[1, 1.6, 0.12]}>
        <circleGeometry args={[0.4, 20]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>
      
      {/* Enhanced portal effect */}
      <mesh ref={portalRef} position={[0, -0.8, 0.12]}>
        <circleGeometry args={[0.8, 40]} />
        <primitive object={portalMaterial} attach="material" />
      </mesh>
      
      {/* Card title */}
      <Text
        position={[0, -1.6, 0.13]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
        maxWidth={2.5}
      >
        {title}
      </Text>
      
      {/* Expanded project details on hover */}
      <group ref={expandedGroupRef} position={[0, 0, 0.15]}>
        {/* Backdrop for expanded content */}
        <mesh position={[0, -0.5, -0.05]}>
          <boxGeometry args={[3.5, 2, 0.1]} />
          <meshStandardMaterial
            color={0x000000}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Expanded description */}
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.12}
          color="#e0e0e0"
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
          font="/fonts/inter.woff"
          lineHeight={1.2}
        >
          {description}
        </Text>
        
        {/* Project status indicator */}
        <mesh position={[0, -0.8, 0]}>
          <circleGeometry args={[0.05, 16]} />
          <meshBasicMaterial color="#00ff88" />
        </mesh>
        
        <Text
          position={[0, -1.1, 0]}
          fontSize={0.08}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter.woff"
        >
          View Project
        </Text>
      </group>
    </group>
  );
};
