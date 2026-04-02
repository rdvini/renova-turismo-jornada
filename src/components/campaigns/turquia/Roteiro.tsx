import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

import manausImg from "@/assets/padre-leudo/manaus-departure.jpg";
import istanbulImg from "@/assets/padre-leudo/istanbul-skyline.jpg";
import capadociaImg from "@/assets/padre-leudo/capadocia.jpg";
import konyaImg from "@/assets/padre-leudo/pamukkale-thermal-pools.jpg";
import pamukkaleImg from "@/assets/padre-leudo/laodiceia.jpg";
import efesoImg from "@/assets/padre-leudo/efeso-ruins.jpg";
import bursaImg from "@/assets/padre-leudo/bursa.jpg";

interface DayCard {
  day: string;
  title: string;
  description: string;
  highlight?: string;
}

interface Slide {
  image: string;
  imageAlt: string;
  region: string;
  days: DayCard[];
}

const slides: Slide[] = [
  {
    image: manausImg,
    imageAlt: "Partida de Manaus ao pôr do sol",
    region: "Guarulhos – São Paulo → Istambul",
    days: [
      {
        day: "1° Dia",
        title: "GUARULHOS – SÃO PAULO / ISTAMBUL",
        description:
          "Apresentação no Aeroporto Internacional de Guarulhos – São Paulo para embarque com destino a Istambul, fazendo as devidas conexões. Noite e jantar a bordo.",
        highlight:
          "O início de uma jornada internacional repleta de descobertas culturais, paisagens marcantes e experiências memoráveis.",
      },
      {
        day: "2° Dia",
        title: "ISTAMBUL",
        description:
          "Chegada a Istambul, traslado ao hotel para jantar e hospedagem.",
        highlight:
          "Chegada à vibrante Istambul, cidade onde tradição e modernidade se encontram entre dois continentes.",
      },
    ],
  },
  {
    image: istanbulImg,
    imageAlt: "Mesquita Azul e Hagia Sophia ao entardecer",
    region: "Istambul",
    days: [
      {
        day: "3° Dia",
        title: "ISTAMBUL",
        description:
          "Após café da manhã, visitaremos a Praça do Hipódromo, construída na época romana. Seguiremos para a Mesquita Azul, a obra mais famosa da arquitetura otomana. Na parte da tarde, visitaremos o Palácio de Topkapi, antiga residência dos Sultões Otomanos. Nossa última parada será no Bazar de Especiarias.",
        highlight:
          "Um dia para mergulhar na grandiosidade da arquitetura otomana e no ritmo vibrante dos mercados históricos de Istambul.",
      },
      {
        day: "4° Dia",
        title: "ISTAMBUL",
        description:
          "Passeio de barco pelo Bósforo com vista dos palácios de Dolmabahce, Ciragan, Beylerbeyi e a Fortaleza de Rumeli Hisari. Visita ao Palácio Dolmabahce e à Santa Sofia — Igreja durante 916 anos, Mesquita durante 477 anos, museu em 1936 e novamente Mesquita em 2020. Visita ao Gran Bazar.",
        highlight:
          "Entre o Bósforo e os palácios históricos, este roteiro revela algumas das paisagens urbanas mais icônicas da Turquia.",
      },
    ],
  },
  {
    image: capadociaImg,
    imageAlt: "Paisagem surreal da Capadócia com chaminés de fadas",
    region: "Capadócia",
    days: [
      {
        day: "5° Dia",
        title: "ISTAMBUL / CAPADÓCIA",
        description:
          "Voo para a Capadócia. Visitaremos o Museu Aberto de Göreme, complexo monástico bizantino com igrejas ricamente ornadas com afrescos, quartos e refeitórios escavados na rocha. Parada em cooperativa de tapetes turcos.",
        highlight:
          "A Capadócia encanta com formações rochosas únicas, herança histórica e uma atmosfera visualmente inesquecível.",
      },
      {
        day: "6° Dia",
        title: "CAPADÓCIA",
        description:
          "Visita aos Vales da Capadócia com Chaminés de Fadas (possibilidade de passeio de balão). Exploração da cidade subterrânea de Ozkonak, com 40 metros de profundidade e 10 andares, capaz de abrigar 60 mil pessoas. Visita à Vila de Uchisar e ao Vale dos Pombos.",
        highlight:
          "Dos vales aos cenários subterrâneos, este é um dos trechos mais surpreendentes de toda a viagem.",
      },
    ],
  },
  {
    image: konyaImg,
    imageAlt: "Monastério dos Derviches em Konya",
    region: "Konya → Pamukkale",
    days: [
      {
        day: "7° Dia",
        title: "CAPADÓCIA / KONYA / PAMUKKALE",
        description:
          "Saída para Konya para visitar o museu do antigo Monastério dos Derviches Dançarinos, fundado por Mevlana no século XIII. Almoço. Continuação a Pamukkale, famosa por suas águas termais e cascatas de cálcio petrificado formando montanhas brancas de algodão.",
        highlight:
          "Entre tradição cultural e paisagens naturais, este percurso combina história, arte e beleza cênica.",
      },
    ],
  },
  {
    image: pamukkaleImg,
    imageAlt: "Terraços brancos de Pamukkale",
    region: "Pamukkale & Laodiceia",
    days: [
      {
        day: "8° Dia",
        title: "PAMUKKALE / LAODICEIA",
        description:
          "Visita a Hierápolis, Patrimônio Mundial da UNESCO, com nascentes de água quentes e ruínas da antiga capital Frígia. Visita à Igreja de Laodiceia, uma das Sete Igrejas do Apocalipse de São João. Retorno ao hotel para aproveitar as águas termais.",
        highlight:
          "Pamukkale reúne águas termais, ruínas históricas e um dos cenários naturais mais impressionantes do país.",
      },
    ],
  },
  {
    image: efesoImg,
    imageAlt: "Ruínas da antiga cidade de Éfeso",
    region: "Éfeso & Kusadasi",
    days: [
      {
        day: "9° Dia",
        title: "ÉFESO / KUSADASI",
        description:
          "Visita a Éfeso, um dos mais impressionantes sítios arqueológicos do mundo, com ruínas monumentais que revelam a grandiosidade da Antiguidade. Almoço. Continuação para Kusadasi.",
        highlight:
          "Um mergulho na herança clássica da região, com arquitetura monumental e muita história a céu aberto.",
      },
    ],
  },
  {
    image: bursaImg,
    imageAlt: "Mesquita Verde em Bursa",
    region: "Bursa → Istambul → Guarulhos – São Paulo",
    days: [
      {
        day: "10° Dia",
        title: "KUSADASI / BURSA / ISTAMBUL",
        description:
          "Saída com destino a Istambul. Parada em Bursa para visitar o mercado da seda, a Mesquita Verde e o Mausoléu Verde, construídos a pedido do Sultão Mehmet I, com interior decorado por azulejos Iznik de cores verde e turquesa. Chegada a Istambul.",
        highlight:
          "Bursa encanta pela tradição artesanal, pelos mercados históricos e pelos detalhes marcantes de sua arquitetura.",
      },
      {
        day: "11° Dia",
        title: "ISTAMBUL / GUARULHOS – SÃO PAULO",
        description:
          "Após café da manhã, traslado ao aeroporto internacional de Istambul para embarque em voo com destino a Guarulhos – São Paulo, fazendo as devidas conexões. Chegada ao aeroporto internacional de Guarulhos – São Paulo. Fim dos nossos serviços.",
        highlight:
          "Retorno para casa com bagagem cheia de memórias, experiências e paisagens inesquecíveis da Turquia.",
      },
    ],
  },
];

const Roteiro = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const count = slides.length;

  const onSelect = () => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  };

  const handleApi = (newApi: CarouselApi) => {
    setApi(newApi);
    if (newApi) {
      newApi.on("select", onSelect);
      setCurrent(newApi.selectedScrollSnap());
    }
  };

  return (
    <section id="roteiro" className="pt-20 md:pt-28 pb-8 md:pb-10 bg-background">
      <div className="container mx-auto px-4">
        <p className="font-accent text-lg italic text-secondary text-center mb-2">
          Sua viagem pela Turquia, dia a dia
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-4">
          Roteiro — Cidades
        </h2>
        <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-sm">
          11 dias explorando cidades históricas, paisagens icônicas e alguns dos cenários mais marcantes da Turquia.
        </p>

        <div className="max-w-5xl mx-auto">
          <Carousel
            setApi={handleApi}
            opts={{ loop: false }}
            className="w-full"
          >
            <CarouselContent>
              {slides.map((slide, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative rounded-xl overflow-hidden bg-card">
                    <div className="relative h-56 md:h-72 overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={960}
                        height={640}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                      <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                        <div>
                          <span className="text-xs uppercase tracking-widest text-secondary font-body font-semibold">
                            {slide.days.map((d) => d.day).join(" — ")}
                          </span>
                          <h3 className="font-heading text-xl md:text-2xl font-bold text-primary-foreground mt-1">
                            {slide.region}
                          </h3>
                        </div>
                        <span className="text-primary-foreground/60 text-xs font-body">
                          {idx + 1} / {count}
                        </span>
                      </div>
                    </div>

                    <div className={`p-5 md:p-8 grid gap-6 ${slide.days.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
                      {slide.days.map((day) => (
                        <div
                          key={day.day}
                          className="border border-border rounded-lg p-5 bg-background hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <span className="bg-secondary text-secondary-foreground text-xs font-heading font-bold px-3 py-1 rounded-full">
                              {day.day}
                            </span>
                            <h4 className="font-heading text-sm font-bold text-primary">
                              {day.title}
                            </h4>
                          </div>
                          <p className="font-body text-muted-foreground text-sm leading-relaxed mb-3">
                            {day.description}
                          </p>
                          {day.highlight && (
                            <p className="font-accent text-xs italic text-secondary/80 border-l-2 border-secondary/30 pl-3">
                              Destaque: {day.highlight}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="-left-4 md:-left-12 bg-primary text-primary-foreground border-none hover:bg-primary/90" />
            <CarouselNext className="-right-4 md:-right-12 bg-primary text-primary-foreground border-none hover:bg-primary/90" />
          </Carousel>

          <div className="flex justify-center gap-2 mt-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => api?.scrollTo(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === current
                    ? "bg-secondary w-6"
                    : "bg-border hover:bg-muted-foreground/40"
                }`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="https://api.whatsapp.com/send/?phone=5519994718930&text=Ol%C3%A1%21+Encontrei+voc%C3%AAs+pelo+Google+e+gostaria+de+receber+mais+informa%C3%A7%C3%B5es.+Aguardo+retorno&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-lg px-12 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            Garanta Sua Vaga na Viagem
          </a>
        </div>
      </div>
    </section>
  );
};

export default Roteiro;
