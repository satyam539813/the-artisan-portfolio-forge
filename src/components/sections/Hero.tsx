
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { WaterShader } from "@/components/3d/WaterShader";
import { FloatingText } from "@/components/3d/FloatingText";
import { Suspense, useState, useEffect } from "react";
import { OrbitControls, Environment } from "@react-three/drei";

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ 
            position: [0, 2, 8], 
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
            <fog attach="fog" args={['#000000', 10, 50]} />
            
            {/* Lighting */}
            <ambientLight intensity={0.4} color="#1e1b4b" />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, 5, -10]} intensity={0.5} color="#8b5cf6" />
            <pointLight position={[10, -5, 10]} intensity={0.5} color="#06b6d4" />
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              enableRotate={false}
              autoRotate={false}
            />
            
            <WaterShader mousePosition={mousePosition} />
            <FloatingText />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <span className="gradient-text">Hi, I'm</span>
            <br />
            <span className="text-white">Satyam Kumar</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            3D Product Designer & Frontend Developer crafting immersive digital experiences
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              View My Work
            </button>
            <button className="px-8 py-4 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-300">
              Get In Touch
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2">Scroll to Explore</span>
            <motion.div
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 pointer-events-none" />
    </section>
  );
};
