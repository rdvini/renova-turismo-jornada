import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/campaigns/turquia/Navbar";
import Hero from "@/components/campaigns/turquia/Hero";
import SobreViagem from "@/components/campaigns/turquia/SobreViagem";
import Inclusos from "@/components/campaigns/turquia/Inclusos";
import Roteiro from "@/components/campaigns/turquia/Roteiro";
import PorQueRenova from "@/components/campaigns/turquia/PorQueRenova";
import Depoimentos from "@/components/campaigns/turquia/Depoimentos";
import InscrevaSe from "@/components/campaigns/turquia/InscrevaSe";
import Footer from "@/components/landing/Footer";

const Turquia = () => {
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

export default Turquia;
