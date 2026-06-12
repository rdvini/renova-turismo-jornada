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
import partenonAsset from "@/assets/grecia/partenon.jpg.asset.json";
const egeuImg = partenonAsset.url;

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
    region: "São Paulo → Atenas",
    regionEn: "Departure",
    title: "SÃO PAULO / ATENAS",
    description:
      "Em horário combinado, encontro no Aeroporto de Guarulhos (GRU) para embarque com destino a Atenas, fazendo as devidas conexões.",
    highlight: "O início de uma jornada inesquecível pela Grécia.",
  },
  {
    day: "2º Dia",
    image: atenasImg,
    imageAlt: "Vista panorâmica de Atenas",
    region: "Atenas",
    regionEn: "Athens",
    title: "CHEGADA EM ATENAS",
    description:
      "Chegada à capital grega, encontro com assistência especializada e traslado ao hotel. Jantar e hospedagem.",
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
      "Após o café da manhã, city tour panorâmico por Atenas: Universidade, Academia e Biblioteca Nacional. Parada na Praça da Constituição (Sintagma), onde está o Túmulo do Soldado Desconhecido. Passagem pelo Templo de Zeus, Arco de Adriano e pelo Estádio Panatenaico, palco dos primeiros Jogos Olímpicos da era moderna em 1896. Passagem pela Casa da Moeda e Catedral, e visita à famosa Acrópole, ao Partenon e a todos os templos da Rocha Sagrada. Retorno ao hotel para jantar e hospedagem.",
    highlight: "Acrópole e Partenon — ícones da Grécia Antiga.",
  },
  {
    day: "4º Dia",
    image: delfosImg,
    imageAlt: "Ruínas arqueológicas de Corinto e Micenas",
    region: "Corinto e Micenas",
    regionEn: "Corinth & Mycenae",
    title: "ATENAS / CORINTO / MICENAS / ATENAS",
    description:
      "Após o café da manhã, seguiremos para Corinto. Conheceremos o Canal de Corinto, que liga o Mar Egeu ao Mar Jônico, Argólida, Epidauro e o Teatro. Continuação para Micenas, onde visitaremos o sítio arqueológico. Retorno ao hotel para jantar e hospedagem.",
    highlight: "Do Canal de Corinto às ruínas milenares de Micenas.",
  },
  {
    day: "5º Dia",
    image: meteoraImg,
    imageAlt: "Paisagem montanhosa de Meteora",
    region: "Delfos → Meteora",
    regionEn: "Delphi & Meteora",
    title: "ATENAS / DELFOS / METEORA",
    description:
      "Após o café da manhã, seguiremos para o interior da Grécia. Visita à cidade de Delfos (conhecida na antiguidade como o centro do mundo), seus sítios arqueológicos e o Museu, com a famosa estátua \"A Auriga de Bronze\". Estátua de Leônidas das Termópilas. Partida para Kalambaka, pequena cidade localizada junto às rochas gigantescas que compõem o conjunto de Meteora. Jantar e pernoite.",
    highlight: "Delfos, o centro do mundo antigo, e as rochas de Meteora.",
  },
  {
    day: "6º Dia",
    image: meteoraImg,
    imageAlt: "Mosteiros sobre as rochas de Meteora",
    region: "Meteora → Atenas",
    regionEn: "Meteora",
    title: "METEORA / ATENAS",
    description:
      "Após o café da manhã, visita a Meteora (no centro do vale na Tessália), onde se combina a beleza única da paisagem com construções do século XIV erguidas sobre as rochas. Visita a dois pontos da região, observando a história e a cultura destes importantes locais. Saída em direção a Atenas, passando por Termópilas, onde se encontra a estátua do Rei Espartano Leônidas. Jantar e pernoite em Atenas.",
    highlight: "Paisagens suspensas entre rochas e história milenar.",
  },
  {
    day: "7º Dia",
    image: santoriniImg,
    imageAlt: "Cruzeiro pelas ilhas gregas",
    region: "Cruzeiro pelas Ilhas",
    regionEn: "Greek Islands",
    title: "ATENAS / CRUZEIRO ÀS ILHAS / ATENAS",
    description:
      "Após o café da manhã, seguiremos ao Porto de Pireus para passeio de barco pelas Ilhas Gregas, com almoço a bordo. Retorno ao hotel para jantar e hospedagem.",
    highlight: "Um dia inesquecível pelo azul do Egeu.",
  },
  {
    day: "8º Dia",
    image: mykonosImg,
    imageAlt: "Museu e ruas de Atenas",
    region: "Atenas",
    regionEn: "Athens",
    title: "ATENAS",
    description:
      "Café da manhã. Pela manhã, visita ao Museu Arqueológico de Atenas. À tarde, tempo livre para compras e atividades pessoais. Jantar e pernoite.",
    highlight: "Tesouros do Museu Arqueológico e tarde livre na capital.",
  },
  {
    day: "9º Dia",
    image: egeuImg,
    imageAlt: "Voo de retorno sobre o Mediterrâneo",
    region: "Atenas → São Paulo",
    regionEn: "Return",
    title: "ATENAS / GUARULHOS",
    description:
      "Após o café da manhã, saída para o aeroporto de Atenas para embarque em voo com destino a São Paulo, fazendo as devidas conexões. Chegada em São Paulo. Fim dos nossos serviços!",
    highlight: "Memórias eternas da Grécia.",
  },
];

const WHATSAPP =
  "https://api.whatsapp.com/send/?phone=5519988216863&text=Ol%C3%A1!%20Vim%20pela%20landing%20page%20da%20Renova%20Turismo%20e%20tenho%20interesse%20no%20roteiro%20da%20Gr%C3%A9cia.%20Gostaria%20de%20receber%20mais%20informa%C3%A7%C3%B5es%20sobre%20datas%2C%20valores%20e%20disponibilidade.%20Aguardo%20retorno!&type=phone_number&app_absent=0";

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
            9 dias pelos cenários mais marcantes da Grécia: Atenas, Corinto, Micenas, Delfos, Meteora e cruzeiro pelas ilhas gregas.
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
