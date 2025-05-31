
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Canvas } from "@react-three/fiber";
import { Interactive3DCard } from "@/components/3d/Interactive3DCard";
import { FloatingOrb } from "@/components/3d/FloatingOrb";
import { Suspense, useState } from "react";

export const About = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  console.log("About component rendering, hoveredCard:", hoveredCard);

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-black to-purple-950/10 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
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
          
          <h2 className="text-5xl md:text-7xl font-playfair font-bold mb-8">
            <span className="gradient-text">Passionate</span>
            <br />
            <span className="text-white/90">Creator</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto font-inter leading-relaxed">
            Combining technical expertise with creative vision to build digital experiences 
            that inspire, engage, and deliver exceptional results.
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
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="glass-effect border-white/10 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-96 bg-gradient-to-br from-violet-500/20 via-purple-600/20 to-pink-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-violet-400 to-purple-600 flex items-center justify-center text-4xl">
                      👨‍💻
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-space">John Doe</h3>
                    <p className="text-violet-300 font-inter">Creative Developer</p>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-300 font-inter leading-relaxed mb-6">
                    "I believe in the power of design and technology to create meaningful connections 
                    between people and digital experiences. Every project is an opportunity to push 
                    creative boundaries."
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm font-inter">
                      Frontend Development
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-inter">
                      UI/UX Design
                    </span>
                    <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm font-inter">
                      3D Visualization
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
