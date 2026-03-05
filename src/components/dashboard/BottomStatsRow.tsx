import { cn } from "../../lib/utils";

interface StatCardProps {
  iconSrc: string;
  title: string;
  label: string;
  className?: string;
}

function StatCardHorizontal({
  iconSrc,
  title,
  label,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[20px] p-6 border border-dash-border shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-5 hover:shadow-md transition-all group",
        className,
      )}
    >
      <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
        <img
          src={iconSrc}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <h4 className="text-[22px] font-bold text-[#1a2d42] leading-tight mb-0.5">
          {title}
        </h4>
        <p className="text-[15px] text-slate-400 font-medium">{label}</p>
      </div>
    </div>
  );
}

export default function BottomStatsRow() {
  const stats = [
    {
      iconSrc: "/icons/bronze-pack.png",
      title: "Bronze",
      label: "Current Package",
    },
    {
      iconSrc: "/icons/silver-pack-icon.png",
      title: "Silver",
      label: "Next Rank",
    },
    {
      iconSrc: "/icons/referred-members-icon.png",
      title: "2",
      label: "Referred Members",
    },
    {
      iconSrc: "/icons/member-since-icon.png",
      title: "22 Days",
      label: "Member Since",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCardHorizontal
          key={index}
          iconSrc={stat.iconSrc}
          title={stat.title}
          label={stat.label}
        />
      ))}
    </div>
  );
}
