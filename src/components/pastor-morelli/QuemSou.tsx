import { Play, Award } from "lucide-react";
import certificadoIsrael from "@/assets/pastor-morelli/certificado-israel.jpeg.asset.json";

const VIDEO_ID = "K6l-jyNdkxY";

const WHATSAPP_URL =
  "https://wa.me/19991813303?text=" +
  encodeURIComponent(
    "Olá, Pastor Morelli! 🙏\n\nAssisti seu vídeo na página das caravanas bíblicas da Renova Turismo e gostaria de receber mais informações sobre as próximas viagens (datas, valores e o que está incluso).\n\nFico no aguardo do seu retorno!"
  );

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
            Pastor João Morelli é professor, escritor e especialista em estudos bíblicos, com mais de 33 anos de ministério e 25 anos conduzindo grupos às Terras Bíblicas e Históricas. Sua formação em Teologia e Ciências da Religião, aliada à experiência em mais de 60 países, permite conectar Bíblia, história, geografia, arqueologia e espiritualidade de forma clara e acessível. Reconhecido como Embaixador Amigo de Israel, dedica sua trajetória a ensinar e conduzir pessoas a experiências que transformam o conhecimento das Escrituras em vivência.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          {/* Vídeo de chamada */}
          <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-border bg-card">
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

          {/* Certificado */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-secondary/30 bg-card p-2 md:p-3">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
            <div className="flex items-center gap-2 mb-2 px-1">
              <Award className="text-secondary" size={18} />
              <span className="font-heading text-xs md:text-sm font-bold uppercase tracking-wider text-secondary">
                Reconhecimento Oficial
              </span>
            </div>
            <img
              src={certificadoIsrael.url}
              alt="Certificado do Estado de Israel — Ministério do Turismo nomeando João Morelli Neto como Embaixador Amigo de Israel"
              className="w-full h-auto rounded-lg object-contain bg-white"
              loading="lazy"
            />
            <p className="font-body text-xs text-muted-foreground text-center mt-3 px-2">
              Reconhecido pelo Ministério do Turismo de Israel como{" "}
              <strong className="text-primary">Embaixador Amigo de Israel</strong>.
            </p>
          </div>
        </div>

        {/* CTA WhatsApp */}
        <div className="flex justify-center mt-10">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold uppercase tracking-wide px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            Conversar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default QuemSou;
