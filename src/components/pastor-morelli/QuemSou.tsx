import { Play } from "lucide-react";

// 🎬 Substitua VIDEO_ID pelo ID real do YouTube quando disponível.
const VIDEO_ID = "";

const QuemSou = () => {
  return (
    <section id="quem-sou" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="font-accent text-lg italic text-secondary mb-2">Conheça o líder</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 tracking-tight">
            Quem sou?
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            Pastor Morelli compartilha em vídeo sua trajetória, sua chamada e o coração por trás de cada caravana
            organizada com a Renova Turismo.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-border bg-card">
            {VIDEO_ID ? (
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
                title="Quem é o Pastor Morelli"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Play className="text-secondary" size={28} />
                </div>
                <span className="font-body text-sm">Espaço reservado para o vídeo</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuemSou;
