import { Star } from "lucide-react";
import googleReviewsImg from "@/assets/google-reviews.png";

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

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Testimonial */}
          <div className="bg-card rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
            <p className="font-heading font-semibold text-primary">Kelly Cristina</p>
            <p className="font-body text-muted-foreground text-sm mb-3">&nbsp;</p>
            <Stars />
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              Minha experiência com a Renova Turismo foi simplesmente maravilhosa! A viagem foi muito bem organizada, com todo o cuidado e atenção aos detalhes. A equipe é acolhedora, prestativa e faz de tudo para que cada momento seja especial. 💙
              {"\n\n"}
              Foi uma viagem inesquecível, cheia de boas companhias, alegria e ótimos momentos. Recomendo de coração a todos que desejam viajar com segurança, conforto e carinho. ✈️✨
            </p>
          </div>

          {/* YouTube Video */}
          <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow aspect-[9/16] max-h-[500px] mx-auto w-full md:w-auto">
            <iframe
              src="https://www.youtube.com/embed/z_kPlHY6PXU"
              title="Depoimento em vídeo - Renova Turismo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 flex justify-center md:justify-start">
          <a
            href="https://share.google/tya2Kpj6NJlNQ4yTi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver as avaliações da Renova Turismo no Google"
            className="inline-block transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
          >
            <img
              src={googleReviewsImg}
              alt="Renova Turismo - 5,0 estrelas no Google com mais de 1.034 avaliações"
              className="h-16 object-contain"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Depoimentos;
