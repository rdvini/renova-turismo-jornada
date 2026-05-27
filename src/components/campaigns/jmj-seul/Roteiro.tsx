import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

import guarulhosImg from "@/assets/portugal/guarulhos-departure.webp";
import heroSeoul from "@/assets/jmj-seul/hero.jpg";
import gyeongbokgungImg from "@/assets/jmj-seul/gyeongbokgung.jpg";
import myeongdongImg from "@/assets/jmj-seul/myeongdong-cathedral.jpg";
import bukchonImg from "@/assets/jmj-seul/bukchon.jpg";
import busanImg from "@/assets/jmj-seul/busan.jpg";
import jmjImg from "@/assets/jmj-seul/card-cover.jpg";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=5519992016125&text=Ol%C3%A1+Guilherme%21+Tenho+interesse+na+viagem+para+a+JMJ+Seul+2027+e+gostaria+de+receber+mais+informa%C3%A7%C3%B5es.&type=phone_number&app_absent=0";

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
    image: guarulhosImg,
    imageAlt: "Aeroporto de Guarulhos – partida para Seul",
    region: "São Paulo → Seul",
    days: [
      {
        day: "1º Dia",
        title: "SÃO PAULO / SEUL",
        description:
          "Encontro no aeroporto internacional de Guarulhos para embarque em voo com destino a Seul, fazendo as devidas conexões.",
        highlight: "O início de uma jornada de fé até a JMJ na Coreia do Sul.",
      },
      {
        day: "2º Dia",
        title: "CHEGADA A SEUL",
        description:
          "Chegada ao aeroporto internacional de Incheon. Recepção pela equipe local e traslado ao hotel. Jantar e pernoite.",
        highlight: "Boas-vindas à capital da Coreia do Sul, sede da JMJ 2027.",
      },
    ],
  },
  {
    image: heroSeoul,
    imageAlt: "Skyline de Seul, Coreia do Sul",
    region: "Seul — Ambientação",
    days: [
      {
        day: "3º Dia",
        title: "SEUL — ORIENTAÇÃO E ABERTURA",
        description:
          "Após café da manhã, momento de ambientação e orientações sobre a programação oficial da Jornada Mundial da Juventude. Tarde dedicada ao credenciamento dos peregrinos e participação na Missa de Abertura da JMJ. Jantar e pernoite.",
        highlight: "Sua chegada oficial à JMJ Seul 2027 com o credenciamento e a Missa de Abertura.",
      },
    ],
  },
  {
    image: myeongdongImg,
    imageAlt: "Catedral de Myeongdong, Seul",
    region: "Seul Católica",
    days: [
      {
        day: "4º Dia",
        title: "CATEDRAL DE MYEONGDONG E SANTUÁRIOS",
        description:
          "Visita à Catedral de Myeongdong, principal igreja católica da Coreia do Sul, e ao Santuário dos Mártires Coreanos de Jeoldusan, em memória dos santos que deram a vida pela fé. Participação nas catequeses oficiais da JMJ. Jantar e pernoite.",
        highlight: "Conheça a história da Igreja na Coreia, marcada pelo testemunho dos mártires.",
      },
    ],
  },
  {
    image: gyeongbokgungImg,
    imageAlt: "Palácio Gyeongbokgung, Seul",
    region: "Seul Histórica",
    days: [
      {
        day: "5º Dia",
        title: "GYEONGBOKGUNG E CULTURA COREANA",
        description:
          "Visita ao Palácio Gyeongbokgung, símbolo da dinastia Joseon, com a tradicional troca da guarda real. Tarde livre para participar das atividades culturais da JMJ e festivais de jovens pela cidade. Jantar e pernoite.",
        highlight: "Imersão na cultura milenar da Coreia em meio à energia da Jornada.",
      },
      {
        day: "6º Dia",
        title: "BUKCHON E VIA-SACRA COM O PAPA",
        description:
          "Manhã pela vila tradicional de Bukchon Hanok, com suas casas centenárias. À noite, participação na Via-Sacra presidida pelo Santo Padre, um dos momentos mais marcantes da JMJ. Pernoite.",
        highlight: "Um dos momentos mais emocionantes da Jornada: a Via-Sacra com o Papa.",
      },
    ],
  },
  {
    image: jmjImg,
    imageAlt: "Peregrinos com bandeiras na Jornada Mundial da Juventude",
    region: "Vigília e Missa de Encerramento",
    days: [
      {
        day: "7º Dia",
        title: "PEREGRINAÇÃO E VIGÍLIA COM O PAPA",
        description:
          "Peregrinação até o local da Vigília oficial da JMJ. Participação da grande Vigília com o Santo Padre, em comunhão com milhões de jovens do mundo inteiro. Pernoite no local da Vigília (formato camping, conforme programação oficial).",
        highlight: "A noite mais marcante da Jornada — milhões de jovens reunidos em oração.",
      },
      {
        day: "8º Dia",
        title: "MISSA DE ENVIO COM O PAPA",
        description:
          "Pela manhã, participação na Missa de Envio presidida pelo Santo Padre, encerrando oficialmente a JMJ Seul 2027. Retorno ao hotel, jantar e pernoite.",
        highlight: "O envio missionário do Papa para uma juventude renovada.",
      },
    ],
  },
  {
    image: busanImg,
    imageAlt: "Busan, Coreia do Sul",
    region: "Seul → Busan",
    days: [
      {
        day: "9º Dia",
        title: "DIA EM BUSAN",
        description:
          "Após o café da manhã, traslado de trem-bala (KTX) até Busan, segunda maior cidade da Coreia. Visita à praia de Haeundae, ao vilarejo cultural de Gamcheon e ao templo Haedong Yonggungsa, à beira-mar. Retorno a Seul à noite. Jantar e pernoite.",
        highlight: "Uma experiência única em Busan, mesclando cultura, mar e tradição.",
      },
    ],
  },
  {
    image: bukchonImg,
    imageAlt: "Vila tradicional Bukchon Hanok",
    region: "Seul — Dia Livre",
    days: [
      {
        day: "10º Dia",
        title: "DIA LIVRE EM SEUL",
        description:
          "Café da manhã. Dia livre para compras, passeios pessoais ou para participar das celebrações pós-JMJ na cidade. Jantar de despedida com o grupo.",
        highlight: "Tempo para descansar, agradecer e levar Seul no coração.",
      },
    ],
  },
  {
    image: guarulhosImg,
    imageAlt: "Aeroporto – retorno ao Brasil",
    region: "Seul → São Paulo",
    days: [
      {
        day: "11º Dia",
        title: "SEUL / SÃO PAULO",
        description:
          "Café da manhã. Em horário combinado, traslado para o aeroporto internacional de Incheon, com destino a São Paulo.",
        highlight: "Despedida da Coreia com a alma renovada pela experiência da JMJ.",
      },
      {
        day: "12º Dia",
        title: "SÃO PAULO",
        description: "Chegada em São Paulo. Fim dos nossos serviços!",
        highlight: "Retorno ao Brasil após uma jornada de fé inesquecível.",
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
    <section id="roteiro" className="pt-12 md:pt-28 pb-6 md:pb-10 bg-background">
      <div className="container mx-auto px-4">
        <p className="font-accent text-lg italic text-secondary text-center mb-2">
          Sua jornada, dia a dia
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-4">
          Roteiro — JMJ Seul 2027
        </h2>
        <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-sm">
          12 dias percorrendo Seul, os principais momentos oficiais da Jornada Mundial da Juventude e Busan.
        </p>

        <div className="max-w-5xl mx-auto">
          <Carousel setApi={handleApi} opts={{ loop: false }} className="w-full">
            <CarouselContent className="items-start">
              {slides.map((slide, idx) => (
                <CarouselItem key={idx} className="h-auto">
                  <div className="relative rounded-xl overflow-hidden bg-card">
                    <div className="relative h-56 md:h-72 overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={1280}
                        height={768}
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
                              ★ {day.highlight}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex -left-4 md:-left-12 bg-primary text-primary-foreground border-none hover:bg-primary/90" />
            <CarouselNext className="hidden md:flex -right-4 md:-right-12 bg-primary text-primary-foreground border-none hover:bg-primary/90" />
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
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-lg px-12 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            Conheça mais sobre o roteiro
          </a>
        </div>
      </div>
    </section>
  );
};

export default Roteiro;
