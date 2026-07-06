import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import aeroportoGru from "@/assets/mexico-padre-leudo/aeroporto-manaus.webp";
import teotihuacanImg from "@/assets/mexico-padre-leudo/teotihuacan.jpg";
import basilicaImg from "@/assets/mexico-padre-leudo/basilica-guadalupe-aerea.webp";
import pueblaImg from "@/assets/mexico-padre-leudo/puebla.jpg";
import guadalajaraPlaza from "@/assets/mexico-padre-antonio-maria/guadalajara-plaza.webp";
import zapopanBasilica from "@/assets/mexico-padre-antonio-maria/zapopan-basilica.webp";
import sahuayoSantuario from "@/assets/mexico-padre-antonio-maria/sahuayo-santuario.webp";

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
      "Apresentação no aeroporto internacional de São Paulo – Guarulhos para embarque com destino a Cidade do México. Chegada, recepção e traslado ao hotel para jantar e hospedagem.",
    highlight: "O início de uma jornada de fé ao lado do Padre Antônio Maria.",
  },
  {
    day: "2º Dia",
    image: basilicaImg,
    imageAlt: "Vista aérea da Basílica de Nossa Senhora de Guadalupe",
    region: "Cidade do México",
    regionEn: "Mexico City",
    title: "CIDADE DO MÉXICO / GUADALUPE",
    description:
      "IMPORTANTE: Às 2ª feiras a Igreja de Santo Domingo está fechada. Café da manhã. Começamos o dia no centro da cidade, visitaremos a Catedral Metropolitana, edifício de grande valor arquitetônico e cultural, continuação à emblemática Plaza de Santo Domingo, onde conheceremos a Igreja de Santo Domingo. Em seguida, continuaremos até a Plaza das 3 Culturas, nomeado porque nos traz 3 importantes etapas históricas na formação do México: os restos arqueológicos que nos levam de volta para o tempo antes da conquista, o tempo da conquista espanhola representada pelo templo de Santiago e finalmente o México moderno através de inúmeros edifícios multifamiliares. Finalmente chegamos à Basílica de Guadalupe, o mais importante centro mariano na América Latina, com Celebração da Santa Missa presidida pelo Padre acompanhante e tempo para atividades pessoais. Retorno ao hotel para hospedagem e jantar.",
    highlight: "Nossa Senhora de Guadalupe, o mais importante centro mariano da América Latina.",
  },
  {
    day: "3º Dia",
    image: teotihuacanImg,
    imageAlt: "Pirâmides de Teotihuacán",
    region: "Teotihuacán",
    regionEn: "Teotihuacán",
    title: "CIDADE DO MÉXICO / TEOTIHUACÁN",
    description:
      "Café da manhã. Em seguida iremos a um dos maiores sítios arqueológicos da Mesoamérica: Teotihuacán, 'Cidade de los Dioses'. Visita ao templo de Quetzalcoatl, Calzada de los Muertos, Pirâmide do Sol e da Lua, templo Quetzal-Papalotl. Teotihuacán surgiu como um novo centro religioso mais ou menos na época de Cristo. No entanto os tempos iniciais não estão claramente entendidos. Os dados arqueológicos mostram que os anos 1–200 A.D. foram caracterizados por grandes construções, e que a cidade rapidamente se tornou o maior e mais populoso centro urbano do Novo Mundo. Retorno ao hotel para hospedagem e jantar.",
    highlight: "Teotihuacán, a 'Cidade dos Deuses', um dos maiores centros urbanos do Novo Mundo.",
  },
  {
    day: "4º Dia",
    image: pueblaImg,
    imageAlt: "Centro histórico de Puebla",
    region: "Tlaxcala → Puebla",
    regionEn: "Puebla",
    title: "CIDADE DO MÉXICO / PUEBLA / TLAXCALA",
    description:
      "Café da manhã. Sairemos em direção a Tlaxcala para visitar a Basílica de Ocotlán, bela joia arquitetônica de estilo barroco, continuação para o centro da cidade de Puebla, onde visitaremos a Catedral Metropolitana e a Capela do Rosário (Celebração da Santa Missa). Tempo livre para almoçar e visitar a famosa Feira de Parian para compras. Retorno à Cidade do México para hospedagem e jantar.",
    highlight: "A Capela do Rosário, considerada a 'Oitava Maravilha do Mundo'.",
  },
  {
    day: "5º Dia",
    image: guadalajaraPlaza,
    imageAlt: "Centro histórico de Guadalajara com a Catedral e a Plaza de Armas",
    region: "Cidade do México → Guadalajara",
    regionEn: "Guadalajara",
    title: "CIDADE DO MÉXICO / GUADALAJARA",
    description:
      "Café da manhã. Em horário determinado, traslado ao aeroporto da Cidade do México para embarque com destino a Guadalajara. Chegada, recepção pelo guia e começaremos nossa visita em Guadalajara, conhecendo a Plaza de Armas, cercada pela Catedral de Guadalajara e pelo histórico Palácio do Governo. Percorreremos também a Praça da Libertação, com parada para fotos junto à famosa placa de Guadalajara. No Centro Histórico encontraremos praças arborizadas, belas catedrais, importantes instituições culturais e mercados movimentados. Chegada ao hotel para hospedagem e jantar.",
    highlight: "Guadalajara, terra de mariachis, tequila e tradição mexicana.",
  },
  {
    day: "6º Dia",
    image: zapopanBasilica,
    imageAlt: "Basílica de Nossa Senhora de Zapopan em Jalisco",
    region: "Guadalajara / Zapopan",
    regionEn: "Zapopan",
    title: "GUADALAJARA / ZAPOPAN",
    description:
      "Café da manhã. Visita à Basílica de Nossa Senhora de Zapopan, construída no século XVII, é um dos mais importantes centros de peregrinação do México e um magnífico exemplo da arquitetura barroca colonial. O santuário contém uma estátua de madeira da Virgem Maria que é considerada uma relíquia sagrada de origem medieval que foi trazida aqui da Espanha no século XVI (Celebração da Santa Missa, a confirmar). Retorno ao hotel para hospedagem e jantar.",
    highlight: "A Basílica de Zapopan abriga uma relíquia sagrada da Virgem Maria vinda da Espanha.",
  },
  {
    day: "7º Dia",
    image: sahuayoSantuario,
    imageAlt: "Santuário de São José Sánchez del Río em Sahuayo, Michoacán",
    region: "Guadalajara / Sahuayo",
    regionEn: "Sahuayo",
    title: "GUADALAJARA / SAHUAYO",
    description:
      "Café da manhã. Saída em direção a Sahuayo. Dedicaremos o tempo a São José Sánchez del Río, o mais jovem dos mártires cristeros. Foi canonizado em 16 de outubro de 2016 pelo Papa Francisco. Teremos tempo para rezar diante de suas relíquias. Em seguida, visitaremos o cemitério onde São Joselito declarou com coragem sua fidelidade a Cristo. Durante sua tortura, gritou: '¡Viva Cristo Rey!'. Retorno à cidade de Guadalajara. Em Guadalajara, visitaremos a Catedral de Guadalajara, com seu ossuário, que consiste em uma vitrine onde estão expostos os ossos de 23 santos mártires da Revolução Cristera. Em seguida, passeio pelo centro da cidade, com seus edifícios históricos e palácios do governo, além do elegante Teatro Degollado. Retorno ao hotel para hospedagem e jantar.",
    highlight: "'¡Viva Cristo Rey!' — o grito de fé do jovem mártir São José Sánchez del Río.",
  },
  {
    day: "8º Dia",
    image: guadalajaraPlaza,
    imageAlt: "Guadalajara ao entardecer — despedida da peregrinação",
    region: "Guadalajara → São Paulo",
    regionEn: "Return",
    title: "GUADALAJARA / SÃO PAULO",
    description:
      "Café da manhã. Traslado ao aeroporto para embarque com destino a São Paulo, voos com as devidas conexões.",
    highlight: "O coração transbordando de gratidão pelas graças recebidas.",
  },
  {
    day: "9º Dia",
    image: aeroportoGru,
    imageAlt: "Aeroporto de Guarulhos — chegada",
    region: "São Paulo (GRU)",
    regionEn: "Arrival",
    title: "SÃO PAULO",
    description:
      "Chegada ao aeroporto de Guarulhos, trâmites de desembarque e fim dos nossos serviços!",
    highlight: "Voltamos renovados na fé, levando no coração as bênçãos do México.",
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
            9 dias de peregrinação ao lado do Padre Antônio Maria — Cidade do México,
            Guadalupe, Teotihuacán, Puebla, Tlaxcala e Guadalajara.
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
