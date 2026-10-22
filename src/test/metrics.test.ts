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
