import { Calendar, MapPin, Plane } from "lucide-react";

const SobreViagem = () => {
  return (
    <section id="sobre" className="py-16 md:py-32 bg-background relative overflow-hidden noise-overlay">
      <div className="aurora-blob w-[380px] h-[380px] bg-secondary/15 -top-32 right-[-100px]" aria-hidden="true" />
      <div className="container mx-auto px-5 md:px-8 relative">

        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="font-accent italic text-lg text-secondary mb-3">
              A viagem
            </p>
            <h2 className="font-heading uppercase text-4xl md:text-5xl lg:text-6xl text-primary leading-[0.95] mb-2">
              Sobre
            </h2>
            <h2 className="font-heading uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.95] display-outline-dark mb-8">
              a Jornada
            </h2>
            <div className="w-16 h-px bg-secondary mb-8" />
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              Uma viagem turística de 9 dias pela Islândia — de Reykjavík ao
              Círculo Dourado, passando pela costa sul, pela lagoa glacial de
              Jökulsárlón e por noites de caça à aurora boreal.
            </p>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mt-5">
              Pequenos grupos, guias em português, hospedagem selecionada e roteiro
              completo: geleiras, vulcões, cachoeiras, águas termais e as luzes
              do norte em uma única jornada.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: Calendar,
                label: "Quando",
                value: "Datas sob consulta",
              },
              {
                icon: MapPin,
                label: "Destinos",
                value: "Reykjavík, Círculo Dourado, Costa Sul, Jökulsárlón e Lagoa Azul",
              },
              {
                icon: Plane,
                label: "Partida",
                value: "São Paulo (GRU)",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="liquid-glass rounded-2xl p-6 md:p-7 flex flex-col gap-3 hover:-translate-y-1 transition-transform"
              >

                <item.icon className="text-secondary" size={26} strokeWidth={1.5} />
                <p className="font-body uppercase tracking-[0.18em] text-[10px] text-muted-foreground font-semibold">
                  {item.label}
                </p>
                <p className="font-heading text-primary text-sm leading-tight">
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

