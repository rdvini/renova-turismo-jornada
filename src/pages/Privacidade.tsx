import { Link } from "react-router-dom";
import Seo from "@/components/seo/Seo";
import logoRenova from "@/assets/logo-renova.svg";

const Privacidade = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Privacidade e Segurança | Renova Turismo"
        description="Como a Renova Turismo trata dados pessoais, cookies e segurança no site."
        path="/privacidade"
      />
      <header className="bg-primary px-6 md:px-8 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" aria-label="Voltar para a página inicial">
            <img src={logoRenova} alt="Renova Turismo" className="h-10 object-contain" />
          </Link>
          <Link
            to="/"
            className="font-body text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            Voltar
          </Link>
        </div>
      </header>

      <main className="px-6 md:px-8 py-12 md:py-16">
        <article className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-3">
            Privacidade e Segurança
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-10">
            Esta página é mantida pela Renova Turismo para responder dúvidas comuns sobre
            privacidade, segurança e tratamento de dados em nosso site. O conteúdo é editável
            pela própria Renova Turismo e não representa uma certificação independente.
          </p>

          <section className="mb-10">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-primary mb-3">
              Quais dados coletamos
            </h2>
            <p className="font-body text-base text-foreground/80 leading-relaxed">
              Coletamos apenas as informações que você nos envia voluntariamente pelos
              formulários do site, como nome, e-mail, telefone/WhatsApp e a mensagem ou
              campanha de interesse. Esses dados são usados exclusivamente para responder ao
              seu contato e apresentar propostas de viagem.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-primary mb-3">
              Como usamos seus dados
            </h2>
            <ul className="font-body text-base text-foreground/80 leading-relaxed list-disc pl-5 space-y-2">
              <li>Entrar em contato sobre a viagem ou campanha solicitada.</li>
              <li>Enviar propostas, roteiros e informações comerciais relacionadas.</li>
              <li>Melhorar a experiência de navegação e o atendimento ao cliente.</li>
            </ul>
            <p className="font-body text-base text-foreground/80 leading-relaxed mt-3">
              Não vendemos seus dados pessoais a terceiros.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-primary mb-3">
              Cookies e analytics
            </h2>
            <p className="font-body text-base text-foreground/80 leading-relaxed">
              Utilizamos ferramentas de analytics (como Google Analytics e Meta Pixel) para
              entender de forma agregada como nosso site é utilizado e melhorar nossas
              campanhas. Você pode bloquear cookies nas configurações do seu navegador.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-primary mb-3">
              Segurança e armazenamento
            </h2>
            <p className="font-body text-base text-foreground/80 leading-relaxed">
              Os dados enviados pelos formulários são armazenados em nosso banco de dados
              gerenciado, com controles de acesso restrito (políticas de Row Level Security)
              e tráfego protegido por HTTPS. O acesso administrativo é limitado à equipe
              autorizada da Renova Turismo.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-primary mb-3">
              Retenção e seus direitos
            </h2>
            <p className="font-body text-base text-foreground/80 leading-relaxed">
              Mantemos seus dados pelo tempo necessário para o atendimento e cumprimento de
              obrigações legais. Você pode solicitar acesso, correção ou exclusão dos seus
              dados a qualquer momento entrando em contato pelos canais abaixo.
            </p>
          </section>

          <section className="mb-2">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-primary mb-3">
              Fale com a gente
            </h2>
            <ul className="font-body text-base text-foreground/80 leading-relaxed space-y-1">
              <li>
                E-mail:{" "}
                <a className="text-primary underline" href="mailto:contato@renovaturismo.com.br">
                  contato@renovaturismo.com.br
                </a>
              </li>
              <li>
                Telefone:{" "}
                <a className="text-primary underline" href="tel:+551932412424">
                  +55 19 3241-2424
                </a>
              </li>
            </ul>
          </section>
        </article>
      </main>
    </div>
  );
};

export default Privacidade;
