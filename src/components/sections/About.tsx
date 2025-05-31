
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Canvas } from "@react-three/fiber";
import { Interactive3DCard } from "@/components/3d/Interactive3DCard";
import { FloatingOrb } from "@/components/3d/FloatingOrb";
import { Environment } from "@react-three/drei";
import { Suspense, useState } from "react";

export const About = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-black to-purple-950/10 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <Interactive3DCard 
              position={[-3, 2, -2]} 
              color="#8b5cf6" 
              hovered={hoveredCard === 0}
            />
            <Interactive3DCard 
              position={[3, -1, -1]} 
              color="#06b6d4" 
              hovered={hoveredCard === 1}
            />
            <Interactive3DCard 
              position={[-2, -2, -3]} 
              color="#ec4899" 
              hovered={hoveredCard === 2}
            />
            <FloatingOrb position={[4, 3, -2]} color="#8b5cf6" speed={1.2} />
            <FloatingOrb position={[-4, 1, -1]} color="#06b6d4" speed={0.8} />
            <FloatingOrb position={[2, -3, -2]} color="#ec4899" speed={1.5} />
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
          <motion.div
            className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-medium text-violet-300 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-playfair font-bold mb-8 gradient-text">
            Crafting Digital
            <br />
            <span className="text-white/90">Experiences</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto font-inter leading-relaxed">
            I'm a multidisciplinary creative professional who bridges the gap between 
            <span className="gradient-text font-medium"> imagination and reality</span> through code, design, and innovation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card 
              className="glass-effect border-white/10 overflow-hidden group hover:border-violet-400/30 transition-all duration-500"
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-xl">🎨</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-space">Creative Vision</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full" />
                  </div>
                </div>
                <p className="text-gray-300 font-inter leading-relaxed">
                  Over 5 years of experience transforming complex ideas into elegant, 
                  user-centered digital solutions that push the boundaries of what's possible.
                </p>
              </CardContent>
            </Card>

            <Card 
              className="glass-effect border-white/10 overflow-hidden group hover:border-violet-400/30 transition-all duration-500"
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-space">Technical Excellence</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full" />
                  </div>
                </div>
                <p className="text-gray-300 font-inter leading-relaxed">
                  Mastering cutting-edge technologies from React and TypeScript to Three.js and 
                  advanced shader programming for immersive web experiences.
                </p>
              </CardContent>
            </Card>

            <Card 
              className="glass-effect border-white/10 overflow-hidden group hover:border-violet-400/30 transition-all duration-500"
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-space">Innovation Focus</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full" />
                  </div>
                </div>
                <p className="text-gray-300 font-inter leading-relaxed">
                  Constantly exploring emerging technologies and design patterns to create 
                  next-generation digital experiences that inspire and engage.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Main profile card */}
              <div className="glass-effect rounded-3xl p-8 border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-violet-400 to-purple-600 flex items-center justify-center relative overflow-hidden">
                    <span className="text-4xl font-bold text-white font-space">AD</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-600 animate-glow" />
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-2 font-space">Alex Designer</h4>
                  <p className="text-violet-300 mb-4 font-inter">Creative Developer</p>
                  <p className="text-gray-400 text-sm font-inter">San Francisco, CA</p>
                  
                  <div className="mt-6 flex justify-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold gradient-text font-space">150+</div>
                      <div className="text-xs text-gray-400 font-inter">Happy Clients</div>
                    </div>
                    <div className="w-px bg-white/20" />
                    <div className="text-center">
                      <div className="text-lg font-bold gradient-text font-space">25+</div>
                      <div className="text-xs text-gray-400 font-inter">Awards Won</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-full blur-xl animate-float" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-pink-500/20 to-rose-600/20 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
