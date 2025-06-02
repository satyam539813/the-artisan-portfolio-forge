
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
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
  onHover?: (hovered: boolean) => void;
  onClick?: () => void;
}

export const WorkPortalCard = ({ 
  position, 
  rotation, 
  title, 
  description, 
  color, 
  index,
  hovered,
  imageUrl = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  onHover,
  onClick
}: WorkPortalCardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const portalRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const frameRef = useRef<THREE.Mesh>(null);
  
  const workProjects = Array(5).fill(null);
  
  // Gallery-style positioning - arrange in a circular gallery
  const galleryRadius = 25;
  const galleryHeight = 3;
  
  // Enhanced portal shader with gallery lighting effects
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
          
          // Gallery spotlight effect
          float wave1 = sin(newPosition.x * 8.0 + time * 2.0) * 0.1;
          float wave2 = cos(newPosition.y * 6.0 + time * 1.5) * 0.08;
          
          newPosition.z += (wave1 + wave2) * (1.0 + hovered * 0.8);
          
          // Gentle pulsing for gallery ambiance
          newPosition *= 1.0 + sin(time * 3.0) * 0.015 * hovered;
          
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
          
          // Gallery lighting patterns
          float spotlight = sin(angle * 8.0 + time * 2.0 - dist * 15.0) * 0.4 + 0.6;
          float ambient = cos(angle * 6.0 - time * 1.5 + dist * 12.0) * 0.3 + 0.7;
          
          // Subtle energy rings
          float rings = sin(dist * 20.0 - time * 3.0) * 0.3 + 0.7;
          
          // Gallery color palette
          vec3 galleryColor = mix(color, vec3(1.0, 0.98, 0.95), spotlight * 0.4);
          galleryColor = mix(galleryColor, vec3(0.9, 0.95, 1.0), ambient * 0.3);
          galleryColor += rings * vec3(0.3, 0.6, 0.9) * 0.4;
          
          // Enhanced hover glow
          if (hovered > 0.5) {
            float glow = sin(time * 5.0) * 0.15 + 0.85;
            galleryColor *= glow;
            galleryColor += vec3(0.2, 0.3, 0.6) * sin(time * 8.0) * 0.2;
          }
          
          // Gallery-appropriate alpha
          float alpha = (1.0 - smoothstep(0.0, 0.6, dist)) * (0.7 + hovered * 0.2);
          alpha *= (0.9 + sin(time * 2.0) * 0.05);
          
          gl_FragColor = vec4(galleryColor, alpha);
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

  // Gallery frame material
  const frameMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color).multiplyScalar(0.8),
      metalness: 0.9,
      roughness: 0.1,
      emissive: new THREE.Color(color).multiplyScalar(hovered ? 0.1 : 0.02),
    });
  }, [color, hovered]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gallery circular positioning
      const time = state.clock.elapsedTime;
      const cardAngle = (index / workProjects.length) * Math.PI * 2;
      
      // Static gallery positioning with slight floating
      const x = Math.cos(cardAngle) * galleryRadius;
      const z = Math.sin(cardAngle) * galleryRadius;
      const y = galleryHeight + Math.sin(time * 0.5 + index * 2) * 0.5;
      
      groupRef.current.position.set(x, y, z);
      
      // Face towards center
      groupRef.current.rotation.y = cardAngle + Math.PI;
      
      // Slight floating rotation
      groupRef.current.rotation.x = Math.sin(time * 0.3 + index) * 0.05;
      groupRef.current.rotation.z = Math.cos(time * 0.4 + index) * 0.03;
    }

    if (meshRef.current) {
      // Gallery frame hover effects
      const targetScale = hovered ? 1.15 : 1;
      const currentScale = meshRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.06);
      meshRef.current.scale.setScalar(newScale);
      
      // Gentle hover animation
      if (hovered) {
        const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.01 + 1;
        meshRef.current.scale.multiplyScalar(pulse);
      }
    }

    if (frameRef.current) {
      // Frame lighting response
      const targetScale = hovered ? 1.05 : 1;
      frameRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    }
    
    if (portalRef.current) {
      portalRef.current.rotation.z = state.clock.elapsedTime * 0.8;
    }

    // Update shader uniforms
    if (portalMaterial.uniforms) {
      portalMaterial.uniforms.time.value = state.clock.elapsedTime;
      portalMaterial.uniforms.hovered.value = THREE.MathUtils.lerp(
        portalMaterial.uniforms.hovered.value, 
        hovered ? 1.0 : 0.0, 
        0.08
      );
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerEnter={() => onHover?.(true)}
      onPointerLeave={() => onHover?.(false)}
      onClick={onClick}
    >
      {/* Gallery Frame */}
      <mesh ref={frameRef} castShadow receiveShadow>
        <boxGeometry args={[6, 8, 0.5]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>
      
      {/* Main Display Screen */}
      <mesh ref={meshRef} position={[0, 0, 0.26]} castShadow receiveShadow>
        <boxGeometry args={[5, 7, 0.1]} />
        <meshStandardMaterial
          color="#000000"
          metalness={0.1}
          roughness={0.05}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* Project Image Display */}
      <mesh position={[0, 0.5, 0.32]} castShadow>
        <planeGeometry args={[4.5, 3.5]} />
        <meshStandardMaterial transparent opacity={0.95}>
          <primitive attach="map" object={new THREE.TextureLoader().load(imageUrl)} />
        </meshStandardMaterial>
      </mesh>
      
      {/* Portal Effect */}
      <mesh ref={portalRef} position={[0, -2, 0.33]}>
        <circleGeometry args={[1.2, 32]} />
        <primitive object={portalMaterial} attach="material" />
      </mesh>
      
      {/* Gallery Lighting Ring */}
      <mesh position={[0, -2, 0.31]} rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[1, 1.4, 24]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={hovered ? 0.4 : 0.15} 
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Title Plate */}
      <mesh position={[0, -3.2, 0.32]}>
        <boxGeometry args={[4, 0.6, 0.05]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Project Title */}
      <Text
        position={[0, -3.2, 0.35]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.8}
        font="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&display=swap"
      >
        {title}
      </Text>
      
      {/* Interactive Info Panel - appears on hover */}
      {hovered && (
        <Html
          position={[0, 0, 0.5]}
          center
          distanceFactor={15}
          transform
          sprite
        >
          <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-xl p-4 max-w-xs text-center transform -translate-y-12">
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-gray-300 text-sm mb-3 line-clamp-3">
              {description.split('.')[0]}.
            </p>
            <button 
              className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm rounded-lg hover:from-violet-600 hover:to-purple-700 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
            >
              View Details
            </button>
          </div>
        </Html>
      )}
      
      {/* Gallery Spotlights Effect */}
      <spotLight 
        position={[0, 8, 2]} 
        angle={0.3} 
        penumbra={0.5} 
        intensity={hovered ? 1.5 : 0.8} 
        color={color}
        target={meshRef.current || undefined}
        castShadow
      />
    </group>
  );
};
