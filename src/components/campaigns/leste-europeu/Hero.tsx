import heroImage from "@/assets/leste-europeu/hero.webp";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* EDITAR: Substituir por imagem do destino */}
      <img
        src={heroImage}
        alt="Budapeste, Hungria — Leste Europeu"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
        decoding="async"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 container mx-auto px-4 pt-[6.75rem] pb-16 text-center">
        <p className="font-accent text-lg md:text-xl italic text-primary-foreground/80 mb-4 animate-fade-in-up">
          {/* EDITAR: Subtítulo */}
          Renova Turismo apresenta
        </p>
        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          {/* EDITAR: Título principal */}
          Viagem ao Leste Europeu
        </h1>
        <p className="font-body text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          {/* EDITAR: Descrição do hero */}
          Castelos medievais, capitais imperiais e paisagens encantadoras — viva uma jornada cultural inesquecível pelo Leste Europeu com a Renova Turismo.
        </p>

        <a
          href="https://api.whatsapp.com/send/?phone=5519992016125&text=Ol%C3%A1+Guilherme%21+Tenho+interesse+na+viagem+para+o+Leste+Europeu+e+gostaria+de+receber+mais+informa%C3%A7%C3%B5es.&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
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
