import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownRight, ArrowUpRight, ChevronDown, Download, Eye, MapPin, MessageCircle, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { variation, brParts, type aggregate } from "@/lib/metrics";
import { ymdToDate } from "./FilterBar";
import { cn } from "@/lib/utils";

type Agg = ReturnType<typeof aggregate>;
const nf = new Intl.NumberFormat("pt-BR");

const Empty = ({ text = "Sem dados no período." }) => (
  <p className="text-sm text-muted-foreground py-6 text-center">{text}</p>
);

export const KpiCards = ({ k }: { k: Agg["kpis"] }) => {
  const items = [
    { label: "Acessos", icon: Eye, cur: k.views, prev: k.prev.views, fmt: nf.format },
    { label: "Cliques no WhatsApp", icon: MessageCircle, cur: k.whatsapp, prev: k.prev.whatsapp, fmt: nf.format },
    { label: "Cliques em localização", icon: MapPin, cur: k.maps, prev: k.prev.maps, fmt: nf.format },
    { label: "Conversão (WhatsApp ÷ acessos)", icon: Percent, cur: k.conversion, prev: k.prev.conversion, fmt: (n: number) => `${n.toLocaleString("pt-BR")}%` },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map(({ label, icon: Icon, cur, prev, fmt }) => {
        const v = variation(cur, prev);
        return (
          <Card key={label}>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon className="h-4 w-4" /> {label}
              </div>
              <div className="text-2xl md:text-3xl font-bold">{fmt(cur)}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                {v === null ? "sem dados anteriores" : (
                  <>
                    <span className={cn("flex items-center font-medium", v >= 0 ? "text-primary" : "text-destructive")}>
                      {v >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {Math.abs(v).toLocaleString("pt-BR")}%
                    </span>
                    vs. período anterior
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export const TrendChart = ({ data, hourly }: { data: Agg["series"]; hourly: boolean }) => {
  const rows = data.map((d) => ({ ...d, label: hourly ? d.key : format(ymdToDate(d.key), "dd/MM", { locale: ptBR }) }));
  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-base">Evolução {hourly ? "por hora" : "por dia"}</CardTitle></CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={rows} margin={{ left: -20, right: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="label" fontSize={11} stroke="hsl(var(--muted-foreground))" />
            <YAxis allowDecimals={false} fontSize={11} stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
            <Legend />
            <Area type="monotone" dataKey="acessos" name="Acessos" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.15)" />
            <Area type="monotone" dataKey="whatsapp" name="WhatsApp" stroke="hsl(var(--accent))" fill="hsl(var(--accent) / 0.2)" />
            <Area type="monotone" dataKey="mapa" name="Localização" stroke="hsl(var(--muted-foreground))" fill="transparent" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const BarList = ({ items }: { items: { name: string; value: number; type?: string }[] }) => {
  const max = items[0]?.value ?? 0;
  if (!items.length) return <Empty />;
  return (
    <ul className="space-y-3">
      {items.slice(0, 10).map((i) => (
        <li key={`${i.type}-${i.name}`} className="space-y-1">
          <div className="flex justify-between gap-2 text-sm">
            <span className="truncate">{i.name}{i.type && <span className="text-xs text-muted-foreground"> · {i.type}</span>}</span>
            <span className="font-semibold">{nf.format(i.value)}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${max ? (i.value / max) * 100 : 0}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export const SourcesCard = ({ items }: { items: Agg["sources"] }) => (
  <Card>
    <CardHeader className="pb-2"><CardTitle className="text-base">De onde vêm os acessos</CardTitle></CardHeader>
    <CardContent><BarList items={items} /></CardContent>
  </Card>
);

export const ButtonsCard = ({ items }: { items: Agg["buttons"] }) => (
  <Card>
    <CardHeader className="pb-2"><CardTitle className="text-base">Cliques por botão</CardTitle></CardHeader>
    <CardContent><BarList items={items} /></CardContent>
  </Card>
);

export const CampaignsCard = ({ rows, onPick }: { rows: Agg["campaigns"]; onPick: (c: string) => void }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-base">Campanhas (UTM)</CardTitle>
      <p className="text-xs text-muted-foreground">Visitas que chegaram por links com utm_source / utm_campaign.</p>
    </CardHeader>
    <CardContent className="overflow-x-auto">
      {!rows.length ? <Empty text="Nenhum acesso com UTM no período. Use links como ?utm_source=instagram&utm_campaign=turquia" /> : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Origem</TableHead><TableHead>Meio</TableHead><TableHead>Campanha</TableHead><TableHead>Criativo</TableHead>
              <TableHead className="text-right">Acessos</TableHead><TableHead className="text-right">WhatsApp</TableHead><TableHead className="text-right">Conversão</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i} className={r.campaign !== "—" ? "cursor-pointer" : ""} onClick={() => r.campaign !== "—" && onPick(r.campaign)}>
                <TableCell className="font-medium">{r.source}</TableCell><TableCell>{r.medium}</TableCell>
                <TableCell>{r.campaign}</TableCell><TableCell>{r.content}</TableCell>
                <TableCell className="text-right">{nf.format(r.views)}</TableCell>
                <TableCell className="text-right">{nf.format(r.whatsapp)}</TableCell>
                <TableCell className="text-right">{r.conversion.toLocaleString("pt-BR")}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </CardContent>
  </Card>
);

export const PagesTable = ({ rows, onPick }: { rows: Agg["pages"]; onPick: (p: string) => void }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-base">Todas as páginas</CardTitle>
      <p className="text-xs text-muted-foreground">Clique numa página para ver só os números dela.</p>
    </CardHeader>
    <CardContent className="overflow-x-auto">
      {!rows.length ? <Empty /> : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Página</TableHead><TableHead className="text-right">Acessos</TableHead>
              <TableHead className="text-right">WhatsApp</TableHead><TableHead className="text-right">Localização</TableHead>
              <TableHead className="text-right">Conversão</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.page} className="cursor-pointer" onClick={() => onPick(r.page)}>
                <TableCell className="font-medium">{r.page}</TableCell>
                <TableCell className="text-right">{nf.format(r.views)}</TableCell>
                <TableCell className="text-right">{nf.format(r.whatsapp)}</TableCell>
                <TableCell className="text-right">{nf.format(r.maps)}</TableCell>
                <TableCell className="text-right">{r.conversion.toLocaleString("pt-BR")}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </CardContent>
  </Card>
);

const csvCell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export const RecentLogs = ({ rows }: { rows: Agg["recent"] }) => {
  const [open, setOpen] = useState(false);
  const exportCsv = () => {
    const head = ["data_hora_brasilia", "tipo", "pagina", "botao", "utm_source", "utm_medium", "utm_campaign", "utm_content", "referrer"];
    const lines = rows.map((r) => {
      const b = brParts(r.created_at);
      return [`${b.ymd} ${new Date(Date.parse(r.created_at) - 3 * 3600e3).toISOString().slice(11, 16)}`, r.type, r.page, r.source, r.utm_source, r.utm_medium, r.utm_campaign, r.utm_content, r.referrer].map(csvCell).join(",");
    });
    const blob = new Blob([[head.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "metricas-renova.csv";
    a.click();
  };
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card>
        <CardHeader className="py-3 flex-row items-center justify-between space-y-0">
          <CollapsibleTrigger className="flex items-center gap-2 font-semibold">
            <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} /> Últimos registros
          </CollapsibleTrigger>
          <Button size="sm" variant="outline" onClick={exportCsv} disabled={!rows.length}><Download className="h-4 w-4 mr-1" />CSV</Button>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="overflow-x-auto">
            {!rows.length ? <Empty /> : (
              <Table>
                <TableHeader><TableRow><TableHead>Quando</TableHead><TableHead>Tipo</TableHead><TableHead>Página</TableHead><TableHead>Botão</TableHead><TableHead>Campanha</TableHead></TableRow></TableHeader>
                <TableBody>
                  {rows.slice(0, 50).map((r, i) => (
                    <TableRow key={i}>
                      <TableCell className="whitespace-nowrap">{new Date(r.created_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" })}</TableCell>
                      <TableCell>{r.type}</TableCell><TableCell>{r.page}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{r.source ?? "—"}</TableCell>
                      <TableCell>{r.utm_campaign ?? r.utm_source ?? "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
