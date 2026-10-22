DO $$
DECLARE t text; c text;
BEGIN
  FOREACH t IN ARRAY ARRAY['page_views','whatsapp_clicks','maps_clicks'] LOOP
    FOREACH c IN ARRAY ARRAY['utm_source','utm_medium','utm_campaign','utm_content','utm_term'] LOOP
      EXECUTE format('ALTER TABLE public.%I ADD COLUMN IF NOT EXISTS %I text', t, c);
      EXECUTE format('ALTER TABLE public.%I ADD CONSTRAINT %I CHECK (%I IS NULL OR length(%I) <= 200)', t, t||'_'||c||'_len', c, c);
    END LOOP;
  END LOOP;
END $$;
CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON public.page_views (created_at);
CREATE INDEX IF NOT EXISTS whatsapp_clicks_created_at_idx ON public.whatsapp_clicks (created_at);
CREATE INDEX IF NOT EXISTS maps_clicks_created_at_idx ON public.maps_clicks (created_at);