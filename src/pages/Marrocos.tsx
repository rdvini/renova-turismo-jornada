import { useEffect } from "react";
import Navbar from "@/components/campaigns/marrocos/Navbar";
import Hero from "@/components/campaigns/marrocos/Hero";
import SobreViagem from "@/components/campaigns/marrocos/SobreViagem";
import Inclusos from "@/components/campaigns/marrocos/Inclusos";
import Roteiro from "@/components/campaigns/marrocos/Roteiro";
import PorQueRenova from "@/components/campaigns/marrocos/PorQueRenova";
import Depoimentos from "@/components/campaigns/marrocos/Depoimentos";
import InscrevaSe from "@/components/campaigns/marrocos/InscrevaSe";
import Footer from "@/components/landing/Footer";

const Marrocos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SobreViagem />
      <Inclusos />
      <Roteiro />
      <PorQueRenova />
      <Depoimentos />
      <InscrevaSe />
      <Footer />
    </div>
  );
};

export default Marrocos;
