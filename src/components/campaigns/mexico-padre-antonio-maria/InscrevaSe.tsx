import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const WHATSAPP_PHONE = "5519994718930";
const WHATSAPP_URL = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=Ol%C3%A1%21+Tenho+interesse+na+Peregrina%C3%A7%C3%A3o+ao+M%C3%A9xico+com+Padre+Ant%C3%B4nio+Maria.+Aguardo+retorno&type=phone_number&app_absent=0`;

const InscrevaSe = () => {
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { nome, email, telefone } = formData;
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: { nome, email, telefone, campaign: "mexico-padre-antonio-maria" },
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success("Dados enviados com sucesso!");
    } catch {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-16 md:py-28 bg-background baroque-overlay">
      <div className="container mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <div>
            <p className="font-accent italic tracking-[0.3em] uppercase text-sm md:text-base text-secondary mb-3">
              Vagas limitadas
            </p>
            <h2 className="font-heading italic text-4xl md:text-5xl lg:text-6xl font-semibold text-primary leading-[1.0] mb-2">
              Conheça o nosso
            </h2>
            <h2 className="font-heading italic text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.0] gold-shimmer mb-6">
              Roteiro
            </h2>
            <div className="w-16 h-px bg-secondary mb-8" />
            <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              Entre em contato com nossa equipe e dê o primeiro passo rumo à sua peregrinação
              pelo México ao lado do{" "}
              <span className="text-primary font-semibold">Padre Antônio Maria</span>.
              Atendimento personalizado, sem compromisso.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block gold-btn font-heading font-bold text-base md:text-lg px-10 py-4 rounded-full"
            >
              Falar no WhatsApp
            </a>
          </div>

          <div className="glam-card rounded-2xl p-8 md:p-10 shadow-xl">
            <h3 className="font-heading italic text-xl md:text-2xl font-semibold text-primary mb-6 text-center">
              Receba a proposta
            </h3>
            {submitted ? (
              <div className="text-center py-8">
                <p className="font-heading italic font-semibold text-primary mb-2">
                  Obrigado pelo interesse!
                </p>
                <p className="font-body text-muted-foreground text-sm">
                  Seus dados foram enviados com sucesso. Em breve entraremos em contato.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="pam-nome" className="font-body text-foreground text-xs uppercase tracking-widest">
                    Nome completo
                  </Label>
                  <Input
                    id="pam-nome"
                    placeholder="Seu nome"
                    required
                    maxLength={100}
                    value={formData.nome}
                    onChange={(e) => setFormData((p) => ({ ...p, nome: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pam-email" className="font-body text-foreground text-xs uppercase tracking-widest">
                    E-mail
                  </Label>
                  <Input
                    id="pam-email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    maxLength={255}
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pam-telefone" className="font-body text-foreground text-xs uppercase tracking-widest">
                    Telefone / WhatsApp
                  </Label>
                  <Input
                    id="pam-telefone"
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
                  disabled={loading}
                  className="w-full gold-btn font-heading font-bold text-sm md:text-base px-8 py-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.18em]"
                >
                  {loading ? "Enviando..." : "QUERO A PROPOSTA!"}
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
