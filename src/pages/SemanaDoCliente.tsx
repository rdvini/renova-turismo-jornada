import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { MapPin, Gift, Percent, CalendarDays, ArrowRight, Phone, Clock, X, Menu } from "lucide-react";
import Seo from "@/components/seo/Seo";
import Footer from "@/components/landing/Footer";
import heroImageAsset from "@/assets/semana-do-cliente/hero.png.asset.json";
import logoRenova from "@/assets/logo-renova.svg";

const ADDRESS_QUERY = "Renova Turismo Campinas SP";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_QUERY)}`;
const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=5519994718930&text=Ol%C3%A1%21+Gostaria+de+confirmar+minha+presen%C3%A7a+na+Semana+do+Cliente+da+Renova+Turismo.&type=phone_number&app_absent=0";

const highlights = [
  {
    icon: Percent,
    title: "Descontos exclusivos",
    description: "Condições especiais e preços imperdíveis para quem estiver presente nos dois dias de evento.",
  },
  {
    icon: Gift,
    title: "Presente para quem é cliente",
    description: "Quem já viajou com a Renova Turismo levará um brinde exclusivo de agradecimento.",
  },
  {
    icon: CalendarDays,
    title: "Bônus e brindes na compra",
    description: "Quem fechar um pacote durante a Semana do Cliente ganha benefícios extras e surpresas.",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2" aria-label="Renova Turismo">
          <img src={logoRenova} alt="Renova Turismo" className="h-9 md:h-11 object-contain brightness-0 invert" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Início", href: "#inicio" },
            { label: "Destaques", href: "#destaques" },
            { label: "Localização", href: "#localizacao" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-body text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold text-sm px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-md"
          >
            Confirmar presença
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="md:hidden p-2 text-primary-foreground"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-primary border-b border-primary-foreground/10 px-4 pb-5 pt-3 shadow-xl">
          <nav className="flex flex-col gap-4">
            {[
              { label: "Início", href: "#inicio" },
              { label: "Destaques", href: "#destaques" },
              { label: "Localização", href: "#localizacao" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-body text-base font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold text-sm px-5 py-3 rounded-full transition-all mt-2"
            >
              Confirmar presença
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Ambiente acolhedor da agência Renova Turismo preparado para receber os clientes"
        fetchPriority="high"
        decoding="async"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />

      <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-32 pb-16 text-center">
        <span className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 text-secondary font-heading font-bold text-xs md:text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-6 animate-fade-in-up">
          <CalendarDays size={16} />
          15 e 16 de setembro
        </span>

        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Semana do Cliente
          <span className="block text-secondary">na Renova Turismo</span>
        </h1>

        <p className="font-body text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Nos dias 15 e 16 de setembro, a Renova Turismo vai abrir as portas para receber você em dois dias muito especiais.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <a
            href="#localizacao"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-base px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            <MapPin size={20} />
            Saiba como chegar
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold text-base px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg hover:bg-primary-foreground/90"
          >
            <Phone size={20} />
            Confirmar presença
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce text-primary-foreground/70">
        <ArrowRight className="rotate-90" size={28} />
      </div>
    </section>
  );
};

const Intro = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-accent text-lg md:text-xl italic text-muted-foreground mb-4">
            Um momento para estar perto de quem ama viajar
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
            Conheça nossa equipe, nossa história e nossos destinos
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            Será uma oportunidade para conhecer nossa equipe, nossa história e entender por que milhares de pessoas já escolheram viajar com a Renova.
          </p>
        </div>
      </div>
    </section>
  );
};

const Highlights = () => {
  return (
    <section id="destaques" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-secondary/10 text-secondary font-heading font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            O que preparamos para você
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Destaques do evento
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Três motivos para você reservar essa data na agenda e vir nos visitar.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-card border border-border rounded-3xl shadow-xl p-6 md:p-10 lg:p-12">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative bg-background rounded-2xl p-6 md:p-8 border border-border hover:border-secondary/50 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors">
                    <Icon className="text-secondary" size={28} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  <span className="absolute top-6 right-6 font-heading text-4xl font-extrabold text-secondary/10 group-hover:text-secondary/20 transition-colors">
                    0{index + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const GiftHighlight = () => {
  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/20 mb-8 animate-bounce">
            <Gift className="text-secondary" size={36} />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
            Clientes da Renova Turismo ganharão um presente muito especial.
          </h2>
          <p className="font-body text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Quem já fez parte de alguma das nossas viagens terá uma surpresa exclusiva esperando por aqui. É a nossa forma de agradecer pela confiança.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-base px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            Quero participar
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Location = () => {
  return (
    <section id="localizacao" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-block bg-secondary/10 text-secondary font-heading font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                Onde será o evento
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Venha nos fazer uma visita
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                A Semana do Cliente acontece na Renova Turismo. Clique no botão abaixo para ver o local no mapa e traçar a melhor rota até aqui.
              </p>

              <div className="space-y-5 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Clock className="text-secondary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-foreground mb-1">Data e horário</h3>
                    <p className="font-body text-sm text-muted-foreground">15 e 16 de setembro — atendimento especial para clientes e visitantes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-secondary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-foreground mb-1">Local</h3>
                    <p className="font-body text-sm text-muted-foreground">Renova Turismo — endereço completo disponível no mapa.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Phone className="text-secondary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-foreground mb-1">Confirme sua presença</h3>
                    <p className="font-body text-sm text-muted-foreground">Envie uma mensagem pelo WhatsApp e avise que vai passar por aqui.</p>
                  </div>
                </div>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-base px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
              >
                <MapPin size={20} />
                Saiba como chegar
              </a>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border aspect-[4/3] lg:aspect-auto lg:h-[520px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.296!2d-47.0626!3d-22.9074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDU0JzI3LjAiUyA0N8KwMDMnNDUuNCJX!5e0!3m2!1spt-BR!2sbr!4v1699999999999!5m2!1spt-BR!2sbr"
                title="Mapa com a localização da Renova Turismo"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SemanaDoCliente = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '606621996836612');
            fbq('track', 'PageView');
            fbq('track', 'ViewContent', ${JSON.stringify({ content_name: 'Semana do Cliente na Renova Turismo', content_category: 'Evento' })});
          `}
        </script>
        <noscript>
          {`
            <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=606621996836612&ev=PageView&noscript=1" />
          `}
        </noscript>
      </Helmet>
      <Seo
        title="Semana do Cliente na Renova Turismo"
        description="Nos dias 15 e 16 de setembro a Renova Turismo abre as portas para um evento especial com descontos, presentes e brindes exclusivos para clientes."
        path="/semana-do-cliente"
      />
      <Navbar />
      <Hero />
      <Intro />
      <Highlights />
      <GiftHighlight />
      <Location />
      <Footer />
    </div>
  );
};

export default SemanaDoCliente;
