import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import SobreViagem from "@/components/landing/SobreViagem";
import Inclusos from "@/components/landing/Inclusos";
import Roteiro from "@/components/landing/Roteiro";
import PorQueRenova from "@/components/landing/PorQueRenova";
import Depoimentos from "@/components/landing/Depoimentos";
import InscrevaSe from "@/components/landing/InscrevaSe";
import Footer from "@/components/landing/Footer";

const Index = () => {
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

export default Index;
