import { Star, Quote } from "lucide-react";
import GoogleReviewsCard from "@/components/shared/GoogleReviewsCard";

// ✍️ Placeholders — substitua pelos depoimentos reais quando disponíveis.
const TESTIMONIALS = [
  {
    name: "Depoimento 1",
    role: "Cliente Renova Turismo",
    quote: "Espaço reservado para o primeiro depoimento de quem viajou com o Pastor Morelli e a Renova Turismo.",
  },
  {
    name: "Depoimento 2",
    role: "Cliente Renova Turismo",
    quote: "Espaço reservado para o segundo depoimento de quem viajou com o Pastor Morelli e a Renova Turismo.",
  },
  {
    name: "Depoimento 3",
    role: "Cliente Renova Turismo",
    quote: "Espaço reservado para o terceiro depoimento de quem viajou com o Pastor Morelli e a Renova Turismo.",
  },
];

const Depoimentos = () => {
  return (
    <section id="depoimentos" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <p className="font-accent text-lg italic text-secondary mb-2">Quem já foi, conta</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-tight">
            A confiança de quem já <span className="text-secondary">viajou conosco</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="relative bg-card rounded-2xl shadow-md border border-border p-7 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <Quote className="text-secondary/30 mb-4" size={36} />
              <p className="font-body text-base text-foreground/90 leading-relaxed mb-6 flex-1 italic">
                "{t.quote}"
              </p>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-yellow-500" size={16} />
                ))}
              </div>
              <div>
                <p className="font-heading font-semibold text-primary">{t.name}</p>
                <p className="font-body text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        <GoogleReviewsCard />
      </div>
    </section>
  );
};

export default Depoimentos;
