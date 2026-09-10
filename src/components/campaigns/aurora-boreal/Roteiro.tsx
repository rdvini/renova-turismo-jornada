import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import embarqueImgAsset from "@/assets/aurora-boreal/embarque-familia-aeroporto.jpg.asset.json";
const embarqueImg = embarqueImgAsset.url;
import copenhagueImg from "@/assets/aurora-boreal/copenhague-nyhavn.jpg";
import sereiaImg from "@/assets/aurora-boreal/copenhague-sereia.jpg";
import ferryImg from "@/assets/aurora-boreal/ferry-dfds.jpg";
import osloImg from "@/assets/aurora-boreal/oslo-grand-hotel.jpg.asset.json";
import tromsoFjellheisenImg from "@/assets/aurora-boreal/tromso-fjellheisen.jpg";
import tromsoAuroraImg from "@/assets/aurora-boreal/tromso-aurora.jpg";
import reindeerImg from "@/assets/aurora-boreal/tromso-catedral-arctica.jpg.asset.json";
import estocolmoImg from "@/assets/aurora-boreal/estocolmo-gamla-stan.jpg";
import estocolmoCityHallImg from "@/assets/aurora-boreal/estocolmo-city-hall.jpg.asset.json";
import estocolmoDrottningholmImg from "@/assets/aurora-boreal/estocolmo-drottningholm.jpg.asset.json";

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
    image: embarqueImg,
    imageAlt: "Embarque no Aeroporto Internacional de Guarulhos",
    region: "São Paulo → Copenhague",
    regionEn: "Departure",
    title: "SÃO PAULO / COPENHAGUE",
    description:
      "Em horário combinado, encontro no Aeroporto Internacional de Guarulhos para embarque com destino a Copenhague, fazendo as devidas conexões.",
    highlight: "O início da jornada rumo ao norte da Europa.",
  },
  {
    day: "2º Dia",
    image: copenhagueImg,
    imageAlt: "Canais coloridos de Nyhavn em Copenhague",
    region: "Copenhague",
    regionEn: "Arrival",
    title: "CHEGADA EM COPENHAGUE",
    description:
      "Chegada ao aeroporto de Copenhague e traslado ao hotel. Hospedagem. O guia estará disponível no hotel a partir das 18h30.",
    highlight: "Primeiro contato com a capital dinamarquesa.",
  },
  {
    day: "3º Dia",
    image: sereiaImg,
    imageAlt: "A Pequena Sereia, símbolo de Copenhague",
    region: "Copenhague",
    regionEn: "City Tour",
    title: "CITY TOUR EM COPENHAGUE",
    description:
      "Após o café da manhã, visita panorâmica pela cidade, conhecendo seus principais monumentos e locais históricos, como a Praça da Prefeitura, o Palácio de Christiansborg (atual sede do Parlamento), a Fonte da Deusa Gefion, o porto de Nyhavn com suas pitorescas e coloridas casas do século XVII e, é claro, o símbolo da cidade, a famosa Pequena Sereia. Opcionalmente, poderemos visitar o majestoso Castelo Real de Frederiksborg, no norte da Zelândia. Tarde livre e hospedagem.",
    highlight: "Cores, história e charme nórdico em um só dia.",
  },
  {
    day: "4º Dia",
    image: ferryImg,
    imageAlt: "Ferry noturno DFDS navegando pelo Mar do Norte",
    region: "Copenhague → Oslo",
    regionEn: "DFDS Cruise",
    title: "COPENHAGUE / CRUZEIRO DFDS / OSLO",
    description:
      "Café da manhã e tempo livre até as 15h00. Traslado ao porto para embarque no ferry noturno DFDS (balsa de passageiros com conforto de navio de cruzeiro) com destino a Oslo, atravessando o Mar do Norte. O navio conta com diversos tipos de restaurantes, bar, lojas, discoteca e Wi-Fi. Hospedagem em cabine externa com janela. Jantar buffet a bordo.",
    highlight: "Uma noite de navegação entre a Dinamarca e a Noruega.",
  },
  {
    day: "5º Dia",
    image: osloImg.url,
    imageAlt: "Fachada histórica do Grand Hotel em Oslo",
    region: "Oslo",
    regionEn: "Viking Capital",
    title: "A CAPITAL VIKINGA",
    description:
      "Café da manhã a bordo e chegada a Oslo às 09h30. Desembarque e visita à 'Capital Vikinga', situada no fim do fiorde homônimo. Passaremos pela Prefeitura, Castelo Akershus, Palácio Real, Parlamento e o Parque Vigeland, com as famosas esculturas de bronze de Gustav Vigeland que simbolizam o ciclo da vida humana, incluindo o grande monólito com 121 corpos entrelaçados. Tarde livre para passear pelo animado bairro de Aker Brygge, área portuária revitalizada com restaurantes, bares, discotecas e lojas. Hospedagem.",
    highlight: "Esculturas monumentais e o fiorde de Oslo.",
  },
  {
    day: "6º Dia",
    image: tromsoFjellheisenImg,
    imageAlt: "Vista panorâmica de Tromsø do teleférico Fjellheisen",
    region: "Oslo → Tromsø",
    regionEn: "Flight North",
    title: "OSLO / TROMSØ",
    description:
      "Café da manhã e traslado ao aeroporto para embarque com destino a Tromsø. Chegada e hospedagem.",
    highlight: "Rumo ao círculo polar ártico.",
  },
  {
    day: "7º Dia",
    image: tromsoAuroraImg,
    imageAlt: "Aurora boreal sobre acampamento Sami em Tromsø",
    region: "Tromsø",
    regionEn: "Arctic Adventure",
    title: "TROMSØ E CAÇA À AURORA BOREAL",
    description:
      "Café da manhã e visita panorâmica pela cidade, incluindo visita ao interior da Catedral do Ártico. Em seguida, subida de teleférico Fjellheisen ao Monte Fløya para apreciar uma vista panorâmica da cidade, das ilhas e dos fiordes ao redor. Retorno ao hotel e tarde livre. À noite, saída para um acampamento Sami, a cerca de 75 minutos da cidade. A região apresenta clima seco e estável, com muitos dias de céu limpo — o que aumenta as chances de observar os delicados raios da Aurora Boreal. Durante a visita, será servida uma refeição quente, e haverá um agradável momento social em torno da fogueira na grande Lavvu (tenda tradicional dos pastores Sami). Hospedagem.",
    highlight: "A noite mais esperada da viagem.",
  },
  {
    day: "8º Dia",
    image: reindeerImg.url,
    imageAlt: "Catedral do Ártico em Tromsø com montanhas nevadas ao fundo",
    region: "Tromsø",
    regionEn: "Sami Experience",
    title: "TRILHA DE RENAS E CULTURA SAMI",
    description:
      "Após o café da manhã, visitaremos outro campo Sami. Seguindo as tradições dessa cultura, faremos um passeio em trenó puxado por renas através de paisagens congeladas e deslumbrantes. A atividade é adequada para todas as idades, pois o trajeto é tranquilo e os trenós são conduzidos em duplas, cada um com uma rena. Em seguida, haverá a oportunidade de tentar laçar uma rena, como fazem os Samis em suas práticas tradicionais. A excursão termina com uma refeição quente. Retorno ao hotel e hospedagem em Tromsø.",
    highlight: "Uma experiência tradicional no coração do Ártico.",
  },
  {
    day: "9º Dia",
    image: tromsoFjellheisenImg,
    imageAlt: "Paisagem ártica de Tromsø com montanhas nevadas",
    region: "Tromsø → Oslo",
    regionEn: "Return South",
    title: "TROMSØ / OSLO",
    description:
      "Café da manhã e traslado ao aeroporto no horário previsto para embarque com destino a Oslo. Chegada e hospedagem.",
    highlight: "Retorno à capital norueguesa.",
  },
  {
    day: "10º Dia",
    image: estocolmoCityHallImg.url,
    imageAlt: "Prefeitura de Estocolmo à beira do mar",
    region: "Oslo → Estocolmo",
    regionEn: "Scenic Train",
    title: "OSLO / ESTOCOLMO",
    description:
      "Café da manhã e traslado à estação ferroviária para embarque no trem rápido com destino a Estocolmo. Chegada, traslado ao hotel e hospedagem.",
    highlight: "Uma viagem panorâmica entre duas capitais nórdicas.",
  },
  {
    day: "11º Dia",
    image: estocolmoDrottningholmImg.url,
    imageAlt: "Palácio de Drottningholm, residência real sueca",
    region: "Estocolmo",
    regionEn: "City Tour",
    title: "CITY TOUR EM ESTOCOLMO",
    description:
      "Café da manhã e visita pela cidade, passando pela cidade antiga (Gamla Stan), onde se encontram importantes edifícios históricos, como o Palácio Real, a Casa da Nobreza e o Museu Nobel. Seguiremos até a ilha de Södermalm, situada sobre várias colinas, de onde se tem uma vista espetacular da parte norte de Estocolmo. Hospedagem.",
    highlight: "O encanto das ilhas e da história sueca.",
  },
  {
    day: "12º Dia",
    image: estocolmoImg,
    imageAlt: "Estocolmo sob luz invernal",
    region: "Estocolmo → São Paulo",
    regionEn: "Departure",
    title: "ESTOCOLMO / SÃO PAULO",
    description:
      "Café da manhã e traslado ao aeroporto para embarque com destino a São Paulo.",
    highlight: "Despedida do norte da Europa.",
  },
  {
    day: "13º Dia",
    image: embarqueImg,
    imageAlt: "Chegada ao Aeroporto Internacional de Guarulhos",
    region: "São Paulo",
    regionEn: "Arrival",
    title: "CHEGADA EM GUARULHOS",
    description:
      "Chegada ao Aeroporto Internacional de Guarulhos. Fim de nossos serviços!",
    highlight: "Memórias eternas sob as luzes do norte.",
  },
];

const WHATSAPP =
  "https://api.whatsapp.com/send/?phone=5519992016125&text=" +
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
            13 dias pelo norte da Europa: Copenhague, cruzeiro DFDS, Oslo, Tromsø com caça à aurora e cultura Sami, e Estocolmo.
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
