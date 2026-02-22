// Image placeholders - user will provide paths
const BackGroundPattern = "/images/bg-pattern.svg";
const LadyWithCircles = "/images/story-img.png";

import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export function StorySection() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden font-inter lg:px-[120px]">
      {/* Background Wave */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center  overflow-hidden">
        <img
          src={BackGroundPattern}
          alt=""
          className="min-w-full min-h-full object-cover opacity-50 scale-110"
        />
      </div>
      <div className="max-w-[1400px] mx-auto px-4 lg:px-[80px] grid grid-cols-1 lg:grid-cols-[1.1fr_557px] gap-16 lg:gap-24 items-center relative z-10">
        {/* Left: Content */}
        <div className="space-y-6 max-w-2xl">
          <div className="space-y-4">
            <span className="text-[#3182ce] font-montserrat font-bold tracking-[0.2em] text-[18px] md:text-sm uppercase">
              OUR STORY
            </span>
            <h2 className="text-4xl md:text-[36px] lg:text-[40px] font-semibold text-[#1a365d] font-playfair leading-[1.15]">
              <span className="md:text-nowrap">
                How we started, what drives us,
              </span>{" "}
              and why we exist
            </h2>
          </div>

          <div className="space-y-6 text-[#4a5568] text-[17px] md:text-[25px] font-poppins  font-light">
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
        <div className="relative w-full max-w-[400px] aspect-square mx-auto lg:mx-0">
          {/* Main Image (girl with laptop) */}
          <img
            src={LadyWithCircles}
            alt="Our Story"
            className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[100%]  object-contain z-20 object-bottom"
          />
        </div>
      </div>
    </section>
  );
}

export function PackagesSection() {
  const packages = [
    {
      name: "Essential",
      price: "99",
      period: "/ Monthly",
      slant: "up",
      features: [
        { text: "Trade alert", checked: true },
        { text: "Beginner course", checked: true },
        { text: "Basics course", checked: true },
        { text: "Live trading", checked: true },
        { text: "Live sessions", checked: false },
        { text: "Advance course", checked: false },
        { text: "Expert course", checked: false },
        { text: "Expert plus course", checked: false },
        { text: "All scanner", checked: false },
        { text: "private sessions with selected coach", checked: false },
      ],
    },
    {
      name: "Basic",
      price: "399",
      period: "/ Annually",
      slant: "down",
      features: [
        { text: "Trade alert", checked: true },
        { text: "Beginner course", checked: true },
        { text: "Basics course", checked: true },
        { text: "Live sessions", checked: true },
        { text: "Live trading", checked: false },
        { text: "Advance course", checked: false },
        { text: "Expert course", checked: false },
        { text: "Expert plus course", checked: false },
        { text: "All scanner", checked: false },
        { text: "private sessions with selected coach", checked: false },
      ],
    },
    {
      name: "Premium",
      price: "749",
      period: "/ Annually",
      slant: "down",
      features: [
        { text: "Trade alert", checked: true },
        { text: "Beginner course", checked: true },
        { text: "Basics course", checked: true },
        { text: "Live trading", checked: true },
        { text: "Live sessions", checked: true },
        { text: "Advance course", checked: true },
        { text: "One scanner", checked: true },
        { text: "Expert course", checked: false },
        { text: "Expert plus course", checked: false },
        { text: "private sessions with selected coach", checked: false },
      ],
    },
    {
      name: "Pro",
      price: "1499",
      period: "/ Annually",
      slant: "up",
      features: [
        { text: "Trade alert", checked: true },
        { text: "Beginner course", checked: true },
        { text: "Basics course", checked: true },
        { text: "Live trading", checked: true },
        { text: "Live sessions", checked: true },
        { text: "Advance course", checked: true },
        { text: "Expert course", checked: true },
        { text: "Expert plus course", checked: false },
        { text: "All scanner", checked: true },
        { text: "private sessions with selected coach", checked: true },
      ],
    },
    {
      name: "Ultimate",
      price: "749",
      period: "/ Annually",
      slant: "down",
      features: [
        { text: "Trade alert", checked: true },
        { text: "Beginner course", checked: true },
        { text: "Basics course", checked: true },
        { text: "Live trading", checked: true },
        { text: "Live sessions", checked: true },
        { text: "Advance course", checked: true },
        { text: "One scanner", checked: true },
        { text: "Expert course", checked: true },
        { text: "Expert plus course", checked: true },
        { text: "private sessions with selected coach", checked: true },
      ],
    },
  ];

  return (
    <section className="py-24 bg-white" id="packages">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl md:text-[40px] font-bold text-[#1a202c] font-playfair uppercase tracking-wide">
            PACKAGES
          </h2>
          <p className="text-[#a0aec0] text-sm md:text-md font-montserrat">
            Invest in your skills. Choose your package.
          </p>
        </div>

        {/* Top Region - 3 Columns */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-14 mb-12">
          {packages.slice(0, 3).map((p) => (
            <PackageCard key={p.name} pkg={p} />
          ))}
        </div>

        {/* Bottom Region - 2 Columns */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-14">
          {packages.slice(3, 5).map((p) => (
            <PackageCard key={p.name} pkg={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PackageData {
  name: string;
  price: string;
  period: string;
  slant: string;
  features: { text: string; checked: boolean }[];
}

function PackageCard({ pkg }: { pkg: PackageData }) {
  return (
    <div className="flex flex-col w-full max-w-[340px] bg-white rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.12)] font-montserrat p-[8px] pb-[20px] border border-gray-100">
      {/* Header Slant */}
      <div
        className="h-[140px] bg-gradient-to-r from-[#172635] to-[#254261] rounded-[16px] relative flex justify-center pt-8"
        style={{
          clipPath:
            pkg.slant === "up"
              ? "polygon(0 0, 100% 0, 100% 80%, 0% 100%)"
              : "polygon(0 0, 100% 0, 100% 100%, 0% 80%)",
        }}
      >
        <h3 className="text-white text-[28px] font-semibold tracking-wide z-10 text-center">
          {pkg.name}
        </h3>
      </div>

      {/* Pricing */}
      <div className="text-center mt-8 mb-8 px-6">
        <div className="flex items-baseline justify-center gap-2 text-[#1a202c]">
          <span className="text-[56px] font-semibold font-montserrat tracking-tight leading-none">
            {pkg.price}
          </span>
          <span className="text-[17px] font-medium text-[#1a202c]">
            {pkg.period}
          </span>
        </div>
      </div>

      {/* Features List */}
      <div className="flex-1 px-8 flex flex-col">
        <ul className="space-y-[20px] mb-10 flex-1">
          {pkg.features.map((f: any, i: number) => (
            <li key={i} className="flex items-start gap-4 text-[14px]">
              <span
                className={`shrink-0 leading-none mt-[2px] ${
                  f.checked
                    ? "text-black font-semibold text-[15px]"
                    : "text-[#ef4444] font-semibold text-[15px]"
                }`}
              >
                {f.checked ? "✓" : "×"}
              </span>
              <span
                className={`font-medium ${
                  f.checked ? "text-[#1a202c]" : "text-[#1a202c]"
                }`}
              >
                {f.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <div className="mt-auto px-2">
          <Button className="w-full text-white bg-gradient-to-r from-[#316997] to-[#172d45] hover:opacity-90 transition-opacity rounded-[8px] h-[52px] text-[16px] font-semibold tracking-wide shadow-md border-0">
            Get Started
          </Button>
        </div>
      </div>
    </div>
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
