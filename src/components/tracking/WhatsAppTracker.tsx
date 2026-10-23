import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { utmColumns } from "@/lib/utm";
import { shouldTrack } from "@/lib/bots";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const isWhatsAppUrl = (href: string) => /wa\.me|api\.whatsapp\.com|whatsapp:\/\//i.test(href);

let lastKey = "";
let lastAt = 0;

const recordClick = (source: string | null, url: string) => {
  // Ignora toques duplos no mesmo botão
  const key = `${source}|${url}`;
  const now = Date.now();
  if (key === lastKey && now - lastAt < 3000) return;
  lastKey = key;
  lastAt = now;

  const page = window.location.pathname;

  try {
    window.fbq?.("track", "Contact", { content_name: source ?? "WhatsApp", page });
  } catch {
    // ignora erros do pixel
  }

  if (!shouldTrack()) return;
  try {
    supabase
      .from("whatsapp_clicks")
      .insert({
        page,
        source,
        url: url.slice(0, 2000),
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        ...utmColumns(),
      })
      .then(({ error }) => {
        if (error) console.warn("[WhatsAppTracker] insert error:", error);
      });
  } catch {
    // não bloqueia o redirecionamento do usuário
  }
};

/**
 * Registra todos os contatos pelo WhatsApp:
 * - cliques em qualquer <a> para wa.me / api.whatsapp.com
 * - formulários que abrem o WhatsApp via window.open (fonte "Formulário")
 * Dispara o evento `Contact` no Meta Pixel e grava em `whatsapp_clicks`.
 */
const WhatsAppTracker = () => {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (!isWhatsAppUrl(href) && anchor.dataset.trackWhatsapp !== "true") return;
      const source =
        anchor.dataset.waSource ||
        anchor.getAttribute("aria-label") ||
        (anchor.textContent || "").trim().slice(0, 80) ||
        null;
      recordClick(source, href);
    };

    const originalOpen = window.open;
    window.open = function (url?: string | URL, ...rest: unknown[]) {
      const href = url ? String(url) : "";
      if (isWhatsAppUrl(href)) recordClick("Formulário", href);
      return originalOpen.call(window, url, ...(rest as [string?, string?]));
    } as typeof window.open;

    document.addEventListener("click", handler, { capture: true });
    return () => {
      document.removeEventListener("click", handler, { capture: true });
      window.open = originalOpen;
    };
  }, []);

  return null;
};

export default WhatsAppTracker;
