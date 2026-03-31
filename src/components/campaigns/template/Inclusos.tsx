import { Users, Heart, Coffee, Plane, Hotel, ShieldCheck, HeadphonesIcon } from "lucide-react";

/* EDITAR: Modifique os itens abaixo conforme o pacote da viagem */
const items = [
  {
    icon: Users,
    title: "[Benefício 1]",
    text: "[Descreva o benefício aqui]",
  },
  {
    icon: Heart,
    title: "[Benefício 2]",
    text: "[Descreva o benefício aqui]",
  },
  {
    icon: Coffee,
    title: "[Benefício 3]",
    text: "[Descreva o benefício aqui]",
  },
  {
    icon: Plane,
    title: "[Benefício 4]",
    text: "[Descreva o benefício aqui]",
  },
  {
    icon: Hotel,
    title: "[Benefício 5]",
    text: "[Descreva o benefício aqui]",
  },
  {
    icon: ShieldCheck,
    title: "[Benefício 6]",
    text: "[Descreva o benefício aqui]",
  },
  {
    icon: HeadphonesIcon,
    title: "[Benefício 7]",
    text: "[Descreva o benefício aqui]",
  },
];

const Inclusos = () => {
  return (
    <section className="pt-12 md:pt-16 pb-20 md:pb-28 bg-background">
      <div className="container mx-auto px-4">
        <p className="font-accent text-lg italic text-secondary text-center mb-2">
          Tudo pensado para você
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-4">
          O Que Está Incluso
        </h2>
        <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          {/* EDITAR: Descrição geral dos inclusos */}
          Cada detalhe da sua viagem foi planejado com carinho e profissionalismo,
          para que você viva uma experiência única com total conforto e tranquilidade.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto justify-items-center">
          {items.slice(0, 6).map((item) => (
            <div
              key={item.title}
              className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
                <item.icon className="text-secondary" size={28} />
              </div>
              <h3 className="font-heading font-semibold text-primary mb-2">{item.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 max-w-5xl mx-auto">
          {items.slice(6).map((item) => (
            <div
              key={item.title}
              className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center w-full sm:max-w-sm"
            >
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
                <item.icon className="text-secondary" size={28} />
              </div>
              <h3 className="font-heading font-semibold text-primary mb-2">{item.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Inclusos;
