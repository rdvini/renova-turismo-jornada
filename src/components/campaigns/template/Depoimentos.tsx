import { Star } from "lucide-react";
import googleReviewsImg from "@/assets/google-reviews.png";

const testimonials = [
  {
    name: "Dr. Felipe Silva",
    location: "Campinas/SP",
    quote:
      "Excelente empresa. Excelente tratamento. Excelentes produtos. Excelente pós-venda. É o tipo de empresa que entende que uma viagem pode significar muito mais do que apenas uma viagem e se dedica para que seja um sonho inesquecível.",
  },
  {
    name: "Ilda Costa",
    location: "Itu/SP",
    quote:
      "Da viagem que fiz só tenho pontos positivos... Amei.... A equipe da Renova esteve presente nos dando toda assistência desde o momento em que saímos de Salto até o momento em que voltamos pra cá. Sempre estavam a disposição quando alguém do grupo precisava e acho que essa atenção para com o cliente foi o que me fez ter o desejo de fazer novas viagens com a Renova...",
  },
  {
    name: "Luciano Martins",
    location: "São Paulo/SP",
    quote:
      "Uma Empresa Responsável, Dedicada a proporcionar o máximo de bem estar aos Clientes. Eu sou Cliente da Renova Turismo, e estou muito Satisfeito com o empenho e organização, que é uma Marca Registrada desta Empresa.",
  },
];

const Stars = () => (
  <div className="flex gap-0.5 mb-3">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="text-yellow-500 fill-yellow-500" size={16} />
    ))}
  </div>
);

const Depoimentos = () => {
  return (
    <>
      <section className="py-12 md:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <p className="font-accent text-base md:text-lg italic text-primary-foreground/80 mb-2">
            Condições especiais de pagamento
          </p>
          <p className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">
            Parcelas a partir de <span className="text-secondary">R$000,00</span>
          </p>
        </div>
      </section>
      <section id="depoimentos" className="py-20 md:py-28 pb-12 md:pb-16 bg-muted">
      <div className="container mx-auto px-4">
        <p className="font-accent text-lg italic text-secondary text-center mb-2">
          O que dizem nossos viajantes
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-14">
          Depoimentos
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <p className="font-heading font-semibold text-primary">{t.name}</p>
              <p className="font-body text-muted-foreground text-sm mb-3">{t.location}</p>
              <Stars />
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{t.quote}</p>
            </div>
          ))}
        </div>

        <a
          href="https://share.google/tya2Kpj6NJlNQ4yTi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver as avaliações da Renova Turismo no Google"
          className="block max-w-4xl mx-auto mt-14 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-primary/5 to-secondary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" aria-hidden="true" />
          <div className="relative bg-card border border-border/60 rounded-2xl px-6 py-7 md:px-10 md:py-8 shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-500 ease-out flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left cursor-pointer">
            <div className="flex items-center gap-4 shrink-0">
              <img
                src={googleReviewsImg}
                alt="Renova Turismo - 5,0 estrelas no Google com mais de 1.034 avaliações"
                className="h-16 md:h-20 object-contain"
              />
              <div className="hidden md:block w-px h-16 bg-border" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-yellow-500" size={18} />
                ))}
              </div>
              <p className="font-heading text-xl md:text-2xl font-bold text-primary leading-tight">
                A mais bem avaliada do Brasil.
              </p>
              <p className="font-body text-sm md:text-base text-muted-foreground mt-2 leading-relaxed">
                5,0 estrelas — uma reputação construída viagem após viagem, com cuidado, confiança e experiências inesquecíveis.
              </p>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default Depoimentos;
