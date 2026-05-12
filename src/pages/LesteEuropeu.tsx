import { useEffect } from "react";
import Navbar from "@/components/campaigns/leste-europeu/Navbar";
import Hero from "@/components/campaigns/leste-europeu/Hero";
import SobreViagem from "@/components/campaigns/leste-europeu/SobreViagem";
import Inclusos from "@/components/campaigns/leste-europeu/Inclusos";
import Roteiro from "@/components/campaigns/leste-europeu/Roteiro";
import PorQueRenova from "@/components/campaigns/leste-europeu/PorQueRenova";
import Depoimentos from "@/components/campaigns/leste-europeu/Depoimentos";
import InscrevaSe from "@/components/campaigns/leste-europeu/InscrevaSe";
import Footer from "@/components/landing/Footer";

const LesteEuropeu = () => {
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

export default LesteEuropeu;
