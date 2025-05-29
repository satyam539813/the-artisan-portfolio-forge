
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const FrontendProjects = () => {
  const projects = [
    {
      title: "Real-time Collaboration Platform",
      description: "A React-based platform with WebSocket integration for real-time document editing and team collaboration.",
      technologies: ["React", "TypeScript", "Socket.io", "Redux Toolkit", "Tailwind CSS"],
      challenges: "Implementing conflict resolution for simultaneous edits and optimizing performance for large documents.",
      github: "#",
      demo: "#",
      image: "⚡",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "3D Product Configurator",
      description: "Interactive web application allowing users to customize and visualize products in 3D using Three.js and React.",
      technologies: ["React", "Three.js", "React Three Fiber", "Zustand", "GSAP"],
      challenges: "Optimizing 3D rendering performance and creating intuitive user controls for complex 3D interactions.",
      github: "#",
      demo: "#",
      image: "🎯",
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Analytics Dashboard",
      description: "Comprehensive data visualization dashboard with real-time updates and interactive charts for business intelligence.",
      technologies: ["Next.js", "TypeScript", "D3.js", "Recharts", "Prisma", "PostgreSQL"],
      challenges: "Handling large datasets efficiently and creating responsive, interactive visualizations.",
      github: "#",
      demo: "#",
      image: "📈",
      color: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <section id="frontend" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Frontend Development Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cutting-edge web applications showcasing modern development practices and innovative solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm h-full hover:bg-gray-900/70 transition-all duration-300">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center text-2xl mb-4`}>
                    {project.image}
                  </div>
                  <CardTitle className="text-white text-xl">{project.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-300">{project.description}</p>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Key Challenge:</h4>
                    <p className="text-gray-400 text-sm">{project.challenges}</p>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:text-white flex-1"
                    >
                      Live Demo
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white flex-1"
                    >
                      GitHub
                    </Button>
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
