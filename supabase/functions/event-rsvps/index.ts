import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const rsvpCorsHeaders = {
  ...corsHeaders,
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-metrics-password",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: rsvpCorsHeaders });
  }

  try {
    const password = req.headers.get("x-metrics-password");
    const expected = Deno.env.get("METRICS_PASSWORD");
    if (!expected || password !== expected) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...rsvpCorsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const url = new URL(req.url);
    const evento = url.searchParams.get("evento") ?? "semana-do-cliente";

    const PAGE_SIZE = 1000;
    const MAX_ROWS = 50000;
    type Row = {
      id: string;
      nome: string;
      telefone: string;
      resposta: string;
      created_at: string;
    };
    const rows: Row[] = [];
    for (let offset = 0; offset < MAX_ROWS; offset += PAGE_SIZE) {
      const { data: chunk, error } = await supabase
        .from("event_rsvps")
        .select("id, nome, telefone, resposta, created_at")
        .eq("evento", evento)
        .order("created_at", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1);
      if (error) throw error;
      if (!chunk || chunk.length === 0) break;
      rows.push(...(chunk as Row[]));
      if (chunk.length < PAGE_SIZE) break;
    }

    const sim = rows.filter((r) => r.resposta === "sim").length;
    const nao = rows.filter((r) => r.resposta === "nao").length;
    const total = rows.length;

    return new Response(
      JSON.stringify({
        evento,
        total,
        sim,
        nao,
        taxaPresenca: total === 0 ? 0 : (sim / total) * 100,
        respostas: rows,
      }),
      { headers: { ...rsvpCorsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...rsvpCorsHeaders, "Content-Type": "application/json" },
    });
  }
});
