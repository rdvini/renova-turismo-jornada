CREATE TABLE public.event_rsvps (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  telefone text NOT NULL,
  resposta text NOT NULL,
  evento text NOT NULL DEFAULT 'semana-do-cliente',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.event_rsvps TO anon, authenticated;
GRANT ALL ON public.event_rsvps TO service_role;

ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit rsvp"
ON public.event_rsvps
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(nome) > 0 AND length(nome) <= 100
  AND length(telefone) > 0 AND length(telefone) <= 30
  AND resposta IN ('sim', 'nao')
  AND length(evento) > 0 AND length(evento) <= 100
);