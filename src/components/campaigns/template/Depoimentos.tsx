import { Star } from "lucide-react";

/* EDITAR: Substitua os depoimentos abaixo pelos reais */
const testimonials = [
  {
    name: "[Nome do Cliente 1]",
    location: "[Cidade/Estado]",
    quote: "[Depoimento do cliente aqui]",
  },
  {
    name: "[Nome do Cliente 2]",
    location: "[Cidade/Estado]",
    quote: "[Depoimento do cliente aqui]",
  },
  {
    name: "[Nome do Cliente 3]",
    location: "[Cidade/Estado]",
    quote: "[Depoimento do cliente aqui]",
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
    <section id="depoimentos" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <p className="font-accent text-lg italic text-secondary text-center mb-2">
          O que dizem nossos viajantes
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-14">
          Depoimentos
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="font-heading font-semibold text-primary">{t.name}</p>
              <p className="font-body text-muted-foreground text-sm mb-3">{t.location}</p>
              <Stars />
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {t.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Depoimentos;
