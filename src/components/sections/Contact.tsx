
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  const contactMethods = [
    {
      icon: "✉️",
      title: "Email",
      value: "hello@example.com",
      action: "Send Email"
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "/in/johndoe",
      action: "Connect"
    },
    {
      icon: "📱",
      title: "GitHub",
      value: "/johndoe",
      action: "Follow"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Let's Create Together
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm text-center hover:bg-gray-800/70 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-4xl mb-4">{method.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                    <p className="text-gray-300 mb-4">{method.value}</p>
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:text-white"
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-12">
                <h3 className="text-2xl font-bold text-white mb-6">Ready to Start a Project?</h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Whether you need a stunning website, an intuitive user interface, or detailed 3D product visualizations, 
                  I'm here to help transform your vision into reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    Start a Project
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:text-white"
                  >
                    Schedule a Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-16 pt-8 border-t border-gray-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400">
            © 2024 John Doe. Crafted with passion and cutting-edge technology.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
