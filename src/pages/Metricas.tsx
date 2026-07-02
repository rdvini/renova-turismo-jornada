import { useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CalendarIcon,
  Clock,
  LogOut,
  MessageCircle,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";
import { supabase } from "@/integrations/supabase/client";

// YYYY-MM-DD do dia atual em Brasília (UTC-3)
const brYmd = (d: Date) =>
  new Date(d.getTime() - 3 * 60 * 60 * 1000).toISOString().slice(0, 10);

// Converte YYYY-MM-DD (dia BR) para um Date "local" para o calendário
const ymdToDate = (ymd: string) => {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const dateToYmd = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

type Preset =
  | { kind: "today" }
  | { kind: "yesterday" }
  | { kind: "todayYesterday" }
  | { kind: "lastDays"; days: number }
  | { kind: "custom"; from: string; to: string };

const presetLabel = (p: Preset): string => {
  switch (p.kind) {
    case "today":
      return "Hoje";
    case "yesterday":
      return "Ontem";
    case "todayYesterday":
      return "Hoje e ontem";
    case "lastDays":
      return `${p.days}d`;
    case "custom":
      return `${format(ymdToDate(p.from), "dd/MM/yy")} – ${format(ymdToDate(p.to), "dd/MM/yy")}`;
  }
};

const presetToQuery = (p: Preset): string => {
  const today = brYmd(new Date());
  const shift = (ymd: string, n: number) => {
    const t = Date.parse(`${ymd}T00:00:00.000Z`) + n * 86400000;
    return new Date(t).toISOString().slice(0, 10);
  };
  switch (p.kind) {
    case "today":
      return `from=${today}&to=${today}`;
    case "yesterday": {
      const y = shift(today, -1);
      return `from=${y}&to=${y}`;
    }
    case "todayYesterday": {
      const y = shift(today, -1);
      return `from=${y}&to=${today}`;
    }
    case "lastDays":
      return `days=${p.days}`;
    case "custom":
      return `from=${p.from}&to=${p.to}`;
  }
};

type Metrics = {
  total: number;
  prevTotal: number;
  delta: number | null;
  days: number;
  avgPerDay: number;
  peakDay: { date: string; count: number };
  peakHour: { hour: number; count: number };
  byDay: { date: string; count: number }[];
  byHour: { hour: number; count: number }[];
  byDow: { name: string; count: number }[];
  byPage: { page: string; count: number }[];
  bySource: { source: string; count: number }[];
  byReferrer: { referrer: string; count: number }[];
  byDevice: { device: string; count: number }[];
  recent: {
    id: string;
    page: string;
    source: string | null;
    referrer: string;
    device: string;
    created_at: string;
  }[];
};

const PIE_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(142 70% 45%)",
  "hsl(280 65% 60%)",
  "hsl(30 90% 55%)",
  "hsl(340 75% 55%)",
];

const Metricas = () => {
  const [password, setPassword] = useState<string>("");
  const [authed, setAuthed] = useState<boolean>(false);
  const [days, setDays] = useState<number>(30);
  const [data, setData] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async (pwd: string, d: number) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/whatsapp-metrics?days=${d}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "x-metrics-password": pwd,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`${res.status}: ${body}`);
      }
      const json = (await res.json()) as Metrics;
      setData(json);
      setAuthed(true);
    } catch (e) {
      console.error("metrics error", e);
      setError("Senha incorreta ou erro ao carregar.");
      setAuthed(false);
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

  const dailyChart = useMemo(
    () =>
      data?.byDay.map((d) => ({
        ...d,
        label: format(parseISO(d.date), "dd/MM", { locale: ptBR }),
      })) ?? [],
    [data],
  );

  const hourChart = useMemo(
    () =>
      data?.byHour.map((h) => ({
        ...h,
        label: `${String(h.hour).padStart(2, "0")}h`,
      })) ?? [],
    [data],
  );

  const maxPage = data?.byPage[0]?.count ?? 0;
  const maxSource = data?.bySource[0]?.count ?? 0;

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/10 p-4">
        <Card className="w-full max-w-sm shadow-xl border-primary/20">
          <CardHeader className="text-center space-y-3">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Painel de Métricas</CardTitle>
            <p className="text-sm text-muted-foreground">Acesso restrito</p>
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

  const deltaPositive = (data?.delta ?? 0) >= 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Activity className="h-4 w-4" /> Dashboard ao vivo
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Cliques no WhatsApp
            </h1>
            <p className="text-muted-foreground">
              Últimos {days} dias · atualizado agora
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-muted p-1">
              {[7, 30, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    days === d
                      ? "bg-background shadow-sm font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setPassword("");
                setAuthed(false);
                setData(null);
              }}
            >
              <LogOut className="h-4 w-4 mr-1" /> Sair
            </Button>
          </div>
        </header>

        {/* KPI cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="Total de cliques"
            value={loading ? "..." : String(data?.total ?? 0)}
            icon={<MessageCircle className="h-4 w-4" />}
            footer={
              data?.delta !== null && data?.delta !== undefined ? (
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium ${
                    deltaPositive ? "text-emerald-600" : "text-destructive"
                  }`}
                >
                  {deltaPositive ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {Math.abs(data.delta).toFixed(1)}% vs período anterior
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">
                  sem dados anteriores
                </span>
              )
            }
            accent="from-primary/20 to-primary/5"
          />
          <KpiCard
            label="Média diária"
            value={loading ? "..." : (data?.avgPerDay ?? 0).toFixed(1)}
            icon={<TrendingUp className="h-4 w-4" />}
            footer={
              <span className="text-xs text-muted-foreground">
                cliques por dia no período
              </span>
            }
            accent="from-emerald-500/20 to-emerald-500/5"
          />
          <KpiCard
            label="Dia de pico"
            value={
              data?.peakDay?.date
                ? format(parseISO(data.peakDay.date), "dd MMM", { locale: ptBR })
                : "—"
            }
            icon={<Activity className="h-4 w-4" />}
            footer={
              <span className="text-xs text-muted-foreground">
                {data?.peakDay?.count ?? 0} cliques
              </span>
            }
            accent="from-amber-500/20 to-amber-500/5"
          />
          <KpiCard
            label="Horário de pico"
            value={
              data?.peakHour
                ? `${String(data.peakHour.hour).padStart(2, "0")}:00 BRT`
                : "—"
            }
            icon={<Clock className="h-4 w-4" />}
            footer={
              <span className="text-xs text-muted-foreground">
                {data?.peakHour?.count ?? 0} cliques nessa hora
              </span>
            }
            accent="from-violet-500/20 to-violet-500/5"
          />
        </section>

        {/* Daily trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendência diária</CardTitle>
            <p className="text-sm text-muted-foreground">
              Evolução dos cliques ao longo do tempo
            </p>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyChart}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="label" fontSize={11} />
                <YAxis allowDecimals={false} fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#colorClicks)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Hourly */}
          <Card>
            <CardHeader>
              <CardTitle>Cliques por hora (Brasília)</CardTitle>
              <p className="text-sm text-muted-foreground">
                Quando seu público mais converte
              </p>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourChart}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="label" fontSize={10} interval={2} />
                  <YAxis allowDecimals={false} fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Day of week */}
          <Card>
            <CardHeader>
              <CardTitle>Cliques por dia da semana</CardTitle>
              <p className="text-sm text-muted-foreground">
                Padrão semanal de interesse
              </p>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.byDow ?? []}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" fontSize={11} />
                  <YAxis allowDecimals={false} fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pages */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Top páginas</CardTitle>
              <p className="text-sm text-muted-foreground">
                Quais landing pages mais convertem em WhatsApp
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {data?.byPage.length ? (
                  data.byPage.slice(0, 10).map((p) => {
                    const pct = maxPage > 0 ? (p.count / maxPage) * 100 : 0;
                    return (
                      <li key={p.page} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-mono truncate pr-2">{p.page}</span>
                          <span className="font-semibold">{p.count}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li className="text-muted-foreground text-sm">Sem dados.</li>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Devices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" /> Dispositivos
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                De onde vêm os cliques
              </p>
            </CardHeader>
            <CardContent className="h-56">
              {data?.byDevice.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.byDevice}
                      dataKey="count"
                      nameKey="device"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={2}
                    >
                      {data.byDevice.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-muted-foreground">Sem dados.</p>
              )}
              <div className="mt-2 flex flex-wrap gap-2 justify-center">
                {data?.byDevice.map((d, i) => (
                  <div key={d.device} className="flex items-center gap-1 text-xs">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                    />
                    {d.device} ({d.count})
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Botão de origem</CardTitle>
              <p className="text-sm text-muted-foreground">
                Qual CTA gerou o clique
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {data?.bySource.length ? (
                  data.bySource.map((s) => {
                    const pct = maxSource > 0 ? (s.count / maxSource) * 100 : 0;
                    return (
                      <li key={s.source} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="truncate pr-2">{s.source}</span>
                          <span className="font-semibold">{s.count}</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-secondary to-secondary/60 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li className="text-muted-foreground text-sm">Sem dados.</li>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Referrers */}
          <Card>
            <CardHeader>
              <CardTitle>Origem do tráfego</CardTitle>
              <p className="text-sm text-muted-foreground">
                De onde o visitante chegou antes do clique
              </p>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {data?.byReferrer.length ? (
                  data.byReferrer.map((r) => (
                    <li
                      key={r.referrer}
                      className="flex justify-between py-2.5 text-sm"
                    >
                      <Badge variant="outline" className="font-normal">
                        {r.referrer}
                      </Badge>
                      <span className="font-semibold">{r.count}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground text-sm py-2">Sem dados.</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade recente</CardTitle>
            <p className="text-sm text-muted-foreground">
              Últimos {data?.recent.length ?? 0} cliques registrados
            </p>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quando</TableHead>
                    <TableHead>Página</TableHead>
                    <TableHead>Botão</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Device</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.recent.length ? (
                    data.recent.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {format(parseISO(r.created_at), "dd/MM HH:mm", {
                            locale: ptBR,
                          })}
                        </TableCell>
                        <TableCell className="font-mono text-xs">{r.page}</TableCell>
                        <TableCell className="text-xs max-w-xs truncate">
                          {r.source ?? "—"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="font-normal text-xs">
                            {r.referrer}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">{r.device}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                        Sem cliques ainda.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

const KpiCard = ({
  label,
  value,
  icon,
  footer,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  footer: React.ReactNode;
  accent: string;
}) => (
  <Card className="relative overflow-hidden">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${accent} pointer-events-none`}
    />
    <CardContent className="relative p-5 space-y-2">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
        <span className="h-7 w-7 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
          {icon}
        </span>
      </div>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      <div>{footer}</div>
    </CardContent>
  </Card>
);

export default Metricas;
