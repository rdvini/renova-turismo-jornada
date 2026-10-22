import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { CalendarIcon, Check, ChevronDown, FileText, Megaphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

export type Period = { label: string; from: string; to: string };

const brToday = () => new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10);
const addDays = (ymd: string, n: number) =>
  new Date(Date.parse(`${ymd}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
const toYmd = (d: Date) => format(d, "yyyy-MM-dd");
export const ymdToDate = (ymd: string) => {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const presetPeriod = (key: "today" | "yesterday" | "7" | "30" | "all"): Period => {
  const t = brToday();
  switch (key) {
    case "today": return { label: "Hoje", from: t, to: t };
    case "yesterday": return { label: "Ontem", from: addDays(t, -1), to: addDays(t, -1) };
    case "7": return { label: "Últimos 7 dias", from: addDays(t, -6), to: t };
    case "30": return { label: "Últimos 30 dias", from: addDays(t, -29), to: t };
    default: return { label: "Últimos 12 meses", from: addDays(t, -364), to: t };
  }
};

const PRESETS = ["today", "yesterday", "7", "30", "all"] as const;

type Props = {
  period: Period;
  onPeriod: (p: Period) => void;
  page: string | null;
  pages: string[];
  onPage: (p: string | null) => void;
  campaign: string | null;
  campaigns: string[];
  onCampaign: (c: string | null) => void;
};

const Picker = ({
  icon: Icon, allLabel, value, options, onChange, placeholder,
}: {
  icon: typeof FileText; allLabel: string; value: string | null; options: string[];
  onChange: (v: string | null) => void; placeholder: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between gap-2 min-w-[180px] max-w-[260px]">
          <span className="flex items-center gap-2 truncate">
            <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{value ?? allLabel}</span>
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-72" align="start">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>Nada encontrado.</CommandEmpty>
            <CommandGroup>
              {[null, ...options].map((o) => (
                <CommandItem key={o ?? "__all"} value={o ?? allLabel} onSelect={() => { onChange(o); setOpen(false); }}>
                  <Check className={cn("mr-2 h-4 w-4", value === o ? "opacity-100" : "opacity-0")} />
                  {o ?? allLabel}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FilterBar = ({ period, onPeriod, page, pages, onPage, campaign, campaigns, onCampaign }: Props) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <Picker icon={FileText} allLabel="Todas as páginas" value={page} options={pages} onChange={onPage} placeholder="Buscar página..." />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              {period.label}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3" align="start">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex sm:flex-col gap-1 flex-wrap">
                {PRESETS.map((k) => {
                  const p = presetPeriod(k);
                  return (
                    <Button key={k} size="sm" variant={period.label === p.label ? "default" : "ghost"} className="justify-start"
                      onClick={() => { onPeriod(p); setOpen(false); }}>
                      {p.label}
                    </Button>
                  );
                })}
              </div>
              <div className="border-t sm:border-t-0 sm:border-l pt-3 sm:pt-0 sm:pl-3">
                <p className="text-xs text-muted-foreground mb-2">Escolher datas</p>
                <Calendar mode="range" selected={range} onSelect={setRange} locale={ptBR} numberOfMonths={1}
                  disabled={(d) => d > new Date()} className="p-0 pointer-events-auto" />
                <Button size="sm" className="w-full mt-2" disabled={!range?.from}
                  onClick={() => {
                    const from = toYmd(range!.from!), to = toYmd(range!.to ?? range!.from!);
                    onPeriod({ label: from === to ? format(range!.from!, "dd/MM/yyyy") : `${format(range!.from!, "dd/MM")} – ${format(range!.to ?? range!.from!, "dd/MM/yyyy")}`, from, to });
                    setOpen(false);
                  }}>
                  Aplicar
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Picker icon={Megaphone} allLabel="Todas as campanhas" value={campaign} options={campaigns} onChange={onCampaign} placeholder="Buscar campanha..." />
      </div>

      {(page || campaign) && (
        <div className="flex flex-wrap gap-2">
          {page && (
            <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => onPage(null)}>
              Página: {page} <X className="h-3 w-3" />
            </Badge>
          )}
          {campaign && (
            <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => onCampaign(null)}>
              Campanha: {campaign} <X className="h-3 w-3" />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
