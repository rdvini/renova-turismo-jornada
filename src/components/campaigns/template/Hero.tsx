import { Play } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* EDITAR: Substituir por imagem do destino */}
      <div className="absolute inset-0 w-full h-full bg-primary/60" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 container mx-auto px-4 pt-[6.75rem] pb-16 text-center">
        <p className="font-accent text-lg md:text-xl italic text-primary-foreground/80 mb-4 animate-fade-in-up">
          {/* EDITAR: Subtítulo */}
          de Manaus para o Mundo
        </p>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          {/* EDITAR: Título principal */}
          Viagem a [Destino]
        </h1>
        <p className="font-body text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          {/* EDITAR: Descrição do hero */}
          Explore a riqueza cultural e histórica de [Destino] com a Renova Turismo e [Nome do Líder] — uma experiência inesquecível.
        </p>

        <div className="max-w-xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
          <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-primary-foreground/20 bg-primary/40 backdrop-blur-sm flex items-center justify-center cursor-pointer group hover:border-secondary transition-colors">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="text-secondary-foreground ml-1" size={28} />
              </div>
              <span className="font-body text-sm text-primary-foreground/80">
                Assista ao vídeo da viagem
              </span>
            </div>
          </div>
        </div>

        <a
          href="#contato"
          className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          {/* EDITAR: Texto do botão */}
          Quero Participar
        </a>
      </div>
    </section>
  );
};

export default Hero;
