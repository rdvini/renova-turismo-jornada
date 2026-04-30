import depo01 from "@/assets/lideres/depo-01.webp";
import depo02 from "@/assets/lideres/depo-02.webp";

const WHATSAPP_URL =
  "https://wa.me/5519998947307?text=Ol%C3%A1!%20Vim%20do%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

const Depoimentos = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-14 tracking-tight leading-tight">
          A confiança de quem já{" "}
          <span className="text-secondary">viajou conosco</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <img
            src={depo01}
            alt="Depoimento de cliente"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
          <img
            src={depo02}
            alt="Depoimento de cliente"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
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
