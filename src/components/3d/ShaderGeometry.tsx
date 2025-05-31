
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export const ShaderGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const geometry = useMemo(() => new THREE.SphereGeometry(1.5, 64, 64), []);

  // Create shader material with useMemo to prevent recreation
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        uniform float time;
        uniform float intensity;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 newPosition = position;
          newPosition.z += sin(newPosition.x * 4.0 + time) * intensity;
          newPosition.z += cos(newPosition.y * 4.0 + time * 0.5) * intensity;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 colorA;
        uniform vec3 colorB;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vec2 uv = vUv;
          
          float wave = sin(uv.x * 10.0 + time) * cos(uv.y * 10.0 + time * 0.5);
          vec3 color = mix(colorA, colorB, wave * 0.5 + 0.5);
          
          float alpha = 0.8 + sin(time + uv.x * 5.0) * 0.2;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      uniforms: {
        time: { value: 0 },
        intensity: { value: 0.1 },
        colorA: { value: new THREE.Color(0.5, 0.3, 1.0) },
        colorB: { value: new THREE.Color(1.0, 0.3, 0.8) }
      },
      transparent: true,
      side: THREE.DoubleSide
    });
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <>
      <Environment preset="city" />
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={meshRef} geometry={geometry} material={shaderMaterial}>
          <primitive object={shaderMaterial} ref={materialRef} attach="material" />
        </mesh>
      </Float>
      
      {/* Additional distorted sphere */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
        <mesh position={[2, 1, -1]} scale={0.7}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={0.8}
          />
        </mesh>
      </Float>
      
      {/* Ambient particles */}
      <Float speed={3} rotationIntensity={0.1} floatIntensity={1.2}>
        <mesh position={[-2, -1, 1]} scale={0.3}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial
            color="#ec4899"
            transparent
            opacity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>
    </>
  );
};
