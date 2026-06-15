CREATE TABLE public.whatsapp_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  source text,
  url text,
  referrer text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.whatsapp_clicks TO anon, authenticated;
GRANT ALL ON public.whatsapp_clicks TO service_role;

ALTER TABLE public.whatsapp_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert whatsapp clicks"
ON public.whatsapp_clicks
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE INDEX whatsapp_clicks_created_at_idx ON public.whatsapp_clicks (created_at DESC);
CREATE INDEX whatsapp_clicks_page_idx ON public.whatsapp_clicks (page);