## Objetivo

Adicionar um novo filtro na página `/admin/metricas` que permite selecionar uma página específica do site (ex: `/portugal`) e recalcular todos os gráficos, KPIs e a tabela de cliques recentes considerando apenas essa página.

## Comportamento (UX)

- Um botão ao lado dos filtros de data (topo do dashboard) mostra a página selecionada, ex: **"Página: Todas"** ou **"Página: /portugal"**.
- Ao clicar, abre um popover com uma lista pesquisável (Command) contendo:
  - Opção **"Todas as páginas"** (padrão).
  - Todas as páginas do site (`/`, `/portugal`, `/turquia`, `/grecia`, `/marrocos`, `/leste-europeu`, `/africa-do-sul`, `/africa-do-sul-2`, `/jmj-seul-2027`, `/mexico-padre-leudo`, `/mexico-padre-antonio-maria`, `/turquia-padre-leudo`, `/lideres-catolicos`, `/lideres-evangelicos`, `/pastor-morelli`, `/privacidade`), derivadas dinamicamente de `src/data/campaigns.ts` + rotas fixas.
  - Além disso, incluir qualquer página adicional que apareça nos dados retornados (`data.byPage`) e ainda não esteja na lista, para não perder páginas legadas.
- Selecionar uma página aplica o filtro imediatamente e o botão passa a variante `default` (destacado) quando um filtro está ativo.
- Um "X" no botão limpa o filtro (volta para "Todas").

## Como o filtro atua nos dados

Filtragem feita **no frontend**, sem alterar a edge function `whatsapp-metrics`. Vantagens: zero mudança no backend, mesma chamada já traz todas as páginas.

- Quando `selectedPage === null` (Todas), usa `data` como hoje.
- Quando `selectedPage` está definido, deriva um objeto `Metrics` filtrado a partir de `data`:
  - `byPage`: apenas a entrada da página selecionada.
  - `total`: `count` da página selecionada dentro do período atual.
  - `recent`: filtra `data.recent` por `page === selectedPage`.
  - Demais séries (`byDay`, `byHour`, `byDow`, `bySource`, `byReferrer`, `byDevice`, `prevTotal`, `delta`, `peakDay`, `peakHour`, `avgPerDay`) **não podem** ser recalculadas só com o payload atual, porque a edge function agrega tudo antes de enviar.

Para permitir filtragem completa, a edge function precisa devolver também as linhas brutas por página **OU** o frontend precisa que o backend aceite um parâmetro `page`.

## Abordagem escolhida: adicionar parâmetro `page` na edge function

Menor payload, filtragem correta em todas as métricas.

### Backend (`supabase/functions/whatsapp-metrics/index.ts`)
1. Ler `url.searchParams.get("page")`.
2. Se presente, aplicar `.eq("page", page)` na query do Supabase (afeta tanto o período atual quanto o anterior para o cálculo de `delta`).
3. Manter `byPage` no retorno (com apenas a página filtrada quando aplicável — útil para a UI mostrar o total).

### Frontend (`src/pages/Metricas.tsx`)
1. Novo estado: `const [selectedPage, setSelectedPage] = useState<string | null>(null)`.
2. Novo estado: `const [pageOpen, setPageOpen] = useState(false)`.
3. `fetchMetrics` recebe `page` opcional e adiciona `&page=${encodeURIComponent(page)}` na URL.
4. `useEffect` que dispara em mudanças de `preset` passa a depender também de `selectedPage`.
5. Lista de páginas conhecidas: derivada de `campaigns` (importar de `@/data/campaigns`) + rotas extras hardcoded (`/`, `/pastor-morelli`, `/privacidade`) + união com páginas presentes em `data.byPage` (para não perder páginas removidas do menu mas ainda com cliques históricos).
6. Novo componente inline **PageFilter** (usa `Popover` + `Command`/`CommandInput`/`CommandList`/`CommandItem` já disponíveis em `src/components/ui/`), botão com ícone `Globe` (lucide-react).
7. Botão fica ao lado do botão "Personalizado" no header.

## Arquivos alterados

- `src/pages/Metricas.tsx` — novo estado, novo botão/popover de filtro por página, integração no fetch.
- `supabase/functions/whatsapp-metrics/index.ts` — aceita `?page=` e filtra na query.

## Fora do escopo

- Alterar o formato dos gráficos ou KPIs.
- Persistir o filtro na URL/localStorage.
- Multi-seleção de páginas (apenas uma por vez).
