
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
  const expandedGroupRef = useRef<THREE.Group>(null);
  
  // Enhanced portal shader material
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
          newPosition.z += sin(newPosition.x * 8.0 + time * 3.0) * 0.2 * (1.0 + hovered * 0.8);
          newPosition.x += cos(newPosition.y * 6.0 + time * 2.0) * 0.15 * hovered;
          
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
          
          // Multiple spiral layers
          float angle = atan(uv.y, uv.x);
          float spiral1 = sin(angle * 15.0 + time * 4.0 - dist * 20.0) * 0.5 + 0.5;
          float spiral2 = cos(angle * 10.0 - time * 3.0 + dist * 12.0) * 0.3 + 0.7;
          float spiral3 = sin(angle * 8.0 + time * 2.5 - dist * 18.0) * 0.4 + 0.6;
          
          // Energy rings with varying speeds
          float rings1 = sin(dist * 25.0 - time * 5.0) * 0.5 + 0.5;
          float rings2 = cos(dist * 15.0 - time * 3.5) * 0.3 + 0.7;
          rings1 *= (1.0 - smoothstep(0.0, 0.6, dist));
          rings2 *= (1.0 - smoothstep(0.0, 0.4, dist));
          
          // Particle effect
          float noise = sin(uv.x * 50.0 + time * 10.0) * cos(uv.y * 50.0 + time * 8.0);
          float particles = smoothstep(0.8, 1.0, noise) * (1.0 - dist * 2.0);
          
          vec3 portalColor = mix(color, vec3(1.0, 0.9, 1.0), spiral1 * spiral2 * spiral3);
          portalColor += rings1 * vec3(0.5, 0.9, 1.0) * 0.8;
          portalColor += rings2 * vec3(1.0, 0.6, 0.8) * 0.6;
          portalColor += particles * vec3(1.0, 1.0, 0.8) * 0.5;
          
          // Enhanced hover effects
          float hoverDistortion = hovered * (sin(dist * 30.0 - time * 6.0) * 0.4 + cos(angle * 12.0 + time * 4.0) * 0.3);
          portalColor += hoverDistortion * vec3(1.0, 0.7, 0.9);
          
          float alpha = (1.0 - smoothstep(0.0, 0.6, dist)) * (0.8 + hovered * 0.4);
          
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
      metalness: 0.05,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      transparent: true,
      ior: 1.5
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Rolling cylinder effect - cards move in circular path
      const radius = 8;
      const speed = 0.3;
      const time = state.clock.elapsedTime;
      const cardAngle = (index / workProjects.length) * Math.PI * 2 + time * speed;
      
      // Circular path positioning
      const x = Math.cos(cardAngle) * radius;
      const z = Math.sin(cardAngle) * radius;
      const y = Math.sin(time * 0.2 + index * 1.2) * 1.5; // Gentle vertical movement
      
      groupRef.current.position.set(x, y, z);
      
      // Rolling rotation - cards face the center and roll
      groupRef.current.rotation.y = cardAngle + Math.PI;
      groupRef.current.rotation.z = -cardAngle * 0.1; // Rolling effect
      groupRef.current.rotation.x = Math.sin(cardAngle) * 0.15; // Subtle tilt
    }

    if (meshRef.current) {
      // Card scaling and rotation
      const targetScale = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Subtle local rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3 + index) * 0.05;
    }
    
    if (portalRef.current) {
      portalRef.current.rotation.z = state.clock.elapsedTime * 1.2;
    }

    // Update expanded content
    if (expandedGroupRef.current) {
      expandedGroupRef.current.visible = hovered;
      if (hovered) {
        expandedGroupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.15);
      } else {
        expandedGroupRef.current.scale.lerp(new THREE.Vector3(0.8, 0.8, 0.8), 0.15);
      }
    }

    // Update shader uniforms
    if (portalMaterial.uniforms) {
      portalMaterial.uniforms.time.value = state.clock.elapsedTime;
      portalMaterial.uniforms.hovered.value = hovered ? 1.0 : 0.0;
    }
  });

  // Define workProjects length for the circular calculation
  const workProjects = Array(5).fill(null); // Since we have 5 projects

  return (
    <group ref={groupRef}>
      {/* Main card container */}
      <mesh ref={meshRef}>
        <boxGeometry args={[3, 4, 0.2]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Project image */}
      <mesh position={[0, 0.5, 0.11]}>
        <planeGeometry args={[2.6, 2]} />
        <meshBasicMaterial>
          <primitive attach="map" object={new THREE.TextureLoader().load(imageUrl)} />
        </meshBasicMaterial>
      </mesh>
      
      {/* Glass morphism corner */}
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
        maxWidth={2.5}
      >
        {title}
      </Text>
      
      {/* Expanded project details */}
      <group ref={expandedGroupRef} position={[0, 0, 0.15]}>
        {/* Backdrop */}
        <mesh position={[0, -0.5, -0.05]}>
          <boxGeometry args={[3.5, 2, 0.1]} />
          <meshStandardMaterial
            color={0x000000}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Description */}
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.12}
          color="#e0e0e0"
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
          lineHeight={1.2}
        >
          {description}
        </Text>
        
        {/* Status indicator */}
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
        >
          View Project
        </Text>
      </group>
    </group>
  );
};
