import { useEffect } from "react";
import HubNavbar from "@/components/hub/HubNavbar";
import HubHero from "@/components/hub/HubHero";
import CampaignHub from "@/components/hub/CampaignHub";
import PorQueRenova from "@/components/landing/PorQueRenova";
import Footer from "@/components/landing/Footer";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <HubNavbar />
      <HubHero />
      <CampaignHub />
      <PorQueRenova />
      
      <Footer />
    </div>
  );
};

export default Index;
