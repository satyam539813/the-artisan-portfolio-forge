
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import * as THREE from "three";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  category: string;
}

interface ProjectGallery3DProps {
  projects: Project[];
  hoveredProject: number | null;
  onHover: (index: number | null) => void;
  onSelect: (index: number | null) => void;
}

export const ProjectGallery3D = ({ 
  projects, 
  hoveredProject, 
  onHover, 
  onSelect 
}: ProjectGallery3DProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle group rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => (
        <ProjectCard3D
          key={project.id}
          project={project}
          index={index}
          isHovered={hoveredProject === index}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
};

interface ProjectCard3DProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  onSelect: (index: number | null) => void;
}

const ProjectCard3D = ({ 
  project, 
  index, 
  isHovered, 
  onHover, 
  onSelect 
}: ProjectCard3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const frameRef = useRef<THREE.Mesh>(null);
  
  const angle = (index / 5) * Math.PI * 2;
  const radius = 8;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = Math.sin(index + Date.now() * 0.001) * 0.5;

  useFrame((state) => {
    if (meshRef.current && frameRef.current) {
      // Floating animation
      const baseY = Math.sin(state.clock.elapsedTime * 0.5 + index * 2) * 0.3;
      meshRef.current.position.y = baseY;
      frameRef.current.position.y = baseY;
      
      // Face towards center
      meshRef.current.lookAt(0, baseY, 0);
      frameRef.current.lookAt(0, baseY, 0);
      
      // Hover effects
      const targetScale = isHovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Gentle rotation
      if (isHovered) {
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      }
    }
  });

  return (
    <group position={[x, y, z]}>
      {/* Frame */}
      <mesh 
        ref={frameRef}
        castShadow 
        receiveShadow
        onPointerEnter={() => onHover(index)}
        onPointerLeave={() => onHover(null)}
        onClick={() => onSelect(index)}
      >
        <boxGeometry args={[4, 5, 0.3]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          emissive={isHovered ? "#4c1d95" : "#000000"}
          emissiveIntensity={isHovered ? 0.3 : 0}
        />
      </mesh>
      
      {/* Screen */}
      <mesh 
        ref={meshRef}
        position={[0, 0, 0.16]} 
        castShadow
        onPointerEnter={() => onHover(index)}
        onPointerLeave={() => onHover(null)}
        onClick={() => onSelect(index)}
      >
        <planeGeometry args={[3.5, 4.5]} />
        <meshStandardMaterial 
          color="#000000"
          transparent
          opacity={0.9}
        >
          <primitive attach="map" object={new THREE.TextureLoader().load(project.image)} />
        </meshStandardMaterial>
      </mesh>
      
      {/* Title */}
      <Text
        position={[0, -2.8, 0.2]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
      >
        {project.title}
      </Text>
      
      {/* Category Tag */}
      <Text
        position={[0, 2.3, 0.2]}
        fontSize={0.12}
        color="#06b6d4"
        anchorX="center"
        anchorY="middle"
      >
        {project.category}
      </Text>
      
      {/* Hover Info Panel */}
      {isHovered && (
        <Html
          position={[0, 0, 0.5]}
          center
          distanceFactor={10}
          transform
          sprite
        >
          <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-xl p-4 max-w-xs text-center">
            <h3 className="text-white font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 justify-center mb-3">
              {project.tech.slice(0, 3).map((tech) => (
                <span 
                  key={tech}
                  className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
            <button 
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(index);
              }}
            >
              Explore Project
            </button>
          </div>
        </Html>
      )}
      
      {/* Ambient lighting for each card */}
      <pointLight 
        position={[0, 0, 2]} 
        intensity={isHovered ? 0.5 : 0.2} 
        color={isHovered ? "#06b6d4" : "#8b5cf6"}
        distance={8}
      />
    </group>
  );
};
