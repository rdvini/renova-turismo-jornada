export interface Campaign {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  date: string;
  badge?: string;
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
  },
];
