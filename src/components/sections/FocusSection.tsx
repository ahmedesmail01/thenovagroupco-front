const FOCUS_ITEMS = [
  {
    label: "Our Vision",
    icon: "👁️",
    text: "NOVA Group empowers growth and transformation worldwide by providing cutting-edge educational resources and community support.",
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    label: "Our Mission",
    icon: "🚀",
    text: "To bridge the gap between ambition and achievement through innovative learning experiences and mentorship.",
    color: "bg-purple-500/10 text-purple-400",
  },
  {
    label: "Our Objectives",
    icon: "📈",
    text: "Continuously evolve our platform to meet the demands of a rapidly changing global professional landscape.",
    color: "bg-green-500/10 text-green-400",
  },
  {
    label: "Our Goals",
    icon: "🎯",
    text: "Achieve 100% student satisfaction and build the largest community of empowered professionals.",
    color: "bg-orange-500/10 text-orange-400",
  },
];

export function FocusSection() {
  return (
    <section className="py-24 px-4 bg-brand-navy relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: label + video placeholder */}
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-brand-blue font-bold uppercase tracking-[0.2em] text-sm">
              OUR
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-white">
              FOCUS
            </h2>
          </div>

          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-blue-light rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative w-full aspect-video bg-brand-surface border border-brand-border rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                alt="Focus Video"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              />
              <button className="relative w-20 h-20 rounded-full bg-white text-brand-navy flex items-center justify-center text-2xl shadow-2xl transform transition-transform group-hover:scale-110">
                <span className="ml-1">▶</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: cards */}
        <div className="grid gap-6">
          {FOCUS_ITEMS.map((item) => (
            <div
              key={item.label}
              className="bg-brand-surface/50 backdrop-blur-sm border border-brand-border rounded-2xl p-6 flex gap-6 hover:border-brand-blue/30 transition-all duration-300 group"
            >
              <div
                className={`w-14 h-14 flex-shrink-0 rounded-xl flex items-center justify-center text-2xl ${item.color} group-hover:scale-110 transition-transform`}
              >
                {item.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white group-hover:text-brand-blue-light transition-colors">
                  {item.label}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
