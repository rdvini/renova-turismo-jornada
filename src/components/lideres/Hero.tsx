import { useEffect, useState } from "react";
import heroBg from "@/assets/lideres/hero-bg.jpg";
import heroSlide2 from "@/assets/lideres/hero-slide-02.jpg";
import heroSlide3 from "@/assets/lideres/hero-slide-03.jpg";
import logoRenova from "@/assets/logo-renova.svg";

const WHATSAPP_URL =
  "https://wa.me/5519998947307?text=Ol%C3%A1!%20Vim%20do%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

const SLIDES = [
  { src: heroBg, alt: "Vista de Jerusalém — Terra Santa" },
  { src: heroSlide2, alt: "Cúpula da Rocha e Muro das Lamentações em Jerusalém" },
  { src: heroSlide3, alt: "Basílica de Nossa Senhora de Guadalupe, México" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {SLIDES.map((slide, i) => (
        <img
          key={i}
          src={slide.src}
          alt={slide.alt}
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/80 to-primary/90" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-center max-w-4xl">
        <img
          src={logoRenova}
          alt="Renova Turismo"
          className="h-14 md:h-16 mx-auto mb-8 animate-fade-in-up drop-shadow-lg"
        />
        <h1
          className="font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in-up [text-shadow:_0_2px_12px_rgb(0_0_0_/_40%)]"
          style={{ animationDelay: "0.15s" }}
        >
          Pastores e Padres:{" "}
          <span className="font-normal">
            Leve sua comunidade para uma jornada espiritual em grupo
          </span>
        </h1>
        <p
          className="font-body text-lg md:text-xl text-primary-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up [text-shadow:_0_1px_6px_rgb(0_0_0_/_35%)]"
          style={{ animationDelay: "0.3s" }}
        >
          Com a Renova, você leva o seu grupo para lugares sagrados com
          segurança, tradição e confiança.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold text-base md:text-lg uppercase tracking-wide px-10 py-4 transition-all hover:scale-105 shadow-lg animate-fade-in-up rounded-full"
          style={{ animationDelay: "0.45s" }}
        >
          Conversar no WhatsApp
        </a>
      </div>
    </section>
  );
};

export default Hero;
