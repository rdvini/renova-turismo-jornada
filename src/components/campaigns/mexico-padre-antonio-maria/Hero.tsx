import heroImage from "@/assets/mexico-padre-antonio-maria/hero-glamour.jpg";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <img
        src={heroImage}
        alt="Basílica de Nossa Senhora de Guadalupe ao entardecer — Cidade do México"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      {/* Cinematic dual gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--pam-wine-deep) / 0.55) 0%, hsl(var(--pam-wine) / 0.35) 45%, hsl(var(--pam-wine-deep) / 0.85) 100%)",
        }}
      />
      <div className="absolute inset-0 baroque-overlay" />

      {/* Decorative gold corner ornaments */}
      <div className="pointer-events-none absolute top-24 left-6 md:top-32 md:left-12 w-16 h-16 md:w-24 md:h-24 border-t border-l border-secondary/60" />
      <div className="pointer-events-none absolute bottom-10 right-6 md:bottom-14 md:right-12 w-16 h-16 md:w-24 md:h-24 border-b border-r border-secondary/60" />

      <div className="relative z-10 container mx-auto px-4 pt-[6.75rem] pb-16 text-center">
        <p className="font-accent text-base md:text-lg italic tracking-[0.35em] uppercase text-secondary mb-5 animate-fade-in-up">
          Renova Turismo apresenta
        </p>

        <div className="gold-rule mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <span className="text-secondary text-xs">✦</span>
        </div>

        <h1
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground leading-[1.05] mb-3 animate-fade-in-up italic"
          style={{ animationDelay: "0.15s" }}
        >
          Peregrinação ao México
        </h1>
        <p
          className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold mb-6 gold-shimmer animate-fade-in-up"
          style={{ animationDelay: "0.25s" }}
        >
          com Padre Antônio Maria
        </p>

        <div className="gold-rule mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <span className="text-secondary text-xs">✦</span>
        </div>

        <p
          className="font-body text-base md:text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-10 animate-fade-in-up leading-relaxed"
          style={{ animationDelay: "0.4s" }}
        >
          Uma jornada exclusiva pela terra de Nossa Senhora de Guadalupe ao lado de
          um dos mais queridos sacerdotes do Brasil. Fé, beleza e momentos
          inesquecíveis em hotéis selecionados e roteiros cuidadosamente preparados.
        </p>

        <a
          href="https://api.whatsapp.com/send/?phone=5519994718930&text=Ol%C3%A1%21+Tenho+interesse+na+Peregrina%C3%A7%C3%A3o+ao+M%C3%A9xico+com+Padre+Ant%C3%B4nio+Maria.+Aguardo+retorno&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block gold-btn font-heading font-bold text-lg px-12 py-4 rounded-full animate-fade-in-up tracking-wide"
          style={{ animationDelay: "0.6s" }}
        >
          Garanta Sua Vaga
        </a>
      </div>
    </section>
  );
};

export default Hero;
