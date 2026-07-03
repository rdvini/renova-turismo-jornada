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
    const message = `Olá, Pastor Morelli! 🙏\n\nMeu nome é ${nome} e vim pela sua página de caravanas bíblicas da Renova Turismo. Gostaria de reservar meu lugar na próxima caravana e receber mais informações (datas, valores e o que está incluso).\n\n📧 E-mail: ${email}\n📱 Telefone: ${telefone}\n\nFico no aguardo do seu retorno!`;
    window.open(
      `https://api.whatsapp.com/send/?phone=19991813303&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`,
      "_blank"
    );
    setSubmitted(true);
    toast.success("Você será redirecionado ao WhatsApp para finalizar o contato.");
  };

  return (
    <section id="contato" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
          <div className="text-center md:text-left">
            <p className="font-accent text-lg italic text-secondary mb-2">Reserve seu lugar</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 tracking-tight">
              Inscreva-se Agora
            </h2>
            <p className="font-body text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              Vagas limitadas! Preencha o formulário e nossa equipe entrará em contato para confirmar seu lugar
              na próxima caravana com o Pastor Morelli.
            </p>
            <a
              href={`https://api.whatsapp.com/send/?phone=19991813303&text=${encodeURIComponent("Olá, Pastor Morelli! 🙏\n\nVim pela sua página de caravanas bíblicas da Renova Turismo e gostaria de receber mais informações sobre as próximas viagens (datas, valores e o que está incluso).\n\nFico no aguardo do seu retorno!")}&type=phone_number&app_absent=0`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold uppercase tracking-wide px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
            >
              Falar no WhatsApp
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
                  Você será redirecionado ao WhatsApp para finalizar o contato.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="pm-nome" className="font-body text-foreground">Nome completo</Label>
                  <Input
                    id="pm-nome"
                    placeholder="Seu nome"
                    required
                    maxLength={100}
                    value={formData.nome}
                    onChange={(e) => setFormData((p) => ({ ...p, nome: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pm-email" className="font-body text-foreground">E-mail</Label>
                  <Input
                    id="pm-email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    maxLength={255}
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pm-telefone" className="font-body text-foreground">Telefone / WhatsApp</Label>
                  <Input
                    id="pm-telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    required
                    maxLength={20}
                    value={formData.telefone}
                    onChange={(e) => setFormData((p) => ({ ...p, telefone: e.target.value }))}
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
