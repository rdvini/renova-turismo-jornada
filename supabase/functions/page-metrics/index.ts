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
  referrer: string | null;
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
    const MAX_ROWS = 200000;
    const rows: Row[] = [];
    for (let offset = 0; offset < MAX_ROWS; offset += PAGE_SIZE) {
      let query = supabase
        .from("page_views")
        .select("id, page, referrer, created_at")
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

    const byDay: { date: string; count: number }[] = [];
    const dayCounts = new Map<string, number>();
    const pageCounts = new Map<string, number>();
    const hourCounts = new Map<string, number>();
    const refCounts = new Map<string, number>();

    for (const r of rows) {
      const br = toBR(r.created_at);
      const day = br.toISOString().slice(0, 10);
      dayCounts.set(day, (dayCounts.get(day) ?? 0) + 1);
      pageCounts.set(r.page, (pageCounts.get(r.page) ?? 0) + 1);
      const hour = String(br.getUTCHours()).padStart(2, "0");
      hourCounts.set(hour, (hourCounts.get(hour) ?? 0) + 1);
      let ref = "Direto";
      if (r.referrer) {
        try {
          ref = new URL(r.referrer).hostname.replace(/^www\./, "");
        } catch {
          ref = r.referrer.slice(0, 80);
        }
      }
      refCounts.set(ref, (refCounts.get(ref) ?? 0) + 1);
    }

    for (let i = 0; i < cappedDays; i++) {
      const d = addDays(fromYmd, i);
      byDay.push({ date: d, count: dayCounts.get(d) ?? 0 });
    }

    const byHour = Array.from({ length: 24 }, (_, h) => {
      const key = String(h).padStart(2, "0");
      return { hour: `${key}h`, count: hourCounts.get(key) ?? 0 };
    });

    const byPage = Array.from(pageCounts.entries())
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count);

    const byReferrer = Array.from(refCounts.entries())
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return new Response(
      JSON.stringify({
        total: rows.length,
        from: fromYmd,
        to: toYmd,
        byDay,
        byHour,
        byPage,
        byReferrer,
      }),
      { headers: { ...metricsCorsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("page-metrics error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...metricsCorsHeaders, "Content-Type": "application/json" },
    });
  }
});
