
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { ProjectGallery3D } from "@/components/3d/ProjectGallery3D";
import { Suspense, useState } from "react";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Neural Interface Dashboard",
      description: "Advanced AI-powered brain-computer interface visualization platform with real-time neural signal processing.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      tech: ["React", "Three.js", "WebGL", "AI/ML"],
      liveUrl: "#",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Quantum Visualization Lab",
      description: "Interactive quantum mechanics simulation environment exploring quantum entanglement and superposition states.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      tech: ["Three.js", "WebGL", "Physics", "React"],
      liveUrl: "#",
      category: "3D Visualization"
    },
    {
      id: 3,
      title: "Digital DNA Explorer",
      description: "Comprehensive genetic data visualization platform with interactive 3D molecular structures.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      tech: ["React", "D3.js", "WebGL", "Biology"],
      liveUrl: "#",
      category: "Data Visualization"
    },
    {
      id: 4,
      title: "Cosmic Data Observatory",
      description: "Real-time space exploration and celestial phenomena visualization using astronomical datasets.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      tech: ["Three.js", "React", "NASA APIs", "WebGL"],
      liveUrl: "#",
      category: "3D Visualization"
    },
    {
      id: 5,
      title: "Temporal Design Studio",
      description: "Revolutionary 4D design manipulation interface for time-series data visualization and prediction.",
      image: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
      tech: ["React", "Three.js", "TensorFlow.js", "WebGL"],
      liveUrl: "#",
      category: "Web Development"
    }
  ];

  return (
    <section id="projects" className="relative min-h-screen bg-black py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block px-6 py-3 glass-effect rounded-full text-sm font-medium text-cyan-300 mb-8 border border-cyan-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            🚀 Interactive Project Gallery
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="gradient-text">Digital</span>
            <br />
            <span className="text-white/90">Creations</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Step into an immersive 3D gallery showcasing cutting-edge projects that push the boundaries of technology and design
          </p>
        </motion.div>

        {/* 3D Gallery */}
        <div className="relative h-[80vh] w-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-black/50 to-purple-950/20 backdrop-blur-sm mb-12">
          <Canvas 
            camera={{ 
              position: [0, 0, 15], 
              fov: 60,
              near: 0.1,
              far: 1000
            }}
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance"
            }}
            shadows
          >
            <Suspense fallback={null}>
              <Environment preset="night" />
              <fog attach="fog" args={['#000000', 20, 60]} />
              
              {/* Lighting */}
              <ambientLight intensity={0.3} color="#4c1d95" />
              <directionalLight 
                position={[10, 20, 10]} 
                intensity={1} 
                color="#ffffff"
                castShadow
              />
              <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ec4899" />
              <pointLight position={[10, -10, 10]} intensity={0.5} color="#06b6d4" />
              
              <ContactShadows 
                position={[0, -8, 0]} 
                opacity={0.4} 
                scale={50} 
                blur={2} 
                far={15} 
                color="#8b5cf6" 
              />
              
              <OrbitControls 
                enableZoom={true} 
                enablePan={true} 
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={0.5}
                minDistance={10}
                maxDistance={25}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI - Math.PI / 6}
              />
              
              <ProjectGallery3D
                projects={projects}
                hoveredProject={hoveredProject}
                onHover={setHoveredProject}
                onSelect={setSelectedProject}
              />
            </Suspense>
          </Canvas>
          
          {/* Navigation Hints */}
          <div className="absolute bottom-6 left-6 text-white/60 text-sm z-20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span>Drag to orbit • Scroll to zoom • Click projects for details</span>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group glass-effect p-6 rounded-2xl border border-white/10 cursor-pointer hover:border-cyan-400/50 transition-all duration-500"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(index)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div 
                className="w-full h-48 rounded-xl mb-4 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-cyan-300 text-sm">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Click to explore</span>
                <div className="w-3 h-3 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject !== null && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="glass-effect p-8 rounded-2xl border border-white/20 max-w-2xl w-full"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-bold gradient-text">
                {projects[selectedProject].title}
              </h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-white/60 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div 
              className="w-full h-64 rounded-xl mb-6 bg-cover bg-center"
              style={{ backgroundImage: `url(${projects[selectedProject].image})` }}
            />
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              {projects[selectedProject].description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {projects[selectedProject].tech.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <button
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
              onClick={() => window.open(projects[selectedProject].liveUrl, '_blank')}
            >
              View Live Project
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
