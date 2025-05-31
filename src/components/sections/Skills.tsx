
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Canvas } from "@react-three/fiber";
import { SkillOrb } from "@/components/3d/SkillOrb";
import { FloatingOrb } from "@/components/3d/FloatingOrb";
import { Suspense, useState } from "react";

export const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  
  console.log("Skills component rendering, hoveredSkill:", hoveredSkill);
  
  const skillCategories = [
    {
      title: "Frontend Mastery",
      icon: "💻",
      skills: [
        { name: "React & Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Three.js & WebGL", level: 85 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Framer Motion", level: 88 },
        { name: "GSAP", level: 82 }
      ],
      gradient: "from-blue-500 via-purple-500 to-cyan-500"
    },
    {
      title: "Design Systems",
      icon: "🎨",
      skills: [
        { name: "Figma", level: 92 },
        { name: "Adobe Creative Suite", level: 88 },
        { name: "Prototyping", level: 90 },
        { name: "User Research", level: 85 },
        { name: "Design Tokens", level: 87 },
        { name: "Component Libraries", level: 90 }
      ],
      gradient: "from-purple-500 via-pink-500 to-rose-500"
    },
    {
      title: "3D & Motion",
      icon: "🎭",
      skills: [
        { name: "Blender", level: 88 },
        { name: "Cinema 4D", level: 82 },
        { name: "After Effects", level: 85 },
        { name: "Shader Programming", level: 78 },
        { name: "3D Web Integration", level: 85 },
        { name: "Motion Design", level: 87 }
      ],
      gradient: "from-green-500 via-emerald-500 to-teal-500"
    }
  ];

  const skillOrbs = [
    { position: [-2, 1, 0] as [number, number, number], color: "#8b5cf6", skill: "React" },
    { position: [2, -1, 1] as [number, number, number], color: "#06b6d4", skill: "Three.js" },
    { position: [0, 2, -1] as [number, number, number], color: "#ec4899", skill: "Design" },
    { position: [-3, -1, -2] as [number, number, number], color: "#10b981", skill: "Animation" },
    { position: [3, 1, -1] as [number, number, number], color: "#f59e0b", skill: "TypeScript" }
  ];

  return (
    <section id="skills" className="py-32 bg-gradient-to-b from-purple-950/10 to-black relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} />
            {skillOrbs.map((orb, index) => (
              <SkillOrb
                key={index}
                position={orb.position}
                color={orb.color}
                skill={orb.skill}
                hovered={hoveredSkill === index}
              />
            ))}
            <FloatingOrb position={[4, 2, -3]} color="#8b5cf6" speed={0.8} scale={0.7} />
            <FloatingOrb position={[-4, -2, -2]} color="#06b6d4" speed={1.2} scale={0.5} />
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
            Skills & Expertise
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-playfair font-bold mb-8">
            <span className="gradient-text">Technical</span>
            <br />
            <span className="text-white/90">Arsenal</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto font-inter leading-relaxed">
            A comprehensive toolkit spanning development, design, and 3D visualization, 
            constantly evolving with the latest industry standards.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <Card className="glass-effect border-white/10 h-full hover:border-violet-400/30 transition-all duration-500 group overflow-hidden transform hover:scale-105">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 font-space">{category.title}</h3>
                    <div className={`h-1 w-20 mx-auto bg-gradient-to-r ${category.gradient} rounded-full`} />
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        className="relative"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: (index * 0.2) + (skillIndex * 0.1) }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-inter font-medium">{skill.name}</span>
                          <span className="text-sm text-violet-300 font-space font-bold">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${category.gradient} rounded-full relative`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: (index * 0.2) + (skillIndex * 0.1) + 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ scaleY: 1.2 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-glow" />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
