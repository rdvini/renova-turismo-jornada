import { useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

type Metrics = {
  total: number;
  days: number;
  byDay: { date: string; count: number }[];
  byPage: { page: string; count: number }[];
  bySource: { source: string; count: number }[];
};

const STORAGE_KEY = "metrics_pwd";

const Metricas = () => {
  const [password, setPassword] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) ?? "",
  );
  const [authed, setAuthed] = useState<boolean>(Boolean(password));
  const [days, setDays] = useState<number>(30);
  const [data, setData] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async (pwd: string, d: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke<Metrics>(
        `whatsapp-metrics?days=${d}`,
        { method: "GET", headers: { "x-metrics-password": pwd } },
      );
      if (error) throw error;
      if (!data) throw new Error("Sem dados");
      setData(data);
      setAuthed(true);
      localStorage.setItem(STORAGE_KEY, pwd);
    } catch (e) {
      setError("Senha incorreta ou erro ao carregar.");
      setAuthed(false);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed && password) fetchMetrics(password, days);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  useEffect(() => {
    document.title = "Métricas WhatsApp | Renova Turismo";
  }, []);

  const chartData = useMemo(
    () =>
      data?.byDay.map((d) => ({
        ...d,
        label: format(parseISO(d.date), "dd/MM", { locale: ptBR }),
      })) ?? [],
    [data],
  );

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Acesso restrito</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") fetchMetrics(password, days);
              }}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              className="w-full"
              disabled={!password || loading}
              onClick={() => fetchMetrics(password, days)}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-6 max-w-6xl mx-auto space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Cliques no WhatsApp</h1>
          <p className="text-muted-foreground">
            Pessoas que iniciaram conversa nos últimos {days} dias
          </p>
        </div>
        <div className="flex gap-2">
          {[7, 30, 90].map((d) => (
            <Button
              key={d}
              variant={days === d ? "default" : "outline"}
              size="sm"
              onClick={() => setDays(d)}
            >
              {d} dias
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              localStorage.removeItem(STORAGE_KEY);
              setPassword("");
              setAuthed(false);
              setData(null);
            }}
          >
            Sair
          </Button>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-5xl font-bold">
            {loading ? "..." : data?.total ?? 0}
          </CardTitle>
          <p className="text-muted-foreground">Total de cliques no período</p>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cliques por dia</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="label" fontSize={12} />
              <YAxis allowDecimals={false} fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cliques por página</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {data?.byPage.length ? (
                data.byPage.map((p) => (
                  <li
                    key={p.page}
                    className="flex justify-between py-2 text-sm"
                  >
                    <span className="font-mono truncate">{p.page}</span>
                    <span className="font-semibold">{p.count}</span>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground text-sm">Sem dados.</li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Origem do clique (botão)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {data?.bySource.length ? (
                data.bySource.map((s) => (
                  <li
                    key={s.source}
                    className="flex justify-between py-2 text-sm"
                  >
                    <span className="truncate pr-2">{s.source}</span>
                    <span className="font-semibold">{s.count}</span>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground text-sm">Sem dados.</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Metricas;
