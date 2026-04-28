import { useEffect } from "react";
import Navbar from "@/components/campaigns/mexico-padre-leudo/Navbar";
import Hero from "@/components/campaigns/mexico-padre-leudo/Hero";
import SobreViagem from "@/components/campaigns/mexico-padre-leudo/SobreViagem";
import Inclusos from "@/components/campaigns/mexico-padre-leudo/Inclusos";
import Roteiro from "@/components/campaigns/mexico-padre-leudo/Roteiro";
import PorQueRenova from "@/components/campaigns/mexico-padre-leudo/PorQueRenova";
import Depoimentos from "@/components/campaigns/mexico-padre-leudo/Depoimentos";
import InscrevaSe from "@/components/campaigns/mexico-padre-leudo/InscrevaSe";
import Footer from "@/components/landing/Footer";

const MexicoPadreLeudo = () => {
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

export default MexicoPadreLeudo;
