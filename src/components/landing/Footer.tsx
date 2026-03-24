import { Instagram, Facebook, Phone, Mail, Youtube } from "lucide-react";
import logoRenova from "@/assets/logo-renova.svg";

const Footer = () => {
  return (
    <footer className="bg-primary px-6 md:px-8 pt-12 pb-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start mb-10">
          {/* Coluna esquerda: Logo + tagline */}
          <div className="flex flex-col items-center md:items-start">
            <img src={logoRenova} alt="Renova Turismo" className="h-16 object-contain mb-4" />
            <p className="font-body text-sm text-primary-foreground/60 text-center md:text-left">
              Transformando vidas através de viagens de fé e cultura.
            </p>
          </div>

          {/* Coluna central: Redes sociais */}
          <div className="flex justify-center items-center gap-5">
            <a
              href="https://instagram.com/renovaturismo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://facebook.com/renovaturismo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://youtube.com/@renovaturismo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <Youtube size={24} />
            </a>
          </div>

          {/* Coluna direita: Contato */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <a
              href="tel:+551932412424"
              className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-body"
            >
              <Phone size={14} />
              <span>+55 19 3241-2424</span>
            </a>
            <a
              href="mailto:contato@renovaturismo.com.br"
              className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-body"
            >
              <Mail size={14} />
              <span>contato@renovaturismo.com.br</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/15 pt-6 text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © 2026 Renova Turismo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
