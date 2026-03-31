import Navbar from "@/components/campaigns/padre-leudo/Navbar";
import Hero from "@/components/campaigns/padre-leudo/Hero";
import SobreViagem from "@/components/campaigns/padre-leudo/SobreViagem";
import Inclusos from "@/components/campaigns/padre-leudo/Inclusos";
import Roteiro from "@/components/campaigns/padre-leudo/Roteiro";
import PorQueRenova from "@/components/campaigns/padre-leudo/PorQueRenova";
import Depoimentos from "@/components/campaigns/padre-leudo/Depoimentos";
import InscrevaSe from "@/components/campaigns/padre-leudo/InscrevaSe";
import Footer from "@/components/landing/Footer";

const TurquiaPadreLeudo = () => {
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

export default TurquiaPadreLeudo;
