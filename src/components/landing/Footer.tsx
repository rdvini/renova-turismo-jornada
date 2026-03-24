import { Instagram, Facebook, Phone, Mail, Youtube } from "lucide-react";
import logoRenova from "@/assets/logo-renova.svg";

const Footer = () => {
  return (
    <footer className="bg-primary px-4 py-16 md:px-8 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Coluna esquerda: Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src={logoRenova} alt="Renova Turismo" className="h-14" />
            <p className="font-body text-primary-foreground/70 text-sm text-center md:text-left">
              Transformando vidas através de viagens de fé e cultura.
            </p>
          </div>

          {/* Coluna central: Redes sociais */}
          <div className="flex items-center justify-center gap-5 md:pt-2">
            <a
              href="https://instagram.com/renovaturismo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-primary-foreground/70 hover:text-secondary transition-colors"
            >
              <Instagram size={26} />
            </a>
            <a
              href="https://facebook.com/renovaturismo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-primary-foreground/70 hover:text-secondary transition-colors"
            >
              <Facebook size={26} />
            </a>
            <a
              href="https://youtube.com/@renovaturismo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-primary-foreground/70 hover:text-secondary transition-colors"
            >
              <Youtube size={26} />
            </a>
          </div>

          {/* Coluna direita: Telefone e e-mail */}
          <div className="flex flex-col items-center md:items-end gap-3 md:pt-2">
            <a
              href="tel:+551932412424"
              className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-body"
            >
              <Phone size={16} />
              <span>+55 19 3241-2424</span>
            </a>
            <a
              href="mailto:contato@renovaturismo.com.br"
              className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-body"
            >
              <Mail size={16} />
              <span>contato@renovaturismo.com.br</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/15 text-center">
          <p className="font-body text-primary-foreground/50 text-xs">
            © 2026 Renova Turismo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
