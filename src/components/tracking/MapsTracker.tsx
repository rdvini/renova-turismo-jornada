import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Registra cliques em links do Google Maps ("Saiba como chegar") e
 * interações com o mapa incorporado (iframe) na tabela `maps_clicks`.
 */
const isMapsUrl = (href: string) =>
  /google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps|maps\.google/i.test(href);

const record = async (
  kind: "button" | "map",
  source: string | null,
  url: string | null,
) => {
  const page = typeof window !== "undefined" ? window.location.pathname : "unknown";

  try {
    window.fbq?.("track", "FindLocation", { content_name: source ?? "Google Maps", page });
  } catch {
    // ignora erros do pixel
  }

  try {
    const { error } = await supabase.from("maps_clicks").insert({
      page,
      kind,
      source,
      url,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    });
    if (error) console.warn("[MapsTracker] insert error:", error);
  } catch {
    // não bloqueia a navegação do usuário
  }
};

const MapsTracker = () => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest("a") as
        | HTMLAnchorElement
        | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (!isMapsUrl(href) && anchor.dataset.trackMaps !== "true") return;

      const source =
        anchor.dataset.mapsSource ||
        anchor.getAttribute("aria-label") ||
        (anchor.textContent || "").trim().slice(0, 80) ||
        null;

      void record("button", source, href || null);
    };

    // Cliques dentro de um iframe não chegam ao documento pai; quando o usuário
    // interage com o mapa o foco vai para o iframe e a janela perde o foco.
    let mapCounted = false;
    const onBlur = () => {
      if (mapCounted) return;
      const active = document.activeElement as HTMLElement | null;
      if (!active || active.tagName !== "IFRAME") return;
      const src = (active as HTMLIFrameElement).src || "";
      if (!isMapsUrl(src)) return;
      mapCounted = true;
      void record("map", "Mapa incorporado", src);
    };

    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("blur", onBlur);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return null;
};

export default MapsTracker;
