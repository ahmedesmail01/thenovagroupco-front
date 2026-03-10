import { createLazyFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { usePackages, type Package } from "../../features/wallet/usePackages";

export const Route = createLazyFileRoute("/_auth/membership")({
  component: MembershipRouteComponent,
});

function TabHeader({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-6 mb-16">
      <button
        onClick={() => onTabChange("normal")}
        className={`pb-2 text-[13px] font-semibold transition-all uppercase tracking-wide ${
          activeTab === "normal"
            ? "text-[#335c82] border-b-2 border-[#335c82]"
            : "text-slate-400 border-b-2 border-transparent hover:text-slate-600"
        }`}
      >
        Normal
      </button>
      <button
        onClick={() => onTabChange("nova pro")}
        className={`pb-2 text-[13px] font-semibold transition-all uppercase tracking-wide ${
          activeTab === "nova pro"
            ? "text-[#335c82] border-b-2 border-[#335c82]"
            : "text-slate-400 border-b-2 border-transparent hover:text-slate-600"
        }`}
      >
        Nova Pro
      </button>
    </div>
  );
}

function MembershipCard({ pkg }: { pkg: Package }) {
  return (
    <div className="relative overflow-hidden rounded-[20px] bg-linear-to-br from-[#2f4b7c] to-[#1e3a5f] text-white p-8 aspect-[4/2.5] flex flex-col items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition-transform hover:-translate-y-1 group">
      {/* Background Wavy Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[120%] bg-white/10 rounded-full blur-[2px]" />
        <svg
          className="absolute bottom-0 left-0 w-full h-full object-cover"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path
            d="M0,60 C30,70 60,40 100,50 L100,100 L0,100 Z"
            fill="rgba(255,255,255,0.05)"
          />
          <path
            d="M0,80 C40,90 70,50 100,60 L100,100 L0,100 Z"
            fill="rgba(255,255,255,0.08)"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2">
        <h3 className="text-xl font-bold tracking-wide capitalize">
          {pkg.name}
        </h3>
        <p className="text-[15px] font-bold text-white/90">
          ${Number(pkg.price).toFixed(2)}
          <span className="text-[12px] font-normal opacity-70 ml-1">
            / {pkg.billing_period}
          </span>
        </p>
        <div className="pt-2">
          <p className="text-[11px] font-semibold text-white/80 group-hover:text-white transition-colors">
            Tap to view details
          </p>
        </div>
      </div>
    </div>
  );
}

function MembershipRouteComponent() {
  const [activeTab, setActiveTab] = useState("nova pro");
  const { data: packages, isLoading } = usePackages();

  const filteredMemberships = useMemo(() => {
    if (!packages) return [];

    return packages.filter((pkg) => {
      const isNovaPro = pkg.name.toLowerCase().includes("pro+");
      return activeTab === "nova pro" ? isNovaPro : !isNovaPro;
    });
  }, [packages, activeTab]);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center">
        <div className="text-slate-400 font-medium animate-pulse">
          Loading memberships...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)] bg-[#f8fafc] w-full max-w-[1500px] mx-auto flex flex-col pt-12">
      <TabHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto w-full px-4 mb-20">
        {filteredMemberships.map((pkg) => (
          <MembershipCard key={pkg.id} pkg={pkg} />
        ))}

        {filteredMemberships.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-400 font-medium">
            No packages found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
