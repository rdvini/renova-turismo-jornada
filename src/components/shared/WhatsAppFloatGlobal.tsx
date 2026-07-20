import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X } from "lucide-react";

// Rotas onde o botão NÃO deve aparecer (homepage e páginas administrativas/legais)
const EXCLUDED_ROUTES = new Set<string>(["/", "/admin/metricas", "/privacidade"]);

// Mapeamento de rota -> número de WhatsApp específico da página
const PAGE_WHATSAPP: Record<string, string> = {
  "/turquia": "5519989542633",
  "/turquia-padre-leudo": "5519994718930",
  "/mexico-padre-leudo": "5519994718930",
  "/mexico-padre-antonio-maria": "5519994718930",
  "/africa-do-sul": "5519992016125",
  "/africa-do-sul-2": "5519992016125",
  "/portugal": "5519936186395",
  "/lideres-catolicos": "5519989542633",
  "/lideres-evangelicos": "5519989542633",
  "/pastor-morelli": "5519991813303",
  "/pastor-rozenio": "5519991813303",
  "/leste-europeu": "5519989542633",
  "/marrocos": "5519936186395",
  "/jmj-seul-2027": "5519998974721",
  "/grecia": "5519988216863",
};

// Mensagem específica por rota
const PAGE_MESSAGE: Record<string, string> = {
  "/turquia": "Olá! Gostaria de mais informações sobre a viagem à Turquia.",
  "/turquia-padre-leudo": "Olá! Gostaria de mais informações sobre a peregrinação à Turquia com o Padre Leudo.",
  "/mexico-padre-leudo": "Olá! Gostaria de mais informações sobre a peregrinação ao México com o Padre Leudo.",
  "/mexico-padre-antonio-maria": "Olá! Gostaria de mais informações sobre a peregrinação ao México com o Padre Antônio Maria.",
  "/africa-do-sul": "Olá! Gostaria de mais informações sobre a viagem para a África do Sul.",
  "/africa-do-sul-2": "Olá! Gostaria de mais informações sobre a viagem para a África do Sul.",
  "/portugal": "Olá! Gostaria de mais informações sobre a peregrinação a Portugal.",
  "/lideres-catolicos": "Olá! Sou líder católico e gostaria de saber mais sobre as caravanas da Renova Turismo.",
  "/lideres-evangelicos": "Olá! Sou líder evangélico e gostaria de saber mais sobre as caravanas da Renova Turismo.",
  "/pastor-morelli": "Olá, Pastor Morelli! Gostaria de mais informações sobre as caravanas às Terras Bíblicas.",
  "/pastor-rozenio": "Olá, Pastor Rozenio! Gostaria de mais informações sobre a caravana a Israel.",
  "/leste-europeu": "Olá! Gostaria de mais informações sobre a viagem ao Leste Europeu.",
  "/marrocos": "Olá! Gostaria de mais informações sobre a viagem ao Marrocos.",
  "/jmj-seul-2027": "Olá! Gostaria de mais informações sobre a peregrinação à JMJ Seul 2027.",
  "/grecia": "Olá! Gostaria de mais informações sobre a viagem à Grécia.",
};

const DEFAULT_PHONE = "5519994718930";
const DEFAULT_MESSAGE = "Olá! Gostaria de saber mais sobre as viagens da Renova Turismo.";

const buildWhatsAppUrl = (phone: string, message: string) =>
  `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(
    message
  )}&type=phone_number&app_absent=0`;

const WhatsAppFloatGlobal = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const excluded = EXCLUDED_ROUTES.has(pathname);
  const storageKey = `wa-float-dismissed:${pathname}`;

  // Reset ao trocar de rota, respeitando sessionStorage
  useEffect(() => {
    if (excluded) return;
    const alreadyDismissed =
      typeof window !== "undefined" && sessionStorage.getItem(storageKey) === "1";
    setDismissed(alreadyDismissed);
    setVisible(false);
  }, [pathname, excluded, storageKey]);

  // Detecta scroll além da primeira dobra
  useEffect(() => {
    if (excluded || dismissed) return;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.9) {
        setVisible(true);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [excluded, dismissed, pathname]);

  if (excluded || dismissed || !visible) return null;

  const phone = PAGE_WHATSAPP[pathname] ?? DEFAULT_PHONE;
  const message = PAGE_MESSAGE[pathname] ?? DEFAULT_MESSAGE;

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      /* noop */
    }
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-end gap-2 animate-fade-in-up">
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Fechar"
        className="flex items-center justify-center w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-md transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      <a
        href={buildWhatsAppUrl(phone, message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
        className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white shadow-lg hover:scale-110 transition-all"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" />
      </a>
    </div>
  );
};

export default WhatsAppFloatGlobal;
