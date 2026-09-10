const VIDEO_ID = "dQw4w9WgXcQ"; // TODO: substituir pelo ID do vídeo da Aurora Boreal

const VideoSection = () => {
  return (
    <section className="py-16 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
          <p className="font-accent italic text-lg text-secondary mb-3">
            Antes de embarcar
          </p>
          <h2 className="font-heading uppercase text-3xl md:text-5xl text-primary leading-tight">
            Veja a <span className="display-outline-dark">Experiência</span>
          </h2>
          <div className="w-16 h-px bg-secondary mx-auto mt-6" />
          <p className="font-body text-muted-foreground text-sm md:text-base mt-6 leading-relaxed max-w-2xl mx-auto">
            Assista a um pouco da magia do norte da Europa — canais de Copenhague, fiordes noruegueses e as luzes dançantes do Ártico.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-muted">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
              title="Experiência Aurora Boreal - Renova Turismo"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
