import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const InscrevaSe = () => {
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { nome, email, telefone } = formData;

    const subject = encodeURIComponent("Solicitação de informações – Viagem à Turquia");
    const body = encodeURIComponent(
      `Olá, equipe Renova Turismo!\n\nMeu nome é ${nome}, gostaria de receber mais informações sobre a viagem à Turquia.\n\nDados para contato:\n- Nome: ${nome}\n- E-mail: ${email}\n- Telefone: ${telefone}\n\nAguardo retorno. Obrigado(a)!`
    );

    window.location.href = `mailto:contato@renovaturismo.com.br?subject=${subject}&body=${body}`;

    setSubmitted(true);
    toast.success("Seu app de e-mail será aberto para enviar a mensagem.");
  };

  return (
    <section id="contato" className="py-12 md:py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
          <div className="text-center md:text-left">
            <p className="font-accent text-lg italic text-secondary mb-2">
              Garanta sua vaga
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
              Inscreva-se Agora
            </h2>
            <p className="font-body text-muted-foreground text-lg mb-8">
              Vagas limitadas! Entre em contato conosco e reserve seu lugar nesta viagem
              inesquecível pela Turquia.
            </p>
            <a
              href="mailto:contato@renovaturismo.com.br?subject=Solicita%C3%A7%C3%A3o%20de%20informa%C3%A7%C3%B5es%20%E2%80%93%20Viagem%20%C3%A0%20Turquia"
              className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-lg px-12 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
            >
              Garanta sua vaga
            </a>
          </div>

          <div className="bg-card rounded-2xl shadow-lg p-8">
            <h3 className="font-heading text-xl font-bold text-primary mb-6 text-center">
              Preencha seus dados
            </h3>
            {submitted ? (
              <div className="text-center py-8">
                <p className="font-heading text-lg font-semibold text-primary mb-2">
                  Obrigado pelo interesse!
                </p>
                <p className="text-muted-foreground">
                  Seu app de e-mail será aberto para enviar a mensagem.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="pl-nome" className="font-body text-foreground">Nome completo</Label>
                  <Input
                    id="pl-nome"
                    placeholder="Seu nome"
                    required
                    maxLength={100}
                    value={formData.nome}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pl-email" className="font-body text-foreground">E-mail</Label>
                  <Input
                    id="pl-email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    maxLength={255}
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pl-telefone" className="font-body text-foreground">Telefone / WhatsApp</Label>
                  <Input
                    id="pl-telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    required
                    maxLength={20}
                    value={formData.telefone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, telefone: e.target.value }))}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-lg px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
                >
                  Enviar
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InscrevaSe;
