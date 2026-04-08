import cardAfricaDoSul from "@/assets/africa-do-sul/card-cover.jpg";
import cardPortugal from "@/assets/portugal/card-cover.jpg";

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  date: string;
  badge?: string;
  published?: boolean;
}

import heroTurkiye from "@/assets/padre-leudo/hero-turkiye.jpg";

export const campaigns: Campaign[] = [
  {
    id: "turquia-padre-leudo",
    slug: "/turquia-padre-leudo",
    title: "Turquia — Pe. Leudo Santos",
    subtitle: "de Manaus para o Mundo",
    description:
      "11 dias de peregrinação pelas terras bíblicas da Turquia, visitando igrejas do Apocalipse, a Casa da Virgem Maria e locais sagrados da fé cristã.",
    image: heroTurkiye,
    date: "06 a 17 de Setembro de 2027",
    badge: "Peregrinação",
    published: false,
  },
  {
    id: "turquia",
    slug: "/turquia",
    title: "Turquia",
    subtitle: "Renova Turismo apresenta",
    description:
      "Uma jornada explorando alguns dos cenários mais marcantes da Turquia, com cidades históricas, paisagens icônicas e experiências culturais inesquecíveis.",
    image: heroTurkiye,
    date: "Outubro de 2026 e 2027",
    badge: "Experiência",
    published: true,
  },
  {
    id: "africa-do-sul",
    slug: "/africa-do-sul",
    title: "África do Sul",
    subtitle: "RENOVA APRESENTA",
    description:
      "Explore a beleza selvagem e a cultura vibrante da África do Sul em uma jornada inesquecível.",
    image: cardAfricaDoSul,
    date: "Confira as datas para 2027 e 2028",
    badge: "Experências",
    published: false,
  },
];
