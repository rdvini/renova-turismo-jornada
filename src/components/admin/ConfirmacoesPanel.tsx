import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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
  bySource: { source: string; count: number }[];
  recent: Row[];
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

const ConfirmacoesPanel = ({
  password,
  query = "days=365",
  periodLabel = "período selecionado",
}: {
  password: string;
  query?: string;
  periodLabel?: string;
}) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/whatsapp-metrics?${query}&page=${encodeURIComponent("/semana-do-cliente")}`;
        const res = await fetch(url, {
          headers: {
            "x-metrics-password": password,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Erro ao carregar");
        if (!cancelled) setData(json as Data);
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
  }, [password, query]);

  const exportCsv = () => {
    if (!data) return;
    const header = "data;origem;dispositivo\n";
    const body = data.recent
      .map((r) => `"${brDateTime(r.created_at)}";"${r.source ?? "-"}";"${r.device ?? "-"}"`)
      .join("\n");
    const blob = new Blob([`\uFEFF${header}${body}`], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "semana-do-cliente-cliques.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const chartData = (data?.byDay ?? []).filter((d) => d.count > 0).slice(-30);

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
            Semana do Cliente · cliques em "Confirmar presença"
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
              disabled={!data?.total}
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
          <div className="grid gap-4 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de cliques (12 meses)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{loading ? "..." : (data?.total ?? 0)}</p>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Cliques por dia</CardTitle>
              </CardHeader>
              <CardContent className="h-[220px]">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" tickFormatter={(d: string) => d.slice(5)} fontSize={11} />
                      <YAxis allowDecimals={false} width={30} fontSize={11} />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhum clique registrado ainda.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Por botão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(data?.bySource ?? []).length === 0 && (
                  <p className="text-sm text-muted-foreground">Sem dados.</p>
                )}
                {(data?.bySource ?? []).map((s) => (
                  <div key={s.source} className="flex items-center justify-between text-sm">
                    <span className="truncate pr-2">{s.source || "-"}</span>
                    <span className="font-semibold">{s.count}</span>
                  </div>
                ))}
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
                      <TableHead>Origem</TableHead>
                      <TableHead>Dispositivo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(data?.recent ?? []).map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                          {brDateTime(r.created_at)}
                        </TableCell>
                        <TableCell className="max-w-[240px] truncate">{r.source ?? "-"}</TableCell>
                        <TableCell className="text-xs">{r.device ?? "-"}</TableCell>
                      </TableRow>
                    ))}
                    {!loading && (data?.recent.length ?? 0) === 0 && (
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
