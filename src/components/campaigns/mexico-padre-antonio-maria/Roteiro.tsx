import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

import aeroportoGru from "@/assets/mexico-padre-leudo/aeroporto-manaus.webp";
import guadalupeImg from "@/assets/mexico-padre-leudo/san-jacinto.webp";
import teotihuacanImg from "@/assets/mexico-padre-leudo/teotihuacan.jpg";
import pueblaImg from "@/assets/mexico-padre-leudo/basilica-guadalupe-aerea.webp";
import cancunImg from "@/assets/mexico-padre-leudo/cancun-aerea.webp";
import chichenItzaImg from "@/assets/mexico-padre-leudo/cancun-zona-hoteleira.webp";

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
    image: aeroportoGru,
    imageAlt: "Aeroporto de Guarulhos — partida da peregrinação",
    region: "São Paulo → Cidade do México",
    days: [
      {
        day: "1° Dia",
        title: "SÃO PAULO / CIDADE DO MÉXICO",
        description:
          "Em horário combinado, encontro no Aeroporto de Guarulhos (GRU) para embarque em voo com destino à Cidade do México. Chegada, recepção e traslado para o hotel. Hospedagem e jantar.",
        spiritual:
          "O início de uma jornada de fé ao lado do Padre Antônio Maria — partimos rumo à terra de Nossa Senhora de Guadalupe.",
      },
    ],
  },
  {
    image: guadalupeImg,
    imageAlt: "Igreja colonial de San Jacinto, no bairro de San Ángel — Cidade do México",
    region: "Cidade do México & Teotihuacán",
    days: [
      {
        day: "2° Dia",
        title: "CIDADE DO MÉXICO / GUADALUPE",
        description:
          "Café da manhã. Saída para o sul da cidade, bairro colonial Parish Chimalistac. Continuação ao Bairro de San Angel, entre ruas de paralelepípedos, até a Igreja de San Jacinto. Seguimos a Coyoacán, onde admiraremos o templo de San Juan Batista. À tarde, visita à Basílica de Guadalupe, o mais importante centro mariano na América Latina, com Celebração da Santa Missa presidida pelo Padre Antônio Maria. Retorno ao hotel para jantar e hospedagem.",
        spiritual:
          '"Não estou eu aqui, que sou tua Mãe?" — palavras de Nossa Senhora a São Juan Diego, ecoam neste santuário onde milhões peregrinam.',
      },
      {
        day: "3° Dia",
        title: "TEOTIHUACÁN / XOCHIMILCO",
        description:
          "Café da manhã. Visita ao Museu de Antropologia e em seguida a um dos maiores sítios arqueológicos da Mesoamérica: Teotihuacán, a 'Cidade dos Deuses'. Visita ao templo de Quetzalcoatl, Calzada de los Muertos, Pirâmide do Sol e da Lua e templo Quetzal-Papalotl. Encerramos o dia com um passeio em uma trajinera tradicional em Xochimilco e tour no antigo convento de San Bernardino. Celebração da Santa Missa. Retorno ao hotel para jantar.",
        spiritual:
          "Diante das antigas pirâmides, contemplamos a busca humana pelo sagrado — busca plenamente respondida em Cristo.",
      },
    ],
  },
  {
    image: pueblaImg,
    imageAlt: "Vista aérea da Basílica de Nossa Senhora de Guadalupe — Cidade do México",
    region: "Centro Histórico & Tlaxcala / Puebla",
    days: [
      {
        day: "4° Dia",
        title: "CIDADE DO MÉXICO / GUADALUPE",
        description:
          "Café da manhã. Visita à Catedral Metropolitana, edifício de grande valor arquitetônico e cultural. Continuação à emblemática Plaza de Santo Domingo, onde conheceremos a Igreja de Santo Domingo. Seguimos à Plaza das 3 Culturas, que reúne os restos arqueológicos pré-conquista, o templo de Santiago da era espanhola e o México moderno. Retorno à Basílica de Guadalupe com Celebração da Santa Missa e tempo para atividades pessoais. Hospedagem e jantar.",
        spiritual:
          "Voltamos aos pés da Morenita do Tepeyac — a tilma de São Juan Diego permanece intacta há quase 500 anos como sinal do amor materno de Maria.",
      },
      {
        day: "5° Dia",
        title: "TLAXCALA / PUEBLA / PARIAN",
        description:
          "Café da manhã. Saída em direção a Tlaxcala para visitar a Basílica de Ocotlán, joia arquitetônica de estilo barroco. Continuação para o centro de Puebla, onde visitaremos a Catedral Metropolitana e a Capela do Rosário, com Celebração da Santa Missa. Tempo para almoço e visita à Feira de Parian. Retorno à Cidade do México para hospedagem e jantar.",
        spiritual:
          "A Capela do Rosário de Puebla, considerada a 'Oitava Maravilha do Mundo', é um cântico de louvor em ouro e azulejos a Nossa Senhora.",
      },
    ],
  },
  {
    image: cancunImg,
    imageAlt: "Vista aérea da costa de Cancún ao entardecer — Caribe Mexicano",
    region: "Cancún — Caribe Mexicano",
    days: [
      {
        day: "6° Dia",
        title: "CIDADE DO MÉXICO / CANCÚN",
        description:
          "Café da manhã e tempo livre. Traslado ao aeroporto para embarque com destino a Cancún. Chegada, recepção e traslado para o hotel. Hospedagem com sistema All Inclusive.",
        spiritual:
          "Após dias intensos de peregrinação, um tempo de descanso — também um presente de Deus para renovar corpo e alma.",
      },
      {
        day: "7° Dia",
        title: "CANCÚN — ISLA MUJERES",
        description:
          "Café da manhã. Dia livre para atividades independentes em sistema All Inclusive. Celebração da Santa Missa. Sugerimos visita à Isla de las Mujeres, com suas águas cristalinas e cenários paradisíacos.",
        spiritual:
          "Diante da imensidão do mar do Caribe, contemplamos a grandeza do Criador refletida na beleza da criação.",
      },
    ],
  },
  {
    image: chichenItzaImg,
    imageAlt: "Vista aérea da zona hoteleira de Cancún — Caribe Mexicano",
    region: "Cancún → São Paulo",
    days: [
      {
        day: "8° Dia",
        title: "CANCÚN — CHICHÉN ITZÁ",
        description:
          "Café da manhã. Dia livre para atividades independentes em sistema All Inclusive. Celebração da Santa Missa. Sugerimos visita à Pirâmide de Chichén Itzá, uma das Sete Maravilhas do Mundo Moderno.",
        spiritual:
          "As ruínas maias nos lembram que toda civilização passa — somente o Reino de Deus permanece para sempre.",
      },
      {
        day: "9° Dia",
        title: "CANCÚN / SÃO PAULO",
        description:
          "Café da manhã. Em horário combinado, traslado ao aeroporto de Cancún para embarque em voo com destino a São Paulo (GRU), fazendo as devidas conexões.",
        spiritual:
          "Iniciamos o caminho de volta com o coração transbordando de gratidão pelas graças recebidas.",
      },
    ],
  },
  {
    image: aeroportoGru,
    imageAlt: "Aeroporto de Guarulhos — chegada da peregrinação",
    region: "São Paulo (GRU)",
    days: [
      {
        day: "10° Dia",
        title: "SÃO PAULO",
        description:
          "Chegada ao Aeroporto Internacional de Guarulhos. Fim de nossos serviços!",
        spiritual:
          "Voltamos para casa renovados na fé, levando no coração a ternura da Mãe de Guadalupe e as memórias desta peregrinação inesquecível.",
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
    <section id="roteiro" className="pt-14 md:pt-28 pb-8 md:pb-14 bg-muted baroque-overlay">
      <div className="container mx-auto px-4">
        <p className="font-accent text-base italic tracking-[0.3em] uppercase text-secondary text-center mb-3">
          Sua jornada, dia a dia
        </p>
        <h2 className="font-heading italic text-4xl md:text-5xl font-semibold text-primary text-center mb-4">
          Roteiro — Cidades
        </h2>
        <div className="gold-rule mb-6"><span className="text-secondary">✦</span></div>
        <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-sm">
          10 dias de peregrinação pelo México ao lado do Padre Antônio Maria, do Santuário
          de Nossa Senhora de Guadalupe às maravilhas de Teotihuacán, Puebla e Cancún.
        </p>

        <div className="max-w-5xl mx-auto">
          <Carousel setApi={handleApi} opts={{ loop: false }} className="w-full">
            <CarouselContent className="items-start">
              {slides.map((slide, idx) => (
                <CarouselItem key={idx} className="h-auto">
                  <div className="relative rounded-xl overflow-hidden glam-card">
                    <div className="relative h-56 md:h-72 overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={960}
                        height={640}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, hsl(var(--pam-wine-deep) / 0.92), hsl(var(--pam-wine) / 0.35) 50%, transparent)",
                        }}
                      />
                      <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                        <div>
                          <span className="text-xs uppercase tracking-[0.3em] text-secondary font-body font-semibold">
                            {slide.days.map((d) => d.day).join(" — ")}
                          </span>
                          <h3 className="font-heading italic text-2xl md:text-3xl font-semibold text-primary-foreground mt-1">
                            {slide.region}
                          </h3>
                        </div>
                        <span className="text-primary-foreground/70 text-xs font-body">
                          {idx + 1} / {count}
                        </span>
                      </div>
                    </div>

                    <div className={`p-5 md:p-8 grid gap-6 ${slide.days.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
                      {slide.days.map((day) => (
                        <div
                          key={day.day}
                          className="rounded-lg p-5 bg-background border border-secondary/30 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <span className="gold-btn text-xs font-heading font-bold px-3 py-1 rounded-full">
                              {day.day}
                            </span>
                            <h4 className="font-heading italic text-base font-bold text-primary">
                              {day.title}
                            </h4>
                          </div>
                          <p className="font-body text-muted-foreground text-sm leading-relaxed mb-3">
                            {day.description}
                          </p>
                          {day.spiritual && (
                            <p className="font-accent text-sm italic text-primary/80 border-l-2 border-secondary pl-3">
                              ✦ {day.spiritual}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex -left-4 md:-left-12 gold-btn border-none" />
            <CarouselNext className="hidden md:flex -right-4 md:-right-12 gold-btn border-none" />
          </Carousel>

          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => api?.scrollTo(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === current ? "bg-secondary w-8" : "bg-border w-2 hover:bg-muted-foreground/40"
                }`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="https://api.whatsapp.com/send/?phone=5519994718930&text=Ol%C3%A1%21+Tenho+interesse+na+Peregrina%C3%A7%C3%A3o+ao+M%C3%A9xico+com+Padre+Ant%C3%B4nio+Maria.+Aguardo+retorno&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block gold-btn font-heading font-bold text-lg px-12 py-4 rounded-full"
          >
            Saiba mais sobre o roteiro!
          </a>
        </div>
      </div>
    </section>
  );
};

export default Roteiro;
