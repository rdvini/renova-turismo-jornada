import cardAfricaDoSul from "@/assets/africa-do-sul/card-cover.webp";
import cardPortugal from "@/assets/portugal/card-cover.jpg";
import cardLideres from "@/assets/lideres/hero-bg.webp";

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

import heroTurkiye from "@/assets/padre-leudo/hero-turkiye.webp";

export const campaigns: Campaign[] = [
  {
    id: "mexico-padre-leudo",
    slug: "/mexico-padre-leudo",
    title: "México — Pe. Leudo Santos",
    subtitle: "de Manaus para o Mundo",
    description:
      "Peregrinação pelo México visitando o Santuário de Nossa Senhora de Guadalupe e os principais locais da fé católica mexicana.",
    image: heroTurkiye,
    date: "Datas sob consulta",
    badge: "Peregrinação",
    published: true,
  },
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
    subtitle: "RENOVA TURISMO APRESENTA",
    description:
      "Explore a beleza selvagem e a cultura vibrante da África do Sul em uma jornada inesquecível.",
    image: cardAfricaDoSul,
    date: "Setembro de 2026, 2027 e 2028",
    badge: "Experências",
    published: true,
  },
  {
    id: "portugal",
    slug: "/portugal",
    title: "Portugal",
    subtitle: "RENOVA TURISMO APRESENTA",
    description:
      "Uma peregrinação a Portugal é um mergulho profundo na devoção mariana, onde o silêncio do Santuário de Fátima convida à conversão e à oração pela paz mundial.",
    image: cardPortugal,
    date: "Outubro de 2026",
    badge: "Peregrinação",
    published: true,
  },
  {
    id: "lideres",
    slug: "/lideres",
    title: "Terra Santa para Líderes",
    subtitle: "PASTORES E PADRES",
    description:
      "Leve sua comunidade para uma jornada espiritual na Terra Santa com segurança, tradição e confiança. Pacote 100% completo para líderes religiosos.",
    image: cardLideres,
    date: "Datas sob consulta",
    badge: "Líderes",
    published: false,
  },
];
