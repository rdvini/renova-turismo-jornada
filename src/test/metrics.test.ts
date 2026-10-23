import { describe, it, expect } from "vitest";
import { parseUtm } from "@/lib/utm";
import { normalizeSource, conversion, brParts } from "@/lib/metrics";

describe("UTMs", () => {
  it("extrai os parâmetros utm da URL", () => {
    expect(parseUtm("?utm_source=meta_ads&utm_campaign=turquia&x=1")).toEqual({
      utm_source: "meta_ads",
      utm_campaign: "turquia",
    });
  });
});

describe("origem", () => {
  it("prioriza utm_source sobre o referrer", () => {
    expect(normalizeSource("instagram", "https://www.google.com/")).toBe("Instagram");
  });
  it("usa o referrer quando não há UTM", () => {
    expect(normalizeSource(null, "https://www.google.com/")).toBe("Google");
  });
  it("sem UTM e sem referrer é Direto", () => {
    expect(normalizeSource(null, null)).toBe("Direto");
  });
});

describe("conversão e fuso", () => {
  it("calcula cliques ÷ acessos em %", () => {
    expect(conversion(38, 450)).toBe(8.4);
    expect(conversion(5, 0)).toBe(0);
  });
  it("usa o horário de Brasília (UTC-3)", () => {
    expect(brParts("2026-10-23T02:30:00Z")).toEqual({ ymd: "2026-10-22", hour: 23 });
  });
});

import { isBot } from "@/lib/bots";
import { aggregate, type MetricsPayload } from "@/lib/metrics";

const BOT_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
const PHONE_UA =
  "Mozilla/5.0 (Linux; Android 15; moto g35 5G) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/140.0 Mobile Safari/537.36";
const utm = { utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null };
const view = (at: string, ua = PHONE_UA, page = "/portugal", referrer: string | null = null) =>
  ({ ...utm, created_at: at, page, referrer, user_agent: ua });
const click = (at: string, ua = PHONE_UA, page = "/portugal") =>
  ({ ...view(at, ua, page), source: "Saiba Mais" });
const payload = (p: Partial<MetricsPayload>): MetricsPayload => ({
  from: "2026-10-01", to: "2026-10-31", prevFrom: "2026-09-01", prevTo: "2026-09-30",
  views: [], whatsapp: [], maps: [], ...p,
});
const none = { page: null, campaign: null };

describe("limpeza dos dados", () => {
  it("reconhece robôs e o Chrome 119 que acessa a cada 5 minutos", () => {
    expect(isBot(BOT_UA)).toBe(true);
    expect(isBot("meta-externalads/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)")).toBe(true);
    expect(isBot(PHONE_UA)).toBe(false);
  });

  it("acessos de robôs e do editor não contam", () => {
    const k = aggregate(payload({
      views: [
        view("2026-10-10T15:00:00Z"),
        view("2026-10-10T15:05:00Z", BOT_UA),
        view("2026-10-10T15:06:00Z", PHONE_UA, "/portugal", "https://lovable.dev/"),
      ],
    }), none).kpis;
    expect(k.views).toBe(1);
  });

  it("toque duplo no mesmo botão conta como 1 clique", () => {
    const k = aggregate(payload({
      views: [view("2026-10-10T15:00:00Z"), view("2026-10-10T16:00:00Z")],
      whatsapp: [click("2026-10-10T15:01:00Z"), click("2026-10-10T15:01:02Z"), click("2026-10-10T15:20:00Z")],
    }), none).kpis;
    expect(k.whatsapp).toBe(2);
    expect(k.conversion).toBe(100);
  });

  it("cliques anteriores a 11/09/2026 (sem acessos registrados) ficam de fora", () => {
    const k = aggregate(payload({
      from: "2026-08-01", to: "2026-10-31", prevFrom: "2026-05-01", prevTo: "2026-07-31",
      views: [view("2026-10-10T15:00:00Z")],
      whatsapp: [click("2026-08-15T15:00:00Z"), click("2026-10-10T15:01:00Z")],
    }), none).kpis;
    expect(k.whatsapp).toBe(1);
    expect(k.prev.views).toBe(0);
  });
});
