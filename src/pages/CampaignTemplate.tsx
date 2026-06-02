import { useEffect } from "react";
import Seo from "@/components/seo/Seo";
import Navbar from "@/components/campaigns/template/Navbar";
import Hero from "@/components/campaigns/template/Hero";
import SobreViagem from "@/components/campaigns/template/SobreViagem";
import Inclusos from "@/components/campaigns/template/Inclusos";
import Roteiro from "@/components/campaigns/template/Roteiro";
import PorQueRenova from "@/components/campaigns/template/PorQueRenova";
import Depoimentos from "@/components/campaigns/template/Depoimentos";
import InscrevaSe from "@/components/campaigns/template/InscrevaSe";
import Footer from "@/components/landing/Footer";

/**
 * =============================================
 * 📋 TEMPLATE DE CAMPANHA — GUIA DE EDIÇÃO
 * =============================================
 *
 * Para criar uma nova campanha, duplique esta pasta
 * (src/components/campaigns/template/) e edite os
 * campos marcados com "EDITAR:" em cada componente:
 *
 * 1. Hero.tsx       → Título, subtítulo, imagem de fundo, CTA
 * 2. SobreViagem.tsx → Descrição, datas, cidades, significado
 * 3. Roteiro.tsx     → Slides do roteiro dia a dia (imagens + textos)
 * 4. Inclusos.tsx    → Benefícios inclusos no pacote
 * 5. PorQueRenova.tsx → Motivos + fotos do grupo (opcional)
 * 6. Depoimentos.tsx → Depoimentos de clientes
 * 7. InscrevaSe.tsx  → Número WhatsApp, destino, nome do líder
 * 8. Navbar.tsx      → Texto do CTA (geralmente não precisa mudar)
 *
 * Depois, crie uma nova rota em src/App.tsx apontando
 * para esta página com o path desejado.
 * =============================================
 */

const CampaignTemplate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="África do Sul | Renova Turismo"
        description="Safári em Kruger Park, Cape Town, Cabo da Boa Esperança e Região das Vinícolas — 9 dias com guias em português e roteiro completo pela África do Sul."
        path="/africa-do-sul"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: "Viagem para a África do Sul",
          touristType: ["Cultural", "Safári", "Natureza"],
          provider: { "@type": "TravelAgency", name: "Renova Turismo" },
          itinerary: {
            "@type": "ItemList",
            name: "Johannesburgo, Soweto, Kruger Park, Pretória, Cape Town, Cabo da Boa Esperança, Região das Vinícolas",
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

export default CampaignTemplate;
