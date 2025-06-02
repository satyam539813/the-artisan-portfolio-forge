
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { WaterShader } from "@/components/3d/WaterShader";
import { FloatingText } from "@/components/3d/FloatingText";
import { Suspense, useState, useEffect } from "react";
import { Html, Environment } from "@react-three/drei";

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-black via-purple-950/20 to-black">
      {/* 3D Water Shader Background */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ 
            position: [0, 0, 5], 
            fov: 75,
            near: 0.1,
            far: 1000
          }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
            <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ec4899" />
            
            <WaterShader mousePosition={mousePosition} />
            <FloatingText 
              text="Satyam Kumar" 
              position={[0, 1, 2]} 
              mousePosition={mousePosition}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <span className="inline-block px-6 py-3 glass-effect rounded-full text-lg font-medium text-cyan-300 border border-cyan-500/30">
              ✨ 3D Product Designer & Frontend Developer
            </span>
          </motion.div>
          
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }}
          >
            <span className="block text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text animate-pulse">
              Digital
            </span>
            <span className="block text-white/90 font-light">
              Architect
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            Crafting immersive digital experiences where 
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text font-medium"> cutting-edge technology</span> meets 
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text font-medium"> artistic vision</span>
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            <motion.a
              href="#projects"
              className="group relative px-8 py-4 glass-effect rounded-full text-white font-medium text-lg overflow-hidden transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Explore My Universe</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
            
            <motion.a
              href="#contact"
              className="group px-8 py-4 border border-white/20 rounded-full text-gray-300 hover:text-white font-medium text-lg transition-all duration-300 hover:border-cyan-400/50"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                Connect With Me
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-400">Scroll to explore</span>
            <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-transparent rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
