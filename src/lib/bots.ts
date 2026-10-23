/**
 * Identifica acessos que não são de pessoas reais (robôs, monitores, prévias de anúncios)
 * e acessos internos (editor, prévia, testes), para não distorcer as métricas.
 */
const BOT_RE =
  /bot|crawl|spider|slurp|externalhit|externalads|facebookcatalog|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python|axios|node-fetch|go-http|java\//i;

// Robô que acessa o site a cada ~5 min, 24h por dia, sem referrer e sem nunca clicar
// (Chrome 119 de 2023 no Windows, versão que nenhum navegador real usa mais).
const STALE_WINDOWS_CHROME_RE = /Windows NT 10\.0; Win64; x64\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/119\.0\.0\.0 Safari\/537\.36$/;

export const isBot = (ua: string | null | undefined): boolean => {
  if (!ua) return false;
  return BOT_RE.test(ua) || STALE_WINDOWS_CHROME_RE.test(ua);
};

const INTERNAL_RE = /lovable\.dev|lovableproject\.com|id-preview--|localhost|127\.0\.0\.1/i;

/** Referrer ou host do editor/prévia/testes locais. */
export const isInternal = (value: string | null | undefined): boolean => !!value && INTERNAL_RE.test(value);

/** Só registra acessos/cliques de visitantes reais no site publicado. */
export const shouldTrack = (): boolean => {
  if (typeof window === "undefined") return false;
  if (isInternal(window.location.hostname)) return false;
  if ((navigator as Navigator & { webdriver?: boolean }).webdriver) return false;
  return !isBot(navigator.userAgent);
};
