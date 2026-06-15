DROP POLICY IF EXISTS "Anyone can insert whatsapp clicks" ON public.whatsapp_clicks;

CREATE POLICY "Anyone can insert whatsapp clicks"
ON public.whatsapp_clicks
FOR INSERT
TO anon, authenticated
WITH CHECK (
  page IS NOT NULL
  AND length(page) <= 500
  AND (source IS NULL OR length(source) <= 200)
  AND (url IS NULL OR length(url) <= 2000)
  AND (referrer IS NULL OR length(referrer) <= 2000)
  AND (user_agent IS NULL OR length(user_agent) <= 1000)
);