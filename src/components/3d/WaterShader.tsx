
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WaterShaderProps {
  mousePosition: { x: number; y: number };
}

export const WaterShader = ({ mousePosition }: WaterShaderProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        uniform vec2 mouse;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 newPosition = position;
          
          // Water waves
          float wave1 = sin(newPosition.x * 4.0 + time * 2.0) * 0.1;
          float wave2 = cos(newPosition.y * 3.0 + time * 1.5) * 0.08;
          float wave3 = sin(newPosition.x * 2.0 + newPosition.y * 2.0 + time * 3.0) * 0.05;
          
          // Mouse interaction ripples
          float mouseDistance = distance(newPosition.xy, mouse * 5.0);
          float ripple = sin(mouseDistance * 8.0 - time * 6.0) * exp(-mouseDistance * 0.5) * 0.3;
          
          newPosition.z += wave1 + wave2 + wave3 + ripple;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 mouse;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vec2 uv = vUv - 0.5;
          float dist = length(uv);
          
          // Water color gradients
          vec3 color1 = vec3(0.1, 0.2, 0.4); // Deep blue
          vec3 color2 = vec3(0.3, 0.6, 0.9); // Light blue
          vec3 color3 = vec3(0.0, 0.8, 0.8); // Cyan
          
          // Dynamic color mixing
          float colorMix1 = sin(dist * 10.0 + time * 2.0) * 0.5 + 0.5;
          float colorMix2 = cos(uv.x * 8.0 + time * 1.5) * 0.5 + 0.5;
          
          vec3 finalColor = mix(color1, color2, colorMix1);
          finalColor = mix(finalColor, color3, colorMix2 * 0.6);
          
          // Mouse interaction glow
          float mouseDistance = distance(uv, mouse * 0.5);
          float glow = exp(-mouseDistance * 8.0) * 0.8;
          finalColor += vec3(0.4, 0.2, 0.8) * glow;
          
          // Ripple effects
          float ripples = sin(dist * 20.0 - time * 4.0) * 0.1 + 0.9;
          finalColor *= ripples;
          
          // Transparency
          float alpha = 0.8 - dist * 0.3;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(mousePosition.x, mousePosition.y) }
      },
      transparent: true,
      side: THREE.DoubleSide
    });
  }, []);

  useFrame((state) => {
    if (shaderMaterial.uniforms) {
      shaderMaterial.uniforms.time.value = state.clock.elapsedTime;
      shaderMaterial.uniforms.mouse.value.set(mousePosition.x, mousePosition.y);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20, 64, 64]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};
