import { useState } from "react";
import { MapPin, ArrowRight, Check } from "lucide-react";
import imgTurquia from "@/assets/pastor-morelli/roteiro-turquia.jpg";
import imgIsrael from "@/assets/pastor-morelli/roteiro-israel.jpg";
import imgEgitoJordaniaAsset from "@/assets/pastor-morelli/roteiro-egito-jordania.jpeg.asset.json";
const imgEgitoJordania = imgEgitoJordaniaAsset.url;
import imgGreciaAsset from "@/assets/pastor-morelli/roteiro-grecia.jpeg.asset.json";
const imgGrecia = imgGreciaAsset.url;
import imgEuropa from "@/assets/pastor-morelli/roteiro-europa.jpg";

const WHATSAPP_BASE =
  "https://wa.me/19991813303?text=";

const ROTEIROS = [
  {
    id: "turquia",
    title: "Turquia e 7 Igrejas",
    subtitle: "Os passos do Apóstolo Paulo",
    description: "Roteiros ligados ao Novo Testamento, às primeiras comunidades cristãs e às Sete Igrejas do Apocalipse.",
    image: imgTurquia,
  },
  {
    id: "israel",
    title: "Israel",
    subtitle: "Terra Santa, raízes da fé",
    description: "Uma experiência nos lugares centrais da história bíblica, conectando fé, geografia e espiritualidade.",
    image: imgIsrael,
  },
  {
    id: "egito-jordania",
    title: "Egito e Jordânia",
    subtitle: "Do Êxodo a Petra",
    description: "Uma jornada pelos cenários que moldaram a história bíblica, revelando as raízes espirituais, culturais e geográficas do povo de Israel.",
    image: imgEgitoJordania,
  },
  {
    id: "grecia",
    title: "Grécia",
    subtitle: "Berço da fé cristã",
    description: "Uma jornada por lugares ligados à expansão da fé cristã e à história do mundo bíblico.",
    image: imgGrecia,
  },
  {
    id: "europa",
    title: "Europa",
    subtitle: "Caminhos da história cristã",
    description: "Roteiros históricos, culturais e religiosos que ampliam a compreensão da fé, da igreja e da história cristã.",
    image: imgEuropa,
  },
];

const EscolhaRoteiro = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const buildWhats = () => {
    const escolhido = ROTEIROS.find((r) => r.id === selected);
    const msg = escolhido
      ? `Olá, Pastor Morelli! 🙏\n\nVim pela sua página de caravanas bíblicas da Renova Turismo e tenho muito interesse no roteiro *${escolhido.title}* (${escolhido.subtitle}).\n\nPoderia me enviar mais informações sobre datas, valores e o que está incluso?\n\nFico no aguardo!`
      : `Olá, Pastor Morelli! 🙏\n\nVim pela sua página de caravanas bíblicas da Renova Turismo e gostaria de conhecer melhor os roteiros disponíveis. Poderia me enviar mais detalhes sobre datas, valores e o que está incluso?\n\nFico no aguardo!`;
    return WHATSAPP_BASE + encodeURIComponent(msg);
  };

  const renderCard = (r: (typeof ROTEIROS)[number]) => {
    const isSelected = selected === r.id;
    return (
      <button
        key={r.id}
        type="button"
        onClick={() => setSelected(isSelected ? null : r.id)}
        className={`group relative text-left bg-card rounded-2xl border-2 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col ${
          isSelected ? "border-secondary ring-2 ring-secondary/30" : "border-border hover:border-secondary/50"
        }`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={r.image}
            alt={r.title}
            loading="lazy"
            width={1024}
            height={1024}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent" />
          {isSelected && (
            <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-secondary flex items-center justify-center shadow-lg">
              <Check className="text-secondary-foreground" size={16} />
            </div>
          )}
          <div className="absolute top-3 left-3 h-10 w-10 rounded-xl bg-background/90 backdrop-blur flex items-center justify-center shadow">
            <MapPin className="text-secondary" size={18} />
          </div>
        </div>
        <div className="p-6 md:p-7 flex-1 flex flex-col">
          <p className="font-accent italic text-secondary text-sm mb-1">{r.subtitle}</p>
          <h3 className="font-heading text-xl md:text-2xl font-bold text-primary mb-3 leading-tight">
            {r.title}
          </h3>
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
            {r.description}
          </p>
        </div>
      </button>
    );
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
            Cinco jornadas bíblicas conduzidas com cuidado, propósito e a experiência do Pastor Morelli.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-10 space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {ROTEIROS.slice(0, 3).map(renderCard)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto">
            {ROTEIROS.slice(3).map(renderCard)}
          </div>
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
