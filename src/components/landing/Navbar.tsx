import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoRenova from "@/assets/logo-renova.svg";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre A Viagem", href: "#sobre" },
  { label: "Destinos", href: "#roteiro" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm shadow-lg shadow-primary/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-8">
        <a href="#inicio">
          <img src={logoRenova} alt="Renova Turismo" className="h-10 md:h-12" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-body text-xs font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            className="ml-2 inline-block rounded-full bg-secondary px-6 py-2.5 font-heading text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors"
          >
            Quero Participar
          </a>
        </div>
        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 font-heading text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="block mx-6 mt-3 text-center rounded-full bg-secondary px-6 py-2.5 font-heading text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors"
          >
            Quero Participar
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
