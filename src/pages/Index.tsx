import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Seo from "@/components/seo/Seo";
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
      <Helmet>
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '819094428741468');
            fbq('track', 'PageView');
          `}
        </script>
        <noscript>
          {`
            <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=819094428741468&ev=PageView&noscript=1" />
          `}
        </noscript>
      </Helmet>
      <Seo
        title="Renova Turismo — Roteiros Culturais e Peregrinações"
        description="Conheça as viagens da Renova Turismo: roteiros culturais e peregrinações com guias em português, hotéis selecionados e experiências inesquecíveis."
        path="/"
      />
      <HubNavbar />
      <HubHero />
      <CampaignHub />
      <PorQueRenova />
      
      <Footer />
    </div>
  );
};

export default Index;
