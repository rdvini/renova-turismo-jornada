import { useEffect, useState } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalendarCheck, Download } from "lucide-react";
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

type Rsvp = {
  id: string;
  nome: string;
  telefone: string;
  resposta: "sim" | "nao" | string;
  created_at: string;
};

type RsvpData = {
  total: number;
  sim: number;
  nao: number;
  taxaPresenca: number;
  respostas: Rsvp[];
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

const RsvpPanel = ({ password }: { password: string }) => {
  const [data, setData] = useState<RsvpData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/event-rsvps?evento=semana-do-cliente`;
        const res = await fetch(url, {
          headers: {
            "x-metrics-password": password,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        });
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as RsvpData;
        if (!cancelled) setData(json);
      } catch (e) {
        console.error("rsvp panel error", e);
        if (!cancelled) setError("Não foi possível carregar as confirmações.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (password) load();
    return () => {
      cancelled = true;
    };
  }, [password]);

  const exportCsv = () => {
    if (!data) return;
    const header = "nome;telefone;resposta;data\n";
    const body = data.respostas
      .map(
        (r) =>
          `"${r.nome.replace(/"/g, "'")}";"${r.telefone}";${r.resposta === "sim" ? "Sim" : "Não"};${brDateTime(r.created_at)}`,
      )
      .join("\n");
    const blob = new Blob([`\uFEFF${header}${body}`], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "semana-do-cliente-confirmacoes.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const chart = [
    { name: "Sim", count: data?.sim ?? 0, color: "hsl(142 70% 45%)" },
    { name: "Não", count: data?.nao ?? 0, color: "hsl(var(--muted-foreground))" },
  ];

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight">Semana do Cliente · check-in</h2>
        </div>
        <Button variant="outline" size="sm" onClick={exportCsv} disabled={!data?.total}>
          <Download className="h-4 w-4 mr-1" /> Exportar CSV
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Respostas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{loading ? "..." : (data?.total ?? 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vão participar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-600">{loading ? "..." : (data?.sim ?? 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Não vão</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{loading ? "..." : (data?.nao ?? 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de presença</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loading ? "..." : `${(data?.taxaPresenca ?? 0).toFixed(0)}%`}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Sim x Não</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} width={30} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {chart.map((c) => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Últimas respostas</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[320px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>WhatsApp</TableHead>
                  <TableHead>Resposta</TableHead>
                  <TableHead>Quando</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data?.respostas ?? []).slice(0, 100).map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.nome}</TableCell>
                    <TableCell className="font-mono text-xs">{r.telefone}</TableCell>
                    <TableCell>
                      <Badge variant={r.resposta === "sim" ? "default" : "secondary"}>
                        {r.resposta === "sim" ? "Sim" : "Não"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {brDateTime(r.created_at)}
                    </TableCell>
                  </TableRow>
                ))}
                {!loading && (data?.respostas.length ?? 0) === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-sm text-muted-foreground">
                      Nenhuma confirmação ainda.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RsvpPanel;
