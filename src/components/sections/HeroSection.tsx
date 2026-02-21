import heroBg from "../../../public/images/hero-bg.png";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center  overflow-hidden">
      {/* Background image – place hero-bg.jpg in /public/images/ */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
          Unlock Your Potential with Nova Group
        </h1>
        <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto">
          Join thousands of students who have transformed their careers with our
          expert-led courses and personalized guidance.
        </p>
      </div>
    </section>
  );
}
