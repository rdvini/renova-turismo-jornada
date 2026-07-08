import { useEffect } from "react";
import Seo from "@/components/seo/Seo";
import MetaPixel from "@/components/tracking/MetaPixel";
import Navbar from "@/components/pastor-rozenio/Navbar";
import Hero from "@/components/pastor-rozenio/Hero";
import EscolhaRoteiro from "@/components/pastor-rozenio/EscolhaRoteiro";
import QuemSou from "@/components/pastor-rozenio/QuemSou";
import PorQueRenova from "@/components/pastor-rozenio/PorQueRenova";
import Depoimentos from "@/components/pastor-rozenio/Depoimentos";
import InscrevaSe from "@/components/pastor-rozenio/InscrevaSe";
import Footer from "@/components/landing/Footer";

const PastorRozenio = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MetaPixel contentName="Pastor Rozenio" contentCategory="Lideres" />
      <Seo
        title="Pastor Rozenio | Caravanas Bíblicas | Renova Turismo"
        description="Viaje com o Pastor Rozenio para Turquia e 7 Igrejas, Israel ou Egito e Jordânia — caravanas bíblicas com a organização da Renova Turismo."
        path="/pastor-rozenio"
      />
      <Navbar />
      <Hero />
      <EscolhaRoteiro />
      <QuemSou />
      <PorQueRenova />
      <Depoimentos />
      <InscrevaSe />
      <Footer />
    </div>
  );
};

export default PastorRozenio;
