
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { WorkPortalCard } from "@/components/3d/WorkPortalCard";
import { Suspense, useState, useEffect } from "react";

export const Work = () => {
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  
  useEffect(() => {
    // Enhanced floating animations
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
      const el = element as HTMLElement;
      el.style.animation = `float 4s ease-in-out infinite`;
      el.style.animationDelay = `${index * 0.8}s`;
    });
  }, []);

  const workProjects = [
    {
      title: "Neural Interface",
      description: "Advanced AI-powered brain-computer interface visualization platform. Features real-time neural signal processing, 3D brain mapping, and intuitive gesture controls for seamless human-computer interaction.",
      color: "#8b5cf6",
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      title: "Quantum Portal",
      description: "Interactive quantum mechanics simulation environment. Explore quantum entanglement, superposition states, and wave-particle duality through immersive 3D visualizations and real-time calculations.",
      color: "#06b6d4",
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      title: "Digital Genome",
      description: "Comprehensive DNA sequencing data visualization platform. Analyze genetic patterns, mutations, and evolutionary relationships through interactive 3D molecular structures and advanced algorithms.",
      color: "#ec4899",
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      title: "Space Explorer",
      description: "Real-time cosmic data exploration and visualization tool. Navigate through galaxies, analyze celestial phenomena, and discover exoplanets using cutting-edge astronomical datasets and 3D rendering.",
      color: "#10b981",
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    {
      title: "Time Sculptor",
      description: "Revolutionary 4D temporal data manipulation interface. Visualize time-series data across multiple dimensions, predict future trends, and manipulate temporal sequences with intuitive controls.",
      color: "#f59e0b",
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      imageUrl: "https://images.unsplash.com/photo-1527576539890-dfa815648363"
    }
  ];

  return (
    <>
      <section id="work" className="py-20 md:py-32 bg-gradient-to-b from-black via-purple-950/10 to-black relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        
        {/* Enhanced floating elements with better spacing */}
        <div className="floating-element absolute top-16 left-8 w-20 h-20 bg-gradient-to-r from-violet-500/40 to-purple-600/40 rounded-full blur-xl" />
        <div className="floating-element absolute bottom-24 right-12 w-24 h-24 bg-gradient-to-r from-pink-500/40 to-rose-600/40 rounded-full blur-2xl" />
        <div className="floating-element absolute top-1/3 left-1/5 w-16 h-16 bg-gradient-to-r from-blue-500/40 to-cyan-600/40 rounded-full blur-lg" />
        <div className="floating-element absolute bottom-1/3 right-1/4 w-18 h-18 bg-gradient-to-r from-emerald-500/40 to-teal-600/40 rounded-full blur-xl" />
        
        {/* Enhanced 3D Canvas with better camera positioning */}
        <div className="work-canvas absolute inset-0 opacity-90">
          <Canvas camera={{ position: [0, 2, 10], fov: 65 }}>
            <Suspense fallback={null}>
              {/* Enhanced lighting setup */}
              <ambientLight intensity={0.6} />
              <pointLight position={[15, 15, 15]} intensity={1.2} color="#ffffff" />
              <pointLight position={[-15, -10, 10]} intensity={0.8} color="#8b5cf6" />
              <spotLight position={[0, 20, 0]} angle={0.3} penumbra={0.5} intensity={0.7} color="#06b6d4" />
              
              {workProjects.map((project, index) => (
                <WorkPortalCard
                  key={index}
                  position={project.position}
                  rotation={project.rotation}
                  title={project.title}
                  description={project.description}
                  color={project.color}
                  index={index}
                  hovered={hoveredWork === index}
                  imageUrl={project.imageUrl}
                />
              ))}
            </Suspense>
          </Canvas>
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="work-title">
              <motion.div
                className="inline-block px-6 py-3 glass-effect rounded-full text-sm font-medium text-violet-300 mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Featured Work
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 md:mb-8">
                <span className="gradient-text">Portal</span>
                <br />
                <span className="text-white/90">Projects</span>
              </h2>
            </div>
            
            <p className="work-subtitle text-lg md:text-xl text-gray-300 max-w-4xl mx-auto font-inter leading-relaxed px-4">
              Journey through dimensional gateways showcasing cutting-edge digital experiences 
              that blur the boundaries between reality and imagination. Hover over the rotating cards to explore each project.
            </p>
          </motion.div>

          {/* Interactive project navigation */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto px-4">
            {workProjects.map((project, index) => (
              <motion.div
                key={index}
                className="glass-effect p-3 md:p-4 rounded-xl border border-white/10 cursor-pointer hover:border-violet-400/60 transition-all duration-500 group"
                onMouseEnter={() => setHoveredWork(index)}
                onMouseLeave={() => setHoveredWork(null)}
                whileHover={{ scale: 1.05, y: -8 }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div 
                  className="w-full h-16 md:h-20 rounded-lg mb-3 bg-cover bg-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/30 backdrop-blur-sm" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <h3 className="text-white font-space font-medium text-xs md:text-sm mb-1 group-hover:text-violet-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                  {project.description.split('.')[0]}...
                </p>
                
                {/* Hover indicator */}
                <div className={`mt-2 h-1 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-500 ${
                  hoveredWork === index ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`} />
              </motion.div>
            ))}
          </div>
          
          {/* Instructions */}
          <motion.div
            className="text-center mt-12 md:mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-sm font-inter">
              Hover over the cards below to explore each project in 3D space
            </p>
          </motion.div>
        </div>
      </section>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(2deg); }
          50% { transform: translateY(-25px) rotate(0deg); }
          75% { transform: translateY(-15px) rotate(-2deg); }
        }
      `}</style>
    </>
  );
};
