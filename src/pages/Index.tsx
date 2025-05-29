
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { UIUXShowcase } from "@/components/sections/UIUXShowcase";
import { FrontendProjects } from "@/components/sections/FrontendProjects";
import { ProductDesign } from "@/components/sections/ProductDesign";
import { Contact } from "@/components/sections/Contact";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <UIUXShowcase />
      <FrontendProjects />
      <ProductDesign />
      <Contact />
    </div>
  );
};

export default Index;
