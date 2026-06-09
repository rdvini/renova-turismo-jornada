import { Shield, Heart, Users, Star, Compass } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import renovaGroup1 from "@/assets/mexico-padre-leudo/grupo-1.jpg";
import renovaGroup2 from "@/assets/mexico-padre-leudo/grupo-2.jpg";
import renovaGroup3 from "@/assets/mexico-padre-leudo/grupo-3.jpg";
import renovaGroup4 from "@/assets/mexico-padre-leudo/grupo-4.jpg";

const reasons = [
  { icon: Heart, title: "Experiências Únicas", text: "Cada roteiro é pensado para proporcionar momentos memoráveis e enriquecedores." },
  { icon: Compass, title: "Guias Especializados", text: "Acompanhamento de guias com conhecimento cultural e histórico." },
  { icon: Shield, title: "Segurança Total", text: "Cuidamos de cada detalhe para você viajar com tranquilidade." },
  { icon: Users, title: "Cuidado com o Grupo", text: "Grupos pequenos e acolhedores, com atenção personalizada." },
  { icon: Star, title: "Experiência Comprovada", text: "Líder no segmento de Turismo religioso e em grupos, com mais de 20 anos no mercado." },
];

const photos = [
  { src: renovaGroup1, position: "center 40%" },
  { src: renovaGroup2, position: "center 50%" },
  { src: renovaGroup3, position: "center 50%" },
  { src: renovaGroup4, position: "center 40%" },
];

const PorQueRenova = () => {
  return (
    <section
      className="py-14 md:py-28 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, hsl(var(--pam-wine-deep)) 0%, hsl(var(--pam-wine)) 100%)",
      }}
    >
      <div className="absolute inset-0 baroque-overlay opacity-60" />
      <div className="container mx-auto px-4 relative">
        <p className="font-accent text-base italic tracking-[0.3em] uppercase text-secondary text-center mb-3">
          Viaje com quem entende
        </p>
        <h2 className="font-heading italic text-4xl md:text-5xl font-semibold text-primary-foreground text-center mb-4">
          Por Que a <span className="gold-shimmer">Renova Turismo</span>
        </h2>
        <div className="gold-rule mb-14"><span className="text-secondary">✦</span></div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reasons.map((r, i) => {
            const isLast = i === reasons.length - 1;
            return (
              <div
                key={r.title}
                className={`glam-card-dark rounded-xl p-7 text-center hover:-translate-y-1 transition-transform ${
                  isLast ? "sm:col-span-2 sm:max-w-sm sm:mx-auto sm:w-full lg:col-span-1 lg:max-w-none" : ""
                }`}
              >
                <r.icon className="mx-auto mb-4 text-secondary" size={32} />
                <h3 className="font-heading italic text-lg font-semibold text-primary-foreground mb-2">{r.title}</h3>
                <p className="font-body text-primary-foreground/75 text-sm">{r.text}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto mt-14">
          <div className="rounded-2xl overflow-hidden border border-secondary/40 shadow-2xl">
            <Carousel
              opts={{ loop: true }}
              plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
              className="w-full"
            >
              <CarouselContent>
                {photos.map((photo, i) => (
                  <CarouselItem key={i}>
                    <div className="overflow-hidden">
                      <img
                        src={photo.src}
                        alt={`Grupo Renova Turismo - Foto ${i + 1}`}
                        className="w-full h-64 md:h-96 object-cover"
                        style={{ objectPosition: photo.position }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PorQueRenova;
