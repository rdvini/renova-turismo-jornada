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

        <div className="max-w-5xl mx-auto mt-10 flex flex-col md:flex-row items-center md:items-center gap-5 md:gap-8 text-center md:text-left">
          <img
            src={googleReviewsImg}
            alt="Renova Turismo - 5,0 estrelas no Google com mais de 1.034 avaliações"
            className="h-16 object-contain shrink-0"
          />
          <div>
            <p className="font-heading text-lg md:text-xl font-bold text-primary leading-snug">
              A mais bem avaliada do Brasil.
            </p>
            <p className="font-body text-sm md:text-base text-muted-foreground mt-1">
              5,0 estrelas — uma reputação construída viagem após viagem, com cuidado, confiança e experiências inesquecíveis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Depoimentos;
