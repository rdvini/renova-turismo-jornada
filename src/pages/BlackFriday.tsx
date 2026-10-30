import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, MessageCircle, Plane } from "lucide-react";
import Seo from "@/components/seo/Seo";
import MetaPixel from "@/components/tracking/MetaPixel";
import Footer from "@/components/landing/Footer";
import logo from "@/assets/logo-renova.png";
import heroImg from "@/assets/grecia/hero-santorini.jpg";
import { roteiros, bfWhatsApp, BF_PHONE_LABEL, type BfRoteiro } from "@/components/campaigns/black-friday/roteiros";

const toneBg: Record<BfRoteiro["tone"], string> = {
  blue: "bg-[hsl(var(--bf-blue))]",
  rose: "bg-[hsl(var(--bf-rose))]",
  sand: "bg-[hsl(var(--bf-sand))]",
  sage: "bg-[hsl(var(--bf-sage))]",
};

/** Retorna o scrollY para criar paralaxe (desativado com reduced-motion). */
const useScrollY = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return y;
};

const CtaButton = ({ label = "Chamar no WhatsApp", roteiro, className = "" }: { label?: string; roteiro?: string; className?: string }) => (
  <a
    href={bfWhatsApp(roteiro)}
    target="_blank"
    rel="noopener noreferrer"
    className={`bf-mono inline-flex items-center gap-2 rounded-full border-2 border-[hsl(var(--bf-ink))] bg-[hsl(var(--bf-ink))] px-6 py-3 text-sm font-medium uppercase tracking-wider text-[hsl(var(--bf-paper))] shadow-[4px_4px_0_hsl(var(--bf-accent))] transition-transform hover:-translate-y-0.5 hover:shadow-[6px_6px_0_hsl(var(--bf-accent))] ${className}`}
  >
    <MessageCircle className="h-4 w-4" /> {label}
  </a>
);

const Ticket = ({ r, i }: { r: BfRoteiro; i: number }) => (
  <article className="bf-ticket relative flex h-full flex-col overflow-hidden rounded-xl bg-[hsl(var(--bf-paper))] shadow-[0_18px_40px_-20px_hsl(var(--bf-ink)/.5)]">
    <div className="relative h-56 overflow-hidden">
      <img src={r.img} alt={r.nome} loading="lazy" width={768} height={1024} className="bf-xerox h-full w-full object-cover" />
      <div className={`absolute inset-0 ${toneBg[r.tone]} mix-blend-multiply opacity-60`} />
      <span className="bf-mono absolute left-4 top-4 rounded-sm bg-[hsl(var(--bf-paper))] px-2 py-1 text-[10px] uppercase tracking-[.2em]">
        Black Friday · Nº {String(i + 1).padStart(3, "0")}
      </span>
      <span className="bf-display absolute bottom-2 right-4 text-6xl text-[hsl(var(--bf-paper))] opacity-90">{r.code}</span>
    </div>
    <div className="flex flex-1 flex-col gap-3 p-5">
      <div className="bf-mono flex items-center justify-between text-[10px] uppercase tracking-[.2em] text-[hsl(var(--bf-ink-soft))]">
        <span>GRU</span>
        <span className="mx-2 flex-1 border-t border-dashed border-[hsl(var(--bf-ink-soft))]" />
        <Plane className="h-3.5 w-3.5" />
        <span className="mx-2 flex-1 border-t border-dashed border-[hsl(var(--bf-ink-soft))]" />
        <span>{r.code}</span>
      </div>
      <h3 className="bf-display text-3xl">{r.nome}</h3>
      <div className="bf-mono grid grid-cols-2 gap-2 text-[11px] uppercase">
        <div>
          <p className="text-[hsl(var(--bf-ink-soft))]">Países</p>
          <p className="font-medium normal-case">{r.paises.join(" · ")}</p>
        </div>
        <div>
          <p className="text-[hsl(var(--bf-ink-soft))]">Duração</p>
          <p className="font-medium normal-case">{r.duracao ?? "Sob consulta"}</p>
        </div>
      </div>
    </div>
    {/* canhoto picotado */}
    <div className="mx-5 border-t-2 border-dashed border-[hsl(var(--bf-ink)/.35)]" />
    <div className="flex items-center justify-between gap-3 p-5">
      <p className="bf-serif text-sm italic leading-tight text-[hsl(var(--bf-ink-soft))]">Consulte condições<br />Black Friday</p>
      <a
        href={bfWhatsApp(r.nome)}
        target="_blank"
        rel="noopener noreferrer"
        className="bf-mono whitespace-nowrap rounded-full bg-[hsl(var(--bf-accent))] px-4 py-2 text-xs font-medium uppercase tracking-wider text-[hsl(var(--bf-paper))] transition-transform hover:-translate-y-0.5"
      >
        Quero esse roteiro
      </a>
    </div>
  </article>
);

const Carousel = () => {
  const [ref, api] = useEmblaCarousel({ align: "start", loop: true, dragFree: true });
  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);
  return (
    <div>
      <div className="overflow-hidden px-4 py-6 md:px-10" ref={ref}>
        <div className="flex gap-6">
          {roteiros.map((r, i) => (
            <div key={r.nome} className="min-w-0 shrink-0 basis-[85%] sm:basis-[46%] lg:basis-[31%] xl:basis-[24%]" style={{ transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)` }}>
              <Ticket r={r} i={i} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-3">
        {[{ f: prev, I: ArrowLeft, l: "Anterior" }, { f: next, I: ArrowRight, l: "Próximo" }].map(({ f, I, l }) => (
          <button key={l} onClick={f} aria-label={l} className="rounded-full border-2 border-[hsl(var(--bf-ink))] p-3 transition-colors hover:bg-[hsl(var(--bf-ink))] hover:text-[hsl(var(--bf-paper))]">
            <I className="h-5 w-5" />
          </button>
        ))}
      </div>
    </div>
  );
};

const BlackFriday = () => {
  const y = useScrollY();
  const diffRef = useRef<HTMLElement>(null);
  const diffTop = diffRef.current?.offsetTop ?? 2000;
  const d = y - diffTop;

  useEffect(() => window.scrollTo(0, 0), []);

  const marquee = roteiros.map((r) => r.nome);

  return (
    <div className="theme-bf bf-grain min-h-screen overflow-x-hidden">
      <MetaPixel contentName="Black Friday" contentCategory="Campanha" />
      <Seo
        title="Black Friday de Viagens | Renova Turismo"
        description="Black Friday Renova Turismo: condições especiais em roteiros para Europa, Oriente Médio, África, Ásia e Aurora Boreal. Fale no WhatsApp."
        path="/black-friday"
      />

      {/* Topo */}
      <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 md:px-10">
        <img src={logo} alt="Renova Turismo" className="h-10 w-auto brightness-0 opacity-75" />
        <CtaButton label={BF_PHONE_LABEL} className="hidden sm:inline-flex" />
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
        <div className="bf-halftone absolute inset-0 opacity-60" style={{ transform: `translateY(${y * 0.15}px)` }} />
        <div
          className="absolute right-[-18%] top-[8%] h-[38vh] w-[62vw] max-w-[720px] overflow-hidden rounded-2xl opacity-80 md:right-[4%] md:top-[12%] md:h-[70vh] md:w-[40vw] md:opacity-100"
          style={{ transform: `translateY(${y * 0.3}px) rotate(3deg)` }}
        >
          <img src={heroImg} alt="Santorini" width={1200} height={1600} className="bf-xerox h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[hsl(var(--bf-blue))] opacity-50 mix-blend-multiply" />
        </div>
        <div className="absolute left-[6%] top-[18%] h-40 w-40 rounded-full bg-[hsl(var(--bf-rose))] opacity-80 md:h-64 md:w-64" style={{ transform: `translateY(${y * -0.2}px)` }} />

        <div className="relative z-10 w-full px-5 pt-[22vh] md:px-10 md:pt-0">
          <span className="bf-mono inline-block -rotate-2 border-2 border-[hsl(var(--bf-ink))] bg-[hsl(var(--bf-sand))] px-3 py-1 text-[10px] uppercase tracking-[.25em] md:text-xs">
            Edição limitada · Renova Turismo
          </span>
          <h1 className="bf-display mt-6 text-[22vw] md:text-[15vw]" style={{ transform: `translateX(${y * -0.25}px)` }}>
            Black
          </h1>
          <h1
            className="bf-display -mt-[4vw] text-[22vw] text-transparent md:pl-[12vw] md:text-[15vw]"
            style={{ WebkitTextStroke: "2px hsl(var(--bf-ink))", transform: `translateX(${y * 0.25}px)` }}
          >
            Friday
          </h1>
          <div className="mt-6 max-w-md">
            <p className="bf-serif text-xl md:text-2xl">
              <strong>17 roteiros</strong> pelo mundo com condições que só aparecem uma vez por ano.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <CtaButton label="Quero as ofertas" />
              <a href="#roteiros" className="bf-mono text-sm uppercase tracking-wider underline underline-offset-4">Ver roteiros ↓</a>
            </div>
          </div>
        </div>
      </section>

      {/* Faixa */}
      <div className="relative z-20 -my-6 -rotate-2 overflow-hidden border-y-2 border-[hsl(var(--bf-ink))] bg-[hsl(var(--bf-accent))] py-3 text-[hsl(var(--bf-paper))]">
        <div className="bf-marquee flex w-max gap-8 whitespace-nowrap">
          {[...marquee, ...marquee].map((n, i) => (
            <span key={i} className="bf-display text-2xl md:text-3xl">{n} <span className="mx-4">✦</span></span>
          ))}
        </div>
      </div>

      {/* Roteiros */}
      <section id="roteiros" className="relative bg-[hsl(var(--bf-paper-2))] pb-24 pt-28">
        <div className="px-5 md:px-10">
          <p className="bf-mono text-xs uppercase tracking-[.3em] text-[hsl(var(--bf-ink-soft))]">Embarque · Guarulhos (GRU)</p>
          <h2 className="mt-2 text-5xl md:text-7xl">
            <span className="bf-display">Escolha sua</span>{" "}
            <span className="bf-serif font-normal italic">passagem</span>
          </h2>
          <p className="bf-serif mt-4 max-w-xl text-lg text-[hsl(var(--bf-ink-soft))]">
            Arraste para ver todos os destinos. Toque em “Quero esse roteiro” e receba as condições no WhatsApp.
          </p>
        </div>
        <div className="mt-8">
          <Carousel />
        </div>
      </section>

      {/* Por que a Renova */}
      <section ref={diffRef} className="relative overflow-hidden px-5 py-28 md:px-10">
        <h2 className="bf-display relative z-10 text-[16vw] leading-none opacity-10 md:text-[11vw]" style={{ transform: `translateX(${d * 0.15}px)` }}>
          Viaje com a Renova
        </h2>
        <div className="relative z-20 -mt-[8vw] grid gap-6 md:grid-cols-4">
          {[
            { t: "Grupos acompanhados", p: "Guia brasileiro do embarque ao retorno.", c: "bg-[hsl(var(--bf-blue))]", s: 0.08 },
            { t: "Saída de Guarulhos", p: "Aéreo, hotéis e passeios organizados.", c: "bg-[hsl(var(--bf-rose))]", s: -0.06 },
            { t: "Pagamento facilitado", p: "Condições especiais nesta Black Friday.", c: "bg-[hsl(var(--bf-sand))]", s: 0.1 },
            { t: "Atendimento humano", p: "Fale direto com nossa equipe.", c: "bg-[hsl(var(--bf-sage))]", s: -0.04 },
          ].map((b, i) => (
            <div
              key={b.t}
              className={`${b.c} rounded-xl border-2 border-[hsl(var(--bf-ink))] p-6 shadow-[6px_6px_0_hsl(var(--bf-ink))]`}
              style={{ transform: `translateY(${d * b.s}px) rotate(${i % 2 ? 1.5 : -1.5}deg)` }}
            >
              <p className="bf-mono text-xs">0{i + 1}</p>
              <h3 className="bf-display mt-3 text-3xl">{b.t}</h3>
              <p className="bf-serif mt-2">{b.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="bf-halftone relative overflow-hidden rounded-3xl border-2 border-[hsl(var(--bf-ink))] bg-[hsl(var(--bf-sand))] px-6 py-16 text-center md:py-24">
          <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-[hsl(var(--bf-rose))] opacity-70" />
          <div className="absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-[hsl(var(--bf-blue))] opacity-70" />
          <div className="relative">
            <p className="bf-mono text-xs uppercase tracking-[.3em]">Vagas limitadas</p>
            <h2 className="mt-4 text-5xl md:text-8xl">
              <span className="bf-display">Sua próxima viagem</span>
              <br />
              <span className="bf-serif italic">começa aqui</span>
            </h2>
            <p className="bf-display mt-6 text-4xl md:text-6xl">{BF_PHONE_LABEL}</p>
            <div className="mt-8 flex justify-center">
              <CtaButton label="Falar com a Renova" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlackFriday;
