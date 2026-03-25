const InscrevaSe = () => {
  return (
    <section id="contato" className="py-12 md:py-16 bg-muted">
      <div className="container mx-auto px-4 text-center">
        <p className="font-accent text-lg italic text-secondary mb-2">
          Garanta sua vaga
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
          Inscreva-se Agora
        </h2>
        <p className="font-body text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
          Vagas limitadas! Entre em contato conosco e reserve seu lugar nesta viagem
          inesquecível pela Turquia.
        </p>
        <a
          href="https://api.whatsapp.com/send/?phone=5519994718930&text=Ol%C3%A1%21+Encontrei+voc%C3%AAs+pelo+Google+e+gostaria+de+receber+mais+informa%C3%A7%C3%B5es.+Aguardo+retorno&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-lg px-12 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
        >
          Garanta sua vaga
        </a>
      </div>
    </section>
  );
};

export default InscrevaSe;
