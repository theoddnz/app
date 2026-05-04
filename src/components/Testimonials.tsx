const quotes = [
  {
    text: "I spent 2 years watching tutorials. In 3 weeks here, I built something that actually flew.",
    name: "Arjun M.",
    role: "Drone builder, Mumbai",
  },
  {
    text: "The 'break labs' are infuriating. That's exactly why they work.",
    name: "Priya R.",
    role: "Robotics student, Bangalore",
  },
  {
    text: "I failed more in the first module than I did in four years of engineering college. Best investment I made.",
    name: "Carlos D.",
    role: "Maker, São Paulo",
  },
];

export default function Testimonials() {
  return (
    <section id="community" className="py-28 px-6 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="font-inter text-xs text-foreground/45 tracking-widest uppercase mb-3">
            From the community
          </p>
          <h2 className="font-space text-[clamp(2rem,5vw,3.5rem)] font-700 leading-tight tracking-tight">
            They thought differently too.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map(({ text, name, role }, i) => (
            <div key={i} className="border border-foreground/10 rounded-2xl p-8 bg-card">
              <p className="font-inter text-base text-foreground leading-relaxed mb-8">
                &ldquo;{text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-foreground/10 flex items-center justify-center">
                  <span className="font-space text-xs font-600">{name[0]}</span>
                </div>
                <div>
                  <p className="font-space text-sm font-600">{name}</p>
                  <p className="font-inter text-xs text-foreground/50">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
