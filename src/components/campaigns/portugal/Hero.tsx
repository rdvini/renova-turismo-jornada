import heroImage from "@/assets/portugal/hero.jpg";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src={heroImage} alt="Portugal" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 container mx-auto px-4 pt-[6.75rem] pb-16 text-center">
        <p className="font-accent text-lg md:text-xl italic text-primary-foreground/80 mb-4 animate-fade-in-up">
          Renova Turismo apresenta
        </p>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-8xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          Peregrinação para Portugal
        </h1>
        <p className="font-body text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          Descubra a fé, os milagres e as heranças sagradas de Portugal com a Renova Turismo — uma peregrinação inesquecível.
        </p>

        <div className="max-w-xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
          <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-primary-foreground/20 shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/lEItPUovjLo"
              title="Vídeo da Peregrinação para Portugal"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

        <a
          href="#contato"
          className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          Quero Participar
        </a>
      </div>
    </section>
  );
};

export default Hero;
