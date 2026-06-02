## Diagnóstico

**Campanhas ativas identificadas** (rotas no `App.tsx` + `campaigns.ts` com `published: true`):

1. `/` — Hub (Index)
2. `/mexico-padre-leudo`
3. `/turquia-padre-leudo`
4. `/turquia`
5. `/africa-do-sul`
6. `/africa-do-sul-2`
7. `/portugal`
8. `/leste-europeu`
9. `/marrocos`
10. `/jmj-seul-2027`
11. `/grecia`

(Lideres/template ficam de fora — são internas/rascunho.)

**Estado atual encontrado:**
- `index.html` tem só 1 título/descrição genérica usada em todas as rotas → **SEO ruim**: cada campanha aparece no Google com o mesmo título "Renova Turismo — Roteiros Culturais e Religiosos".
- `sitemap.xml` está desatualizado (falta `/grecia`, `/marrocos`, `/jmj-seul-2027`, `/mexico-padre-leudo`).
- Imagens hero grandes sem `fetchpriority="high"` nem `preload` → **LCP lento** no mobile.
- Várias imagens `.jpg` grandes (Grécia: `hero-santorini.jpg`) sem versão `.webp`.
- Sem `<h1>` semântico consistente em algumas seções (alguns usam só `<p>`).
- CTAs de WhatsApp já existem, mas faltam microcopy de urgência e prova social acima da dobra em algumas campanhas.

---

## Plano de execução

### Fase 1 — SEO por página (alto impacto, baixo risco)

1. **Instalar `react-helmet-async`** e adicionar `<HelmetProvider>` em `src/main.tsx`.
2. Criar componente reutilizável `src/components/SEO.tsx` que recebe `title`, `description`, `path`, `image` e injeta `<title>`, `<meta description>`, `<link canonical>`, `og:*`, `twitter:*` e JSON-LD `TouristTrip` (schema rico para roteiros).
3. Adicionar `<SEO />` no topo de cada página de campanha com textos otimizados em pt-BR (focando palavras-chave como "peregrinação Grécia", "viagem Turquia evangélica", "roteiro Fátima Portugal" etc.).
4. **Remover `<link rel="canonical">` do `index.html`** (cada página agora define o seu).
5. **Atualizar `public/sitemap.xml`** incluindo todas as 11 rotas com `lastmod` atual.

### Fase 2 — Performance

1. Adicionar `<link rel="preload" as="image">` da imagem hero da home no `index.html`.
2. Em todos os heros: adicionar `fetchpriority="high"` na `<img>` LCP e `loading="lazy"` em imagens abaixo da dobra que ainda não têm.
3. Garantir `width`/`height` em todas as imagens de cards (evita CLS).
4. Adicionar `decoding="async"` nas imagens não-LCP.
5. Confirmar `font-display: swap` nos imports de fonte (Lora/Nunito Sans).

### Fase 3 — Conversão (CRO leve, sem mexer em layout)

1. Padronizar o CTA primário do hero como "Quero esse roteiro" → abre WhatsApp com mensagem pré-preenchida específica da campanha (já existe em algumas, replicar nas demais).
2. Adicionar `aria-label` descritivo nos botões de WhatsApp ("Falar no WhatsApp sobre a viagem para a Grécia") — bom para acessibilidade e SEO.
3. Garantir que a faixa de prova social (Google Reviews + Reclame Aqui) esteja presente em todas as 9 campanhas (algumas podem estar faltando).
4. Padronizar o link do WhatsApp no Navbar de cada campanha com a mesma mensagem do hero.

### Fase 4 — Validação

1. Rodar o scanner de SEO (`seo--trigger_scan`) ao final e marcar findings resolvidos.
2. Conferir build limpo.

---

## Detalhes técnicos

```text
src/
├── main.tsx                  → wrap com <HelmetProvider>
├── components/
│   └── SEO.tsx               → NOVO, componente Helmet reutilizável
└── pages/
    ├── Index.tsx             → <SEO title="..." />
    ├── Grecia.tsx            → <SEO />
    ├── Turquia.tsx           → <SEO />
    └── ... (9 campanhas)     → <SEO />

public/
├── sitemap.xml               → adicionar 4 rotas faltantes + lastmod
└── robots.txt                → já está OK, mantém
```

**JSON-LD por campanha** usará `@type: "TouristTrip"` com `name`, `description`, `touristType`, `provider: {Organization Renova Turismo}` — schema rico que o Google entende para snippets de viagem.

**Não vou mexer em:**
- Layout visual / design tokens (a pedido implícito: "otimize", não "redesigne")
- Lógica de formulário/Supabase
- Cores, fontes, tipografia
- Conteúdo editorial (descrições, roteiros dia-a-dia)

**Estimativa:** ~15 arquivos editados, 1 arquivo novo (`SEO.tsx`), 1 dependência adicionada.

Confirma para eu seguir?