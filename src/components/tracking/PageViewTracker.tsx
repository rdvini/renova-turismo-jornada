import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

/**
 * Registra cada acesso (visita) de página na tabela `page_views`.
 * Roda a cada mudança de rota do React Router.
 */
const PageViewTracker = () => {
  const location = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const page = location.pathname;
    if (lastPath.current === page) return;
    lastPath.current = page;

    const record = async () => {
      try {
        const { error } = await supabase.from("page_views").insert({
          page,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
        });
        if (error) console.warn("[PageViewTracker] insert error:", error);
      } catch {
        // nunca bloqueia a navegação
      }
    };

    void record();
  }, [location.pathname]);

  return null;
};

export default PageViewTracker;
