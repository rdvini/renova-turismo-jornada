import { useState } from "react";
import { MapPin, ArrowRight, Check } from "lucide-react";

const WHATSAPP_BASE =
  "https://wa.me/5519989542633?text=";

const ROTEIROS = [
  {
    id: "turquia",
    title: "Turquia e 7 Igrejas",
    subtitle: "Os passos do Apóstolo Paulo",
    description: "Roteiros ligados ao Novo Testamento, às primeiras comunidades cristãs e às Sete Igrejas do Apocalipse.",
  },
  {
    id: "israel",
    title: "Israel",
    subtitle: "Terra Santa, raízes da fé",
    description: "Uma experiência nos lugares centrais da história bíblica, conectando fé, geografia e espiritualidade.",
  },
  {
    id: "egito-jordania",
    title: "Egito e Jordânia",
    subtitle: "Do Êxodo a Petra",
    description: "Uma jornada pelos cenários que moldaram a história bíblica, revelando as raízes espirituais, culturais e geográficas do povo de Israel.",
  },
  {
    id: "grecia",
    title: "Grécia",
    subtitle: "Berço da fé cristã",
    description: "Uma jornada por lugares ligados à expansão da fé cristã e à história do mundo bíblico.",
  },
  {
    id: "europa",
    title: "Europa",
    subtitle: "Caminhos da história cristã",
    description: "Roteiros históricos, culturais e religiosos que ampliam a compreensão da fé, da igreja e da história cristã.",
  },
];

const EscolhaRoteiro = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const buildWhats = () => {
    const escolhido = ROTEIROS.find((r) => r.id === selected);
    const msg = escolhido
      ? `Olá! Vim da página do Pastor Morelli e tenho interesse no roteiro: ${escolhido.title}.`
      : "Olá! Vim da página do Pastor Morelli e gostaria de mais informações sobre os roteiros.";
    return WHATSAPP_BASE + encodeURIComponent(msg);
  };

  return (
    <section id="roteiros" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-accent text-lg italic text-secondary mb-2">Próximas caravanas</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 tracking-tight">
            Escolha um <span className="text-secondary">roteiro</span>
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            Três jornadas bíblicas conduzidas com cuidado, propósito e a experiência do Pastor Morelli.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-10">
          {ROTEIROS.map((r) => {
            const isSelected = selected === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelected(isSelected ? null : r.id)}
                className={`group relative text-left bg-card rounded-2xl border-2 p-6 md:p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isSelected ? "border-secondary ring-2 ring-secondary/30" : "border-border hover:border-secondary/50"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-secondary/15 transition-colors">
                    <MapPin className="text-primary group-hover:text-secondary transition-colors" size={22} />
                  </div>
                  {isSelected && (
                    <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center">
                      <Check className="text-secondary-foreground" size={16} />
                    </div>
                  )}
                </div>
                <p className="font-accent italic text-secondary text-sm mb-1">{r.subtitle}</p>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-primary mb-3 leading-tight">
                  {r.title}
                </h3>
                <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                  {r.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href={buildWhats()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold uppercase tracking-wide px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            {selected ? "Quero esse roteiro" : "Quero saber mais"}
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default EscolhaRoteiro;
