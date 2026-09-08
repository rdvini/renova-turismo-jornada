import { useState } from "react";
import { z } from "zod";
import { CalendarCheck, CheckCircle2, Loader2, PartyPopper, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const EVENTO = "semana-do-cliente";

const schema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, { message: "Informe seu nome completo." })
    .max(100, { message: "Nome muito longo." }),
  telefone: z
    .string()
    .trim()
    .min(10, { message: "Informe um WhatsApp válido com DDD." })
    .max(20, { message: "Telefone muito longo." })
    .refine((v) => v.replace(/\D/g, "").length >= 10 && v.replace(/\D/g, "").length <= 13, {
      message: "Informe um WhatsApp válido com DDD.",
    }),
});

const maskPhone = (value: string) => {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

type Resposta = "sim" | "nao";

interface RsvpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RsvpDialog = ({ open, onOpenChange }: RsvpDialogProps) => {
  const [resposta, setResposta] = useState<Resposta | null>(null);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [errors, setErrors] = useState<{ nome?: string; telefone?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<Resposta | null>(null);

  const reset = () => {
    setResposta(null);
    setNome("");
    setTelefone("");
    setErrors({});
    setSubmitting(false);
    setDone(null);
  };

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) setTimeout(reset, 250);
  };

  const handleSubmit = async () => {
    if (!resposta || submitting) return;
    const parsed = schema.safeParse({ nome, telefone });
    if (!parsed.success) {
      const f = parsed.error.flatten().fieldErrors;
      setErrors({ nome: f.nome?.[0], telefone: f.telefone?.[0] });
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const { error } = await supabase.from("event_rsvps").insert({
        nome: parsed.data.nome,
        telefone: parsed.data.telefone,
        resposta,
        evento: EVENTO,
      });
      if (error) throw error;

      try {
        const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
        fbq?.("track", "Lead", {
          content_name: "Semana do Cliente - Check-in",
          content_category: resposta === "sim" ? "Presenca confirmada" : "Nao vai",
        });
      } catch {
        /* pixel opcional */
      }

      setDone(resposta);
    } catch (e) {
      console.error("rsvp error", e);
      toast({
        title: "Não conseguimos registrar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        {done ? (
          <div className="text-center py-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center mb-5">
              {done === "sim" ? (
                <PartyPopper className="text-secondary" size={30} />
              ) : (
                <CheckCircle2 className="text-secondary" size={30} />
              )}
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
              {done === "sim" ? "Presença confirmada!" : "Obrigado por avisar!"}
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-6">
              {done === "sim"
                ? "Já anotamos o seu nome na lista. Nos vemos nos dias 15 e 16 de setembro, das 10h às 17h, na Renova Turismo!"
                : "Registramos a sua resposta. Na próxima vamos preparar algo especial para você também."}
            </p>
            <Button className="w-full" onClick={() => handleOpenChange(false)}>
              Fechar
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="mx-auto w-14 h-14 rounded-2xl bg-secondary/15 flex items-center justify-center mb-2">
                <CalendarCheck className="text-secondary" size={26} />
              </div>
              <DialogTitle className="font-heading text-center text-2xl">
                Você vai participar da Semana do Cliente?
              </DialogTitle>
              <DialogDescription className="text-center font-body">
                15 e 16 de setembro, das 10h às 17h, na Renova Turismo.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                type="button"
                onClick={() => setResposta("sim")}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-4 transition-all ${
                  resposta === "sim"
                    ? "border-secondary bg-secondary/10 shadow-md"
                    : "border-border hover:border-secondary/50"
                }`}
              >
                <CheckCircle2
                  size={22}
                  className={resposta === "sim" ? "text-secondary" : "text-muted-foreground"}
                />
                <span className="font-heading text-sm font-bold text-foreground text-center leading-tight">
                  Sim, vou estar lá
                </span>
              </button>
              <button
                type="button"
                onClick={() => setResposta("nao")}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-4 transition-all ${
                  resposta === "nao"
                    ? "border-secondary bg-secondary/10 shadow-md"
                    : "border-border hover:border-secondary/50"
                }`}
              >
                <X
                  size={22}
                  className={resposta === "nao" ? "text-secondary" : "text-muted-foreground"}
                />
                <span className="font-heading text-sm font-bold text-foreground text-center leading-tight">
                  Não vou conseguir ir
                </span>
              </button>
            </div>

            {resposta && (
              <div className="space-y-4 mt-2 animate-fade-in-up">
                <div className="space-y-1.5">
                  <Label htmlFor="rsvp-nome" className="font-body">
                    Nome
                  </Label>
                  <Input
                    id="rsvp-nome"
                    value={nome}
                    maxLength={100}
                    placeholder="Seu nome completo"
                    onChange={(e) => setNome(e.target.value)}
                  />
                  {errors.nome && <p className="text-xs text-destructive">{errors.nome}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rsvp-telefone" className="font-body">
                    WhatsApp
                  </Label>
                  <Input
                    id="rsvp-telefone"
                    value={telefone}
                    inputMode="tel"
                    placeholder="(19) 99999-9999"
                    onChange={(e) => setTelefone(maskPhone(e.target.value))}
                  />
                  {errors.telefone && (
                    <p className="text-xs text-destructive">{errors.telefone}</p>
                  )}
                </div>
                <Button className="w-full" disabled={submitting} onClick={handleSubmit}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                    </>
                  ) : (
                    "Enviar resposta"
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RsvpDialog;
