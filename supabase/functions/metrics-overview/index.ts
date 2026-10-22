import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const headers = {
  ...corsHeaders,
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-metrics-password",
  "Content-Type": "application/json",
};

const BR_OFFSET_MS = 3 * 60 * 60 * 1000; // Brasília = UTC-3
const ymdRe = /^\d{4}-\d{2}-\d{2}$/;
const brStartUtc = (ymd: string) => new Date(Date.parse(`${ymd}T00:00:00.000Z`) + BR_OFFSET_MS);
const addDays = (ymd: string, n: number) =>
  new Date(Date.parse(`${ymd}T00:00:00.000Z`) + n * 86400000).toISOString().slice(0, 10);

const UTM = "utm_source,utm_medium,utm_campaign,utm_content";
const COLS: Record<string, string> = {
  page_views: `created_at,page,referrer,${UTM}`,
  whatsapp_clicks: `created_at,page,source,referrer,${UTM}`,
  maps_clicks: `created_at,page,kind,source,referrer,${UTM}`,
};
const MAX_ROWS = 200000;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers });
  try {
    const expected = Deno.env.get("METRICS_PASSWORD");
    if (!expected || req.headers.get("x-metrics-password") !== expected) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers });
    }
    const url = new URL(req.url);
    const from = url.searchParams.get("from") ?? "";
    const to = url.searchParams.get("to") ?? "";
    if (!ymdRe.test(from) || !ymdRe.test(to) || from > to) {
      return new Response(JSON.stringify({ error: "Parâmetros from/to inválidos" }), { status: 400, headers });
    }
    const days = Math.round((Date.parse(to) - Date.parse(from)) / 86400000) + 1;
    if (days > 366) {
      return new Response(JSON.stringify({ error: "Período máximo: 366 dias" }), { status: 400, headers });
    }
    // Inclui o período anterior de mesmo tamanho para comparação
    const prevFrom = addDays(from, -days);
    const since = brStartUtc(prevFrom).toISOString();
    const until = brStartUtc(addDays(to, 1)).toISOString();

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const fetchAll = async (table: string) => {
      const rows: unknown[] = [];
      for (let offset = 0; offset < MAX_ROWS; offset += 1000) {
        const { data, error } = await supabase
          .from(table)
          .select(COLS[table])
          .gte("created_at", since)
          .lt("created_at", until)
          .order("created_at", { ascending: true })
          .range(offset, offset + 999);
        if (error) throw error;
        rows.push(...(data ?? []));
        if (!data || data.length < 1000) break;
      }
      return rows;
    };

    const [views, whatsapp, maps] = await Promise.all([
      fetchAll("page_views"),
      fetchAll("whatsapp_clicks"),
      fetchAll("maps_clicks"),
    ]);

    return new Response(
      JSON.stringify({ from, to, prevFrom, prevTo: addDays(from, -1), views, whatsapp, maps }),
      { headers },
    );
  } catch (e) {
    console.error("[metrics-overview]", e);
    return new Response(JSON.stringify({ error: "Erro ao carregar métricas" }), { status: 500, headers });
  }
});
