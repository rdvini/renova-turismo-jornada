import { Phone, Mail } from "lucide-react";
import logoRenova from "@/assets/logo-renova.svg";

const InstagramFilled = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 448 512" fill="currentColor">
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.9 224.1 370.9 339 319.6 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8s-26.8-12-26.8-26.8 12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1S3.8 128 2.1 163.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
  </svg>
);

const FacebookFilled = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" fill="currentColor">
    <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256c0 120 82.7 220.8 194.2 248.5V334.2h-56.6v-78.2h56.6v-61.3c0-56.4 33.5-87.3 84.6-87.3 24.5 0 50.2 4.4 50.2 4.4v55.4h-28.3c-27.8 0-36.5 17.3-36.5 35v42h62.3l-10 78.2h-52.3v170.3C429.3 476.8 512 376 512 256z" />
  </svg>
);

const YoutubeFilled = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 576 512" fill="currentColor">
    <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6C15 167.8 15 256.4 15 256.4s0 88.6 11.3 132.3c6.3 23.7 24.8 42.3 48.3 48.6C117.2 448.8 288 448.8 288 448.8s170.8 0 213.4-11.5c23.5-6.3 42-24.9 48.3-48.6 11.3-43.7 11.3-132.3 11.3-132.3s0-88.6-11.3-132.3zM232.2 337.1V175.7l142.7 80.7-142.7 80.7z" />
  </svg>
);


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
