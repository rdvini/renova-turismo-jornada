# Confirmação de presença como check-in (Semana do Cliente)

Hoje os botões "Confirmar presença" apenas abrem o WhatsApp — nada é registrado. A ideia é transformá-los em um check-in real: a pessoa responde se vai ou não, informa nome e WhatsApp, e você vê tudo no painel.

## Como vai funcionar para o visitante

1. Ao clicar em "Confirmar presença" (no menu, na hero, no "Quero participar" e na seção de localização), abre uma janelinha sobre a página.
2. A janela pergunta: "Você vai participar da Semana do Cliente?" com duas opções: **Sim, vou estar lá** e **Não vou conseguir ir**.
3. Em seguida, dois campos curtos: **Nome** e **WhatsApp**.
4. Ao enviar, aparece uma mensagem de agradecimento na própria página (nada de redirecionamento).
5. Quem responde "não" também é registrado, para você ter a leitura completa da enquete.

Validações: nome obrigatório (até 100 caracteres), WhatsApp com formatação/checagem de número brasileiro, proteção contra envio duplicado por clique repetido.

## Como você vai acompanhar

No painel `/admin/metricas` (mesma senha de hoje) entra uma nova aba **Semana do Cliente** com:

- Total de confirmações, total de "sim" e total de "não", com percentual de presença.
- Gráfico simples comparando sim x não.
- Lista das respostas mais recentes: nome, WhatsApp, resposta e data/hora (fuso de Brasília).
- Botão para exportar a lista em CSV.

## Detalhes técnicos

- Nova tabela `event_rsvps`: `id`, `nome`, `telefone`, `resposta` ('sim' | 'nao'), `evento` (texto, default `semana-do-cliente`), `created_at`. GRANT de `INSERT` para `anon`/`authenticated` com política de check de tamanho dos campos; leitura apenas via `service_role`. Sem SELECT público — os dados de contato não ficam expostos.
- Novo componente `src/components/semana-do-cliente/RsvpDialog.tsx` usando Dialog do shadcn, validação com zod, estados de carregando/sucesso/erro e toast.
- `src/pages/SemanaDoCliente.tsx`: os quatro CTAs de "Confirmar presença"/"Quero participar" passam a abrir o diálogo em vez de abrir link externo; o CTA "Saiba como chegar" permanece como está.
- Evento de Meta Pixel `Lead` disparado no envio bem-sucedido, e um registro em `whatsapp_clicks` não é criado (fluxo separado).
- Edge Function `whatsapp-metrics` ganha um bloco adicional (ou nova função `event-rsvps`) protegida pela mesma senha `METRICS_PASSWORD`, retornando agregados e as últimas respostas com paginação de 1000 em 1000.
- `src/pages/Metricas.tsx`: nova aba/seção consumindo esse endpoint, com KPI cards, gráfico de barras (recharts, já usado) e tabela.
