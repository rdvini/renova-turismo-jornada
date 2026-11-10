import dubai from "@/assets/black-friday/dubai.jpg";
import amalfi from "@/assets/black-friday/amalfi.jpg";
import tailandia from "@/assets/black-friday/tailandia.jpg";
import italia from "@/assets/black-friday/italia.jpg";
import natal from "@/assets/black-friday/natal.jpg";
import africa from "@/assets/africa-do-sul/cape-town.jpg";
import egito from "@/assets/lideres-evangelicos/hero-piramides-egito.webp";
import jerusalem from "@/assets/lideres-evangelicos/hero-jerusalem.webp";
import aurora from "@/assets/aurora-boreal/tromso-aurora.jpg";
import istanbul from "@/assets/istanbul.webp";
import capadocia from "@/assets/capadocia.jpg";
import praga from "@/assets/leste-europeu/praga.jpg";
import marrocos from "@/assets/marrocos/merzouga.jpg";
import portugal from "@/assets/portugal/lisboa-belem.jpg";
import grecia from "@/assets/grecia/hero-santorini.jpg";

export const BF_PHONE = "551932412424";
export const BF_PHONE_LABEL = "(19) 3241-2424";

export const bfWhatsApp = (roteiro?: string) =>
  `https://wa.me/${BF_PHONE}?text=${encodeURIComponent(
    roteiro
      ? `Olá! Vi a Black Friday da Renova Turismo e quero saber as condições do roteiro ${roteiro}.`
      : "Olá! Gostaria de conhecer as ofertas de Black Friday da Renova Turismo.",
  )}`;

export type BfRoteiro = {
  code: string;
  nome: string;
  duracao?: string;
  paises: string[];
  /** Datas de saída, no formato "DD a DD de mês de AAAA". */
  saida: string[];
  img: string;
  tone: "blue" | "rose" | "sand" | "sage";
};

export const roteiros: BfRoteiro[] = [
  {
    code: "ZAF",
    nome: "África do Sul",
    duracao: "09 dias / 07 noites",
    paises: ["África do Sul"],
    saida: ["07 a 15 de setembro de 2027"],
    img: africa,
    tone: "sand",
  },
  {
    code: "ARE",
    nome: "Dubai e Abu Dhabi",
    duracao: "08 dias / 06 noites",
    paises: ["Emirados Árabes"],
    saida: ["09 a 16 de novembro de 2027"],
    img: dubai,
    tone: "rose",
  },
  {
    code: "EGY",
    nome: "Egito com Cruzeiro no Nilo e Hurghada",
    duracao: "11 dias / 08 noites",
    paises: ["Egito"],
    saida: ["19 a 29 de setembro de 2027"],
    img: egito,
    tone: "sand",
  },
  {
    code: "ITA",
    nome: "Costa Amalfitana",
    paises: ["Itália"],
    saida: ["20 a 30 de setembro de 2027"],
    img: amalfi,
    tone: "blue",
  },
  {
    code: "THA",
    nome: "Tailândia e Phuket",
    paises: ["Tailândia"],
    saida: ["25 de outubro a 07 de novembro de 2027"],
    img: tailandia,
    tone: "sage",
  },
  {
    code: "DNK·NOR·SWE",
    nome: "Aurora Boreal",
    paises: ["Dinamarca", "Noruega", "Suécia"],
    saida: ["21 de fevereiro a 05 de março de 2027", "20 de fevereiro a 04 de março de 2028"],
    img: aurora,
    tone: "blue",
  },
  {
    code: "ITA",
    nome: "Itália de Veneza a Roma",
    duracao: "10 dias / 07 noites",
    paises: ["Itália"],
    saida: ["10 a 19 de maio de 2027"],
    img: italia,
    tone: "rose",
  },
  {
    code: "TUR·GRC",
    nome: "Turquia e Grécia Experiências",
    paises: ["Turquia", "Grécia"],
    saida: ["17 a 31 de outubro de 2027"],
    img: istanbul,
    tone: "sand",
  },
  {
    code: "CZE·AUT·HUN",
    nome: "Leste Europeu",
    duracao: "11 dias / 08 noites",
    paises: ["República Tcheca", "Áustria", "Hungria"],
    saida: ["20 a 31 de maio de 2028"],
    img: praga,
    tone: "rose",
  },
  {
    code: "MAR",
    nome: "Marrocos",
    duracao: "12 dias / 09 noites",
    paises: ["Marrocos"],
    saida: ["19 a 30 de abril de 2028"],
    img: marrocos,
    tone: "sand",
  },
  {
    code: "TUR",
    nome: "Turquia Experiências",
    paises: ["Turquia"],
    saida: ["19 a 30 de outubro de 2027"],
    img: capadocia,
    tone: "rose",
  },
  {
    code: "PRT",
    nome: "Portugal Maravilhoso",
    paises: ["Portugal"],
    saida: ["15 a 25 de abril de 2028"],
    img: portugal,
    tone: "sage",
  },
  {
    code: "ISR·JOR",
    nome: "Israel e Jordânia",
    paises: ["Israel", "Jordânia"],
    saida: ["15 a 25 de maio de 2028"],
    img: jerusalem,
    tone: "sand",
  },
  {
    code: "GRC",
    nome: "Grécia",
    paises: ["Grécia"],
    saida: ["23 a 31 de outubro de 2027"],
    img: grecia,
    tone: "blue",
  },
  {
    code: "CZE·AUT·HUN",
    nome: "Leste Europeu – Luzes de Natal",
    paises: ["República Tcheca", "Áustria", "Hungria"],
    saida: ["23 de novembro a 04 de dezembro de 2027"],
    img: natal,
    tone: "rose",
  },
];
