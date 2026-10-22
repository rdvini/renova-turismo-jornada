# Novo painel de métricas (/admin/metricas) com rastreamento de UTMs

## Objetivo
Reconstruir a página de métricas com visual limpo e simples, mostrando os números de cada página separadamente (acessos, origem dos acessos, campanhas UTM e cliques em botões), com filtros organizados em um único lugar.

## Estrutura da nova página

```text
+-------------------------------------------------------------+
| Barra fixa: Logo | [Página v] [Período v] [Campanha v] [Sair]|
+-------------------------------------------------------------+
| Acessos | Cliques WhatsApp | Cliques Localização | Conversão |
+-------------------------------------------------------------+
| Gráfico: acessos x cliques ao longo do tempo                |
+-------------------------------------------------------------+
| De onde vêm os acessos        | Cliques por botão           |
+-------------------------------------------------------------+
| Campanhas (UTM): origem > meio > campanha > criativo        |
| Acessos | WhatsApp | Conversão                               |
+-------------------------------------------------------------+
| Tabela "Todas as páginas" (quando nenhuma página escolhida)  |
+-------------------------------------------------------------+
```

1. **Barra de filtros única (fixa no topo)**:
   - **Página**: busca com lista ("Todas as páginas" ou uma específica).
   - **Período**: um botão com Hoje, Ontem, 7 dias, 30 dias, Tudo e "Escolher datas" (calendário no mesmo menu).
   - **Campanha**: lista das campanhas UTM encontradas (opcional).
   - Filtros ativos aparecem como etiquetas removíveis.
2. **Cartões de números** — Acessos, Cliques no WhatsApp, Cliques em localização e Taxa de conversão, com comparação ao período anterior.
3. **Gráfico principal** — acessos e cliques juntos (por hora em Hoje/Ontem, por dia nos demais).
4. **Origem dos acessos** — Instagram, Facebook, Google, WhatsApp, Direto, Outros (usa UTM quando houver, senão o site de origem).
5. **Campanhas (UTM)** — tabela mostrando qual anúncio/canal/criativo trouxe visitas e quantas pessoas chamaram no WhatsApp a partir dele.
6. **Cliques por botão** — menu, flutuante, formulário, "Saiba como chegar", mapa.
7. **Tabela "Todas as páginas"** — clicar numa linha filtra aquela página.
8. **Últimos registros** — aba recolhida com exportar CSV.

## Rastreamento de UTMs
- Ao entrar no site com um link contendo `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` ou `utm_term`, esses dados são gravados junto com o acesso.
- Os dados ficam guardados durante a visita: se a pessoa navegar e depois clicar no WhatsApp, o clique é atribuído à campanha que a trouxe.
- Acessos antigos (sem UTM) aparecem como "Sem campanha" e continuam classificados pelo site de origem.

## Detalhes técnicos
- Migração: adicionar colunas `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` (texto, opcional, até 200 caracteres) em `page_views`, `whatsapp_clicks` e `maps_clicks`; atualizar as políticas de inserção com limites de tamanho.
- `src/lib/utm.ts`: lê UTMs da URL, salva em `sessionStorage` (primeiro toque da sessão) e expõe `getUtm()`.
- Trackers (PageView, WhatsApp, Maps) passam a enviar as UTMs.
- Nova Edge Function `metrics-overview` (senha `x-metrics-password`, UTC-3, paginação de 1000) retorna totais, período anterior, série temporal, origens, campanhas UTM, cliques por botão, tabela por página e últimos registros.
- `src/pages/Metricas.tsx` reescrito com componentes em `src/components/admin/metrics/`.
- Remover arquivos não usados (ConfirmacoesPanel, AcessosPanel, MapsPanel, RsvpDialog).
- Testes unitários: extração de UTMs, normalização de origem e cálculo de conversão.
