import { useEffect } from "react";
import Navbar from "@/components/campaigns/africa-do-sul-2/Navbar";
import Hero from "@/components/campaigns/africa-do-sul-2/Hero";
import SobreViagem from "@/components/campaigns/africa-do-sul-2/SobreViagem";
import Inclusos from "@/components/campaigns/africa-do-sul-2/Inclusos";
import Roteiro from "@/components/campaigns/africa-do-sul-2/Roteiro";
import PorQueRenova from "@/components/campaigns/africa-do-sul-2/PorQueRenova";
import Depoimentos from "@/components/campaigns/africa-do-sul-2/Depoimentos";
import InscrevaSe from "@/components/campaigns/africa-do-sul-2/InscrevaSe";
import Footer from "@/components/landing/Footer";

const AfricaDoSul2 = () => {
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

export default AfricaDoSul2;
