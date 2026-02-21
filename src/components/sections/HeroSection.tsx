import { Link } from "@tanstack/react-router";
import { Button } from "../ui/Button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-brand-navy overflow-hidden">
      {/* Background image – place hero-bg.jpg in /public/images/ */}
      <img
        src="/images/hero-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none select-none"
        aria-hidden="true"
      />
      {/* Radial glow */}
      <div className="absolute inset-0 bg-hero-gradient opacity-80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8">
        {/* Stats badge */}
        <div className="inline-flex items-center gap-3 bg-brand-surface/40 backdrop-blur-md border border-brand-border rounded-full px-5 py-2 mb-4">
          <span className="flex h-2 w-2 rounded-full bg-brand-blue-light animate-ping" />
          <p className="text-text-secondary text-sm font-medium">
            Join <span className="text-white font-bold">1850+</span> students in
            their evolution
          </p>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight">
          The Nova Group{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-blue-light">
            CO.
          </span>
        </h1>

        <p className="mt-6 text-xl md:text-2xl text-text-secondary font-light max-w-2xl mx-auto leading-relaxed">
          Your journey to mastery begins here. Experience the next evolution in
          professional growth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/register">
            <Button
              size="lg"
              className="px-10 h-14 text-lg shadow-xl shadow-brand-blue/20 w-full sm:w-auto"
            >
              Get Started Free
            </Button>
          </Link>
          <Link to="/courses">
            <Button
              variant="outline"
              size="lg"
              className="px-10 h-14 text-lg w-full sm:w-auto backdrop-blur-sm"
            >
              Browse Courses
            </Button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-brand-border/30">
          {[
            { value: "1850+", label: "Total Lessons" },
            { value: "320+", label: "Expert Courses" },
            { value: "98%", label: "Success Rate" },
            { value: "50+", label: "Countries" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-text-muted text-xs uppercase tracking-wider font-bold mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-navy to-transparent" />
    </section>
  );
}
