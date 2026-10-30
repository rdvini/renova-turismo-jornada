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
  img: string;
  tone: "blue" | "rose" | "sand" | "sage";
};

export const roteiros: BfRoteiro[] = [
  { code: "CPT", nome: "África do Sul", duracao: "09 dias / 07 noites", paises: ["África do Sul"], img: africa, tone: "sand" },
  { code: "DXB", nome: "Dubai e Abu Dhabi", duracao: "08 dias / 06 noites", paises: ["Emirados Árabes"], img: dubai, tone: "rose" },
  { code: "CAI", nome: "Egito com Cruzeiro no Nilo e Hurghada", duracao: "11 dias / 08 noites", paises: ["Egito"], img: egito, tone: "sand" },
  { code: "NAP", nome: "Costa Amalfitana", paises: ["Itália"], img: amalfi, tone: "blue" },
  { code: "BKK", nome: "Tailândia", paises: ["Tailândia"], img: tailandia, tone: "sage" },
  { code: "TOS", nome: "Aurora Boreal", paises: ["Dinamarca", "Noruega", "Suécia"], img: aurora, tone: "blue" },
  { code: "VCE", nome: "Itália de Veneza a Roma", duracao: "10 dias / 07 noites", paises: ["Itália"], img: italia, tone: "rose" },
  { code: "IST", nome: "Turquia e Grécia Experiências", paises: ["Turquia", "Grécia"], img: istanbul, tone: "sand" },
  { code: "TLV", nome: "Israel Católico", duracao: "09 dias", paises: ["Israel"], img: jerusalem, tone: "sage" },
  { code: "TLV", nome: "Israel Evangélico", duracao: "09 dias", paises: ["Israel"], img: jerusalem, tone: "blue" },
  { code: "PRG", nome: "Leste Europeu", duracao: "11 dias / 08 noites", paises: ["República Tcheca", "Áustria", "Hungria"], img: praga, tone: "rose" },
  { code: "RAK", nome: "Marrocos", duracao: "12 dias / 09 noites", paises: ["Marrocos"], img: marrocos, tone: "sand" },
  { code: "NAV", nome: "Turquia Experiências", paises: ["Turquia"], img: capadocia, tone: "rose" },
  { code: "LIS", nome: "Portugal Maravilhoso", paises: ["Portugal"], img: portugal, tone: "sage" },
  { code: "JRS", nome: "Israel Turístico", paises: ["Israel"], img: jerusalem, tone: "sand" },
  { code: "ATH", nome: "Grécia", paises: ["Grécia"], img: grecia, tone: "blue" },
  { code: "XMS", nome: "Leste Europeu – Luzes de Natal", paises: ["República Tcheca", "Áustria", "Hungria"], img: natal, tone: "rose" },
];
