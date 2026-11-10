# Siglas dos tickets = abreviação dos países

Trocar as siglas de aeroporto (CPT, DXB, CAI...) pela abreviação oficial de 3 letras do país (padrão internacional ISO). Roteiros com mais de um país mostram as siglas juntas, separadas por ponto.

| Roteiro | Antes | Depois |
|---|---|---|
| África do Sul | CPT | ZAF |
| Dubai e Abu Dhabi | DXB | ARE |
| Egito com Cruzeiro no Nilo | CAI | EGY |
| Costa Amalfitana | NAP | ITA |
| Tailândia e Phuket | BKK | THA |
| Aurora Boreal | TOS | DNK·NOR·SWE |
| Itália de Veneza a Roma | VCE | ITA |
| Turquia e Grécia | IST | TUR·GRC |
| Leste Europeu | PRG | CZE·AUT·HUN |
| Marrocos | RAK | MAR |
| Turquia Experiências | NAV | TUR |
| Portugal | LIS | PRT |
| Israel e Jordânia | AMM | ISR·JOR |
| Grécia | ATH | GRC |
| Leste Europeu – Luzes de Natal | XMS | CZE·AUT·HUN |

## Detalhes técnicos
- Alterar apenas o campo `code` em `src/components/campaigns/black-friday/roteiros.ts`.
- Conferir no Playwright que as siglas longas (ex.: CZE·AUT·HUN) cabem na foto do ticket e na capa vertical dos tickets guardados; se não couberem, reduzir o tamanho da fonte só quando a sigla for longa.
