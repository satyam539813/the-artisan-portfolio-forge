
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
  
  const workProjects = Array(5).fill(null); // Total number of projects
  
  // Enhanced portal shader with more immersive effects
  const portalMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float time;
        uniform float hovered;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normal;
          
          vec3 newPosition = position;
          
          // Enhanced wave distortions with multiple layers
          float wave1 = sin(newPosition.x * 12.0 + time * 4.0) * 0.15;
          float wave2 = cos(newPosition.y * 8.0 + time * 3.0) * 0.12;
          float wave3 = sin(newPosition.x * 6.0 - newPosition.y * 4.0 + time * 2.0) * 0.1;
          
          newPosition.z += (wave1 + wave2 + wave3) * (1.0 + hovered * 1.5);
          
          // Pulsing effect
          newPosition *= 1.0 + sin(time * 5.0) * 0.02 * hovered;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float hovered;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vec2 uv = vUv - 0.5;
          float dist = length(uv);
          float angle = atan(uv.y, uv.x);
          
          // Multiple spiral layers with different speeds
          float spiral1 = sin(angle * 20.0 + time * 5.0 - dist * 25.0) * 0.5 + 0.5;
          float spiral2 = cos(angle * 15.0 - time * 4.0 + dist * 20.0) * 0.4 + 0.6;
          float spiral3 = sin(angle * 10.0 + time * 3.0 - dist * 30.0) * 0.3 + 0.7;
          float spiral4 = cos(angle * 25.0 - time * 6.0 + dist * 15.0) * 0.2 + 0.8;
          
          // Energy rings with varying intensities
          float rings1 = sin(dist * 30.0 - time * 6.0) * 0.6 + 0.4;
          float rings2 = cos(dist * 20.0 - time * 4.5) * 0.4 + 0.6;
          float rings3 = sin(dist * 40.0 - time * 8.0) * 0.3 + 0.7;
          
          // Particle effects
          float noise1 = sin(uv.x * 60.0 + time * 12.0) * cos(uv.y * 60.0 + time * 10.0);
          float noise2 = cos(uv.x * 40.0 - time * 8.0) * sin(uv.y * 45.0 + time * 9.0);
          float particles = smoothstep(0.85, 1.0, noise1) * (1.0 - dist * 1.8);
          float sparkles = smoothstep(0.9, 1.0, noise2) * (1.0 - dist * 2.2);
          
          // Core portal effect
          vec3 portalColor = mix(color, vec3(1.0, 0.95, 1.0), spiral1 * spiral2);
          portalColor = mix(portalColor, vec3(0.8, 1.0, 1.0), spiral3 * spiral4 * 0.6);
          
          // Add ring effects
          portalColor += rings1 * vec3(0.4, 0.9, 1.0) * 0.9;
          portalColor += rings2 * vec3(1.0, 0.5, 0.9) * 0.7;
          portalColor += rings3 * vec3(0.9, 0.8, 1.0) * 0.5;
          
          // Add particles and sparkles
          portalColor += particles * vec3(1.0, 1.0, 0.8) * 0.8;
          portalColor += sparkles * vec3(1.0, 0.9, 1.0) * 0.6;
          
          // Enhanced hover effects with color shifts
          float hoverDistortion = hovered * (
            sin(dist * 40.0 - time * 8.0) * 0.5 + 
            cos(angle * 15.0 + time * 6.0) * 0.4 +
            sin(uv.x * 30.0 + uv.y * 25.0 + time * 7.0) * 0.3
          );
          portalColor += hoverDistortion * vec3(1.0, 0.6, 0.9);
          
          // Energy field effect when hovered
          if (hovered > 0.5) {
            float energy = sin(time * 10.0) * 0.2 + 0.8;
            portalColor *= energy;
            portalColor += vec3(0.2, 0.4, 0.8) * sin(time * 15.0) * 0.3;
          }
          
          // Enhanced alpha with smoother falloff
          float alpha = (1.0 - smoothstep(0.0, 0.7, dist)) * (0.85 + hovered * 0.3);
          alpha *= (0.8 + sin(time * 3.0) * 0.1);
          
          gl_FragColor = vec4(portalColor, alpha);
        }
      `,
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        hovered: { value: hovered ? 1.0 : 0.0 }
      },
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
  }, [color, hovered]);

  // Enhanced glass material with better refraction
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color).multiplyScalar(0.3),
      transmission: 0.95,
      opacity: 0.2,
      roughness: 0.05,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      transparent: true,
      ior: 1.8,
      thickness: 0.5
    });
  }, [color]);

  useFrame((state) => {
    if (groupRef.current) {
      // Enhanced circular rolling motion
      const radius = 10;
      const speed = 0.4;
      const time = state.clock.elapsedTime;
      const cardAngle = (index / workProjects.length) * Math.PI * 2 + time * speed;
      
      // 3D circular path with vertical variation
      const x = Math.cos(cardAngle) * radius;
      const z = Math.sin(cardAngle) * radius;
      const y = Math.sin(time * 0.3 + index * 1.5) * 2 + Math.cos(cardAngle * 2) * 0.5;
      
      groupRef.current.position.set(x, y, z);
      
      // Enhanced rolling rotation with multiple axes
      groupRef.current.rotation.y = cardAngle + Math.PI;
      groupRef.current.rotation.z = -cardAngle * 0.15;
      groupRef.current.rotation.x = Math.sin(cardAngle * 0.5) * 0.2 + Math.cos(time * 0.2) * 0.1;
    }

    if (meshRef.current) {
      // Enhanced card dynamics
      const targetScale = hovered ? 1.4 : 1;
      const currentScale = meshRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08);
      meshRef.current.scale.setScalar(newScale);
      
      // Floating and rotation effects
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6 + index) * 0.15;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.4 + index) * 0.08;
      
      // Pulsing effect when hovered
      if (hovered) {
        const pulse = Math.sin(state.clock.elapsedTime * 8) * 0.02 + 1;
        meshRef.current.scale.multiplyScalar(pulse);
      }
    }
    
    if (portalRef.current) {
      portalRef.current.rotation.z = state.clock.elapsedTime * 1.5;
      if (hovered) {
        portalRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
        portalRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 1.5) * 0.1;
      }
    }

    // Enhanced expanded content animation
    if (expandedGroupRef.current) {
      expandedGroupRef.current.visible = hovered;
      if (hovered) {
        const targetScale = 1;
        expandedGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
      } else {
        expandedGroupRef.current.scale.lerp(new THREE.Vector3(0.6, 0.6, 0.6), 0.12);
      }
    }

    // Update shader uniforms
    if (portalMaterial.uniforms) {
      portalMaterial.uniforms.time.value = state.clock.elapsedTime;
      portalMaterial.uniforms.hovered.value = THREE.MathUtils.lerp(
        portalMaterial.uniforms.hovered.value, 
        hovered ? 1.0 : 0.0, 
        0.1
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main card with enhanced materials */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[3.5, 4.5, 0.3]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.95}
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Enhanced project image with better materials */}
      <mesh position={[0, 0.6, 0.16]} castShadow>
        <planeGeometry args={[3, 2.2]} />
        <meshStandardMaterial transparent opacity={0.9}>
          <primitive attach="map" object={new THREE.TextureLoader().load(imageUrl)} />
        </meshStandardMaterial>
      </mesh>
      
      {/* Multiple glass morphism elements */}
      <mesh position={[1.3, 1.8, 0.17]}>
        <circleGeometry args={[0.5, 24]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>
      
      <mesh position={[-1.3, 1.8, 0.17]}>
        <circleGeometry args={[0.3, 20]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>
      
      {/* Enhanced portal effect with multiple layers */}
      <mesh ref={portalRef} position={[0, -1.2, 0.18]}>
        <circleGeometry args={[1, 50]} />
        <primitive object={portalMaterial} attach="material" />
      </mesh>
      
      {/* Secondary portal ring */}
      <mesh position={[0, -1.2, 0.16]} rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[0.8, 1.2, 32]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={hovered ? 0.3 : 0.1} 
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Enhanced card title */}
      <Text
        position={[0, -1.9, 0.2]}
        fontSize={0.22}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        font="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&display=swap"
      >
        {title}
      </Text>
      
      {/* Greatly enhanced expanded project details */}
      <group ref={expandedGroupRef} position={[0, 0, 0.25]}>
        {/* Enhanced backdrop with gradient */}
        <mesh position={[0, -0.3, -0.1]}>
          <boxGeometry args={[4.2, 3, 0.15]} />
          <meshStandardMaterial
            color={0x000000}
            transparent
            opacity={0.95}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
        
        {/* Detailed description */}
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.13}
          color="#e0e0e0"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.8}
          lineHeight={1.3}
        >
          {description}
        </Text>
        
        {/* Technology tags */}
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.1}
          color="#8b5cf6"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.5}
        >
          React • Three.js • WebGL • GLSL
        </Text>
        
        {/* Enhanced status indicator */}
        <mesh position={[0, -1.3, 0]}>
          <circleGeometry args={[0.08, 20]} />
          <meshBasicMaterial color="#00ff88" />
        </mesh>
        
        <Text
          position={[0, -1.6, 0]}
          fontSize={0.09}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
        >
          ◆ Explore Interactive Demo ◆
        </Text>
        
        {/* Hover glow effect */}
        <mesh position={[0, -0.3, -0.12]}>
          <boxGeometry args={[4.5, 3.3, 0.1]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
};
