
import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";

export const Work = () => {
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const [selectedWork, setSelectedWork] = useState<number | null>(null);

  const workProjects = [
    {
      title: "Neural Interface Dashboard",
      description: "Advanced AI-powered brain-computer interface visualization platform with real-time neural signal processing and intuitive gesture controls.",
      color: "#8b5cf6",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
      category: "AI & Machine Learning",
      techStack: ["React", "Three.js", "WebGL", "TensorFlow"],
      liveDemo: "#",
      github: "#"
    },
    {
      title: "Quantum Visualization Lab",
      description: "Interactive quantum mechanics simulation environment exploring quantum entanglement and superposition states through immersive 3D visualizations.",
      color: "#06b6d4",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop",
      category: "3D Visualization",
      techStack: ["Three.js", "WebGL", "Physics", "React"],
      liveDemo: "#",
      github: "#"
    },
    {
      title: "Digital DNA Explorer",
      description: "Comprehensive genetic data visualization platform analyzing DNA patterns and molecular structures with advanced algorithms.",
      color: "#ec4899",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop",
      category: "Data Visualization",
      techStack: ["React", "D3.js", "WebGL", "Bioinformatics"],
      liveDemo: "#",
      github: "#"
    },
    {
      title: "Cosmic Data Observatory",
      description: "Real-time space exploration tool for navigating galaxies and analyzing celestial phenomena using astronomical datasets.",
      color: "#10b981",
      imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop",
      category: "3D Visualization",
      techStack: ["Three.js", "React", "NASA APIs", "WebGL"],
      liveDemo: "#",
      github: "#"
    },
    {
      title: "Temporal Design Studio",
      description: "Revolutionary 4D temporal data manipulation interface for visualizing time-series data and predicting future trends.",
      color: "#f59e0b",
      imageUrl: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=400&h=250&fit=crop",
      category: "Web Development",
      techStack: ["React", "Three.js", "TensorFlow.js", "WebGL"],
      liveDemo: "#",
      github: "#"
    }
  ];

  return (
    <section id="work" className="relative min-h-screen bg-black py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
      
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
            className="inline-block px-6 py-3 glass-effect rounded-full text-sm font-medium text-violet-300 mb-8 border border-violet-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            🚀 Featured Projects
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="gradient-text">Selected</span>
            <br />
            <span className="text-white/90">Work</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            A collection of projects showcasing innovation in 3D visualization, web development, and interactive design
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {workProjects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative glass-effect rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-violet-400/50 transition-all duration-500"
              style={{
                transform: hoveredWork === index 
                  ? 'perspective(1000px) rotateX(2deg) rotateY(-2deg) scale(1.02)' 
                  : 'perspective(1000px) rotateX(1deg) rotateY(-1deg)',
                boxShadow: hoveredWork === index 
                  ? 'inset 0 2px 10px rgba(139, 92, 246, 0.3), 0 20px 40px rgba(0, 0, 0, 0.4)'
                  : 'inset 0 1px 5px rgba(255, 255, 255, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2)',
                height: '420px'
              }}
              onMouseEnter={() => setHoveredWork(index)}
              onMouseLeave={() => setHoveredWork(null)}
              onClick={() => setSelectedWork(index)}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Project Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ 
                    backgroundImage: `url(${project.imageUrl})`,
                    filter: 'brightness(0.8) contrast(1.1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-violet-300 border border-violet-500/30">
                    {project.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${
                  hoveredWork === index ? 'from-violet-500/20 to-purple-600/20 opacity-100' : 'opacity-0'
                }`} />
              </div>
              
              {/* Content */}
              <div className="p-5 h-[252px] flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3 flex-grow">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-white/5 text-gray-300 rounded text-xs border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 bg-white/5 text-gray-400 rounded text-xs border border-white/10">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  <button 
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm rounded-lg hover:from-violet-600 hover:to-purple-700 transition-all flex-1 justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.liveDemo, '_blank');
                    }}
                  >
                    <ExternalLink size={14} />
                    Demo
                  </button>
                  <button 
                    className="flex items-center gap-2 px-3 py-2 bg-white/5 text-white text-sm rounded-lg hover:bg-white/10 transition-all border border-white/10 flex-1 justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.github, '_blank');
                    }}
                  >
                    <Github size={14} />
                    Code
                  </button>
                </div>
              </div>
              
              {/* Subtle Inner Glow */}
              <div className={`absolute inset-[1px] rounded-2xl transition-all duration-500 pointer-events-none ${
                hoveredWork === index 
                  ? 'shadow-[inset_0_0_20px_rgba(139,92,246,0.1)]' 
                  : 'shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]'
              }`} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedWork !== null && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedWork(null)}
        >
          <motion.div
            className="glass-effect p-8 rounded-2xl border border-white/20 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-bold gradient-text mb-2">
                  {workProjects[selectedWork].title}
                </h3>
                <span className="text-violet-300 text-sm">
                  {workProjects[selectedWork].category}
                </span>
              </div>
              <button
                onClick={() => setSelectedWork(null)}
                className="text-white/60 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div 
              className="w-full h-64 rounded-xl mb-6 bg-cover bg-center"
              style={{ backgroundImage: `url(${workProjects[selectedWork].imageUrl})` }}
            />
            
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              {workProjects[selectedWork].description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {workProjects[selectedWork].techStack.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex gap-4">
              <button
                className="flex items-center gap-2 flex-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all duration-300 justify-center"
                onClick={() => window.open(workProjects[selectedWork].liveDemo, '_blank')}
              >
                <ExternalLink size={18} />
                View Live Project
              </button>
              <button
                className="flex items-center gap-2 flex-1 bg-white/5 text-white py-3 px-6 rounded-xl hover:bg-white/10 transition-all border border-white/10 justify-center"
                onClick={() => window.open(workProjects[selectedWork].github, '_blank')}
              >
                <Github size={18} />
                View Code
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
