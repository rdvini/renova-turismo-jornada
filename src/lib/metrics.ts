export type UtmFields = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
};
export type ViewRow = UtmFields & { created_at: string; page: string; referrer: string | null };
export type ClickRow = ViewRow & { source: string | null; kind?: string };

export type MetricsPayload = {
  from: string;
  to: string;
  prevFrom: string;
  prevTo: string;
  views: ViewRow[];
  whatsapp: ClickRow[];
  maps: ClickRow[];
};

export const NO_CAMPAIGN = "Sem campanha";

/** Dia (YYYY-MM-DD) e hora no fuso de Brasília (UTC-3). */
export const brParts = (iso: string) => {
  const d = new Date(Date.parse(iso) - 3 * 3600 * 1000).toISOString();
  return { ymd: d.slice(0, 10), hour: Number(d.slice(11, 13)) };
};

/** Normaliza a origem do acesso: usa utm_source se houver, senão o site de origem. */
export const normalizeSource = (utmSource: string | null, referrer: string | null): string => {
  const s = (utmSource || "").toLowerCase();
  let host = "";
  if (!s && referrer) {
    try {
      host = new URL(referrer).hostname.toLowerCase();
    } catch {
      host = referrer.toLowerCase();
    }
  }
  const v = s || host;
  if (!v) return "Direto";
  if (/instagram|\big\b/.test(v)) return "Instagram";
  if (/facebook|fb\b|^fb|meta/.test(v)) return "Facebook";
  if (/google|gclid|youtube/.test(v)) return "Google";
  if (/whats|wa\.me/.test(v)) return "WhatsApp";
  if (/renova|lovable|localhost/.test(v)) return "Navegação interna";
  return "Outros";
};

export const campaignLabel = (r: UtmFields) => r.utm_campaign || NO_CAMPAIGN;

export const conversion = (clicks: number, views: number) =>
  views > 0 ? Math.round((clicks / views) * 1000) / 10 : 0;

export const variation = (cur: number, prev: number): number | null =>
  prev > 0 ? Math.round(((cur - prev) / prev) * 1000) / 10 : null;

const countBy = <T,>(rows: T[], key: (r: T) => string) => {
  const m = new Map<string, number>();
  rows.forEach((r) => m.set(key(r), (m.get(key(r)) ?? 0) + 1));
  return m;
};

export type Filters = { page: string | null; campaign: string | null };

export const applyFilters = <T extends ViewRow>(rows: T[], f: Filters) =>
  rows.filter((r) => (!f.page || r.page === f.page) && (!f.campaign || campaignLabel(r) === f.campaign));

export const aggregate = (p: MetricsPayload, f: Filters) => {
  const inRange = (from: string, to: string) => <T extends ViewRow>(r: T) => {
    const d = brParts(r.created_at).ymd;
    return d >= from && d <= to;
  };
  const cur = inRange(p.from, p.to);
  const prev = inRange(p.prevFrom, p.prevTo);

  const views = applyFilters(p.views, f);
  const wa = applyFilters(p.whatsapp, f);
  const maps = applyFilters(p.maps, f);
  const v = views.filter(cur), w = wa.filter(cur), m = maps.filter(cur);
  const pv = views.filter(prev).length, pw = wa.filter(prev).length, pm = maps.filter(prev).length;

  const kpis = {
    views: v.length, whatsapp: w.length, maps: m.length,
    conversion: conversion(w.length, v.length),
    prev: { views: pv, whatsapp: pw, maps: pm, conversion: conversion(pw, pv) },
  };

  // Série temporal: por hora se 1 dia, senão por dia
  const hourly = p.from === p.to;
  const keys: string[] = [];
  if (hourly) for (let h = 0; h < 24; h++) keys.push(String(h).padStart(2, "0") + "h");
  else {
    for (let t = Date.parse(p.from); t <= Date.parse(p.to); t += 86400000)
      keys.push(new Date(t).toISOString().slice(0, 10));
  }
  const keyOf = (r: ViewRow) => {
    const b = brParts(r.created_at);
    return hourly ? String(b.hour).padStart(2, "0") + "h" : b.ymd;
  };
  const vc = countBy(v, keyOf), wc = countBy(w, keyOf), mc = countBy(m, keyOf);
  const series = keys.map((k) => ({ key: k, acessos: vc.get(k) ?? 0, whatsapp: wc.get(k) ?? 0, mapa: mc.get(k) ?? 0 }));

  const sources = [...countBy(v, (r) => normalizeSource(r.utm_source, r.referrer))]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const buttons = [
    ...[...countBy(w, (r) => r.source || "Botão sem nome")].map(([name, value]) => ({ name, value, type: "WhatsApp" })),
    ...[...countBy(m, (r) => r.source || (r.kind === "map" ? "Mapa incorporado" : "Saiba como chegar"))].map(
      ([name, value]) => ({ name, value, type: "Localização" }),
    ),
  ].sort((a, b) => b.value - a.value);

  // Campanhas UTM (origem > meio > campanha > criativo)
  const ck = (r: UtmFields) =>
    [r.utm_source || "—", r.utm_medium || "—", r.utm_campaign || "—", r.utm_content || "—"].join("||");
  const camp = new Map<string, { views: number; whatsapp: number }>();
  v.filter((r) => r.utm_source || r.utm_campaign).forEach((r) => {
    const e = camp.get(ck(r)) ?? { views: 0, whatsapp: 0 };
    e.views++; camp.set(ck(r), e);
  });
  w.filter((r) => r.utm_source || r.utm_campaign).forEach((r) => {
    const e = camp.get(ck(r)) ?? { views: 0, whatsapp: 0 };
    e.whatsapp++; camp.set(ck(r), e);
  });
  const campaigns = [...camp].map(([k, e]) => {
    const [source, medium, campaign, content] = k.split("||");
    return { source, medium, campaign, content, ...e, conversion: conversion(e.whatsapp, e.views) };
  }).sort((a, b) => b.views - a.views || b.whatsapp - a.whatsapp);

  // Tabela por página (respeita filtro de campanha, ignora filtro de página)
  const all = { page: null, campaign: f.campaign };
  const pv2 = countBy(applyFilters(p.views, all).filter(cur), (r) => r.page);
  const pw2 = countBy(applyFilters(p.whatsapp, all).filter(cur), (r) => r.page);
  const pm2 = countBy(applyFilters(p.maps, all).filter(cur), (r) => r.page);
  const pages = [...new Set([...pv2.keys(), ...pw2.keys(), ...pm2.keys()])].map((page) => {
    const a = pv2.get(page) ?? 0, b = pw2.get(page) ?? 0;
    return { page, views: a, whatsapp: b, maps: pm2.get(page) ?? 0, conversion: conversion(b, a) };
  }).sort((a, b) => b.views - a.views);

  const recent = [
    ...v.map((r) => ({ ...r, type: "Acesso", source: null as string | null })),
    ...w.map((r) => ({ ...r, type: "WhatsApp" })),
    ...m.map((r) => ({ ...r, type: "Localização" })),
  ].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 200);

  const allPages = [...new Set([...p.views, ...p.whatsapp, ...p.maps].map((r) => r.page))].sort();
  const allCampaigns = [...new Set([...p.views, ...p.whatsapp].map(campaignLabel))].sort();

  return { kpis, hourly, series, sources, buttons, campaigns, pages, recent, allPages, allCampaigns };
};
