const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=5519992016125&text=Ol%C3%A1+Guilherme%21+Tenho+interesse+na+viagem+para+o+Marrocos+e+gostaria+de+receber+o+roteiro+completo.&type=phone_number&app_absent=0";

const Roteiro = () => {
  return (
    <section id="roteiro" className="pt-12 md:pt-28 pb-6 md:pb-10 bg-background">
      <div className="container mx-auto px-4">
        <p className="font-accent text-lg italic text-secondary text-center mb-2">
          Sua jornada, dia a dia
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-4">
          Roteiro — Marrocos
        </h2>
        <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-sm">
          O roteiro completo desta viagem será divulgado em breve.
        </p>

        <div className="max-w-2xl mx-auto bg-muted rounded-2xl p-10 md:p-14 text-center shadow-sm">
          <p className="font-accent text-xl italic text-secondary mb-4">
            Em breve
          </p>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
            Roteiro detalhado em construção
          </h3>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            Estamos finalizando cada detalhe dessa experiência única pelo Marrocos.
            Entre em contato para receber o roteiro completo assim que estiver pronto.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            Quero receber o roteiro
          </a>
        </div>
      </div>
    </section>
  );
};

export default Roteiro;
