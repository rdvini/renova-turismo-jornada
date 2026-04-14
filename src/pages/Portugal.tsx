import { useEffect } from "react";
import Navbar from "@/components/campaigns/portugal/Navbar";
import Hero from "@/components/campaigns/portugal/Hero";
import SobreViagem from "@/components/campaigns/portugal/SobreViagem";
import Inclusos from "@/components/campaigns/portugal/Inclusos";
import Roteiro from "@/components/campaigns/portugal/Roteiro";
import PorQueRenova from "@/components/campaigns/portugal/PorQueRenova";
import Depoimentos from "@/components/campaigns/portugal/Depoimentos";
import InscrevaSe from "@/components/campaigns/portugal/InscrevaSe";
import Footer from "@/components/landing/Footer";

const Portugal = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/* Sobre a Viagem floats over the hero image (no background) */}
      <div className="relative z-10">
        <SobreViagem />
      </div>
      {/* Remaining sections scroll up with solid background */}
      <div className="relative z-10 bg-background">
        <Inclusos />
        <Roteiro />
        <PorQueRenova />
        <Depoimentos />
        <InscrevaSe />
        <Footer />
      </div>
    </div>
  );
};

export default Portugal;
