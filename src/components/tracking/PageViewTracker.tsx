import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { captureUtm, utmColumns } from "@/lib/utm";

/**
 * Registra cada acesso de página na tabela `page_views`, incluindo UTMs
 * (da URL ou guardadas na sessão).
 */
const PageViewTracker = () => {
  const location = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const page = location.pathname;
    const utm = captureUtm(location.search);
    if (lastPath.current === page) return;
    lastPath.current = page;
    if (page.startsWith("/admin")) return;

    const record = async () => {
      try {
        const { error } = await supabase.from("page_views").insert({
          page,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          ...utmColumns(utm),
        });
        if (error) console.warn("[PageViewTracker] insert error:", error);
      } catch {
        // nunca bloqueia a navegação
      }
    };

    void record();
  }, [location.pathname, location.search]);

  return null;
};

export default PageViewTracker;
