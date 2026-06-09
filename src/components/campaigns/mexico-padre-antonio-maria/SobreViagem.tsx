import { Calendar, MapPin, Plane } from "lucide-react";

const SobreViagem = () => {
  return (
    <section
      id="sobre"
      className="py-16 md:py-32 bg-background relative overflow-hidden baroque-overlay"
    >
      <div className="container mx-auto px-5 md:px-8 relative">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="font-accent italic tracking-[0.3em] uppercase text-sm md:text-base text-secondary mb-3">
              A peregrinação
            </p>
            <h2 className="font-heading italic text-4xl md:text-5xl lg:text-6xl font-semibold text-primary leading-[1.0] mb-2">
              Sobre
            </h2>
            <h2 className="font-heading italic text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.0] gold-shimmer mb-6">
              a Jornada
            </h2>
            <div className="w-16 h-px bg-secondary mb-8" />
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              Uma peregrinação exclusiva de 10 dias pelo México ao lado do{" "}
              <span className="text-primary font-semibold">Padre Antônio Maria</span> —
              do Santuário de Nossa Senhora de Guadalupe às pirâmides de Teotihuacán,
              passando por Puebla, Tlaxcala e o paraíso de Cancún.
            </p>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mt-5">
              Pequenos grupos, hotéis selecionados, guias em português e celebrações
              presididas pelo Padre Antônio Maria em cada um dos principais santuários.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Calendar, label: "Quando", value: "Novembro de 2027" },
              { icon: MapPin, label: "Destinos", value: "Cidade do México, Guadalupe, Puebla e Cancún" },
              { icon: Plane, label: "Partida", value: "São Paulo (GRU)" },
            ].map((item) => (
              <div
                key={item.label}
                className="glam-card rounded-2xl p-6 md:p-7 flex flex-col gap-3 hover:-translate-y-1 transition-transform"
              >
                <item.icon className="text-secondary" size={26} strokeWidth={1.5} />
                <p className="font-body uppercase tracking-[0.18em] text-[10px] text-muted-foreground font-semibold">
                  {item.label}
                </p>
                <p className="font-heading italic font-semibold text-primary text-sm leading-tight">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreViagem;
