const Roteiro = () => {
  return (
    <section id="roteiro" className="pt-12 md:pt-28 pb-12 md:pb-20 bg-background">
      <div className="container mx-auto px-4">
        <p className="font-accent text-lg italic text-secondary text-center mb-2">
          Sua jornada de fé, dia a dia
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-4">
          Roteiro — Cidades
        </h2>
        <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-sm">
          Uma peregrinação inesquecível pelo México, visitando o Santuário de Guadalupe e
          os principais locais sagrados da fé católica.
        </p>

        <div className="max-w-3xl mx-auto bg-card rounded-xl p-8 md:p-12 shadow-sm text-center">
          <p className="font-body text-muted-foreground leading-relaxed">
            O roteiro completo desta peregrinação está sendo preparado com muito carinho.
            Em breve divulgaremos todos os detalhes dia a dia. Entre em contato para receber
            informações em primeira mão.
          </p>
        </div>

        <div className="text-center mt-10">
          <a
            href="https://api.whatsapp.com/send/?phone=5519994718930&text=Ol%C3%A1%21+Encontrei+voc%C3%AAs+pelo+Google+e+gostaria+de+receber+mais+informa%C3%A7%C3%B5es.+Aguardo+retorno&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-lg px-12 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            Garanta Sua Vaga na Peregrinação
          </a>
        </div>
      </div>
    </section>
  );
};

export default Roteiro;
