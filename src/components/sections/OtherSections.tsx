import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export function StorySection() {
  return (
    <section className="py-32 bg-brand-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] -mr-64 -mt-32" />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-brand-blue to-brand-blue-light rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-brand-border">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
              alt="Our Team"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        <div className="space-y-8">
          <Badge variant="primary">OUR STORY</Badge>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Empowering the Next Generation of{" "}
            <span className="text-brand-blue">Evolved</span> Professionals
          </h2>
          <div className="space-y-6 text-text-secondary text-lg leading-relaxed font-light">
            <p>
              Founded with a mission to bridge the gap between academic theory
              and real-world mastery, Nova Group has evolved from a small
              collective of visionaries into a global community.
            </p>
            <p>
              We believe that true growth happens when cutting-edge technology
              meets human mentorship. Our platform is designed to provide not
              just information, but the transformation required to excel in
              today's landscape.
            </p>
          </div>
          <div className="pt-4">
            <Button variant="outline" size="lg">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PackagesSection() {
  const primaryPackages = [
    {
      name: "Essential",
      price: "49",
      features: [
        "Core Curriculum",
        "Community Access",
        "Basic Certification",
        "Email Support",
      ],
    },
    {
      name: "Professional",
      price: "149",
      features: [
        "All Essential Features",
        "1-on-1 Mentorship",
        "Advanced Workshops",
        "Priority Support",
      ],
      featured: true,
    },
    {
      name: "Expert",
      price: "299",
      features: [
        "All Pro Features",
        "Lifetime Access",
        "Official Nova Accreditation",
        "Private Mastermind",
      ],
    },
  ];

  const specialtyPackages = [
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Dedicated Success Manager",
        "Custom Curriculum",
        "Team Progress Tracking",
        "Exclusive Events",
      ],
    },
    {
      name: "Ultimate",
      price: "999",
      features: [
        "Full Portfolio Review",
        "Direct Access to Founders",
        "VIP Status at All Events",
        "Unlimited Course Access",
      ],
    },
  ];

  return (
    <section className="py-32 bg-brand-navy" id="packages">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20 space-y-4">
          <Badge variant="primary">INVEST IN YOURSELF</Badge>
          <h2 className="text-4xl md:text-6xl font-black text-white">
            Choose Your Package
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Whether you're just starting or looking to dominate your field, we
            have a plan tailored for your evolution.
          </p>
        </div>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {primaryPackages.map((p) => (
            <div
              key={p.name}
              className={`relative bg-brand-surface rounded-3xl p-10 border ${
                p.featured
                  ? "border-brand-blue ring-1 ring-brand-blue/30 scale-105 shadow-2xl shadow-brand-blue/10"
                  : "border-brand-border"
              } hover:border-brand-blue/50 transition-all group overflow-hidden`}
            >
              {p.featured && (
                <div className="absolute top-0 right-0 bg-brand-blue text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl tracking-widest">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-white">
                  {p.price === "Custom" ? "" : "$"}
                  {p.price}
                </span>
                {p.price !== "Custom" && (
                  <span className="text-text-muted">/mo</span>
                )}
              </div>
              <ul className="space-y-4 mb-10 text-text-secondary text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="text-brand-blue">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={p.featured ? "primary" : "outline"}
                className="w-full h-12 rounded-xl group-hover:scale-[1.02]"
              >
                {p.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>

        {/* 2 columns center */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto pt-8">
          {specialtyPackages.map((p) => (
            <div
              key={p.name}
              className="bg-brand-surface/50 backdrop-blur-sm rounded-3xl p-10 border border-brand-border hover:border-brand-blue/30 transition-all group"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-black text-white">
                  {p.price === "Custom" ? "" : "$"}
                  {p.price}
                </span>
                {p.price !== "Custom" && (
                  <span className="text-text-muted">/one-time</span>
                )}
              </div>
              <ul className="space-y-3 mb-8 text-text-secondary text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="text-brand-blue-light">★</span> {f}
                  </li>
                ))}
              </ul>
              <Button
                variant="ghost"
                className="w-full border border-white/5 hover:bg-white/5"
              >
                Select Plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EventsSection() {
  const events = [
    {
      title: "Global Mastermind 2024",
      date: "SEP 12-14",
      loc: "Dubai, UAE",
      img: "https://images.unsplash.com/photo-1540575861501-7ad060e39fe1?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Digital Evolution Webcast",
      date: "OCT 05",
      loc: "Online",
      img: "https://images.unsplash.com/photo-1591115765373-520b7a217294?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "The Future of AI Summit",
      date: "NOV 20",
      loc: "New York, USA",
      img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Nova Exclusive Meetup",
      date: "DEC 01",
      loc: "London, UK",
      img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-32 bg-brand-surface/10 relative">
      <div className="absolute inset-0 bg-brand-blue/5 pointer-events-none blur-[150px] rounded-full mx-auto max-w-4xl h-1/2 mt-32" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4 max-w-xl">
            <Badge variant="primary">JOIN THE MOVEMENT</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Upcoming Events
            </h2>
            <p className="text-text-secondary text-lg">
              Experience Nova Group in the real world. Connect, learn, and
              expand your horizons.
            </p>
          </div>
          <Button variant="outline" className="mb-2">
            View Full Calendar
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((e) => (
            <div
              key={e.title}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-brand-border cursor-pointer"
            >
              <img
                src={e.img}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={e.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent p-6 flex flex-col justify-end">
                <div className="bg-white/10 backdrop-blur-md w-fit px-3 py-1 rounded-lg text-[10px] font-bold text-white mb-3">
                  {e.date}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-blue-light transition-colors mb-2">
                  {e.title}
                </h3>
                <div className="flex items-center gap-2 text-text-muted text-xs">
                  <span>📍 {e.loc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
