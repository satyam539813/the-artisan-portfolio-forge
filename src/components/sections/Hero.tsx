
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ShaderGeometry } from "@/components/3d/ShaderGeometry";
import { Suspense } from "react";

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-purple-950/20 to-black">
      {/* Animated background mesh */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          className="w-full h-full"
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <ShaderGeometry />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-rose-600/20 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-full blur-md animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-medium text-violet-300 mb-6">
              ✨ Creative Developer & Designer
            </span>
          </motion.div>
          
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-playfair font-bold mb-8 leading-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <span className="block text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text animate-gradient-shift">
              Creative
            </span>
            <span className="block text-white font-space font-light mix-blend-difference bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-pulse">
              Developer
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-inter font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Crafting immersive digital experiences through the fusion of 
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text font-medium"> cutting-edge technology</span> and 
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text font-medium"> artistic vision</span>
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.a
              href="#work"
              className="group relative px-8 py-4 glass-effect rounded-full text-white font-medium text-lg overflow-hidden transition-all duration-300 hover:scale-105"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Explore My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </motion.a>
            
            <motion.a
              href="#contact"
              className="group px-8 py-4 border border-white/20 rounded-full text-gray-300 hover:text-white font-medium text-lg transition-all duration-300 hover:border-violet-400/50 hover:bg-white/5 hover:scale-105"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                Let's Connect
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </motion.a>
          </motion.div>
          
          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <div className="flex space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text font-space">5+</div>
                <div className="text-sm text-gray-400 font-inter">Years Experience</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text font-space">50+</div>
                <div className="text-sm text-gray-400 font-inter">Projects Delivered</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text font-space">3</div>
                <div className="text-sm text-gray-400 font-inter">Design Disciplines</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400 font-inter">Scroll to explore</span>
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-violet-400 to-transparent rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
