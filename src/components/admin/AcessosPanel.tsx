import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AcessosData = {
  total: number;
  byDay: { date: string; count: number }[];
  byHour: { hour: string; count: number }[];
  byPage: { page: string; count: number }[];
  byReferrer: { referrer: string; count: number }[];
};

const AcessosPanel = ({
  password,
  query = "days=30",
  page,
  periodLabel,
  hourly = false,
}: {
  password: string;
  query?: string;
  page?: string | null;
  periodLabel?: string;
  hourly?: boolean;
}) => {
  const [data, setData] = useState<AcessosData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const pageQs = page ? `&page=${encodeURIComponent(page)}` : "";
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/page-metrics?${query}${pageQs}`;
        const res = await fetch(url, {
          headers: {
            "x-metrics-password": password,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Erro ao carregar");
        if (!cancelled) setData(json as AcessosData);
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

  const chartData = hourly
    ? (data?.byHour ?? []).map((h) => ({ label: h.hour, count: h.count }))
    : (data?.byDay ?? []).map((d) => ({ label: d.date.slice(5), count: d.count }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Eye className="h-4 w-4" /> Acessos à página
          {periodLabel ? (
            <span className="text-xs font-normal text-muted-foreground">({periodLabel})</span>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading && <p className="text-sm text-muted-foreground">Carregando...</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}

        {data && (
          <>
            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">Total de acessos</p>
              <p className="text-3xl font-bold">{data.total}</p>
            </div>

            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="label" fontSize={11} />
                  <YAxis allowDecimals={false} fontSize={11} />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    name="Acessos"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Origem do acesso</TableHead>
                    <TableHead className="text-right">Acessos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.byReferrer.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2} className="text-sm text-muted-foreground">
                        Nenhum acesso registrado neste período.
                      </TableCell>
                    </TableRow>
                  )}
                  {data.byReferrer.map((r) => (
                    <TableRow key={r.referrer}>
                      <TableCell>{r.referrer}</TableCell>
                      <TableCell className="text-right font-medium">{r.count}</TableCell>
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

export default AcessosPanel;
