export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type Utm = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "renova_utm";

/** Extrai UTMs de uma query string (ex.: location.search). */
export const parseUtm = (search: string): Utm => {
  const params = new URLSearchParams(search);
  const out: Utm = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k)?.trim();
    if (v) out[k] = v.slice(0, 200);
  }
  return out;
};

/** Salva as UTMs da URL na sessão (novas UTMs substituem as anteriores) e retorna as válidas. */
export const captureUtm = (search: string): Utm => {
  const fromUrl = parseUtm(search);
  try {
    if (Object.keys(fromUrl).length) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
  } catch {
    return fromUrl;
  }
  return getUtm();
};

export const getUtm = (): Utm => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Utm) : {};
  } catch {
    return {};
  }
};

/** Campos prontos para inserir no banco (null quando ausente). */
export const utmColumns = (u: Utm = getUtm()) => ({
  utm_source: u.utm_source ?? null,
  utm_medium: u.utm_medium ?? null,
  utm_campaign: u.utm_campaign ?? null,
  utm_content: u.utm_content ?? null,
  utm_term: u.utm_term ?? null,
});
