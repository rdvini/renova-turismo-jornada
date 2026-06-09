import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import aeroportoGru from "@/assets/mexico-padre-leudo/aeroporto-manaus.webp";
import sanJacintoImg from "@/assets/mexico-padre-leudo/san-jacinto.webp";
import teotihuacanImg from "@/assets/mexico-padre-leudo/teotihuacan.jpg";
import basilicaImg from "@/assets/mexico-padre-leudo/basilica-guadalupe-aerea.webp";
import pueblaImg from "@/assets/mexico-padre-leudo/puebla.jpg";
import cancunImg from "@/assets/mexico-padre-leudo/cancun-aerea.webp";
import cancunHotelImg from "@/assets/mexico-padre-leudo/cancun-zona-hoteleira.webp";
import chichenImg from "@/assets/mexico-padre-leudo/chichen-itza.jpg";

interface Slide {
  day: string;
  image: string;
  imageAlt: string;
  region: string;
  regionEn: string;
  title: string;
  description: string;
  highlight?: string;
}

const slides: Slide[] = [
  {
    day: "1º Dia",
    image: aeroportoGru,
    imageAlt: "Aeroporto de Guarulhos — partida da peregrinação",
    region: "São Paulo → Cidade do México",
    regionEn: "Departure",
    title: "SÃO PAULO / CIDADE DO MÉXICO",
    description:
      "Em horário combinado, encontro no Aeroporto de Guarulhos (GRU) para embarque em voo com destino à Cidade do México. Chegada, recepção e traslado para o hotel. Hospedagem e jantar.",
    highlight: "O início de uma jornada de fé ao lado do Padre Antônio Maria.",
  },
  {
    day: "2º Dia",
    image: sanJacintoImg,
    imageAlt: "Igreja colonial de San Jacinto, no bairro de San Ángel",
    region: "Cidade do México",
    regionEn: "Mexico City",
    title: "CIDADE DO MÉXICO / GUADALUPE",
    description:
      "Café da manhã. Saída para o sul da cidade, bairro colonial Parish Chimalistac. Continuação ao Bairro de San Angel, entre ruas de paralelepípedos, até a Igreja de San Jacinto. Seguimos a Coyoacán para admirar o templo de San Juan Batista. À tarde, visita à Basílica de Guadalupe, com Celebração da Santa Missa presidida pelo Padre Antônio Maria. Retorno ao hotel para jantar e hospedagem.",
    highlight: "\"Não estou eu aqui, que sou tua Mãe?\" — palavras de Nossa Senhora a São Juan Diego.",
  },
  {
    day: "3º Dia",
    image: teotihuacanImg,
    imageAlt: "Pirâmides de Teotihuacán",
    region: "Teotihuacán & Xochimilco",
    regionEn: "Teotihuacán",
    title: "TEOTIHUACÁN / XOCHIMILCO",
    description:
      "Café da manhã. Visita ao Museu de Antropologia e em seguida a um dos maiores sítios arqueológicos da Mesoamérica: Teotihuacán, a 'Cidade dos Deuses'. Visita ao templo de Quetzalcoatl, Calzada de los Muertos, Pirâmide do Sol e da Lua e templo Quetzal-Papalotl. Encerramos o dia com um passeio em uma trajinera tradicional em Xochimilco e tour no antigo convento de San Bernardino. Celebração da Santa Missa. Retorno ao hotel para jantar.",
    highlight: "Diante das antigas pirâmides, contemplamos a busca humana pelo sagrado.",
  },
  {
    day: "4º Dia",
    image: basilicaImg,
    imageAlt: "Vista aérea da Basílica de Nossa Senhora de Guadalupe",
    region: "Centro Histórico & Guadalupe",
    regionEn: "Mexico City",
    title: "CIDADE DO MÉXICO / GUADALUPE",
    description:
      "Café da manhã. Visita à Catedral Metropolitana e à emblemática Plaza de Santo Domingo, onde conheceremos a Igreja de Santo Domingo. Seguimos à Plaza das 3 Culturas, que reúne os restos arqueológicos pré-conquista, o templo de Santiago da era espanhola e o México moderno. Retorno à Basílica de Guadalupe com Celebração da Santa Missa e tempo para atividades pessoais. Hospedagem e jantar.",
    highlight: "A tilma de São Juan Diego permanece intacta há quase 500 anos.",
  },
  {
    day: "5º Dia",
    image: pueblaImg,
    imageAlt: "Centro histórico de Puebla",
    region: "Tlaxcala → Puebla",
    regionEn: "Puebla",
    title: "TLAXCALA / PUEBLA / PARIAN",
    description:
      "Café da manhã. Saída em direção a Tlaxcala para visitar a Basílica de Ocotlán, joia arquitetônica de estilo barroco. Continuação para o centro de Puebla, onde visitaremos a Catedral Metropolitana e a Capela do Rosário, com Celebração da Santa Missa. Tempo para almoço e visita à Feira de Parian. Retorno à Cidade do México para hospedagem e jantar.",
    highlight: "A Capela do Rosário, considerada a 'Oitava Maravilha do Mundo'.",
  },
  {
    day: "6º Dia",
    image: cancunImg,
    imageAlt: "Vista aérea da costa de Cancún",
    region: "Cidade do México → Cancún",
    regionEn: "Caribbean",
    title: "CIDADE DO MÉXICO / CANCÚN",
    description:
      "Café da manhã e tempo livre. Traslado ao aeroporto para embarque com destino a Cancún. Chegada, recepção e traslado para o hotel. Hospedagem com sistema All Inclusive.",
    highlight: "Um tempo de descanso para renovar corpo e alma.",
  },
  {
    day: "7º Dia",
    image: cancunHotelImg,
    imageAlt: "Zona hoteleira de Cancún ao entardecer",
    region: "Cancún & Isla Mujeres",
    regionEn: "Caribbean",
    title: "CANCÚN — ISLA MUJERES",
    description:
      "Café da manhã. Dia livre para atividades independentes em sistema All Inclusive. Celebração da Santa Missa. Sugerimos visita à Isla de las Mujeres, com suas águas cristalinas e cenários paradisíacos.",
    highlight: "A grandeza do Criador refletida na beleza da criação.",
  },
  {
    day: "8º Dia",
    image: chichenImg,
    imageAlt: "Pirâmide de Chichén Itzá",
    region: "Cancún & Chichén Itzá",
    regionEn: "Caribbean",
    title: "CANCÚN — CHICHÉN ITZÁ",
    description:
      "Café da manhã. Dia livre para atividades independentes em sistema All Inclusive. Celebração da Santa Missa. Sugerimos visita à Pirâmide de Chichén Itzá, uma das Sete Maravilhas do Mundo Moderno.",
    highlight: "As ruínas maias nos lembram que somente o Reino de Deus permanece.",
  },
  {
    day: "9º Dia",
    image: aeroportoGru,
    imageAlt: "Voo de retorno",
    region: "Cancún → São Paulo",
    regionEn: "Return",
    title: "CANCÚN / SÃO PAULO",
    description:
      "Café da manhã. Em horário combinado, traslado ao aeroporto de Cancún para embarque em voo com destino a São Paulo (GRU), fazendo as devidas conexões.",
    highlight: "O coração transbordando de gratidão pelas graças recebidas.",
  },
  {
    day: "10º Dia",
    image: aeroportoGru,
    imageAlt: "Aeroporto de Guarulhos — chegada",
    region: "São Paulo (GRU)",
    regionEn: "Arrival",
    title: "SÃO PAULO",
    description:
      "Chegada ao Aeroporto Internacional de Guarulhos. Fim de nossos serviços!",
    highlight: "Voltamos renovados na fé, levando no coração a ternura da Mãe de Guadalupe.",
  },
];

const WHATSAPP =
  "https://api.whatsapp.com/send/?phone=5519994718930&text=Ol%C3%A1%21+Tenho+interesse+na+Peregrina%C3%A7%C3%A3o+ao+M%C3%A9xico+com+Padre+Ant%C3%B4nio+Maria.+Aguardo+retorno&type=phone_number&app_absent=0";

const Roteiro = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const count = slides.length;

  const handleApi = (newApi: CarouselApi) => {
    setApi(newApi);
    if (newApi) {
      newApi.on("select", () => setCurrent(newApi.selectedScrollSnap()));
      setCurrent(newApi.selectedScrollSnap());
    }
  };

  return (
    <section id="roteiro" className="py-16 md:py-28 bg-background baroque-overlay">
      <div className="container mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-accent italic tracking-[0.3em] uppercase text-sm md:text-base text-secondary mb-3">
            Sua jornada, dia a dia
          </p>
          <h2 className="font-heading italic text-3xl md:text-5xl font-semibold text-primary leading-tight">
            Roteiro <span className="gold-shimmer">México</span>
          </h2>
          <div className="w-16 h-px bg-secondary mx-auto mt-6" />
          <p className="font-body text-muted-foreground text-sm md:text-base mt-6 leading-relaxed">
            10 dias de peregrinação ao lado do Padre Antônio Maria — Cidade do México,
            Guadalupe, Teotihuacán, Puebla e Cancún.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel setApi={handleApi} opts={{ loop: false }} className="w-full">
            <CarouselContent className="items-start">
              {slides.map((slide, idx) => (
                <CarouselItem key={idx}>
                  <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden glam-card shadow-xl">
                    <div className="relative h-64 md:h-auto md:min-h-[420px] overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        loading="lazy"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, hsl(var(--pam-wine-deep) / 0.6), transparent)",
                        }}
                      />
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-primary-foreground">
                        <span className="font-body text-xs opacity-80">
                          {String(idx + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                        </span>
                        <span className="gold-btn font-heading text-xs font-semibold px-3 py-1 rounded-full">
                          {slide.day}
                        </span>
                      </div>
                    </div>

                    <div className="p-7 md:p-10 flex flex-col justify-center">
                      <p className="font-accent italic text-secondary text-sm mb-2 tracking-[0.18em] uppercase">
                        {slide.regionEn}
                      </p>
                      <h3 className="font-heading italic font-semibold text-xl md:text-2xl text-primary leading-tight mb-1">
                        {slide.region}
                      </h3>
                      <div className="w-10 h-px bg-secondary my-5" />
                      <h4 className="font-heading italic font-semibold text-primary text-sm mb-3">
                        {slide.title}
                      </h4>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5">
                        {slide.description}
                      </p>
                      {slide.highlight && (
                        <p className="font-accent italic text-sm text-primary/80 border-l-2 border-secondary pl-3">
                          ✦ {slide.highlight}
                        </p>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2 flex-wrap">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => api?.scrollTo(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === current ? "bg-secondary w-8" : "bg-border w-4 hover:bg-muted-foreground/40"
                  }`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => api?.scrollPrev()}
                className="w-10 h-10 rounded-full border border-secondary/50 flex items-center justify-center text-primary hover:bg-secondary hover:text-secondary-foreground transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                className="w-10 h-10 rounded-full border border-secondary/50 flex items-center justify-center text-primary hover:bg-secondary hover:text-secondary-foreground transition-colors"
                aria-label="Próximo"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-14">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block gold-btn font-heading font-bold text-base md:text-lg px-10 py-4 rounded-full"
          >
            Saiba mais sobre o roteiro!
          </a>
        </div>
      </div>
    </section>
  );
};

export default Roteiro;
