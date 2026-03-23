import { Instagram, Facebook, Phone, Mail, Youtube } from "lucide-react";
import logoRenova from "@/assets/logo-renova.svg";

const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src={logoRenova} alt="Renova Turismo" className="h-10" />
            <p className="font-body text-primary-foreground/60 text-sm text-center md:text-left">
              Transformando vidas através de viagens de fé e cultura.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/renovaturismo" aria-label="Instagram" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                <Instagram size={22} />
              </a>
              <a href="https://facebook.com/renovaturismo" aria-label="Facebook" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                <Facebook size={22} />
              </a>
              <a href="https://youtube.com/@renovaturismo" aria-label="YouTube" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                <Youtube size={22} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-2 text-primary-foreground/60 text-sm">
              <Phone size={14} />
              <span className="font-body">+55 19 3241-2424</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/60 text-sm">
              <Mail size={14} />
              <span className="font-body">contato@renovaturismo.com.br</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center">
          <p className="font-body text-primary-foreground/40 text-xs">
            © 2026 Renova Turismo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
