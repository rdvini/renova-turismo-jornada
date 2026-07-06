import { lazy, Suspense } from "react";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import WhatsAppTracker from "./components/tracking/WhatsAppTracker";
import WhatsAppFloatGlobal from "./components/shared/WhatsAppFloatGlobal";

const TurquiaPadreLeudo = lazy(() => import("./pages/TurquiaPadreLeudo.tsx"));
const MexicoPadreAntonioMaria = lazy(() => import("./pages/MexicoPadreAntonioMaria.tsx"));
const MexicoPadreLeudo = lazy(() => import("./pages/MexicoPadreLeudo.tsx"));
const Turquia = lazy(() => import("./pages/Turquia.tsx"));
const CampaignTemplate = lazy(() => import("./pages/CampaignTemplate.tsx"));
const AfricaDoSul2 = lazy(() => import("./pages/AfricaDoSul2.tsx"));
const Portugal = lazy(() => import("./pages/Portugal.tsx"));
const Lideres = lazy(() => import("./pages/Lideres.tsx"));
const LideresEvangelicos = lazy(() => import("./pages/LideresEvangelicos.tsx"));
const PastorMorelli = lazy(() => import("./pages/PastorMorelli.tsx"));
const LesteEuropeu = lazy(() => import("./pages/LesteEuropeu.tsx"));
const Marrocos = lazy(() => import("./pages/Marrocos.tsx"));
const JmjSeul = lazy(() => import("./pages/JmjSeul.tsx"));
const Grecia = lazy(() => import("./pages/Grecia.tsx"));
const Metricas = lazy(() => import("./pages/Metricas.tsx"));
const Privacidade = lazy(() => import("./pages/Privacidade.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen bg-background" aria-hidden="true" />
);

const AnalyticsTracker = () => {
  useGoogleAnalytics();
  return null;
};

const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsTracker />
        <WhatsAppTracker />
        <WhatsAppFloatGlobal />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/turquia-padre-leudo" element={<TurquiaPadreLeudo />} />
            <Route path="/mexico-padre-leudo" element={<MexicoPadreLeudo />} />
            <Route path="/mexico-padre-antonio-maria" element={<MexicoPadreAntonioMaria />} />
            <Route path="/turquia" element={<Turquia />} />
            <Route path="/africa-do-sul" element={<CampaignTemplate />} />
            <Route path="/africa-do-sul-2" element={<AfricaDoSul2 />} />
            <Route path="/portugal" element={<Portugal />} />
            <Route path="/lideres-catolicos" element={<Lideres />} />
            <Route path="/lideres-evangelicos" element={<LideresEvangelicos />} />
            <Route path="/pastor-morelli" element={<PastorMorelli />} />
            <Route path="/leste-europeu" element={<LesteEuropeu />} />
            <Route path="/marrocos" element={<Marrocos />} />
            <Route path="/jmj-seul-2027" element={<JmjSeul />} />
            <Route path="/grecia" element={<Grecia />} />
            <Route path="/admin/metricas" element={<Metricas />} />
            <Route path="/privacidade" element={<Privacidade />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
