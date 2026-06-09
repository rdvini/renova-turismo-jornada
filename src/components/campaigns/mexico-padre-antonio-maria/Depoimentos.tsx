import { Star, Quote } from "lucide-react";
import GoogleReviewsCard from "@/components/shared/GoogleReviewsCard";

const testimonials = [
  {
    name: "Dr. Felipe Silva",
    location: "Campinas/SP",
    quote:
      "Excelente empresa. Excelente tratamento. Excelentes produtos. Excelente pós-venda. É o tipo de empresa que entende que uma viagem pode significar muito mais do que apenas uma viagem.",
  },
  {
    name: "Ilda Costa",
    location: "Itu/SP",
    quote:
      "Da viagem que fiz só tenho pontos positivos. A equipe da Renova esteve presente nos dando toda assistência. A atenção para com o cliente foi o que me fez ter o desejo de fazer novas viagens com a Renova.",
  },
  {
    name: "Luciano Martins",
    location: "São Paulo/SP",
    quote:
      "Uma empresa responsável, dedicada a proporcionar o máximo de bem estar aos clientes. Estou muito satisfeito com o empenho e organização, que é uma marca registrada desta empresa.",
  },
];

const Depoimentos = () => {
  return (
    <section id="depoimentos" className="py-16 md:py-28 bg-muted baroque-overlay">
      <div className="container mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-accent italic tracking-[0.3em] uppercase text-sm md:text-base text-secondary mb-3">
            O que dizem nossos viajantes
          </p>
          <h2 className="font-heading italic text-3xl md:text-5xl font-semibold text-primary leading-tight">
            <span className="gold-shimmer">Depoimentos</span>
          </h2>
          <div className="w-16 h-px bg-secondary mx-auto mt-6" />
        </div>

        <GoogleReviewsCard />

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-14">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glam-card rounded-xl p-7 shadow-sm hover:shadow-lg transition-all relative"
            >
              <Quote
                className="absolute top-5 right-5 text-secondary/30"
                size={36}
                strokeWidth={1}
              />
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-secondary fill-secondary" size={14} />
                ))}
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5">
                {t.quote}
              </p>
              <div className="pt-4 border-t border-secondary/30">
                <p className="font-heading italic font-semibold text-primary text-sm">{t.name}</p>
                <p className="font-body text-muted-foreground text-xs mt-1">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Depoimentos;
