import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Registra automaticamente todos os cliques em links do WhatsApp.
 * - Dispara o evento `Contact` no Meta Pixel (se disponível)
 * - Insere o clique na tabela `whatsapp_clicks` para métricas próprias
 *
 * Basta montar uma vez no App; um listener global captura cliques
 * em qualquer <a href="wa.me/..."> ou href com "whatsapp.com".
 */
const WhatsAppTracker = () => {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const isWhats =
        /wa\.me|api\.whatsapp\.com|whatsapp:\/\//i.test(href) ||
        anchor.dataset.trackWhatsapp === "true";
      if (!isWhats) return;

      const page =
        typeof window !== "undefined" ? window.location.pathname : "unknown";
      const source =
        anchor.dataset.waSource ||
        anchor.getAttribute("aria-label") ||
        (anchor.textContent || "").trim().slice(0, 80) ||
        null;

      // Meta Pixel
      try {
        window.fbq?.("track", "Contact", {
          content_name: source ?? "WhatsApp",
          page,
        });
      } catch {
        // ignora erros do pixel
      }

      // Banco de dados (fire-and-forget) — precisa de .then() para disparar a request
      try {
        supabase
          .from("whatsapp_clicks")
          .insert({
            page,
            source,
            url: href,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
          })
          .then(({ error }) => {
            if (error) console.warn("[WhatsAppTracker] insert error:", error);
          });
      } catch {
        // não bloqueia o redirecionamento do usuário
      }
    };

    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true });
  }, []);

  return null;
};

export default WhatsAppTracker;
