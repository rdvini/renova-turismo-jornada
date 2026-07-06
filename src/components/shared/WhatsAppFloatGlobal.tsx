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
  "/leste-europeu": "5519989542633",
  "/marrocos": "5519936186395",
  "/jmj-seul-2027": "5519998974721",
  "/grecia": "5519988216863",
};

const DEFAULT_PHONE = "5519994718930";
const DEFAULT_MESSAGE =
  "Olá! Encontrei vocês pelo Google e gostaria de receber mais informações. Aguardo retorno";

const buildWhatsAppUrl = (phone: string) =>
  `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(
    DEFAULT_MESSAGE
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
        href={buildWhatsAppUrl(phone)}
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
