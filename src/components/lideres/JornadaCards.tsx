import card01 from "@/assets/lideres/card-01.svg";
import card02 from "@/assets/lideres/card-02.svg";
import card03 from "@/assets/lideres/card-03.svg";

const WHATSAPP_URL =
  "https://wa.me/5519998947307?text=Ol%C3%A1!%20Vim%20do%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

const cards = [card01, card02, card03];

const JornadaCards = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center max-w-3xl mx-auto mb-14 tracking-tight leading-tight">
          Uma jornada que vai marcar a{" "}
          <span className="text-secondary">vida espiritual da sua igreja</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12">
          {cards.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Destaque ${i + 1} da jornada`}
              className="w-full h-auto rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            />
          ))}
        </div>

        <div className="text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold uppercase tracking-wide px-10 py-4 rounded-md transition-all hover:scale-105 shadow-lg"
          >
            Conversar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default JornadaCards;
