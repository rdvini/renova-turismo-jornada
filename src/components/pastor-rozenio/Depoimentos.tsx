import { Star, Quote } from "lucide-react";
import GoogleReviewsCard from "@/components/shared/GoogleReviewsCard";

// ✍️ Placeholders — substitua pelos depoimentos reais quando disponíveis.
const TESTIMONIALS = [
  {
    name: "Valdenir Pogetti",
    location: "",
    quote:
      "Minha experiência foi fantástica, primeira vez em Israel e superou todas as minhas expectativas. Pastor João Morelli foi maravilhoso, nosso Guia Davi sem palavras para agradecer por tudo que fez por nós, a guia que nos guiou em Belém maravilhosa e sem contar nosso motorista, vou sentir saudades da buzina e das freadas. Renova turismo parabéns pelos seus profissionais.",
  },
  {
    name: "Pra. Juliana Terciotti",
    location: "",
    quote:
      "Perfeita! Obrigada pelo cuidado e atenção que tiveram com o grupo o tempo todo. Amei cada momento . Gratidão aos Pastores Morelli e Rozenio, também ao Rodrigo que nos enriqueceu com a história do povo Judeu.",
  },
  {
    name: "Luciano Martins",
    location: "São Paulo/SP",
    quote:
      "Uma Empresa Responsável, Dedicada a proporcionar o máximo de bem estar aos Clientes. Eu sou Cliente da Renova Turismo, e estou muito Satisfeito com o empenho e organização, que é uma Marca Registrada desta Empresa.",
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
