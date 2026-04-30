import { useEffect } from "react";
import Hero from "@/components/lideres/Hero";
import JornadaCards from "@/components/lideres/JornadaCards";
import PorQueRenova from "@/components/lideres/PorQueRenova";
import Stats from "@/components/lideres/Stats";
import Depoimentos from "@/components/lideres/Depoimentos";
import Footer from "@/components/landing/Footer";

const Lideres = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Padres na Terra Santa | Renova Turismo";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <JornadaCards />
      <PorQueRenova />
      <Stats />
      <Depoimentos />
      <Footer />
    </div>
  );
};

export default Lideres;
