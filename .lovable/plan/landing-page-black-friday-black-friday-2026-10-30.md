# Landing page Black Friday — /black-friday

Página só por link (fora da página inicial), visual de material impresso/xerox, em tons pastéis, com o objetivo de levar o visitante ao WhatsApp da Renova Turismo, (19) 3241-2424.

## Identidade visual (baseada na referência)
- Textura de papel/xerox em toda a página: granulado, leve ruído e bordas de impressão imperfeitas.
- Cores pastéis (creme, azul-acinzentado, rosa e areia), sem preto puro: os textos escuros usam cinza grafite.
- Títulos grandes e marcantes que alternam peso forte e regular (como em "LESTE / EUROPEU"), com fotos aparecendo por dentro das letras ou atrás delas.

## Seções
1. **Abertura**: selo "BLACK FRIDAY", título gigante com camadas sobrepostas e efeito de profundidade ao rolar, chamada curta e botão para o WhatsApp.
2. **Faixa em movimento**: nomes dos destinos passando em loop, como uma fita impressa.
3. **Roteiros em carrossel**: cada roteiro em um cartão no formato de passagem aérea (canhoto picotado, recortes laterais, "código" do destino, duração e principais países). Sem itinerário dia a dia. Cada passagem tem o botão "Quero esse roteiro", que abre o WhatsApp com uma mensagem citando o roteiro.
4. **Por que a Renova**: 3 a 4 destaques em blocos sobrepostos tipo colagem, com efeito de profundidade.
5. **Chamada final**: grande bloco texturizado com o telefone e o botão do WhatsApp.
6. Botão flutuante do WhatsApp e rodapé padrão.

## Roteiros (17)
África do Sul (9d/7n) · Dubai e Abu Dhabi (8d/6n) · Egito com Cruzeiro no Nilo e Hurghada (11d/8n) · Costa Amalfitana · Tailândia · Aurora Boreal · Itália de Veneza a Roma (10d/7n) · Turquia e Grécia Experiências · Israel Católico (9d) · Israel Evangélico (9d) · Leste Europeu (11d/8n) · Marrocos (12d/9n) · Turquia Experiências · Portugal Maravilhoso · Israel Turístico · Grécia · Leste Europeu – Luzes de Natal.

Os países principais de cada roteiro serão preenchidos por mim (ex.: Leste Europeu → República Tcheca, Áustria, Hungria) para você revisar. Datas e preços aparecem como "Consulte condições Black Friday" até você confirmar; depois basta me enviar.

## Imagens
Fotos geradas por IA para os destinos, com tratamento de impressão (granulado e tons suavizados) para combinar com o visual.

## Rastreamento
Usa os mesmos contadores já existentes: acessos, origem/UTM e cliques no WhatsApp entram no painel de métricas filtrando por /black-friday. Meta Pixel e Google Analytics incluídos.

## Detalhes técnicos
- `src/pages/BlackFriday.tsx` + `src/components/campaigns/black-friday/` (Hero, Marquee, TicketCarousel com Embla, Diferenciais, CtaFinal).
- Entrada em `campaigns.ts` com `published: false`; rota em App.tsx; número 551932412424 no WhatsAppFloatGlobal com mensagem própria (sem mencionar Google).
- Textura via SVG feTurbulence como overlay; paralaxe com scroll + transform (respeitando prefers-reduced-motion); tokens de cor novos e escopados à página no CSS global.
- Fontes: título condensado forte (ex.: Anton/Bebas) + texto em serif/sans editorial.
- SEO (título, descrição, og) e sitemap.
