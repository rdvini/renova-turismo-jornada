import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

interface DayCard {
  day: string;
  title: string;
  description: string;
  spiritual?: string;
}

interface Slide {
  image: string;
  imageAlt: string;
  region: string;
  days: DayCard[];
}

const slides: Slide[] = [
  {
    image: "",
    imageAlt: "Lisboa, Portugal",
    region: "Brasil → Lisboa",
    days: [
      {
        day: "1° Dia",
        title: "EMBARQUE / LISBOA",
        description: "Embarque no Brasil com destino a Lisboa. Chegada e transfer ao hotel para descanso.",
      },
      {
        day: "2° Dia",
        title: "LISBOA",
        description: "City tour por Lisboa: Praça do Comércio, Torre de Belém, Mosteiro dos Jerónimos, Bairro de Alfama e o histórico Bonde 28.",
      },
    ],
  },
  {
    image: "",
    imageAlt: "Sintra e Fátima",
    region: "Sintra → Fátima",
    days: [
      {
        day: "3° Dia",
        title: "SINTRA",
        description: "Visita ao Palácio da Pena, Quinta da Regaleira e ao charmoso centro histórico de Sintra, Patrimônio da UNESCO.",
      },
      {
        day: "4° Dia",
        title: "FÁTIMA",
        description: "Peregrinação ao Santuário de Nossa Senhora de Fátima, visita à Capelinha das Aparições e à Basílica da Santíssima Trindade.",
        spiritual: "Local das aparições marianas de 1917, um dos maiores centros de peregrinação do mundo.",
      },
    ],
  },
  {
    image: "",
    imageAlt: "Porto e Vale do Douro",
    region: "Porto → Vale do Douro",
    days: [
      {
        day: "5° Dia",
        title: "PORTO",
        description: "Descoberta do Porto: Ribeira, Ponte Dom Luís I, Livraria Lello, Torre dos Clérigos e degustação de vinho do Porto.",
      },
      {
        day: "6° Dia",
        title: "VALE DO DOURO",
        description: "Passeio pelo Vale do Douro com visita a quintas vinícolas, degustação de vinhos e almoço regional com vista para os terraços do Douro.",
      },
    ],
  },
  {
    image: "",
    imageAlt: "Retorno ao Brasil",
    region: "Porto → Brasil",
    days: [
      {
        day: "7° Dia",
        title: "PORTO / BRASIL",
        description: "Manhã livre para compras e últimos passeios. Transfer ao aeroporto para voo de retorno ao Brasil.",
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
          Sua jornada, dia a dia
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-4">
          Roteiro — Cidades
        </h2>
        <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-sm">
          7 dias de viagem por Portugal, visitando Lisboa, Sintra, Fátima, Porto e o Vale do Douro.
        </p>

        <div className="max-w-5xl mx-auto">
          <Carousel setApi={handleApi} opts={{ loop: false }} className="w-full">
            <CarouselContent>
              {slides.map((slide, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative rounded-xl overflow-hidden bg-card">
                    <div className="relative h-56 md:h-72 overflow-hidden">
                      {slide.image ? (
                        <img src={slide.image} alt={slide.imageAlt} className="w-full h-full object-cover" loading="lazy" width={960} height={640} />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground font-body text-sm">
                          [Adicionar imagem]
                        </div>
                      )}
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
                        <div key={day.day} className="border border-border rounded-lg p-5 bg-background hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="bg-secondary text-secondary-foreground text-xs font-heading font-bold px-3 py-1 rounded-full">
                              {day.day}
                            </span>
                            <h4 className="font-heading text-sm font-bold text-primary">{day.title}</h4>
                          </div>
                          <p className="font-body text-muted-foreground text-sm leading-relaxed mb-3">{day.description}</p>
                          {day.spiritual && (
                            <p className="font-accent text-xs italic text-secondary/80 border-l-2 border-secondary/30 pl-3">
                              ✝ {day.spiritual}
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
                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === current ? "bg-secondary w-6" : "bg-border hover:bg-muted-foreground/40"}`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="#contato" className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-lg px-12 py-4 rounded-full transition-all hover:scale-105 shadow-lg">
            Garante Sua Vaga
          </a>
        </div>
      </div>
    </section>
  );
};

export default Roteiro;
