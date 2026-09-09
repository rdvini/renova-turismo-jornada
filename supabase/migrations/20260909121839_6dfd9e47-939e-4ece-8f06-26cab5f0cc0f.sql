CREATE TABLE public.maps_clicks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page text NOT NULL,
  kind text NOT NULL DEFAULT 'button',
  source text,
  url text,
  referrer text,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.maps_clicks TO anon, authenticated;
GRANT ALL ON public.maps_clicks TO service_role;

ALTER TABLE public.maps_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert maps clicks"
ON public.maps_clicks
FOR INSERT
TO anon, authenticated
WITH CHECK (
  page IS NOT NULL AND length(page) <= 500
  AND kind IN ('button', 'map')
  AND (source IS NULL OR length(source) <= 200)
  AND (url IS NULL OR length(url) <= 2000)
  AND (referrer IS NULL OR length(referrer) <= 2000)
  AND (user_agent IS NULL OR length(user_agent) <= 1000)
);

CREATE INDEX maps_clicks_created_at_idx ON public.maps_clicks (created_at DESC);