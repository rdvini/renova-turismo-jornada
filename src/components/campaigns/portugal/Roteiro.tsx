import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

interface DaySlide {
  day: string;
  title: string;
  description: string;
}

const slides: DaySlide[] = [
  {
    day: "1° Dia",
    title: "SÃO PAULO / LISBOA",
    description:
      "Encontro no aeroporto internacional de Guarulhos para embarque em voo com destino a Lisboa fazendo as devidas conexões.",
  },
  {
    day: "2° Dia",
    title: "LISBOA / FÁTIMA",
    description:
      "Chegada ao aeroporto de Lisboa. Após desembarque partida para Fátima. Hospedagem e jantar.",
  },
  {
    day: "3° Dia",
    title: "FÁTIMA",
    description:
      "Após café da manhã, visita ao Santuário de Fátima e o túmulo dos três pastorinhos. Visita a Capela das Aparições, onde Nossa Senhora apareceu aos três pastorinhos em 1917. Visita a Aljustrel, local onde residiam os pastorinhos. Acomodação e jantar. À noite procissão das velas.",
  },
  {
    day: "4° Dia",
    title: "FÁTIMA / NAZARÉ / BATALHA / FÁTIMA",
    description:
      "Café da manhã e partida em direção a Batalha para visita do Mosteiro da Batalha. Seguindo para a vila Nazaré para visita do Santuário de Nossa Senhora da Nazaré. Retorno ao hotel para jantar e hospedagem.",
  },
  {
    day: "5° Dia",
    title: "FÁTIMA / PORTO / FÁTIMA",
    description:
      "Após café da manhã, partida em direção ao Porto para visita panorâmica da cidade incluindo a Igreja de São Francisco, Palácio da Bolsa, Sé Catedral e passeio de barco pelo Rio Douro. Faremos também uma visita a uma cave de vinhos do porto e passeio de barco do Rio Douro. Retorno ao hotel para jantar e hospedagem.",
  },
  {
    day: "6° Dia",
    title: "FÁTIMA / SANTARÉM / ÓBIDOS / LISBOA",
    description:
      "Café da manhã e continuação para Santarém, onde visitaremos o Milagre Eucarístico. Seguimos para Óbidos onde veremos as ruas estreitas e pequenas praças, a fim de conhecer essa belíssima cidade medieval. Prosseguimento para Lisboa. Acomodação e jantar.",
  },
  {
    day: "7° Dia",
    title: "LISBOA",
    description:
      "Após o café da manhã, saída para visitarmos a cidade com especial destaque para o famoso bairro de Belém com os seus monumentos dedicados às descobertas. Oportunidade para quem quiser degustar um famoso pastel de Belém na fábrica original. Visita a Praça do Comércio e a Sé Catedral. Regresso ao hotel para hospedagem. Saída para assistir show de fados com jantar.",
  },
  {
    day: "8° Dia",
    title: "LISBOA / SÃO PAULO",
    description:
      "Após café da manhã, em horário a determinar, translado para aeroporto de Lisboa, para embarque com destino à São Paulo, voos com conexões.",
  },
  {
    day: "9° Dia",
    title: "SÃO PAULO",
    description:
      "Chegada no aeroporto de São Paulo, trâmites de desembarque e fim dos serviços.",
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
          Sua jornada, dia a dia
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-4">
          Roteiro da Viagem
        </h2>
        <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-sm">
          9 dias de peregrinação por Portugal, passando por Fátima, Nazaré, Batalha, Porto, Santarém, Óbidos e Lisboa.
        </p>

        <div className="max-w-3xl mx-auto">
          <Carousel setApi={handleApi} opts={{ loop: false }} className="w-full">
            <CarouselContent>
              {slides.map((slide, idx) => (
                <CarouselItem key={idx}>
                  <article className="rounded-xl overflow-hidden bg-card border border-border">
                    {/* Header */}
                    <div className="bg-primary px-6 py-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="bg-secondary text-secondary-foreground text-xs font-heading font-bold px-3 py-1 rounded-full">
                          {slide.day}
                        </span>
                        <h3 className="font-heading text-base md:text-lg font-bold text-primary-foreground">
                          {slide.title}
                        </h3>
                      </div>
                      <span className="text-primary-foreground/60 text-xs font-body">
                        {idx + 1} / {count}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-6 md:p-8">
                      <p className="font-body text-foreground text-sm md:text-base leading-relaxed">
                        {slide.description}
                      </p>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12 bg-primary text-primary-foreground border-none hover:bg-primary/90" />
            <CarouselNext className="-right-4 md:-right-12 bg-primary text-primary-foreground border-none hover:bg-primary/90" />
          </Carousel>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => api?.scrollTo(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === current ? "bg-secondary w-6" : "bg-border hover:bg-muted-foreground/40"
                }`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="#contato"
            className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-lg px-12 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            Garante Sua Vaga
          </a>
        </div>
      </div>
    </section>
  );
};

export default Roteiro;
