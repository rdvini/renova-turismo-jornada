# Novo painel de métricas (/admin/metricas)

## Objetivo
Reconstruir a página de métricas com visual limpo e simples, mostrando os números de cada página separadamente (acessos, origem dos acessos e cliques em botões), com filtros organizados em um único lugar.

## Estrutura da nova página

```text
+-------------------------------------------------------------+
| Barra fixa: Logo | [Página v] [Período v]        [Sair]     |
+-------------------------------------------------------------+
| Acessos | Cliques WhatsApp | Cliques Localização | Conversão |
+-------------------------------------------------------------+
| Gráfico: acessos x cliques ao longo do tempo                |
+-------------------------------------------------------------+
| De onde vêm os acessos        | Cliques por botão           |
+-------------------------------------------------------------+
| Tabela "Todas as páginas" (quando nenhuma página escolhida)  |
| Página | Acessos | WhatsApp | Localização | Conversão | >    |
+-------------------------------------------------------------+
```

1. **Barra de filtros única (fixa no topo)** — apenas dois controles:
   - **Página**: busca com lista ("Todas as páginas" ou uma específica).
   - **Período**: um botão que abre um menu com Hoje, Ontem, 7 dias, 30 dias, Tudo e "Escolher datas" (calendário dentro do mesmo menu).
   - Os filtros ativos aparecem como etiquetas pequenas removíveis ao lado.
2. **Cartões de números** — Acessos, Cliques no WhatsApp, Cliques em localização/mapa e Taxa de conversão (cliques ÷ acessos), cada um com comparação ao período anterior.
3. **Gráfico principal** — acessos e cliques no mesmo gráfico (por hora em Hoje/Ontem, por dia nos demais).
4. **Origem dos acessos** — lista agrupada e legível: Instagram, Facebook, Google, WhatsApp, Direto, Outros.
5. **Cliques por botão** — qual botão gerou cada clique (menu, flutuante, formulário, "Saiba como chegar", mapa).
6. **Tabela "Todas as páginas"** — visão comparativa; clicar numa linha aplica o filtro daquela página e mostra os detalhes dela.
7. Remover blocos antigos e duplicados (dispositivos, tabelas soltas de registros recentes ficam numa aba recolhida "Últimos registros" com exportar CSV).

## Dados
- Os registros já existentes (acessos, cliques no WhatsApp e localização) passam a ser lidos juntos, por página, em uma única consulta.
- Acessos só existem desde quando o rastreamento foi ativado; períodos anteriores aparecerão zerados (o histórico antigo está apenas no Google Analytics).

## Detalhes técnicos
- Nova Edge Function `metrics-overview` (protegida pela mesma senha `x-metrics-password`) que agrega page_views, whatsapp_clicks e maps_clicks com fuso UTC-3, retornando: totais, período anterior, série temporal, origens normalizadas (por hostname/utm_source), cliques por source e tabela por página. Paginação em blocos de 1000.
- Reescrever `src/pages/Metricas.tsx` em componentes menores em `src/components/admin/metrics/` (FilterBar, KpiCards, TrendChart, ReferrerList, ButtonClicks, PagesTable, RecentLogs).
- Remover arquivos não usados: ConfirmacoesPanel, AcessosPanel, MapsPanel, RsvpDialog (se não referenciado).
- Funções antigas (page-metrics, whatsapp-metrics, maps-metrics) mantidas até validação.
- Teste unitário para a normalização de origem e cálculo de conversão.
