import { useState } from "react";
import { useYouTubeVolume } from "@/hooks/useYouTubeVolume";
import { ChevronLeft, ChevronRight, ImageIcon, Play } from "lucide-react";
import morelli1 from "@/assets/pastor-morelli/morelli-1.jpeg.asset.json";
import morelli2 from "@/assets/pastor-morelli/morelli-2.jpeg.asset.json";
import morelli3 from "@/assets/pastor-morelli/morelli-3.jpeg.asset.json";
import morelli4 from "@/assets/pastor-morelli/morelli-4.jpeg.asset.json";
import morelli5 from "@/assets/pastor-morelli/morelli-5.jpeg.asset.json";
import morelli6 from "@/assets/pastor-morelli/morelli-6.jpeg.asset.json";

const WHATSAPP_URL =
  "https://wa.me/19991813303?text=" +
  encodeURIComponent(
    "Olá, Pastor Morelli! 🙏\n\nVim pela sua página de caravanas bíblicas da Renova Turismo e gostaria de receber mais informações sobre as próximas viagens (datas, valores e o que está incluso).\n\nFico no aguardo do seu retorno!"
  );

const PHOTOS: { src?: string; alt: string }[] = [
  { src: morelli1.url, alt: "Pastor Morelli ensinando nas Terras Bíblicas" },
  { src: morelli2.url, alt: "Pastor Morelli com peregrina durante a viagem" },
  { src: morelli3.url, alt: "Grupo Renova no Caesarea National Park, Israel" },
  { src: morelli4.url, alt: "Pastor Morelli com vista panorâmica de Jerusalém ao pôr do sol" },
  { src: morelli5.url, alt: "Grupo Renova no Monte Precipício, em Israel" },
  { src: morelli6.url, alt: "Peregrinos com certificados de participação na caravana bíblica" },
];

const VIDEO_ID = "vIotSuaudsg";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const videoRef = useYouTubeVolume(100);
  const prev = () => setCurrent((c) => (c === 0 ? PHOTOS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === PHOTOS.length - 1 ? 0 : c + 1));

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/85">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--secondary)/0.18),transparent_55%)]" />

      <div className="relative z-10 container mx-auto px-4 py-24 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Texto + CTA */}
          <div className="text-center lg:text-left">
            
            <p className="font-accent text-lg md:text-xl italic text-secondary mb-3 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Com o Pastor Morelli
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Conheça as <span className="text-secondary">Terras Bíblicas</span> com profundidade, segurança e propósito
            </h1>
            <p className="font-body text-base md:text-lg text-primary-foreground/85 max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              Viva uma jornada inesquecível pelos lugares onde a fé ganhou vida — conduzida com excelência, conhecimento e experiências que transformam cada passo em uma conexão mais profunda com a história bíblica.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold uppercase tracking-wide px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              Conversar no WhatsApp
            </a>
          </div>

          {/* Carrossel + Vídeo */}
          <div className="flex flex-col gap-5 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
            {/* Carrossel de fotos do líder */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-primary-foreground/15 shadow-2xl bg-primary-foreground/5">
              {PHOTOS.map((photo, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
                >
                  {photo.src ? (
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-primary-foreground/40 gap-2">
                      <ImageIcon size={48} />
                      <span className="font-body text-sm">{photo.alt}</span>
                    </div>
                  )}
                </div>
              ))}
              <button onClick={prev} aria-label="Foto anterior" className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 hover:bg-background text-primary flex items-center justify-center shadow-md transition-all">
                <ChevronLeft size={22} />
              </button>
              <button onClick={next} aria-label="Próxima foto" className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 hover:bg-background text-primary flex items-center justify-center shadow-md transition-all">
                <ChevronRight size={22} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {PHOTOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Ir para foto ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-secondary" : "w-2 bg-primary-foreground/50 hover:bg-primary-foreground/70"}`}
                  />
                ))}
              </div>
            </div>

            {/* Vídeo de chamada */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-primary-foreground/15 shadow-2xl bg-black/30">
              {VIDEO_ID ? (
                <iframe
                  ref={videoRef}
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&enablejsapi=1`}
                  title="Vídeo de chamada do Pastor Morelli"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground/50 gap-2">
                  <div className="h-14 w-14 rounded-full bg-secondary/30 flex items-center justify-center">
                    <Play className="text-secondary" size={26} />
                  </div>
                  <span className="font-body text-sm">Vídeo de chamada do líder</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
