import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria Helena",
    age: 62,
    quote: "Foi a viagem mais significativa da minha vida. Conhecer a Turquia e suas paisagens incríveis superou todas as minhas expectativas.",
  },
  {
    name: "Carlos Eduardo",
    age: 55,
    quote: "A riqueza cultural e histórica da Turquia me deixou sem palavras. A Renova cuidou de tudo com excelência.",
  },
  {
    name: "Dona Lúcia",
    age: 70,
    quote: "Me senti acolhida do início ao fim. Os guias eram extraordinários e cada cidade era mais impressionante que a anterior. Voltarei com certeza.",
  },
];

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
              className="bg-card rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote className="text-secondary/30 absolute top-4 right-4" size={32} />
              <p className="font-accent italic text-muted-foreground leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div>
                <p className="font-heading font-semibold text-primary text-sm">{t.name}</p>
                <p className="font-body text-muted-foreground text-xs">{t.age} anos</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Depoimentos;
