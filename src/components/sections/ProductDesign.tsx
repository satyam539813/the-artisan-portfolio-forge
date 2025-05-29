
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ProductDesign = () => {
  const designs = [
    {
      title: "Smart Home Device",
      description: "Minimalist IoT device design focused on seamless integration with modern home aesthetics.",
      software: "Blender, KeyShot",
      category: "Product Design",
      image: "🏠",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Ergonomic Headphones",
      description: "Premium audio device with emphasis on comfort, durability, and acoustic performance.",
      software: "Cinema 4D, Octane Render",
      category: "Industrial Design",
      image: "🎧",
      color: "from-indigo-500 to-purple-600"
    },
    {
      title: "Electric Vehicle Concept",
      description: "Futuristic automotive design exploring sustainable transportation and user experience.",
      software: "Blender, Substance Painter",
      category: "Concept Design",
      image: "🚗",
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Modular Furniture Set",
      description: "Versatile furniture collection designed for small spaces and modern living.",
      software: "SolidWorks, KeyShot",
      category: "Furniture Design",
      image: "🪑",
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Wearable Tech Concept",
      description: "Next-generation wearable device balancing functionality with fashion-forward design.",
      software: "Rhino, V-Ray",
      category: "Wearable Design",
      image: "⌚",
      color: "from-pink-500 to-rose-600"
    },
    {
      title: "Sustainable Packaging",
      description: "Eco-friendly packaging solutions combining environmental responsibility with brand appeal.",
      software: "Blender, Cycles",
      category: "Packaging Design",
      image: "📦",
      color: "from-green-500 to-lime-600"
    }
  ];

  return (
    <section id="3d" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            3D Product Design Gallery
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Innovative product designs that bridge the gap between imagination and reality
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designs.map((design, index) => (
            <motion.div
              key={design.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm overflow-hidden group hover:bg-gray-800/70 transition-all duration-300">
                <div className={`h-48 bg-gradient-to-br ${design.color} flex items-center justify-center relative overflow-hidden`}>
                  <motion.div
                    className="text-6xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    {design.image}
                  </motion.div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white text-sm">
                      {design.category}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{design.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{design.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-gray-400 text-sm">Software: </span>
                    <span className="text-gray-300 text-sm">{design.software}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:text-white flex-1"
                    >
                      View 3D Model
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            View Full Portfolio
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
