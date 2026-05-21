import { Star, Quote } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5519998947307?text=Ol%C3%A1!%20Vim%20do%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

const TESTIMONIALS = [
  {
    name: "Padre João Silva",
    role: "Paróquia São José",
    quote:
      "A Renova Turismo organizou nossa peregrinação à Terra Santa com muito cuidado e profissionalismo. Cada detalhe foi pensado para que pudéssemos viver uma experiência espiritual profunda.",
  },
  {
    name: "Padre Antônio Souza",
    role: "Paróquia Nossa Senhora Aparecida",
    quote:
      "Levei meu grupo paroquial e voltamos transformados. Hospedagem, guias e roteiros impecáveis. Recomendo a todos os padres que desejam levar sua comunidade em uma jornada de fé.",
  },
];

const Depoimentos = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-14 tracking-tight leading-tight">
          A confiança de quem já{" "}
          <span className="text-secondary">viajou conosco</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="relative bg-card rounded-2xl shadow-lg border border-border p-8 flex flex-col"
            >
              <Quote className="text-secondary/30 mb-4" size={36} />
              <p className="font-body text-base md:text-lg text-foreground/90 leading-relaxed mb-6 flex-1">
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

        <div className="max-w-3xl mx-auto mb-14">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-border">
            <iframe
              src="https://www.youtube.com/embed/cw0kfbkVcqA?rel=0&modestbranding=1"
              title="Depoimento de cliente Renova Turismo"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

        <div className="text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold uppercase tracking-wide px-10 py-4 transition-all hover:scale-105 shadow-lg rounded-full"
          >
            Conversar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Depoimentos;
