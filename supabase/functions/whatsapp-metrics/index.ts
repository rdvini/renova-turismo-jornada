import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const password = req.headers.get("x-metrics-password");
    const expected = Deno.env.get("METRICS_PASSWORD");
    if (!expected || password !== expected) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const url = new URL(req.url);
    const days = Math.min(
      Math.max(parseInt(url.searchParams.get("days") ?? "30", 10) || 30, 1),
      365,
    );

    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from("whatsapp_clicks")
      .select("id, page, source, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(10000);

    if (error) throw error;

    const rows = data ?? [];
    const total = rows.length;

    const byDayMap = new Map<string, number>();
    const byPageMap = new Map<string, number>();
    const bySourceMap = new Map<string, number>();

    for (const r of rows) {
      const day = (r.created_at as string).slice(0, 10);
      byDayMap.set(day, (byDayMap.get(day) ?? 0) + 1);
      byPageMap.set(r.page, (byPageMap.get(r.page) ?? 0) + 1);
      const src = r.source ?? "(sem origem)";
      bySourceMap.set(src, (bySourceMap.get(src) ?? 0) + 1);
    }

    // Preencher dias vazios
    const byDay: { date: string; count: number }[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
      byDay.push({ date: d, count: byDayMap.get(d) ?? 0 });
    }

    const byPage = [...byPageMap.entries()]
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count);

    const bySource = [...bySourceMap.entries()]
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    return new Response(
      JSON.stringify({ total, days, byDay, byPage, bySource }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
