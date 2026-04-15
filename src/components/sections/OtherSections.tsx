// Image placeholders - user will provide paths
const BackGroundPattern = "/images/bg-pattern.svg";
const LadyWithCircles = "/images/story-img.png";
const pkgTriangle = "/images/pkg-triangle.png";

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
        className="h-[140px] rounded-[16px] relative flex justify-center pt-8 bg-size-[100%_100%] bg-no-repeat bg-center"
        style={{
          // clipPath:
          //   pkg.slant === "up"
          //     ? "polygon(0 0, 100% 0, 100% 80%, 0% 100%)"
          //     : "polygon(0 0, 100% 0, 100% 100%, 0% 80%)",
          backgroundImage: `url(${pkgTriangle})`,
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

const GridImage = ({
  src,
  className = "",
  mobileHeightClass = "h-48 md:h-64",
}: {
  src: string;
  className?: string;
  mobileHeightClass?: string;
}) => (
  <div
    className={`rounded-[20px] overflow-hidden relative group bg-gray-100 ${className}`}
  >
    <img
      src={src}
      alt="Event Gallery"
      className={`w-full ${mobileHeightClass} lg:h-full lg:absolute lg:inset-0 object-cover transition-transform duration-700 group-hover:scale-105`}
    />
    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
  </div>
);

export function EventsSection() {
  const dummyImages = [
    "https://placehold.co/600x600/1a2f3f/ffffff?text=Image+1", // Track 1 - 1
    "https://placehold.co/600x600/1a2f3f/ffffff?text=Image+2", // Track 1 - 2
    "https://placehold.co/600x600/1a2f3f/ffffff?text=Image+3", // Track 1 - 3
    "https://placehold.co/800x1200/1a2f3f/ffffff?text=Image+4", // Track 2 - Top Tall
    "https://placehold.co/600x600/1a2f3f/ffffff?text=Image+5", // Track 2 - Bot Left
    "https://placehold.co/600x600/1a2f3f/ffffff?text=Image+6", // Track 2 - Bot Right
    "https://placehold.co/600x600/1a2f3f/ffffff?text=Image+7", // Track 3 - Top Left
    "https://placehold.co/600x600/1a2f3f/ffffff?text=Image+8", // Track 3 - Top Right
    "https://placehold.co/800x1200/1a2f3f/ffffff?text=Image+9", // Track 3 - Bot Tall
    "https://placehold.co/600x600/1a2f3f/ffffff?text=Image+10", // Track 4 - 1
    "https://placehold.co/600x600/1a2f3f/ffffff?text=Image+11", // Track 4 - 2
    "https://placehold.co/600x600/1a2f3f/ffffff?text=Image+12", // Track 4 - 3
  ];

  return (
    <section className="py-24 bg-white" id="events">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-[80px]">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl md:text-[40px] font-bold text-[#1a202c] font-playfair uppercase tracking-wide">
            EVENTS
          </h2>
          <p className="text-[#a0aec0] text-sm md:text-md font-montserrat">
            What drives our vision and shapes everything we do
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 lg:h-[800px]">
          {/* Track 1 */}
          <div className="col-span-1 flex flex-col gap-3">
            <GridImage src={dummyImages[0]} className="lg:flex-[1]" />
            <GridImage src={dummyImages[1]} className="lg:flex-[1]" />
            <GridImage src={dummyImages[2]} className="lg:flex-[1]" />
          </div>

          {/* Track 2 */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-3">
            <GridImage
              src={dummyImages[3]}
              className="lg:flex-[6]"
              mobileHeightClass="h-[350px] md:h-[400px]"
            />
            <div className="lg:flex-[4] grid grid-cols-2 gap-3 h-[200px] md:h-[250px] lg:h-auto">
              <GridImage src={dummyImages[4]} className="h-full" mobileHeightClass="h-full" />
              <GridImage src={dummyImages[5]} className="h-full" mobileHeightClass="h-full" />
            </div>
          </div>

          {/* Track 3 */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-3">
            <div className="lg:flex-[4] grid grid-cols-2 gap-3 h-[200px] md:h-[250px] lg:h-auto">
              <GridImage src={dummyImages[6]} className="h-full" mobileHeightClass="h-full" />
              <GridImage src={dummyImages[7]} className="h-full" mobileHeightClass="h-full" />
            </div>
            <GridImage
              src={dummyImages[8]}
              className="lg:flex-[6]"
              mobileHeightClass="h-[350px] md:h-[400px]"
            />
          </div>

          {/* Track 4 */}
          <div className="col-span-1 flex flex-col gap-3">
            <GridImage src={dummyImages[9]} className="lg:flex-[1]" />
            <GridImage src={dummyImages[10]} className="lg:flex-[1]" />
            <GridImage src={dummyImages[11]} className="lg:flex-[1]" />
          </div>
        </div>
      </div>
    </section>
  );
}
