const stats = [
  { number: "+20", label: "anos de experiência" },
  { number: "+10.000", label: "peregrinos embarcados" },
  { number: "+620", label: "grupos realizados" },
];

const Stats = () => {
  return (
    <section className="py-16 md:py-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 max-w-5xl mx-auto text-center">
          {stats.map((s) => (
            <div key={s.label} className="px-4">
              <p className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold mb-3 text-secondary-foreground tracking-tight">
                {s.number}
              </p>
              <p className="font-body text-sm md:text-base uppercase tracking-[0.15em] text-secondary-foreground/85">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
