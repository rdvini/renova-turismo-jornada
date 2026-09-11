# Filtro por página no painel de métricas

## O que já existe nos registros

Consultei o banco: a página `/semana-do-cliente` **tem registros sim**.

- Cliques em botões de WhatsApp: 13 no total — 11 em "Confirmar presença" e 2 em "Quero participar" (último em 08/09).
- Cliques de localização: 16 no total — 10 no botão "Saiba como chegar" e 6 no mapa do Google.

Ou seja, não há perda de dados. O problema é de visualização.

## Por que você não consegue ver

- O filtro de página do topo só afeta a seção geral de WhatsApp. Ele não é aplicado à seção "Semana do Cliente" nem à seção de localização (mapa).
- A seção de localização hoje carrega sempre os últimos 365 dias de **todas** as páginas, ignorando o período e a página escolhidos.
- A lista do filtro só inclui páginas de campanha cadastradas; `/semana-do-cliente` aparece apenas quando já houve cliques no período selecionado, então em períodos curtos ela desaparece da lista.

## O que vou fazer

1. Fazer o filtro de página do topo valer para todas as seções do painel: WhatsApp, localização (mapa) e Semana do Cliente.
2. Fazer a seção de localização respeitar o período selecionado (Hoje, Ontem, 7/30/365 dias, datas personalizadas), como as outras.
3. Incluir `/semana-do-cliente` fixo na lista de páginas do filtro, para ela sempre aparecer mesmo sem cliques no período.
4. Quando `/semana-do-cliente` estiver selecionada, mostrar um resumo dedicado: total de cliques em "Confirmar presença", em "Quero participar", em "Saiba como chegar" e no mapa, com gráfico por dia (ou por hora nos filtros Hoje/Ontem) e a lista dos registros recentes com exportação em CSV.

## Detalhes técnicos

- `src/pages/Metricas.tsx`: repassar `selectedPage` como prop para `ConfirmacoesPanel` e `MapsPanel`; adicionar `/semana-do-cliente` a `KNOWN_PAGES`.
- `src/components/admin/MapsPanel.tsx`: aceitar `query` (do `presetToQuery`) e `page`, substituindo o `days=365` fixo, e repassar `&page=` para a função `maps-metrics`.
- `src/components/admin/ConfirmacoesPanel.tsx`: usar a página selecionada quando houver (padrão continua `/semana-do-cliente`) e somar os totais de `maps-metrics` para a mesma página, agrupando por `source`/`kind`.
- Verificar se `supabase/functions/maps-metrics/index.ts` já aceita `page` e os mesmos parâmetros de período usados por `whatsapp-metrics`; se não, alinhar o parsing de parâmetros (sem mudar a autenticação por senha nem a paginação de 1000 em 1000).
- Nenhuma mudança de schema; os dados já estão gravados.
