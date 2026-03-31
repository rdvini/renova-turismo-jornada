import HubNavbar from "@/components/hub/HubNavbar";
import HubHero from "@/components/hub/HubHero";
import CampaignHub from "@/components/hub/CampaignHub";
import PorQueRenova from "@/components/landing/PorQueRenova";

import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HubNavbar />
      <HubHero />
      <CampaignHub />
      <PorQueRenova />
      <Depoimentos />
      <Footer />
    </div>
  );
};

export default Index;
