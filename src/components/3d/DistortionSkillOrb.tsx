
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DistortionSkillOrbProps {
  position: [number, number, number];
  color: string;
  skill: string;
  hovered: boolean;
  index: number;
}

export const DistortionSkillOrb = ({ position, color, skill, hovered, index }: DistortionSkillOrbProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Advanced distortion shader
  const distortionMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        uniform float time;
        uniform float hovered;
        uniform float mouseX;
        uniform float mouseY;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vNormal = normal;
          vPosition = position;
          
          vec3 newPosition = position;
          
          // Base wave distortion
          float wave1 = sin(newPosition.x * 4.0 + time * 2.0) * 0.1;
          float wave2 = cos(newPosition.y * 3.0 + time * 1.5) * 0.1;
          float wave3 = sin(newPosition.z * 5.0 + time * 2.5) * 0.1;
          
          // Mouse interaction distortion
          float mouseInfluence = hovered * 0.3;
          newPosition.x += wave1 * mouseInfluence;
          newPosition.y += wave2 * mouseInfluence;
          newPosition.z += wave3 * mouseInfluence;
          
          // Pulsing effect
          float pulse = sin(time * 3.0) * 0.05 * hovered;
          newPosition *= (1.0 + pulse);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float hovered;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vec3 baseColor = color;
          
          // Fresnel effect
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          
          // Noise pattern
          float noise = sin(vPosition.x * 10.0 + time) * cos(vPosition.y * 10.0 + time) * 0.1;
          
          // Color shifting based on hover
          vec3 hoverColor = mix(baseColor, vec3(1.0, 0.5, 1.0), hovered * 0.5);
          
          // Add fresnel glow
          vec3 finalColor = mix(hoverColor, vec3(1.0), fresnel * 0.3);
          finalColor += noise * 0.2;
          
          // Pulsing alpha
          float alpha = 0.8 + sin(time * 4.0) * 0.2 * hovered;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        hovered: { value: hovered ? 1.0 : 0.0 },
        mouseX: { value: 0 },
        mouseY: { value: 0 }
      },
      transparent: true,
      side: THREE.DoubleSide
    });
  }, [color, hovered]);

  useFrame((state) => {
    if (meshRef.current) {
      // Complex rotation patterns
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7 + index) * 0.3;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5 + index * 0.5) * 0.3;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3 + index * 0.7) * 0.2;
      
      // Floating animation with unique patterns
      const floatOffset = Math.sin(state.clock.elapsedTime * 1.5 + index * 2) * 0.3;
      meshRef.current.position.y = position[1] + floatOffset;
      
      // Scale based on hover with elastic effect
      const targetScale = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
    
    // Update shader uniforms
    if (distortionMaterial.uniforms) {
      distortionMaterial.uniforms.time.value = state.clock.elapsedTime;
      distortionMaterial.uniforms.hovered.value = hovered ? 1.0 : 0.0;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 64, 64]} />
      <primitive object={distortionMaterial} attach="material" />
    </mesh>
  );
};
