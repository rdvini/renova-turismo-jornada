import istanbulImg from "@/assets/istanbul.jpg";
import efesoImg from "@/assets/efeso.jpg";
import pamukkaleImg from "@/assets/pamukkale.jpg";
import capadociaImg from "@/assets/capadocia.jpg";

const cities = [
  {
    nameEn: "Istanbul",
    namePt: "Istambul",
    image: istanbulImg,
    description:
      "Portal entre Oriente e Ocidente, Istambul guarda séculos de história cristã e islâmica. Da majestosa Hagia Sophia à icônica Mesquita Azul, cada esquina revela camadas de civilização e espiritualidade.",
  },
  {
    nameEn: "Ephesus",
    namePt: "Éfeso",
    image: efesoImg,
    description:
      "Cidade de profunda importância bíblica, lar do Templo de Ártemis e das primeiras comunidades cristãs. Aqui, o apóstolo Paulo pregou e a tradição aponta como último refúgio de Maria, mãe de Jesus.",
  },
  {
    nameEn: "Pamukkale",
    namePt: "Pamukkale",
    image: pamukkaleImg,
    description:
      "Maravilha natural de terraços brancos e águas termais turquesas, vizinha à antiga Hierápolis — cidade mencionada nas escrituras e local de martírio do apóstolo Filipe.",
  },
  {
    nameEn: "Cappadocia",
    namePt: "Capadócia",
    image: capadociaImg,
    description:
      "Paisagem surreal de chaminés de fadas e igrejas rupestres esculpidas na rocha. Refúgio dos primeiros cristãos, a Capadócia é um testemunho vivo da perseverança da fé.",
  },
];
const Roteiro = () => {
  return (
    <section id="roteiro" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <p className="font-accent text-lg italic text-secondary text-center mb-2">
          Cidades que contam histórias
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-14">
          Roteiro — Cidades
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cities.map((city) => (
            <div
              key={city.namePt}
              className="group bg-card rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={city.image}
                  alt={city.namePt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="text-xs uppercase tracking-widest text-[#0b9ad6]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                    {city.nameEn}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    {city.namePt}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {city.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roteiro;
