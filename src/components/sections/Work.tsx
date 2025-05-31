
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { WorkPortalCard } from "@/components/3d/WorkPortalCard";
import { Suspense, useState, useEffect } from "react";

export const Work = () => {
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  
  useEffect(() => {
    // Simple animations without external libraries
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
      const el = element as HTMLElement;
      el.style.animation = `float 3s ease-in-out infinite`;
      el.style.animationDelay = `${index * 0.5}s`;
    });
  }, []);

  const workProjects = [
    {
      title: "Neural Interface",
      description: "AI-powered brain-computer interface visualization",
      color: "#8b5cf6",
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number]
    },
    {
      title: "Quantum Portal",
      description: "Interactive quantum mechanics simulation",
      color: "#06b6d4",
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number]
    },
    {
      title: "Digital Genome",
      description: "DNA sequencing data visualization platform",
      color: "#ec4899",
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number]
    },
    {
      title: "Space Explorer",
      description: "Real-time cosmic data exploration tool",
      color: "#10b981",
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number]
    },
    {
      title: "Time Sculptor",
      description: "4D temporal data manipulation interface",
      color: "#f59e0b",
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number]
    }
  ];

  return (
    <section id="work" className="py-32 bg-gradient-to-b from-black via-purple-950/10 to-black relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      
      {/* Floating elements */}
      <div className="floating-element absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-violet-500/30 to-purple-600/30 rounded-full blur-lg" />
      <div className="floating-element absolute bottom-32 right-16 w-20 h-20 bg-gradient-to-r from-pink-500/30 to-rose-600/30 rounded-full blur-xl" />
      <div className="floating-element absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-r from-blue-500/30 to-cyan-600/30 rounded-full blur-md" />
      
      {/* 3D Canvas with portal cards */}
      <div className="work-canvas absolute inset-0 opacity-80">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
            
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
              />
            ))}
          </Suspense>
        </Canvas>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="work-title">
            <motion.div
              className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-medium text-violet-300 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Featured Work
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-playfair font-bold mb-8">
              <span className="gradient-text">Portal</span>
              <br />
              <span className="text-white/90">Projects</span>
            </h2>
          </div>
          
          <p className="work-subtitle text-xl text-gray-300 max-w-4xl mx-auto font-inter leading-relaxed">
            Journey through dimensional gateways showcasing cutting-edge digital experiences 
            that blur the boundaries between reality and imagination.
          </p>
        </motion.div>

        {/* Interactive project list */}
        <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {workProjects.map((project, index) => (
            <motion.div
              key={index}
              className="glass-effect p-4 rounded-xl border border-white/10 cursor-pointer hover:border-violet-400/50 transition-all duration-300"
              onMouseEnter={() => setHoveredWork(index)}
              onMouseLeave={() => setHoveredWork(null)}
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div 
                className="w-full h-20 rounded-lg mb-3"
                style={{ background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)` }}
              />
              <h3 className="text-white font-space font-medium text-sm mb-1">{project.title}</h3>
              <p className="text-gray-400 text-xs">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};
