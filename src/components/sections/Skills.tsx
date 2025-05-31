
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Canvas } from "@react-three/fiber";
import { DistortionSkillOrb } from "@/components/3d/DistortionSkillOrb";
import { FloatingOrb } from "@/components/3d/FloatingOrb";
import { Suspense, useState, useEffect } from "react";
import { gsap } from "gsap";
import anime from "animejs";

export const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // GSAP morphing animations for skill cards
    gsap.set(".skill-card", { transformOrigin: "center center" });
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Parallax effect with GSAP
      gsap.to(".skill-card", {
        duration: 0.3,
        x: (e.clientX - window.innerWidth / 2) * 0.02,
        y: (e.clientY - window.innerHeight / 2) * 0.02,
        rotationY: (e.clientX - window.innerWidth / 2) * 0.01,
        rotationX: (e.clientY - window.innerHeight / 2) * -0.01,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Anime.js stagger animations for skill bars
    anime({
      targets: '.skill-progress',
      scaleX: [0, 1],
      duration: 1500,
      easing: 'easeOutElastic(1, .5)',
      delay: anime.stagger(100)
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
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
    { position: [-3, 2, 0] as [number, number, number], color: "#8b5cf6", skill: "React" },
    { position: [3, -1, 1] as [number, number, number], color: "#06b6d4", skill: "Three.js" },
    { position: [0, 3, -1] as [number, number, number], color: "#ec4899", skill: "Design" },
    { position: [-4, -2, -2] as [number, number, number], color: "#10b981", skill: "Animation" },
    { position: [4, 2, -1] as [number, number, number], color: "#f59e0b", skill: "TypeScript" },
    { position: [-2, 0, 2] as [number, number, number], color: "#ef4444", skill: "GSAP" },
    { position: [2, -3, 0] as [number, number, number], color: "#8b5cf6", skill: "GLSL" }
  ];

  return (
    <section id="skills" className="py-32 bg-gradient-to-b from-purple-950/10 to-black relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      
      {/* Enhanced 3D Background with distortion orbs */}
      <div className="absolute inset-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <spotLight position={[-10, 5, 5]} angle={0.15} penumbra={1} intensity={0.6} />
            
            {skillOrbs.map((orb, index) => (
              <DistortionSkillOrb
                key={index}
                position={orb.position}
                color={orb.color}
                skill={orb.skill}
                hovered={hoveredSkill === index}
                index={index}
              />
            ))}
            
            <FloatingOrb position={[5, 3, -3]} color="#8b5cf6" speed={0.8} scale={0.7} />
            <FloatingOrb position={[-5, -3, -2]} color="#06b6d4" speed={1.2} scale={0.5} />
            <FloatingOrb position={[0, -4, -4]} color="#ec4899" speed={1.5} scale={0.6} />
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
              className="skill-card"
              initial={{ opacity: 0, y: 100, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              onMouseEnter={() => {
                setHoveredSkill(index);
                anime({
                  targets: `.skill-card-${index}`,
                  scale: [1, 1.05],
                  duration: 300,
                  easing: 'easeOutCubic'
                });
              }}
              onMouseLeave={() => {
                setHoveredSkill(null);
                anime({
                  targets: `.skill-card-${index}`,
                  scale: [1.05, 1],
                  duration: 300,
                  easing: 'easeOutCubic'
                });
              }}
            >
              <Card className={`skill-card-${index} glass-effect border-white/10 h-full hover:border-violet-400/30 transition-all duration-500 group overflow-hidden backdrop-blur-2xl`}>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <motion.div 
                      className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-3 font-space">{category.title}</h3>
                    <div className={`h-1 w-20 mx-auto bg-gradient-to-r ${category.gradient} rounded-full`} />
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        className="relative skill-item"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: (index * 0.2) + (skillIndex * 0.1) }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          x: 10,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-inter font-medium">{skill.name}</span>
                          <motion.span 
                            className="text-sm text-violet-300 font-space font-bold"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: (index * 0.2) + (skillIndex * 0.1) + 0.3 }}
                          >
                            {skill.level}%
                          </motion.span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`skill-progress h-full bg-gradient-to-r ${category.gradient} rounded-full relative origin-left`}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: skill.level / 100 }}
                            transition={{ 
                              duration: 1.5, 
                              delay: (index * 0.2) + (skillIndex * 0.1) + 0.5,
                              ease: "easeOutElastic"
                            }}
                            viewport={{ once: true }}
                            whileHover={{ 
                              scaleY: 1.5,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
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
