import {
  Plane,
  Hotel,
  Coffee,
  Ship,
  Users,
  Sparkles,
  Snowflake,
  Train,
  Bus,
  Briefcase,
  Headphones,
  HandCoins,
  ShieldCheck,
  Ticket,
} from "lucide-react";

const items = [
  {
    icon: Plane,
    title: "Voo internacional",
    text: "Passagens aéreas de ida e volta inclusas no pacote.",
  },
  {
    icon: Hotel,
    title: "Parte terrestre",
    text: "Hotéis categoria Superior selecionados para seu conforto.",
  },
  {
    icon: Coffee,
    title: "Acomodação em quarto duplo",
    text: "Café da manhã e demais refeições conforme mencionado no roteiro.",
  },
  {
    icon: Ship,
    title: "Cruzeiro DFDS",
    text: "Acomodação em cabine externa com janela entre Copenhague e Oslo.",
  },
  {
    icon: Users,
    title: "Visitas guiadas",
    text: "Passeios conforme o itinerário com guia local em português ou espanhol.",
  },
  {
    icon: Sparkles,
    title: "Experiência Sami",
    text: "Cultura indígena e observação da Aurora Boreal em noite especial.",
  },
  {
    icon: Snowflake,
    title: "Passeio em trenó com renas",
    text: "Aventura inesquecível pelas paisagens congeladas da região de Tromsø.",
  },
  {
    icon: Train,
    title: "Bilhetes de trem",
    text: "Passagem Oslo–Estocolmo para continuar a jornada pela Escandinávia.",
  },
  {
    icon: Bus,
    title: "Transporte em ônibus de luxo",
    text: "Ônibus com ar-condicionado para os trajatos e visitas programadas.",
  },
  {
    icon: Briefcase,
    title: "Kit de viagem Renova Turismo",
    text: "Materiais exclusivos da agência para acompanhar você durante toda a viagem.",
  },
  {
    icon: Headphones,
    title: "Acompanhante da agência",
    text: "Profissional da Renova Turismo presente durante toda a viagem.",
  },
  {
    icon: HandCoins,
    title: "Gorjetas incluídas",
    text: "Todas as gorjetas previstas já estão inclusas no valor do pacote.",
  },
  {
    icon: ShieldCheck,
    title: "Seguro viagem/saúde",
    text: "Cobertura completa para você viajar com tranquilidade e segurança.",
  },
  {
    icon: Ticket,
    title: "Taxas de embarque",
    text: "Todas as taxas de embarque incluídas, sem surpresas na hora da viagem.",
  },
];

const Inclusos = () => {
  return (
    <section className="py-16 md:py-28 bg-muted">
      <div className="container mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-accent italic text-lg text-secondary mb-3">
            Tudo pensado para você
          </p>
          <h2 className="font-heading uppercase text-3xl md:text-5xl text-primary leading-tight">
            O que está <span className="display-outline-dark">incluso</span>
          </h2>
          <div className="w-16 h-px bg-secondary mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-background rounded-xl p-7 hover:shadow-xl transition-all hover:-translate-y-1 border border-border/40"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center mb-5">
                <item.icon className="text-secondary" size={22} strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-primary uppercase text-base mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Inclusos;
