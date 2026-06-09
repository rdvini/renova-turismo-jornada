import { MapPin, Calendar, BookOpen } from "lucide-react";

const SobreViagem = () => {
  return (
    <section id="sobre" className="py-14 md:py-28 bg-muted baroque-overlay relative">
      <div className="container mx-auto px-4">
        <p className="font-accent text-base italic tracking-[0.3em] uppercase text-secondary text-center mb-3">
          Uma experiência única
        </p>
        <h2 className="font-heading italic text-4xl md:text-5xl font-semibold text-primary text-center mb-4">
          Sobre a Viagem
        </h2>
        <div className="gold-rule mb-12"><span className="text-secondary">✦</span></div>

        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="font-body text-muted-foreground text-lg leading-relaxed">
            O México é palco de uma das mais belas devoções marianas do mundo — a
            Virgem de Guadalupe. Nesta peregrinação exclusiva, ao lado do
            <span className="text-primary font-semibold"> Padre Antônio Maria</span>,
            você percorrerá santuários, cidades coloniais e paisagens paradisíacas,
            unindo espiritualidade e luxo em uma jornada verdadeiramente memorável.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Calendar, title: "Data", text: "Datas sob consulta" },
            { icon: MapPin, title: "Destinos", text: "Cidade do México, Guadalupe, Puebla e Cancún." },
            { icon: BookOpen, title: "Significado", text: "Caminhe sobre as terras de Nossa Senhora de Guadalupe e renove sua fé na companhia do Padre Antônio Maria." },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="glam-card rounded-xl p-8 text-center transition-transform hover:-translate-y-1"
            >
              <div className="mx-auto mb-5 w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(var(--pam-gold) / 0.2), hsl(var(--pam-gold) / 0.05))", border: "1px solid hsl(var(--pam-gold) / 0.45)" }}>
                <Icon className="text-secondary" size={26} />
              </div>
              <h3 className="font-heading italic text-xl font-semibold text-primary mb-2">{title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SobreViagem;
