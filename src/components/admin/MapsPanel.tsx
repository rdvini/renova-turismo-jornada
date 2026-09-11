import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  byPage: { page: string; count: number }[];
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

const MapsPanel = ({
  password,
  query = "days=365",
  page,
}: {
  password: string;
  query?: string;
  page?: string | null;
}) => {
  const [data, setData] = useState<MapsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const pageQs = page ? `&page=${encodeURIComponent(page)}` : "";
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/maps-metrics?${query}${pageQs}`;
        const res = await fetch(url, {
          headers: {
            "x-metrics-password": password,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Erro ao carregar");
        if (!cancelled) setData(json as MapsData);
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (password) void load();
    return () => {
      cancelled = true;
    };
  }, [password, query, page]);

  const exportCsv = () => {
    if (!data) return;
    const header = "data,pagina,tipo,origem\n";
    const body = data.recent
      .map((r) =>
        [brDateTime(r.created_at), r.page, r.kind === "map" ? "mapa" : "botao", r.source ?? ""]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cliques-mapa.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const chartData = (data?.byDay ?? []).filter((d) => d.count > 0).slice(-30);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <MapPin className="h-4 w-4" /> Cliques em "Saiba como chegar" e mapa
        </CardTitle>
        <Button variant="outline" size="sm" onClick={exportCsv} disabled={!data}>
          <Download className="h-4 w-4 mr-1" /> CSV
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading && <p className="text-sm text-muted-foreground">Carregando...</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}

        {data && (
          <>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border p-4">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{data.total}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-xs text-muted-foreground">Botão</p>
                <p className="text-2xl font-bold">{data.botao}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-xs text-muted-foreground">Mapa</p>
                <p className="text-2xl font-bold">{data.mapa}</p>
              </div>
            </div>

            {chartData.length > 0 && (
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tickFormatter={(d: string) => d.slice(5)} fontSize={11} />
                    <YAxis allowDecimals={false} fontSize={11} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="button" name="Botão" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="map" name="Mapa" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Página</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Origem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.recent.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-sm text-muted-foreground">
                        Nenhum clique registrado ainda.
                      </TableCell>
                    </TableRow>
                  )}
                  {data.recent.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="whitespace-nowrap">{brDateTime(r.created_at)}</TableCell>
                      <TableCell>{r.page}</TableCell>
                      <TableCell>
                        <Badge variant={r.kind === "map" ? "secondary" : "default"}>
                          {r.kind === "map" ? "Mapa" : "Botão"}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[220px] truncate">{r.source ?? "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MapsPanel;
