import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const metricsCorsHeaders = {
  ...corsHeaders,
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-metrics-password",
};

// Brasil = UTC-3 (sem horário de verão desde 2019)
const BR_OFFSET_MS = -3 * 60 * 60 * 1000;

// Converte um instante UTC (ms) para um Date "espelhado" em horário de Brasília
// (usar métodos getUTC* nele devolve o valor local BR).
const toBR = (iso: string | number) => new Date(new Date(iso).getTime() + BR_OFFSET_MS);

// Recebe uma data YYYY-MM-DD (interpretada como dia de Brasília) e devolve o
// instante UTC (ms) correspondente ao início daquele dia em BR.
const brDateToUtcMs = (ymd: string): number => {
  // 00:00 em BR (UTC-3) = 03:00 UTC do mesmo dia
  return Date.parse(`${ymd}T00:00:00.000Z`) - BR_OFFSET_MS;
};

// "Hoje" em BR como YYYY-MM-DD
const brToday = (): string => toBR(Date.now()).toISOString().slice(0, 10);

// Soma n dias a um YYYY-MM-DD
const addDays = (ymd: string, n: number): string => {
  const t = Date.parse(`${ymd}T00:00:00.000Z`) + n * 86400000;
  return new Date(t).toISOString().slice(0, 10);
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

    // Resolve intervalo em datas BR (YYYY-MM-DD, inclusivas)
    let fromYmd: string;
    let toYmd: string;
    if (fromParam && toParam && /^\d{4}-\d{2}-\d{2}$/.test(fromParam) && /^\d{4}-\d{2}-\d{2}$/.test(toParam)) {
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

    const days = Math.round(
      (Date.parse(`${toYmd}T00:00:00.000Z`) - Date.parse(`${fromYmd}T00:00:00.000Z`)) / 86400000,
    ) + 1;
    const cappedDays = Math.min(Math.max(days, 1), 365);

    const sinceMs = brDateToUtcMs(fromYmd);
    const untilMs = brDateToUtcMs(addDays(toYmd, 1)); // exclusivo
    const prevSinceMs = sinceMs - cappedDays * 86400000;

    const since = new Date(sinceMs).toISOString();
    const until = new Date(untilMs).toISOString();
    const prevSince = new Date(prevSinceMs).toISOString();

    const { data, error } = await supabase
      .from("whatsapp_clicks")
      .select("id, page, source, referrer, user_agent, created_at")
      .gte("created_at", prevSince)
      .lt("created_at", until)
      .order("created_at", { ascending: false })
      .limit(20000);

    if (error) throw error;

    const all = data ?? [];
    const rows = all.filter((r) => (r.created_at as string) >= since);
    const prevRows = all.filter(
      (r) => (r.created_at as string) >= prevSince && (r.created_at as string) < since,
    );

    const total = rows.length;
    const prevTotal = prevRows.length;
    const delta = prevTotal === 0 ? null : ((total - prevTotal) / prevTotal) * 100;

    const byDayMap = new Map<string, number>();
    const byPageMap = new Map<string, number>();
    const bySourceMap = new Map<string, number>();
    const byHourMap = new Map<number, number>();
    const byDowMap = new Map<number, number>();
    const byReferrerMap = new Map<string, number>();
    const byDeviceMap = new Map<string, number>();

    const classifyDevice = (ua: string | null): string => {
      if (!ua) return "Desconhecido";
      const s = ua.toLowerCase();
      if (/ipad|tablet/.test(s)) return "Tablet";
      if (/mobi|iphone|android/.test(s)) return "Mobile";
      return "Desktop";
    };

    const classifyReferrer = (ref: string | null): string => {
      if (!ref) return "Direto";
      try {
        const host = new URL(ref).hostname.replace(/^www\./, "");
        if (host.includes("google")) return "Google";
        if (host.includes("facebook") || host.includes("fb.")) return "Facebook";
        if (host.includes("instagram")) return "Instagram";
        if (host.includes("bing")) return "Bing";
        if (host.includes("whatsapp")) return "WhatsApp";
        if (host.includes("lovable")) return "Interno";
        return host;
      } catch {
        return "Outro";
      }
    };

    for (const r of rows) {
      const createdBR = toBR(r.created_at as string);
      const day = createdBR.toISOString().slice(0, 10);
      byDayMap.set(day, (byDayMap.get(day) ?? 0) + 1);
      byPageMap.set(r.page, (byPageMap.get(r.page) ?? 0) + 1);
      const src = r.source ?? "(sem origem)";
      bySourceMap.set(src, (bySourceMap.get(src) ?? 0) + 1);
      byHourMap.set(createdBR.getUTCHours(), (byHourMap.get(createdBR.getUTCHours()) ?? 0) + 1);
      byDowMap.set(createdBR.getUTCDay(), (byDowMap.get(createdBR.getUTCDay()) ?? 0) + 1);
      const refKey = classifyReferrer((r as { referrer: string | null }).referrer);
      byReferrerMap.set(refKey, (byReferrerMap.get(refKey) ?? 0) + 1);
      const dev = classifyDevice((r as { user_agent: string | null }).user_agent);
      byDeviceMap.set(dev, (byDeviceMap.get(dev) ?? 0) + 1);
    }

    const byDay: { date: string; count: number }[] = [];
    for (let i = 0; i < cappedDays; i++) {
      const d = addDays(fromYmd, i);
      byDay.push({ date: d, count: byDayMap.get(d) ?? 0 });
    }

    const byHour: { hour: number; count: number }[] = [];
    for (let h = 0; h < 24; h++) byHour.push({ hour: h, count: byHourMap.get(h) ?? 0 });

    const dowNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const byDow = dowNames.map((name, i) => ({ name, count: byDowMap.get(i) ?? 0 }));

    const byPage = [...byPageMap.entries()]
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count);

    const bySource = [...bySourceMap.entries()]
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    const byReferrer = [...byReferrerMap.entries()]
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count);

    const byDevice = [...byDeviceMap.entries()]
      .map(([device, count]) => ({ device, count }))
      .sort((a, b) => b.count - a.count);

    const avgPerDay = total / cappedDays;
    const peakDay = byDay.reduce(
      (acc, d) => (d.count > acc.count ? d : acc),
      { date: "", count: 0 },
    );
    const peakHour = byHour.reduce(
      (acc, h) => (h.count > acc.count ? h : acc),
      { hour: 0, count: 0 },
    );

    const recent = rows.slice(0, 25).map((r) => ({
      id: r.id,
      page: r.page,
      source: r.source,
      referrer: classifyReferrer((r as { referrer: string | null }).referrer),
      device: classifyDevice((r as { user_agent: string | null }).user_agent),
      created_at: r.created_at,
    }));

    return new Response(
      JSON.stringify({
        total,
        prevTotal,
        delta,
        days: cappedDays,
        from: fromYmd,
        to: toYmd,
        avgPerDay,
        peakDay,
        peakHour,
        byDay,
        byHour,
        byDow,
        byPage,
        bySource,
        byReferrer,
        byDevice,
        recent,
      }),
      { headers: { ...metricsCorsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      {
        status: 500,
        headers: { ...metricsCorsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
