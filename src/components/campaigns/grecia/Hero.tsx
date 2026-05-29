import { Instagram, Facebook, Youtube, ChevronLeft } from "lucide-react";
import heroImg from "@/assets/grecia/hero-santorini.jpg";
import egeuImg from "@/assets/grecia/egeu.jpg";
import atenasImg from "@/assets/grecia/atenas.jpg";
import mykonosImg from "@/assets/grecia/mykonos.jpg";

const floatingCards = [
  {
    image: egeuImg,
    title: "Ilhas Escondidas",
    description:
      "Enseadas de água cristalina e vilarejos preservados que poucos viajantes brasileiros conhecem.",
  },
  {
    image: atenasImg,
    title: "Cultura Milenar",
    description:
      "Da Acrópole aos oráculos de Delfos — caminhe pelos berços da filosofia, da democracia e da mitologia.",
  },
  {
    image: mykonosImg,
    title: "Mediterrâneo Vivo",
    description:
      "Pôr do sol em Santorini, moinhos de Mykonos e a culinária grega autêntica em cada parada.",
  },
];

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-[hsl(var(--grecia-deep))]"
    >
      <img
        src={heroImg}
        alt="Vista aérea de Santorini com mar Egeu turquesa"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--grecia-deep))]/85 via-[hsl(var(--grecia-deep))]/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--grecia-deep))]/70 via-transparent to-transparent" />

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

      {/* Dot grid decoration */}
      <div
        className="hidden lg:block absolute left-[32%] top-[22%] w-32 h-32 dot-grid opacity-60 z-10"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-5 md:px-12 lg:px-20 pt-32 md:pt-40 pb-20">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-center min-w-0">
          {/* Left: headline */}
          <div className="text-primary-foreground max-w-xl min-w-0">
            <p className="font-accent italic text-lg md:text-xl text-secondary mb-4 md:mb-6">
              Renova Turismo apresenta
            </p>
            <h1 className="font-heading uppercase leading-[0.92] tracking-tight text-[3.2rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              <span className="block">Explore</span>
              <span className="block">a Grécia</span>
              <span className="block display-outline">Eterna</span>
            </h1>
            <p className="font-body text-base md:text-lg text-primary-foreground/80 max-w-md mt-6 md:mt-8 leading-relaxed">
              Uma jornada entre deuses, ilhas e o azul mais profundo do Mediterrâneo —
              do esplendor de Atenas à magia das Cíclades.
            </p>

            <div className="flex items-center gap-5 mt-8 md:mt-10">
              <a
                href="#contato"
                className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body uppercase tracking-[0.18em] text-xs md:text-sm font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-xl"
              >
                Reservar Agora
              </a>
              <a
                href="#roteiro"
                className="font-body uppercase tracking-[0.18em] text-xs md:text-sm text-primary-foreground/80 hover:text-primary-foreground border-b border-primary-foreground/40 pb-1 transition-colors"
              >
                Ver Roteiro
              </a>
            </div>

            {/* Mobile social rail — inline */}
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

          {/* Right: floating cards — carousel on mobile, grid on desktop */}
          <div className="-mx-5 md:mx-0 sm:px-0">
            <div className="flex sm:grid sm:grid-cols-3 gap-4 md:gap-5 lg:translate-y-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-px-5 px-5 sm:px-0 pb-2 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {floatingCards.map((c, i) => (
                <div
                  key={c.title}
                  className="bg-background/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl flex flex-col shrink-0 w-[75%] sm:w-auto snap-start"
                  style={{
                    transform: `translateY(${i === 1 ? "20px" : "0"})`,
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-5 flex-1 flex flex-col">
                    <h3 className="font-heading text-sm md:text-base text-primary leading-tight mb-2 uppercase">
                      {c.title}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed flex-1">
                      {c.description}
                    </p>
                    <a
                      href="#sobre"
                      className="mt-4 inline-block self-start bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body uppercase tracking-widest text-[10px] font-semibold px-4 py-2 rounded-full transition-colors"
                    >
                      Saiba mais
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chevron nav decoration */}
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
