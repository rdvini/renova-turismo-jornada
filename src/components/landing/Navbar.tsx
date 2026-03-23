import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoRenova from "@/assets/logo-renova.svg";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "A Viagem", href: "#sobre" },
  { label: "Roteiro", href: "#roteiro" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Inscreva-se", href: "#contato" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm shadow-lg shadow-primary/20">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <a href="#inicio">
          <img src={logoRenova} alt="Renova Turismo" className="h-10 md:h-12" />
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-heading text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
