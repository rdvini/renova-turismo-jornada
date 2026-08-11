import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import heroAuroraImg from "@/assets/aurora-boreal/hero-aurora.jpg";
import reykjavikImg from "@/assets/aurora-boreal/reykjavik.jpg";
import lagoaGlacialImg from "@/assets/aurora-boreal/lagoa-glacial.jpg";
import cachoeiraImg from "@/assets/aurora-boreal/cachoeira.jpg";
import lagoaAzulImg from "@/assets/aurora-boreal/lagoa-azul.jpg";
import circuloDouradoImg from "@/assets/aurora-boreal/circulo-dourado.jpg";
import cacaAuroraImg from "@/assets/aurora-boreal/caca-aurora.jpg";

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
    image: heroAuroraImg,
    imageAlt: "Aurora boreal sobre paisagem nevada",
    region: "São Paulo → Reykjavík",
    regionEn: "Departure",
    title: "SÃO PAULO / REYKJAVÍK",
    description:
      "Em horário combinado, encontro no Aeroporto de Guarulhos (GRU) para embarque com destino à Islândia, fazendo as devidas conexões.",
    highlight: "O início de uma jornada rumo às luzes do norte.",
  },
  {
    day: "2º Dia",
    image: reykjavikImg,
    imageAlt: "Reykjavík no inverno com montanhas nevadas ao fundo",
    region: "Reykjavík",
    regionEn: "Arrival",
    title: "CHEGADA EM REYKJAVÍK",
    description:
      "Chegada à capital islandesa, recepção com assistência especializada e traslado ao hotel. Restante do dia livre para o primeiro contato com a cidade. Jantar e hospedagem.",
    highlight: "Bem-vindos à capital mais ao norte do mundo.",
  },
  {
    day: "3º Dia",
    image: reykjavikImg,
    imageAlt: "Casas coloridas e igreja Hallgrímskirkja em Reykjavík",
    region: "Reykjavík",
    regionEn: "City Tour",
    title: "CITY TOUR EM REYKJAVÍK",
    description:
      "Após o café da manhã, city tour panorâmico pela capital: a icônica igreja Hallgrímskirkja, o centro cultural Harpa, a orla com a escultura Sun Voyager, a Perlan e o charmoso centro histórico com suas casas coloridas. Tarde livre para compras e gastronomia local. Jantar e hospedagem.",
    highlight: "Cultura nórdica, design e gastronomia em um só dia.",
  },
  {
    day: "4º Dia",
    image: circuloDouradoImg,
    imageAlt: "Gêiser em erupção no Círculo Dourado da Islândia",
    region: "Círculo Dourado",
    regionEn: "Golden Circle",
    title: "REYKJAVÍK / CÍRCULO DOURADO / REYKJAVÍK",
    description:
      "Dia dedicado ao famoso Círculo Dourado: o Parque Nacional Thingvellir, onde as placas tectônicas se encontram, a área geotérmica de Geysir com seus gêiseres em erupção e a imponente cachoeira Gullfoss. Retorno ao hotel para jantar e hospedagem.",
    highlight: "Gêiseres, falhas tectônicas e cachoeiras monumentais.",
  },
  {
    day: "5º Dia",
    image: cachoeiraImg,
    imageAlt: "Cachoeira islandesa cercada de neve",
    region: "Costa Sul",
    regionEn: "South Coast",
    title: "COSTA SUL E PRAIAS NEGRAS",
    description:
      "Saída pela deslumbrante costa sul: as cachoeiras Seljalandsfoss e Skógafoss, a praia de areia negra de Reynisfjara com suas colunas de basalto e o vilarejo de Vík. Jantar e pernoite na região.",
    highlight: "Cachoeiras congeladas e praias de areia vulcânica.",
  },
  {
    day: "6º Dia",
    image: lagoaGlacialImg,
    imageAlt: "Icebergs azuis na lagoa glacial de Jökulsárlón",
    region: "Jökulsárlón",
    regionEn: "Glacier Lagoon",
    title: "LAGOA GLACIAL E DIAMOND BEACH",
    description:
      "Visita à lagoa glacial de Jökulsárlón, com seus icebergs azuis flutuando, e à Diamond Beach, onde blocos de gelo repousam sobre a areia negra. Caminhada panorâmica pelo Parque Nacional Vatnajökull. Jantar e pernoite.",
    highlight: "O azul das geleiras contra a areia negra.",
  },
  {
    day: "7º Dia",
    image: cacaAuroraImg,
    imageAlt: "Grupo observando a aurora boreal no céu noturno",
    region: "Caça à Aurora",
    regionEn: "Northern Lights",
    title: "EXPEDIÇÃO À AURORA BOREAL",
    description:
      "Dia com atividades livres e, à noite, expedição exclusiva de caça à aurora boreal com guia especializado, em busca dos melhores céus limpos e escuros para observar as luzes do norte. Retorno ao hotel.",
    highlight: "A noite mais esperada da viagem.",
  },
  {
    day: "8º Dia",
    image: lagoaAzulImg,
    imageAlt: "Águas termais azul-leitosas entre rochas vulcânicas",
    region: "Águas Termais",
    regionEn: "Blue Lagoon",
    title: "LAGOA AZUL E TERMAS GEOTÉRMICAS",
    description:
      "Manhã dedicada ao relaxamento nas famosas águas termais geotérmicas de tom azul-leitoso, cercadas por campos de lava. Tarde livre em Reykjavík para últimas compras. Jantar de despedida.",
    highlight: "Relaxamento em águas termais a 39 °C.",
  },
  {
    day: "9º Dia",
    image: heroAuroraImg,
    imageAlt: "Céu noturno com aurora boreal na Islândia",
    region: "Reykjavík → São Paulo",
    regionEn: "Return",
    title: "REYKJAVÍK / GUARULHOS",
    description:
      "Após o café da manhã, traslado ao aeroporto para embarque em voo com destino a São Paulo, fazendo as devidas conexões. Chegada em São Paulo. Fim dos nossos serviços!",
    highlight: "Memórias eternas sob as luzes do norte.",
  },
];

const WHATSAPP =
  "https://api.whatsapp.com/send/?phone=5519988216863&text=" +
  encodeURIComponent(
    "Olá! Vim pela landing page da Renova Turismo e tenho interesse no roteiro da Aurora Boreal. Gostaria de receber mais informações sobre datas, valores e disponibilidade. Aguardo retorno!"
  ) +
  "&type=phone_number&app_absent=0";

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
    <section id="roteiro" className="py-16 md:py-28 bg-background">
      <div className="container mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-accent italic text-lg text-secondary mb-3">
            Sua jornada, dia a dia
          </p>
          <h2 className="font-heading uppercase text-3xl md:text-5xl text-primary leading-tight">
            Roteiro <span className="display-outline-dark">Aurora Boreal</span>
          </h2>
          <div className="w-16 h-px bg-secondary mx-auto mt-6" />
          <p className="font-body text-muted-foreground text-sm md:text-base mt-6 leading-relaxed">
            9 dias pelos cenários mais impressionantes da Islândia: Reykjavík, Círculo Dourado, costa sul, lagoa glacial, águas termais e expedição à aurora boreal.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel setApi={handleApi} opts={{ loop: false }} className="w-full">
            <CarouselContent className="items-start">
              {slides.map((slide, idx) => (
                <CarouselItem key={idx}>
                  <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-muted shadow-xl">
                    <div className="relative h-64 md:h-auto md:min-h-[420px] overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        loading="lazy"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-muted/30" />
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-primary-foreground">
                        <span className="font-body text-xs opacity-80">
                          {String(idx + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                        </span>
                        <span className="font-accent italic text-sm bg-secondary/95 text-secondary-foreground px-3 py-1 rounded-full">
                          {slide.day}
                        </span>
                      </div>
                    </div>

                    <div className="p-7 md:p-10 flex flex-col justify-center">
                      <p className="font-accent italic text-secondary text-sm mb-2">
                        {slide.regionEn}
                      </p>
                      <h3 className="font-heading uppercase text-xl md:text-2xl text-primary leading-tight mb-1">
                        {slide.region}
                      </h3>
                      <div className="w-10 h-px bg-secondary my-5" />
                      <h4 className="font-heading text-primary text-sm mb-3">
                        {slide.title}
                      </h4>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5">
                        {slide.description}
                      </p>
                      {slide.highlight && (
                        <p className="font-accent italic text-sm text-secondary/90 border-l-2 border-secondary/50 pl-3">
                          ✦ {slide.highlight}
                        </p>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Custom chevron controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
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
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
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
            className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body uppercase tracking-[0.18em] text-xs md:text-sm font-semibold px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            Saiba mais sobre o roteiro!
          </a>
        </div>
      </div>
    </section>
  );
};

export default Roteiro;
