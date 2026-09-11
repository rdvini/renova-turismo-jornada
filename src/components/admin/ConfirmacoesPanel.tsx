import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalendarCheck, ChevronDown, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Row = {
  id: string;
  page: string;
  source: string | null;
  device: string | null;
  created_at: string;
};

type Data = {
  total: number;
  byDay: { date: string; count: number }[];
  byHour?: { hour: string; count: number }[];
  bySource: { source: string; count: number }[];
  recent: Row[];
};

type MapsRow = {
  id: string;
  page: string;
  kind: string;
  source: string | null;
  created_at: string;
};

type MapsData = {
  total: number;
  botao: number;
  mapa: number;
  byDay: { date: string; button: number; map: number; count: number }[];
  recent: MapsRow[];
};

const brDateTime = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const authHeaders = (password: string) => ({
  "x-metrics-password": password,
  apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
});

const ConfirmacoesPanel = ({
  password,
  query = "days=365",
  periodLabel = "período selecionado",
  page,
  hourly = false,
}: {
  password: string;
  query?: string;
  periodLabel?: string;
  page?: string | null;
  hourly?: boolean;
}) => {
  const targetPage = page ?? "/semana-do-cliente";
  const [data, setData] = useState<Data | null>(null);
  const [maps, setMaps] = useState<MapsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const base = import.meta.env.VITE_SUPABASE_URL;
        const qs = `${query}&page=${encodeURIComponent(targetPage)}`;
        const [waRes, mapsRes] = await Promise.all([
          fetch(`${base}/functions/v1/whatsapp-metrics?${qs}`, { headers: authHeaders(password) }),
          fetch(`${base}/functions/v1/maps-metrics?${qs}`, { headers: authHeaders(password) }),
        ]);
        const waJson = await waRes.json();
        const mapsJson = await mapsRes.json();
        if (!waRes.ok) throw new Error(waJson.error || "Erro ao carregar");
        if (!cancelled) {
          setData(waJson as Data);
          setMaps(mapsRes.ok ? (mapsJson as MapsData) : null);
        }
      } catch (e) {
        if (!cancelled) setError("Não foi possível carregar os cliques.");
        console.error("confirmacoes panel error", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (password) void load();
    return () => {
      cancelled = true;
    };
  }, [password, query, targetPage]);

  const exportCsv = () => {
    if (!data) return;
    const header = "data;tipo;origem;dispositivo\n";
    const waBody = data.recent.map(
      (r) => `"${brDateTime(r.created_at)}";"WhatsApp";"${r.source ?? "-"}";"${r.device ?? "-"}"`,
    );
    const mapsBody = (maps?.recent ?? []).map(
      (r) =>
        `"${brDateTime(r.created_at)}";"${r.kind === "map" ? "Mapa" : "Localização"}";"${r.source ?? "-"}";"-"`,
    );
    const blob = new Blob([`\uFEFF${header}${[...waBody, ...mapsBody].join("\n")}`], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${targetPage.replace(/\//g, "") || "home"}-cliques.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const dayChart = (data?.byDay ?? [])
    .map((d) => ({
      label: d.date.slice(5),
      whatsapp: d.count,
      local: maps?.byDay.find((m) => m.date === d.date)?.count ?? 0,
    }))
    .filter((d) => d.whatsapp > 0 || d.local > 0)
    .slice(-31);

  const hourChart = (data?.byHour ?? []).map((h) => ({
    label: h.hour,
    whatsapp: h.count,
    local: 0,
  }));

  const chartData = hourly && hourChart.length > 0 ? hourChart : dayChart;

  const bySource = data?.bySource ?? [];
  const mapsButton = maps?.botao ?? 0;
  const mapsMap = maps?.mapa ?? 0;

  return (
    <section className="space-y-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-4 text-left transition-colors hover:bg-muted/40"
      >
        <div className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight">
            Resumo da página <span className="font-mono text-base">{targetPage}</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {open && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                exportCsv();
              }}
              disabled={!data?.total && !maps?.total}
            >
              <Download className="h-4 w-4 mr-1" /> Exportar CSV
            </Button>
          )}
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {open && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: `Cliques no WhatsApp · ${periodLabel}`, value: data?.total ?? 0 },
              { label: "Botão de localização", value: mapsButton },
              { label: "Cliques no mapa", value: mapsMap },
              { label: "Total de interações", value: (data?.total ?? 0) + (maps?.total ?? 0) },
            ].map((kpi) => (
              <Card key={kpi.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{loading ? "..." : kpi.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {hourly && hourChart.length > 0 ? "Cliques por hora" : "Cliques por dia"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[240px]">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="label" fontSize={11} />
                    <YAxis allowDecimals={false} width={30} fontSize={11} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="whatsapp"
                      name="WhatsApp"
                      fill="hsl(var(--primary))"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="local"
                      name="Localização"
                      fill="hsl(var(--secondary))"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum clique registrado ainda.</p>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Por botão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {bySource.length === 0 && mapsButton === 0 && mapsMap === 0 && (
                  <p className="text-sm text-muted-foreground">Sem dados.</p>
                )}
                {bySource.map((s) => (
                  <div key={s.source} className="flex items-center justify-between text-sm">
                    <span className="truncate pr-2">{s.source || "-"}</span>
                    <span className="font-semibold">{s.count}</span>
                  </div>
                ))}
                {mapsButton > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate pr-2">Saiba como chegar</span>
                    <span className="font-semibold">{mapsButton}</span>
                  </div>
                )}
                {mapsMap > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate pr-2">Mapa do Google</span>
                    <span className="font-semibold">{mapsMap}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Últimos cliques</CardTitle>
              </CardHeader>
              <CardContent className="max-h-[320px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quando</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Origem</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ...(data?.recent ?? []).map((r) => ({
                        id: `wa-${r.id}`,
                        created_at: r.created_at,
                        tipo: "WhatsApp",
                        source: r.source,
                      })),
                      ...(maps?.recent ?? []).map((r) => ({
                        id: `mp-${r.id}`,
                        created_at: r.created_at,
                        tipo: r.kind === "map" ? "Mapa" : "Localização",
                        source: r.source,
                      })),
                    ]
                      .sort((a, b) => b.created_at.localeCompare(a.created_at))
                      .slice(0, 40)
                      .map((r) => (
                        <TableRow key={r.id}>
                          <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                            {brDateTime(r.created_at)}
                          </TableCell>
                          <TableCell className="text-xs">{r.tipo}</TableCell>
                          <TableCell className="max-w-[240px] truncate">{r.source ?? "-"}</TableCell>
                        </TableRow>
                      ))}
                    {!loading && (data?.recent.length ?? 0) === 0 && (maps?.recent.length ?? 0) === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                          Nenhum clique registrado ainda.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </section>
  );
};

export default ConfirmacoesPanel;
