
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { WorkPortalCard } from "@/components/3d/WorkPortalCard";
import { Suspense, useState, useEffect } from "react";
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";

export const Work = () => {
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const [selectedWork, setSelectedWork] = useState<number | null>(null);
  
  useEffect(() => {
    // Enhanced floating animations
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
      const el = element as HTMLElement;
      el.style.animation = `float 6s ease-in-out infinite`;
      el.style.animationDelay = `${index * 1.2}s`;
    });
  }, []);

  const workProjects = [
    {
      title: "Neural Interface",
      description: "Advanced AI-powered brain-computer interface visualization platform. Features real-time neural signal processing, 3D brain mapping, and intuitive gesture controls for seamless human-computer interaction.",
      color: "#8b5cf6",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      liveDemo: "https://neural-interface.demo.com",
      techStack: ["React", "Three.js", "WebGL", "AI/ML"]
    },
    {
      title: "Quantum Portal",
      description: "Interactive quantum mechanics simulation environment. Explore quantum entanglement, superposition states, and wave-particle duality through immersive 3D visualizations and real-time calculations.",
      color: "#06b6d4",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      liveDemo: "https://quantum-portal.demo.com",
      techStack: ["Three.js", "WebGL", "Physics", "React"]
    },
    {
      title: "Digital Genome",
      description: "Comprehensive DNA sequencing data visualization platform. Analyze genetic patterns, mutations, and evolutionary relationships through interactive 3D molecular structures and advanced algorithms.",
      color: "#ec4899",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      liveDemo: "https://digital-genome.demo.com",
      techStack: ["React", "D3.js", "WebGL", "Bioinformatics"]
    },
    {
      title: "Space Explorer",
      description: "Real-time cosmic data exploration and visualization tool. Navigate through galaxies, analyze celestial phenomena, and discover exoplanets using cutting-edge astronomical datasets and 3D rendering.",
      color: "#10b981",
      imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      liveDemo: "https://space-explorer.demo.com",
      techStack: ["Three.js", "React", "NASA APIs", "WebGL"]
    },
    {
      title: "Time Sculptor",
      description: "Revolutionary 4D temporal data manipulation interface. Visualize time-series data across multiple dimensions, predict future trends, and manipulate temporal sequences with intuitive controls.",
      color: "#f59e0b",
      imageUrl: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
      liveDemo: "https://time-sculptor.demo.com",
      techStack: ["React", "Three.js", "TensorFlow.js", "WebGL"]
    }
  ];

  return (
    <>
      <section id="work" className="relative min-h-screen bg-black overflow-hidden">
        {/* Immersive Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(139,92,246,0.1)_0%,_transparent_50%)]" />
        
        {/* Enhanced floating particles */}
        <div className="floating-element absolute top-20 left-12 w-32 h-32 bg-gradient-to-r from-violet-500/30 to-purple-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="floating-element absolute bottom-32 right-16 w-40 h-40 bg-gradient-to-r from-pink-500/30 to-rose-600/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="floating-element absolute top-1/3 left-1/5 w-24 h-24 bg-gradient-to-r from-blue-500/30 to-cyan-600/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}} />
        <div className="floating-element absolute bottom-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-emerald-500/30 to-teal-600/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '6s'}} />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10 py-20">
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block px-8 py-4 glass-effect rounded-full text-sm font-medium text-violet-300 mb-8 border border-violet-500/30"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              ✨ Immersive 3D Gallery Experience
            </motion.div>
            
            <h2 className="text-6xl md:text-8xl font-playfair font-bold mb-8 leading-tight">
              <span className="gradient-text">Interactive</span>
              <br />
              <span className="text-white/90">Gallery</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-5xl mx-auto font-inter leading-relaxed">
              Step into an immersive 3D exhibition space where each project exists as a floating gallery piece. 
              Navigate through space, interact with projects, and explore detailed insights in a museum-like experience.
            </p>
          </motion.div>

          {/* Immersive 3D Gallery Canvas */}
          <div className="relative h-[80vh] w-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-black/50 to-purple-950/20 backdrop-blur-sm">
            {/* 3D Scene Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 z-10 pointer-events-none" />
            
            <Canvas 
              camera={{ 
                position: [0, 0, 20], 
                fov: 50,
                near: 0.1,
                far: 1000
              }}
              gl={{ 
                antialias: true, 
                alpha: true,
                powerPreference: "high-performance",
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.0
              }}
              style={{ background: 'transparent' }}
              shadows
            >
              <Suspense fallback={null}>
                {/* Enhanced Environment */}
                <Environment preset="night" />
                <fog attach="fog" args={['#000000', 25, 80]} />
                
                {/* Museum-like lighting setup */}
                <ambientLight intensity={0.4} color="#4c1d95" />
                <directionalLight 
                  position={[10, 20, 10]} 
                  intensity={1.2} 
                  color="#ffffff"
                  castShadow
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                  shadow-camera-far={50}
                  shadow-camera-left={-20}
                  shadow-camera-right={20}
                  shadow-camera-top={20}
                  shadow-camera-bottom={-20}
                />
                
                {/* Gallery spot lights */}
                <spotLight 
                  position={[-15, 15, 10]} 
                  angle={0.4} 
                  penumbra={0.5} 
                  intensity={0.8} 
                  color="#8b5cf6"
                  castShadow
                />
                <spotLight 
                  position={[15, 15, 10]} 
                  angle={0.4} 
                  penumbra={0.5} 
                  intensity={0.8} 
                  color="#ec4899"
                  castShadow
                />
                <spotLight 
                  position={[0, 25, -10]} 
                  angle={0.6} 
                  penumbra={0.8} 
                  intensity={0.6} 
                  color="#06b6d4"
                  castShadow
                />
                
                {/* Gallery floor with contact shadows */}
                <ContactShadows 
                  position={[0, -12, 0]} 
                  opacity={0.6} 
                  scale={80} 
                  blur={2} 
                  far={20} 
                  color="#8b5cf6" 
                />
                
                {/* Interactive Camera Controls */}
                <OrbitControls 
                  enableZoom={true} 
                  enablePan={true} 
                  enableRotate={true}
                  autoRotate={true}
                  autoRotateSpeed={0.3}
                  minDistance={15}
                  maxDistance={35}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI - Math.PI / 6}
                  dampingFactor={0.05}
                  enableDamping={true}
                />
                
                {/* 3D Gallery Project Cards */}
                {workProjects.map((project, index) => (
                  <WorkPortalCard
                    key={index}
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                    title={project.title}
                    description={project.description}
                    color={project.color}
                    index={index}
                    hovered={hoveredWork === index}
                    imageUrl={project.imageUrl}
                    onHover={(isHovered) => setHoveredWork(isHovered ? index : null)}
                    onClick={() => setSelectedWork(index)}
                  />
                ))}
                
                {/* Gallery Environment Elements */}
                <mesh position={[0, -15, 0]} receiveShadow>
                  <planeGeometry args={[100, 100]} />
                  <meshStandardMaterial 
                    color="#0a0a0a" 
                    roughness={0.8} 
                    metalness={0.1}
                    transparent
                    opacity={0.8}
                  />
                </mesh>
              </Suspense>
            </Canvas>
            
            {/* Interactive Navigation Hints */}
            <div className="absolute bottom-6 left-6 text-white/60 text-sm z-20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
                <span>Drag to orbit • Scroll to zoom • Click cards for details</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                <span>Auto-rotation enabled • Right-click to pan</span>
              </div>
            </div>
          </div>
          
          {/* Project Details Modal */}
          {selectedWork !== null && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWork(null)}
            >
              <motion.div
                className="glass-effect p-8 rounded-2xl border border-white/20 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-bold gradient-text">
                    {workProjects[selectedWork].title}
                  </h3>
                  <button
                    onClick={() => setSelectedWork(null)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                <div 
                  className="w-full h-48 rounded-xl mb-6 bg-cover bg-center"
                  style={{ backgroundImage: `url(${workProjects[selectedWork].imageUrl})` }}
                />
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {workProjects[selectedWork].description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {workProjects[selectedWork].techStack.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <button
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-3 rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all duration-300"
                  onClick={() => window.open(workProjects[selectedWork].liveDemo, '_blank')}
                >
                  View Live Demo
                </button>
              </motion.div>
            </motion.div>
          )}
          
          {/* Enhanced Project Grid Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-7xl mx-auto mt-12">
            {workProjects.map((project, index) => (
              <motion.div
                key={index}
                className="group relative glass-effect p-6 rounded-2xl border border-white/10 cursor-pointer hover:border-violet-400/60 transition-all duration-500 bg-gradient-to-br from-white/5 to-white/[0.02]"
                onMouseEnter={() => setHoveredWork(index)}
                onMouseLeave={() => setHoveredWork(null)}
                onClick={() => setSelectedWork(index)}
                whileHover={{ scale: 1.05, y: -10 }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Project Image */}
                <div 
                  className="w-full h-24 rounded-xl mb-4 bg-cover bg-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    hoveredWork === index ? 'from-violet-500/30 to-purple-600/30' : 'from-transparent to-transparent'
                  } transition-all duration-500`} />
                </div>
                
                {/* Project Info */}
                <h3 className="text-white font-space font-semibold text-base mb-3 group-hover:text-violet-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                  {project.description.split('.')[0]}.
                </p>
                
                {/* Status and Indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-violet-400 font-medium">3D Interactive</span>
                  <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    hoveredWork === index ? 'bg-violet-400 shadow-lg shadow-violet-400/50' : 'bg-gray-600'
                  }`} />
                </div>
                
                {/* Hover Progress Bar */}
                <div className={`mt-4 h-1 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-500 ${
                  hoveredWork === index ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`} />
                
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                  hoveredWork === index ? 'shadow-2xl shadow-violet-500/20 bg-gradient-to-br from-violet-500/5 to-purple-600/5' : ''
                }`} />
              </motion.div>
            ))}
          </div>
          
          {/* Enhanced Instructions */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 glass-effect px-6 py-3 rounded-full">
              <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full animate-pulse" />
              <p className="text-gray-300 text-sm font-inter">
                Navigate the 3D gallery • Hover and click for detailed exploration
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-20px) rotate(1deg) scale(1.05); }
          50% { transform: translateY(-35px) rotate(0deg) scale(1.1); }
          75% { transform: translateY(-20px) rotate(-1deg) scale(1.05); }
        }
      `}</style>
    </>
  );
};
