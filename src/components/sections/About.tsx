
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A passionate creator at the intersection of technology, design, and innovation.
            I craft digital experiences that seamlessly blend functionality with aesthetic appeal.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">My Journey</h3>
                <p className="text-gray-300 mb-4">
                  With over 5 years of experience in the digital realm, I've evolved from a curious 
                  developer into a multidisciplinary creative professional. My expertise spans across 
                  frontend development, user experience design, and 3D product visualization.
                </p>
                <p className="text-gray-300 mb-4">
                  I believe in the power of technology to solve real-world problems and create 
                  meaningful connections between humans and digital interfaces.
                </p>
                <p className="text-gray-300">
                  When I'm not coding or designing, you'll find me exploring new 3D modeling 
                  techniques, studying the latest design trends, or experimenting with emerging 
                  web technologies.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-gray-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">JD</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">John Doe</h4>
                  <p className="text-gray-300">Creative Developer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
