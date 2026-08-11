import { useEffect } from "react";
import Seo from "@/components/seo/Seo";
import MetaPixel from "@/components/tracking/MetaPixel";
import Navbar from "@/components/campaigns/aurora-boreal/Navbar";
import Hero from "@/components/campaigns/aurora-boreal/Hero";
import SobreViagem from "@/components/campaigns/aurora-boreal/SobreViagem";
import Inclusos from "@/components/campaigns/aurora-boreal/Inclusos";
import Roteiro from "@/components/campaigns/aurora-boreal/Roteiro";
import PorQueRenova from "@/components/campaigns/aurora-boreal/PorQueRenova";
import Depoimentos from "@/components/campaigns/aurora-boreal/Depoimentos";
import InscrevaSe from "@/components/campaigns/aurora-boreal/InscrevaSe";
import Footer from "@/components/landing/Footer";

const AuroraBoreal = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const gtagId = "G-HZD0F6TRYL";
    if (!document.querySelector(`script[src*="${gtagId}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
      document.head.appendChild(script);

      const inlineScript = document.createElement("script");
      inlineScript.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtagId}');
      `;
      document.head.appendChild(inlineScript);
    }
  }, []);

  return (
    <div className="theme-grecia theme-aurora min-h-screen bg-background">
      <MetaPixel contentName="Aurora Boreal" contentCategory="Destino" />
      <Seo
        title="Viagem para ver a Aurora Boreal | Renova Turismo"
        description="Viagem de 9 dias para ver a aurora boreal na Islândia com a Renova Turismo: Reykjavík, Círculo Dourado, lagoa glacial, águas termais e expedição noturna."
        path="/aurora-boreal"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: "Viagem para ver a Aurora Boreal",
          touristType: "Natureza",
          provider: { "@type": "TravelAgency", name: "Renova Turismo" },
          itinerary: {
            "@type": "ItemList",
            name: "Reykjavík, Círculo Dourado, Costa Sul, Jökulsárlón e Lagoa Azul",
          },
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

export default AuroraBoreal;
