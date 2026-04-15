import { Star } from "lucide-react";
import googleReviewsImg from "@/assets/google-reviews.png";

const testimonials = [
  {
    name: "Elisangela Vasconcelos",
    location: "",
    quote:
      "Peregrinação maravilhosa à Itália, Roma, Medjugorje e a Portugal, com passagem por Fátima. Toda a logística pensada com excelência pela Renova, permitindo que estivéssemos apenas presentes e abertos a viver cada experiência. Destaque especial para a Viviane, que nos acompanhou desde o Brasil, with muita energia e cuidado. Lugares sagrados, uma imersão profunda na história da Igreja. Foi magnânimo, surreal, divino. Gratidão!",
  },
  {
    name: "Luciane Cidade",
    location: "",
    quote:
      "Minha experiência com Renova Turismo, foi magnífico todo cuidado deste do operacional a logística feita com todo cuidado para nosso grupo de peregrinos iniciamos na Itália e finalizando em Portugal. Chegamos todos com coração cheios de gratidão, por essa equipe maravilhosa foram 18 dias de muito crescimento espiritual aquilo que vimos nos livros, podemos ver e presenciar com nossos olhos, Nossos guias maravilhosos Vivi que cuidou de cada um de nós como m olhar de Deus, tinhamos dona Maria cadeirante, uma grávida com seu filho, idosos, éramos 23 cada uma com suas limitações e Vivi foi uma mulher cheio de alegria que conduziu o grupo muito bem fica minha gratidão em especial para ela, não posso deixar de falar da Flor e do Vasco guias de Roma espetaculares informações passadas com excelência e claro muito carinho.\n\nObrigada Renovar Turismo. Até a próxima!",
  },
  {
    name: "Kelly Cristina",
    location: "",
    quote:
      "Minha experiência com a Renova Turismo foi simplesmente maravilhosa! A viagem foi muito bem organizada, com todo o cuidado e atenção aos detalhes. A equipe é acolhedora, prestativa e faz de tudo para que cada momento seja especial. 💙\n\nFoi uma viagem inesquecível, cheia de boas companhias, alegria e ótimos momentos. Recomendo de coração a todos que desejam viajar com segurança, conforto e carinho. ✈️✨",
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

        <div className="max-w-5xl mx-auto mt-8 flex justify-center md:justify-start">
          <img
            src={googleReviewsImg}
            alt="Renova Turismo - 5,0 estrelas no Google com mais de 1.034 avaliações"
            className="h-16 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Depoimentos;
