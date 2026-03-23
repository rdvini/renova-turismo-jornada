const InscrevaSe = () => {
  return (
    <section id="contato" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <p className="font-accent text-lg italic text-secondary-foreground/80 mb-2">
          Garanta sua vaga
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary-foreground mb-6">
          Inscreva-se Agora
        </h2>
        <p className="font-body text-secondary-foreground/90 max-w-xl mx-auto mb-10 text-lg">
          Vagas limitadas! Entre em contato conosco e reserve seu lugar nesta jornada
          transformadora pela Turquia.
        </p>
        <a
          href="#contato"
          className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold text-lg px-12 py-4 rounded-lg transition-all hover:scale-105 shadow-lg"
        >
          Quero Participar
        </a>
      </div>
    </section>
  );
};

export default InscrevaSe;
