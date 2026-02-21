// Image placeholders - user will provide paths
const STORY_IMAGE = "/images/bg-pattern.png";
const STORY_WAVE = "/images/hero-bg.png";
const ICON_CIRCLE_1 = "path_to_icon_1";
const ICON_CIRCLE_2 = "path_to_icon_2";
const ICON_CIRCLE_3 = "path_to_icon_3";

import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export function StorySection() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden font-inter">
      {/* Background Wave */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-full h-full opacity-40 pointer-events-none z-0 overflow-visible">
        <img
          src={STORY_WAVE}
          alt=""
          className="w-full h-full object-contain scale-150 translate-x-1/4"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-[80px] grid grid-cols-1 lg:grid-cols-[1.1fr_557px] gap-16 lg:gap-24 items-center relative z-10">
        {/* Left: Content */}
        <div className="space-y-8 max-w-2xl">
          <div className="space-y-4">
            <span className="text-brand-blue font-bold tracking-widest text-sm uppercase">
              OUR STORY
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#1a365d] font-playfair leading-[1.1]">
              How we started, what drives us, and why we exist
            </h2>
          </div>

          <div className="space-y-6 text-[#4a5568] text-lg leading-relaxed">
            <p>
              At NOVA Group, we measure success by the lives we impact and the
              opportunities we create. Born from a vision of evolution and
              purpose, NOVA empowers individuals to grow together — gaining
              knowledge, financial independence, and personal fulfillment
              through smart investing, education, and innovation.
            </p>
          </div>
        </div>

        {/* Right: Graphic */}
        <div className="relative w-full max-w-[557px] aspect-[557/515] mx-auto lg:mx-0">
          {/* Main Circle Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border-2 border-blue-100/50 rounded-full z-0" />

          {/* Core Image Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full overflow-hidden border-8 border-white shadow-[0_20px_50px_rgba(43,108,176,0.15)] z-10">
            <img
              src={STORY_IMAGE}
              className="w-full h-full object-cover"
              alt="Our Story"
            />
          </div>

          {/* Floating Lesson Badge */}
          <div className="absolute top-[25%] -left-4 z-30 bg-white rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col items-center gap-1 border border-gray-50 min-w-24">
            <div className="text-blue-500">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <span className="text-brand-blue font-bold text-lg">1850+</span>
            <span className="text-xs text-gray-400 font-medium">Lessons</span>
          </div>

          {/* Circular Icons/Thumbnails position absolutely along the ring */}
          {/* Top Center Icon */}
          <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center z-20 text-blue-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
          </div>

          {/* Right Mid Thumbnail */}
          <div className="absolute top-[20%] right-[3%] w-16 h-16 rounded-full border-4 border-white shadow-xl overflow-hidden z-20">
            <img
              src={ICON_CIRCLE_1}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>

          {/* Bottom Right Symbol */}
          <div className="absolute bottom-[10%] right-[8%] w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg z-20 border-2 border-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
          </div>

          {/* Left Bottom Thumbnail */}
          <div className="absolute bottom-[20%] left-[8%] w-14 h-14 rounded-full border-4 border-white shadow-xl overflow-hidden z-20">
            <img
              src={ICON_CIRCLE_2}
              className="w-full h-full object-cover"
              alt=""
            />
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
