import { useState, useEffect } from "react";
import { Instagram, Facebook, Youtube, ChevronLeft } from "lucide-react";

import heroImg from "@/assets/mexico-padre-antonio-maria/hero-glamour.jpg";
import guadalupeImg from "@/assets/mexico-padre-leudo/basilica-guadalupe-aerea.webp";
import teotihuacanImg from "@/assets/mexico-padre-leudo/teotihuacan.jpg";
import cancunImg from "@/assets/mexico-padre-leudo/cancun-aerea.webp";

const floatingCards = [
  {
    image: guadalupeImg,
    title: "Basílica de Guadalupe",
    description:
      "O mais importante centro mariano da América Latina — peregrinação no coração da fé mexicana.",
  },
  {
    image: teotihuacanImg,
    title: "Teotihuacán",
    description:
      "A 'Cidade dos Deuses' — Pirâmides do Sol e da Lua, um dos maiores sítios arqueológicos do mundo.",
  },
  {
    image: cancunImg,
    title: "Cancún & Caribe",
    description:
      "Águas cristalinas, resort All Inclusive e descanso merecido após dias intensos de peregrinação.",
  },
];

const WHATSAPP =
  "https://api.whatsapp.com/send/?phone=5519994718930&text=Ol%C3%A1%21+Tenho+interesse+na+Peregrina%C3%A7%C3%A3o+ao+M%C3%A9xico+com+Padre+Ant%C3%B4nio+Maria.+Aguardo+retorno&type=phone_number&app_absent=0";

const Hero = () => {
  const [active, setActive] = useState(1);
  const total = floatingCards.length;

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % total), 5000);
    return () => clearInterval(id);
  }, [total]);

  const getOffset = (i: number) => {
    const diff = i - active;
    if (diff > total / 2) return diff - total;
    if (diff < -total / 2) return diff + total;
    return diff;
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "hsl(var(--pam-wine-deep))" }}
    >
      <img
        src={heroImg}
        alt="Basílica de Nossa Senhora de Guadalupe ao entardecer"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        width={1920}
        height={1080}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, hsl(var(--pam-wine-deep) / 0.88) 0%, hsl(var(--pam-wine-deep) / 0.55) 55%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--pam-wine-deep) / 0.75), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 baroque-overlay" />

      {/* Decorative gold corner ornaments */}
      <div className="pointer-events-none hidden md:block absolute top-32 left-12 w-24 h-24 border-t border-l border-secondary/60 z-10" />
      <div className="pointer-events-none hidden md:block absolute bottom-14 right-12 w-24 h-24 border-b border-r border-secondary/60 z-10" />

      {/* Social rail */}
      <div className="hidden md:flex absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 flex-col gap-5 z-20">
        {[Instagram, Facebook, Youtube].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="text-primary-foreground/70 hover:text-secondary transition-colors"
            aria-label="social"
          >
            <Icon size={18} strokeWidth={1.5} />
          </a>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-5 md:px-12 lg:px-20 pt-28 md:pt-40 pb-20">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-12 items-center min-w-0">
          {/* Left: headline */}
          <div className="text-primary-foreground max-w-xl min-w-0">
            <p className="font-accent italic tracking-[0.3em] uppercase text-sm md:text-base text-secondary mb-5">
              Renova Turismo apresenta
            </p>
            <div className="gold-rule mb-6"><span className="text-secondary text-xs">✦</span></div>
            <h1 className="font-heading italic leading-[1.02] text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-semibold">
              <span className="block">Peregrinação</span>
              <span className="block">ao México</span>
              <span className="block gold-shimmer">com Padre Antônio Maria</span>
            </h1>
            <p className="font-body text-base md:text-lg text-primary-foreground/85 max-w-md mt-6 md:mt-8 leading-relaxed">
              Uma jornada exclusiva pela terra de Nossa Senhora de Guadalupe ao lado
              de um dos mais queridos sacerdotes do Brasil — fé, beleza e momentos
              inesquecíveis.
            </p>

            <div className="flex items-center gap-5 mt-8 md:mt-10">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block gold-btn font-heading font-bold text-sm md:text-base px-8 py-4 rounded-full"
              >
                Reservar Agora
              </a>
              <a
                href="#roteiro"
                className="font-body uppercase tracking-[0.18em] text-xs md:text-sm text-primary-foreground/80 hover:text-secondary border-b border-secondary/40 pb-1 transition-colors"
              >
                Ver Roteiro
              </a>
            </div>

            <div className="md:hidden flex items-center gap-5 mt-8">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  aria-label="social"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: floating cards */}
          <div className="-mx-5 lg:mx-0 min-w-0">
            {/* Mobile + tablet: snap scroll */}
            <div className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-5 px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {floatingCards.map((c) => (
                <article
                  key={c.title}
                  className="glam-card rounded-2xl overflow-hidden flex flex-col shrink-0 w-[78%] sm:w-[55%] md:w-[40%] snap-start"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={c.image} alt={c.title} loading="lazy" width={400} height={300} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-heading italic font-semibold text-base text-primary leading-tight mb-2 min-h-[2.6em]">{c.title}</h3>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed flex-1">{c.description}</p>
                    <a href="#sobre" className="mt-4 inline-block self-start gold-btn font-heading text-[10px] font-semibold px-4 py-2 rounded-full uppercase tracking-widest">Saiba mais</a>
                  </div>
                </article>
              ))}
            </div>

            {/* Desktop: fan carousel */}
            <div
              className="hidden lg:block relative mx-auto"
              style={{ height: "560px", perspective: "1400px" }}
              aria-label="Destaques da peregrinação"
            >
              {floatingCards.map((c, i) => {
                const offset = getOffset(i);
                const isActive = offset === 0;
                const abs = Math.abs(offset);
                const translateX = offset * 38;
                const rotate = offset * 9;
                const scale = isActive ? 1 : 0.78;
                const blur = isActive ? 0 : 3;
                const opacity = isActive ? 1 : 0.82;
                const z = 30 - abs * 10;
                const translateY = isActive ? 0 : 28;

                return (
                  <article
                    key={c.title}
                    onClick={() => setActive(i)}
                    className={`absolute left-1/2 top-1/2 w-[78%] sm:w-[300px] md:w-[320px] lg:w-[340px] glam-card rounded-2xl overflow-hidden flex flex-col cursor-pointer ${
                      isActive ? "" : "hover:opacity-80"
                    }`}
                    style={{
                      transform: `translate(-50%, -50%) translateX(${translateX}%) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                      filter: `blur(${blur}px)`,
                      opacity,
                      zIndex: z,
                      transformOrigin: "center bottom",
                      transition:
                        "transform 800ms cubic-bezier(0.22, 1, 0.36, 1), filter 600ms ease, opacity 600ms ease",
                      willChange: "transform, filter, opacity",
                    }}
                    aria-hidden={!isActive}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={c.image} alt={c.title} loading="lazy" width={400} height={300} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-heading italic font-semibold text-lg text-primary leading-tight mb-2 min-h-[2.6em]">{c.title}</h3>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed flex-1">{c.description}</p>
                      <a
                        href="#sobre"
                        onClick={(e) => !isActive && e.preventDefault()}
                        tabIndex={isActive ? 0 : -1}
                        className="mt-4 inline-block self-start gold-btn font-heading text-[10px] font-semibold px-4 py-2 rounded-full uppercase tracking-widest"
                      >
                        Saiba mais
                      </a>
                    </div>
                  </article>
                );
              })}

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-40">
                {floatingCards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Ir para card ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active ? "bg-secondary w-8" : "bg-primary-foreground/40 hover:bg-primary-foreground/60 w-4"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center gap-2 mt-12 text-primary-foreground/50">
          <ChevronLeft size={14} strokeWidth={2.5} />
          <ChevronLeft size={18} strokeWidth={2.5} />
          <ChevronLeft size={22} strokeWidth={2.5} />
          <ChevronLeft size={26} strokeWidth={2.5} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
