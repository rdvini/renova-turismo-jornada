import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import TurquiaPadreLeudo from "./pages/TurquiaPadreLeudo.tsx";
import MexicoPadreLeudo from "./pages/MexicoPadreLeudo.tsx";
import Turquia from "./pages/Turquia.tsx";
import CampaignTemplate from "./pages/CampaignTemplate.tsx";
import AfricaDoSul2 from "./pages/AfricaDoSul2.tsx";
import Portugal from "./pages/Portugal.tsx";
import Lideres from "./pages/Lideres.tsx";
import LideresEvangelicos from "./pages/LideresEvangelicos.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/turquia-padre-leudo" element={<TurquiaPadreLeudo />} />
          <Route path="/mexico-padre-leudo" element={<MexicoPadreLeudo />} />
          <Route path="/turquia" element={<Turquia />} />
          <Route path="/africa-do-sul" element={<CampaignTemplate />} />
          <Route path="/africa-do-sul-2" element={<AfricaDoSul2 />} />
          <Route path="/portugal" element={<Portugal />} />
          <Route path="/lideres" element={<Lideres />} />
          <Route path="/lideres-evangelicos" element={<LideresEvangelicos />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
