import { useEffect } from "react";
import Seo from "@/components/seo/Seo";
import MetaPixel from "@/components/tracking/MetaPixel";
import Navbar from "@/components/pastor-morelli/Navbar";
import Hero from "@/components/pastor-morelli/Hero";
import EscolhaRoteiro from "@/components/pastor-morelli/EscolhaRoteiro";
import QuemSou from "@/components/pastor-morelli/QuemSou";
import PorQueRenova from "@/components/pastor-morelli/PorQueRenova";
import Depoimentos from "@/components/pastor-morelli/Depoimentos";
import InscrevaSe from "@/components/pastor-morelli/InscrevaSe";
import Footer from "@/components/landing/Footer";

const PastorMorelli = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MetaPixel contentName="Pastor Morelli" contentCategory="Lideres" />
      <Seo
        title="Pastor Morelli | Caravanas Bíblicas | Renova Turismo"
        description="Viaje com o Pastor Morelli para Turquia e 7 Igrejas, Israel ou Egito e Jordânia — caravanas bíblicas com a organização da Renova Turismo."
        path="/pastor-morelli"
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

export default PastorMorelli;
