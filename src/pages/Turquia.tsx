import { useEffect } from "react";
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

    // Google Analytics (gtag.js)
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
