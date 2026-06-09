import { useEffect } from "react";
import Seo from "@/components/seo/Seo";
import Navbar from "@/components/campaigns/mexico-padre-antonio-maria/Navbar";
import Hero from "@/components/campaigns/mexico-padre-antonio-maria/Hero";
import SobreViagem from "@/components/campaigns/mexico-padre-antonio-maria/SobreViagem";
import Inclusos from "@/components/campaigns/mexico-padre-antonio-maria/Inclusos";
import Roteiro from "@/components/campaigns/mexico-padre-antonio-maria/Roteiro";
import PorQueRenova from "@/components/campaigns/mexico-padre-antonio-maria/PorQueRenova";
import Depoimentos from "@/components/campaigns/mexico-padre-antonio-maria/Depoimentos";
import InscrevaSe from "@/components/campaigns/mexico-padre-antonio-maria/InscrevaSe";
import Footer from "@/components/landing/Footer";

const MexicoPadreAntonioMaria = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="theme-padre-antonio min-h-screen bg-background text-foreground">
      <Seo
        title="Peregrinação ao México com Padre Antônio Maria | Renova Turismo"
        description="Peregrinação exclusiva à Basílica de Guadalupe e roteiro cultural pelo México com o Padre Antônio Maria e a Renova Turismo. Guias em português e hospedagem selecionada."
        path="/mexico-padre-antonio-maria"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: "Peregrinação ao México com Padre Antônio Maria",
          touristType: "Religioso",
          provider: { "@type": "TravelAgency", name: "Renova Turismo" },
        }}
      />
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

export default MexicoPadreAntonioMaria;
