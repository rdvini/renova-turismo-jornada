import { Star, Quote } from "lucide-react";
import GoogleReviewsCard from "@/components/shared/GoogleReviewsCard";

// ✍️ Placeholders — substitua pelos depoimentos reais quando disponíveis.
const TESTIMONIALS = [
  {
    name: "Fábio Sena",
    location: "",
    quote:
      "Fantástico!\nMeu desejo a partir de agora é voltar para Israel com meu grupo de pessoas juntamente com pastor Marcos Rozenio\nA experiência de Israel é marcado por antes e depois.",
  },
  {
    name: "Pra. Juliana Terciotti",
    location: "",
    quote:
      "Perfeita! Obrigada pelo cuidado e atenção que tiveram com o grupo o tempo todo. Amei cada momento . Gratidão aos Pastores Morelli e Rozenio, também ao Rodrigo que nos enriqueceu com a história do povo Judeu.",
  },
  {
    name: "Ailton Satateles",
    location: "",
    quote:
      "Estando pela primeira vez em Israel fiquei impactado e maravilhado, por contemplar a veracidade das escrituras, sobre uma terra que no meio do deserto mana leite e mel, isto é evidente no contraste com as terras ao redor, Contemplar a riqueza da Arqueologia provando a veracidade das escrituras, a cultura local, os costumes, os hoteis maravilhosos em que nos hospedamos, o zêlo pela segurança nacional, e também do estrangeiro. Retornamos com uma bagagem no coração, na alma e no espirito que não cabe em muitas malas. Gratidão ao Pr. Marcos Rozenio pelo incentivo e a Renova pela maravilhosa organização. DEUS OS ABENÇOE SEMPRE.",
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
                <p className="font-body text-sm text-muted-foreground">{t.location}</p>
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
