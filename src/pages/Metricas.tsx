import { useEffect, useMemo, useState } from "react";
import { BarChart3, LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FilterBar, { presetPeriod, type Period } from "@/components/admin/metrics/FilterBar";
import { ButtonsCard, CampaignsCard, KpiCards, PagesTable, RecentLogs, SourcesCard, TrendChart } from "@/components/admin/metrics/Sections";
import { aggregate, type MetricsPayload } from "@/lib/metrics";

const PWD_KEY = "renova_metrics_pwd";

const Metricas = () => {
  const [password, setPassword] = useState(() => sessionStorage.getItem(PWD_KEY) ?? "");
  const [authed, setAuthed] = useState(false);
  const [period, setPeriod] = useState<Period>(() => presetPeriod("30"));
  const [page, setPage] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<string | null>(null);
  const [payload, setPayload] = useState<MetricsPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async (pwd: string, p: Period) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/metrics-overview?from=${p.from}&to=${p.to}`,
        {
          headers: {
            "x-metrics-password": pwd,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        },
      );
      if (res.status === 401) throw new Error("auth");
      if (!res.ok) throw new Error("load");
      setPayload(await res.json());
      setAuthed(true);
      sessionStorage.setItem(PWD_KEY, pwd);
    } catch (e) {
      const auth = (e as Error).message === "auth";
      setError(auth ? "Senha incorreta." : "Erro ao carregar os dados. Tente novamente.");
      if (auth) { setAuthed(false); sessionStorage.removeItem(PWD_KEY); }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Métricas | Renova Turismo";
    if (password) void load(password, period);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authed) void load(password, period);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const agg = useMemo(() => (payload ? aggregate(payload, { page, campaign }) : null), [payload, page, campaign]);

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center space-y-3">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Painel de Métricas</CardTitle>
            <p className="text-sm text-muted-foreground">Acesso restrito</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="password" placeholder="Senha" value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && password && load(password, period)} />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button className="w-full" disabled={!password || loading} onClick={() => load(password, period)}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-2 pt-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold">Métricas</h1>
          </div>
          <div className="flex-1 min-w-[280px]">
            <FilterBar period={period} onPeriod={setPeriod}
              page={page} pages={agg?.allPages ?? []} onPage={setPage}
              campaign={campaign} campaigns={agg?.allCampaigns ?? []} onCampaign={setCampaign} />
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" aria-label="Atualizar" onClick={() => load(password, period)} disabled={loading}>
              <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Sair"
              onClick={() => { sessionStorage.removeItem(PWD_KEY); setPassword(""); setAuthed(false); }}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-4">
        {error && <p className="text-sm text-destructive">{error}</p>}
        {agg && (
          <>
            <KpiCards k={agg.kpis} />
            <TrendChart data={agg.series} hourly={agg.hourly} />
            <div className="grid md:grid-cols-2 gap-4">
              <SourcesCard items={agg.sources} />
              <ButtonsCard items={agg.buttons} />
            </div>
            <CampaignsCard rows={agg.campaigns} onPick={setCampaign} />
            {!page && <PagesTable rows={agg.pages} onPick={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />}
            <RecentLogs rows={agg.recent} />
            <p className="text-xs text-muted-foreground text-center">
              Horários de Brasília. Dados a partir de 11/09/2026 (início do registro de acessos). Robôs, testes e toques repetidos no mesmo botão não são contados.
            </p>
          </>
        )}
      </div>
    </main>
  );
};

export default Metricas;
