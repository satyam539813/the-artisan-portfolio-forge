
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const UIUXShowcase = () => {
  const projects = [
    {
      title: "E-Commerce Mobile App",
      description: "Complete redesign of a fashion e-commerce platform focusing on user journey optimization and conversion rate improvement.",
      process: ["User Research", "Persona Development", "Wireframing", "Prototyping", "Usability Testing"],
      impact: "40% increase in conversion rate, 60% improvement in user satisfaction",
      image: "🛍️",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "SaaS Dashboard Design",
      description: "Intuitive dashboard design for a project management tool, emphasizing data visualization and workflow efficiency.",
      process: ["Stakeholder Interviews", "Information Architecture", "Design System", "Interactive Prototypes", "A/B Testing"],
      impact: "50% reduction in task completion time, 35% increase in daily active users",
      image: "📊",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Healthcare Patient Portal",
      description: "Patient-centered design for a healthcare platform, prioritizing accessibility and information clarity.",
      process: ["Accessibility Audit", "Patient Journey Mapping", "Collaborative Design", "Prototype Testing", "Implementation"],
      impact: "90% accessibility compliance, 45% reduction in support tickets",
      image: "🏥",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section id="uiux" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            UI/UX Design Case Studies
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            User-centered design solutions that drive engagement and deliver measurable business results
          </p>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className={`p-8 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                    <div className="text-center">
                      <div className="text-6xl mb-4">{project.image}</div>
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <p className="text-gray-300 mb-6 text-lg">{project.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">Design Process:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.process.map((step) => (
                          <span
                            key={step}
                            className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                          >
                            {step}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-2">Impact:</h4>
                      <p className="text-green-400">{project.impact}</p>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white">
                        View Case Study
                      </Button>
                      <Button variant="ghost" className="text-gray-400 hover:text-white">
                        Live Prototype
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
