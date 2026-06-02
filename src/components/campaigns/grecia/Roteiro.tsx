import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import atenasImg from "@/assets/grecia/atenas.jpg";
import delfosImg from "@/assets/grecia/delfos.jpg";
import meteoraImg from "@/assets/grecia/meteora.jpg";
import santoriniImg from "@/assets/grecia/hero-santorini.jpg";
import mykonosImg from "@/assets/grecia/mykonos.jpg";
import egeuImg from "@/assets/grecia/egeu.jpg";

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
    image: egeuImg,
    imageAlt: "Vista aérea do voo sobre o Mediterrâneo",
    region: "Piracicaba → São Paulo → Atenas",
    regionEn: "Departure",
    title: "PIRACICABA / SÃO PAULO / ATENAS",
    description:
      "Traslado de Piracicaba para o Aeroporto Internacional de Guarulhos (GRU) para embarque com destino a Atenas, com as devidas conexões.",
    highlight: "O início de uma jornada pelos passos do apóstolo Paulo.",
  },
  {
    day: "2º Dia",
    image: atenasImg,
    imageAlt: "Vista panorâmica de Atenas",
    region: "Atenas",
    regionEn: "Athens",
    title: "CHEGADA EM ATENAS",
    description:
      "Chegada à capital grega, recepção pelo guia local e traslado ao hotel. Jantar e hospedagem.",
    highlight: "Bem-vindos ao berço da civilização ocidental.",
  },
  {
    day: "3º Dia",
    image: atenasImg,
    imageAlt: "Acrópole de Atenas com o Partenon",
    region: "Atenas",
    regionEn: "Athens",
    title: "CITY TOUR EM ATENAS",
    description:
      "City tour panorâmico: Praça da Constituição (Sintagma), Túmulo do Soldado Desconhecido, Templo de Zeus, Arco de Adriano e o Estádio Panatenaico, palco dos primeiros Jogos Olímpicos modernos em 1896. Passagem pela Catedral e subida à Acrópole, com o Partenon e os templos da Rocha Sagrada. Visita ao Areópago (Mars Hill), onde o apóstolo Paulo pregou aos atenienses sobre o \"Deus desconhecido\" (Atos 17:22).",
    highlight: "No Areópago, sob as pedras onde Paulo anunciou o Evangelho.",
  },
  {
    day: "4º Dia",
    image: meteoraImg,
    imageAlt: "Paisagem montanhosa rumo a Tessalônica",
    region: "Atenas → Tessalônica",
    regionEn: "Thessaloniki",
    title: "ATENAS / TESSALÔNICA",
    description:
      "Partida para a capital da Macedônia, Tessalônica, importante cidade mencionada nas cartas de Paulo. Passeio panorâmico pela cidade e suas muralhas. Jantar e hospedagem em Tessalônica.",
    highlight: "Tessalônica — destinatária das epístolas paulinas.",
  },
  {
    day: "5º Dia",
    image: delfosImg,
    imageAlt: "Ruínas arqueológicas gregas",
    region: "Filipos, Anfípolis e Kavala",
    regionEn: "Philippi & Kavala",
    title: "TESSALÔNICA / FILIPOS / ANFÍPOLIS / KAVALA",
    description:
      "Saída para Filipos, onde Paulo pregou seu primeiro sermão em solo europeu, batizou Lídia — a primeira convertida na Europa — e esteve preso (Atos 16). Visita às ruínas do fórum, ao teatro e à prisão atribuída a Paulo. Seguimos até Kavala (antiga Neápolis), porto onde Paulo desembarcou vindo de Trôade. Breve passagem por Anfípolis, também citada em Atos. Retorno a Tessalônica.",
    highlight: "Filipos: o primeiro batismo cristão em solo europeu.",
  },
  {
    day: "6º Dia",
    image: meteoraImg,
    imageAlt: "Cidade histórica grega de Bereia",
    region: "Bereia → Atenas",
    regionEn: "Berea",
    title: "TESSALÔNICA / BEREIA / ATENAS",
    description:
      "Saída para Bereia, conhecida como Véria, cidade elogiada nas Escrituras porque seus habitantes examinavam diariamente as Escrituras para ver se o que Paulo dizia era verdade (Atos 17:11). Visita ao monumento dedicado ao apóstolo Paulo. Retorno a Atenas para jantar e hospedagem.",
    highlight: "Bereia: \"examinavam as Escrituras todos os dias\" (At 17:11).",
  },
  {
    day: "7º Dia",
    image: santoriniImg,
    imageAlt: "Ilhas gregas do Golfo Sarônico",
    region: "Cruzeiro pelas Ilhas",
    regionEn: "Saronic Islands",
    title: "CRUZEIRO ÀS ILHAS GREGAS",
    description:
      "Saída para o Porto de Pireus para embarque em um cruzeiro de 1 dia pelas ilhas do Golfo Sarônico: Hydra — ilha pitoresca onde não circulam carros, preservando seu charme único; Poros — pequena e acolhedora, com belas vistas e a torre do relógio; e Egina — ilha ligada ao ministério de São Nectários, muito visitada por cristãos ortodoxos. Almoço a bordo.",
    highlight: "Hydra, Poros e Egina em um único dia inesquecível.",
  },
  {
    day: "8º Dia",
    image: delfosImg,
    imageAlt: "Sítio arqueológico de Corinto",
    region: "Corinto",
    regionEn: "Corinth",
    title: "ATENAS / CORINTO / ATENAS",
    description:
      "Saída para Corinto, onde Paulo viveu por dezoito meses e trabalhou como fabricante de tendas, anunciando o Evangelho (Atos 18). Visitas ao Canal de Corinto e ao sítio arqueológico, incluindo o tribunal (Bema) onde Paulo foi julgado. Retorno a Atenas para tempo livre. Jantar e hospedagem.",
    highlight: "No Bema de Corinto — onde Paulo foi julgado.",
  },
  {
    day: "9º Dia",
    image: egeuImg,
    imageAlt: "Voo de retorno sobre o Mediterrâneo",
    region: "Atenas → São Paulo → Piracicaba",
    regionEn: "Return",
    title: "ATENAS / SÃO PAULO / PIRACICABA",
    description:
      "Saída para o aeroporto de Atenas para embarque em voo de retorno ao Brasil, com as devidas conexões. Chegada em São Paulo e traslado para Piracicaba. Fim dos nossos serviços!",
    highlight: "Memórias eternas dos passos de Paulo na Grécia.",
  },
];

const WHATSAPP =
  "https://api.whatsapp.com/send/?phone=5519988216863&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Renova%20Turismo%20e%20tenho%20interesse%20na%20peregrina%C3%A7%C3%A3o%20pela%20Gr%C3%A9cia%20%E2%80%94%20nos%20passos%20do%20ap%C3%B3stolo%20Paulo.%20Gostaria%20de%20receber%20mais%20informa%C3%A7%C3%B5es%20sobre%20datas%2C%20valores%20e%20disponibilidade.%20Aguardo%20retorno!&type=phone_number&app_absent=0";

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
            Roteiro <span className="display-outline-dark">Grécia</span>
          </h2>
          <div className="w-16 h-px bg-secondary mx-auto mt-6" />
          <p className="font-body text-muted-foreground text-sm md:text-base mt-6 leading-relaxed">
            9 dias nos passos do apóstolo Paulo: Atenas, Tessalônica, Filipos, Kavala, Bereia, Corinto e cruzeiro pelas ilhas gregas.
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
            Garanta Sua Vaga
          </a>
        </div>
      </div>
    </section>
  );
};

export default Roteiro;
