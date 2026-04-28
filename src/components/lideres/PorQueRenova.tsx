import icon1 from "@/assets/lideres/icon-1.png";
import icon2 from "@/assets/lideres/icon-2.png";
import icon3 from "@/assets/lideres/icon-3.png";
import icon4 from "@/assets/lideres/icon-4.png";
import icon5 from "@/assets/lideres/icon-5.png";
import icon6 from "@/assets/lideres/icon-6.png";

const WHATSAPP_URL =
  "https://wa.me/5519998947307?text=Ol%C3%A1!%20Vim%20do%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

const icons = [icon1, icon2, icon3, icon4, icon5, icon6];

const PorQueRenova = () => {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
          POR QUE ESCOLHER A RENOVA?
        </h2>
        <p className="font-body text-base md:text-lg text-primary-foreground/85 text-center max-w-3xl mx-auto mb-14">
          Sabemos da complexidade e da responsabilidade de guiar uma comunidade
          em uma jornada internacional. Por isso, nosso pacote 100% completo
          inclui:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-14">
          {icons.map((src, i) => (
            <div
              key={i}
              className="flex items-center justify-center p-4 rounded-xl bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors"
            >
              <img
                src={src}
                alt={`Benefício incluso ${i + 1}`}
                className="w-full h-auto max-w-[220px]"
              />
            </div>
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

export default PorQueRenova;
