import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const metricsCorsHeaders = {
  ...corsHeaders,
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-metrics-password",
};

const BR_OFFSET_MS = -3 * 60 * 60 * 1000;
const toBR = (iso: string | number) => new Date(new Date(iso).getTime() + BR_OFFSET_MS);
const brDateToUtcMs = (ymd: string): number =>
  Date.parse(`${ymd}T00:00:00.000Z`) - BR_OFFSET_MS;
const brToday = (): string => toBR(Date.now()).toISOString().slice(0, 10);
const addDays = (ymd: string, n: number): string =>
  new Date(Date.parse(`${ymd}T00:00:00.000Z`) + n * 86400000).toISOString().slice(0, 10);

type Row = {
  id: string;
  page: string;
  kind: string;
  source: string | null;
  created_at: string;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: metricsCorsHeaders });
  }

  try {
    const password = req.headers.get("x-metrics-password");
    const expected = Deno.env.get("METRICS_PASSWORD");
    if (!expected || password !== expected) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...metricsCorsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const url = new URL(req.url);
    const fromParam = url.searchParams.get("from");
    const toParam = url.searchParams.get("to");

    let fromYmd: string;
    let toYmd: string;
    if (
      fromParam && toParam &&
      /^\d{4}-\d{2}-\d{2}$/.test(fromParam) && /^\d{4}-\d{2}-\d{2}$/.test(toParam)
    ) {
      fromYmd = fromParam <= toParam ? fromParam : toParam;
      toYmd = fromParam <= toParam ? toParam : fromParam;
    } else {
      const days = Math.min(
        Math.max(parseInt(url.searchParams.get("days") ?? "30", 10) || 30, 1),
        365,
      );
      toYmd = brToday();
      fromYmd = addDays(toYmd, -(days - 1));
    }

    const cappedDays = Math.min(
      Math.max(
        Math.round(
          (Date.parse(`${toYmd}T00:00:00.000Z`) - Date.parse(`${fromYmd}T00:00:00.000Z`)) /
            86400000,
        ) + 1,
        1,
      ),
      365,
    );

    const since = new Date(brDateToUtcMs(fromYmd)).toISOString();
    const until = new Date(brDateToUtcMs(addDays(toYmd, 1))).toISOString();

    const pageParam = url.searchParams.get("page");
    const PAGE_SIZE = 1000;
    const MAX_ROWS = 50000;
    const rows: Row[] = [];
    for (let offset = 0; offset < MAX_ROWS; offset += PAGE_SIZE) {
      let query = supabase
        .from("maps_clicks")
        .select("id, page, kind, source, created_at")
        .gte("created_at", since)
        .lt("created_at", until)
        .order("created_at", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1);
      if (pageParam) query = query.eq("page", pageParam);
      const { data: chunk, error } = await query;
      if (error) throw error;
      if (!chunk || chunk.length === 0) break;
      rows.push(...(chunk as Row[]));
      if (chunk.length < PAGE_SIZE) break;
    }

    const total = rows.length;
    const botao = rows.filter((r) => r.kind === "button").length;
    const mapa = rows.filter((r) => r.kind === "map").length;

    const byDayMap = new Map<string, number>();
    const byPageMap = new Map<string, number>();
    for (const r of rows) {
      const day = toBR(r.created_at).toISOString().slice(0, 10);
      byDayMap.set(day, (byDayMap.get(day) ?? 0) + 1);
      byPageMap.set(r.page, (byPageMap.get(r.page) ?? 0) + 1);
    }

    const byDay: { date: string; button: number; map: number; count: number }[] = [];
    for (let i = 0; i < cappedDays; i++) {
      const d = addDays(fromYmd, i);
      const dayRows = rows.filter((r) => toBR(r.created_at).toISOString().slice(0, 10) === d);
      byDay.push({
        date: d,
        button: dayRows.filter((r) => r.kind === "button").length,
        map: dayRows.filter((r) => r.kind === "map").length,
        count: byDayMap.get(d) ?? 0,
      });
    }

    const byPage = [...byPageMap.entries()]
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count);

    const recent = rows.slice(0, 25);

    return new Response(
      JSON.stringify({
        total,
        botao,
        mapa,
        days: cappedDays,
        from: fromYmd,
        to: toYmd,
        byDay,
        byPage,
        recent,
      }),
      { headers: { ...metricsCorsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...metricsCorsHeaders, "Content-Type": "application/json" },
    });
  }
});
