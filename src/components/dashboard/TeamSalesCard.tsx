import {
  ChevronDown,
  Network,
  ArrowLeft,
  ArrowRight,
  Users,
  Globe,
} from "lucide-react";
import { cn } from "../../lib/utils";
import type { DashboardData } from "../../hooks/dashboard/useDashboardData";

interface TeamSalesCardProps {
  className?: string;
  data: DashboardData | undefined;
}

function StatItem({
  //   icon: Icon,
  value,
  label,
  iconColor,
  iconBg,
  iconSrc,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  iconColor: string;
  iconBg?: string;
  iconSrc: string;
}) {
  return (
    <div className="bg-white rounded-[5px] p-4 border border-slate-100 flex flex-col items-start text-center shadow-sm hover:shadow-md transition-shadow">
      <div
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center mb-1",
          iconBg,
          iconColor,
        )}
      >
        {/* <Icon size={24} strokeWidth={2.5} /> */}
        <img src={iconSrc} alt="icon" />
      </div>
      <p className="text-sm font-black text-[#1a2d42] mb-0.5">{value}</p>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
        {label}
      </p>
    </div>
  );
}

export function TeamSalesCard({ className, data }: TeamSalesCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col h-full",
        className,
      )}
    >
      {/* Top Half: Gradient + Background Image */}
      <div className="relative pt-6 pb-6 px-8 bg-[#1a2d42] min-h-[380px] flex flex-col">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0  mix-blend-soft-light pointer-events-none bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/polygons.png")' }}
        />

        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-center relative z-10 ">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Team Sales
          </h3>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all border border-white/10 backdrop-blur-md">
            <ChevronDown size={14} />
            Overall
          </button>
        </div>

        {/* Donut Chart */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="68"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="20"
                fill="transparent"
              />
              {/* Progress Circle (Salmon/Coral) */}
              <circle
                cx="88"
                cy="88"
                r="68"
                stroke="#ff5e5e"
                strokeWidth="20"
                fill="transparent"
                strokeDasharray="427"
                strokeDashoffset="100"
                strokeLinecap="round"
                className="drop-shadow-[0_0_15px_rgba(255,94,94,0.4)]"
              />
            </svg>
            {/* Center Cap */}
            {/* <div className="absolute w-4 h-4 rounded-full bg-[#ff5e5e] shadow-[0_0_10px_#ff5e5e]" /> */}
          </div>

          {/* Legend */}
          <div className="flex gap-8 mt-8">
            <div className="flex items-center gap-2 text-sm font-bold text-white/90">
              <div className="w-3.5 h-3.5 rounded border-2 border-orange-400 bg-transparent" />
              Left Sales
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-white/90">
              <div className="w-3.5 h-3.5 rounded border-2 border-[#ff5e5e] bg-transparent" />
              Right Sales
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Half: Stats Grid */}
      <div className=" p-6 -mt-14 relative z-20  flex-1">
        <div className="grid grid-cols-2 gap-4">
          <StatItem
            icon={Network}
            value={
              data?.downline_counts?.left_downlines_count?.toString() ?? "0"
            }
            label="Left Downline Members"
            iconColor="text-[#6366f1]"
            iconSrc="/icons/left-sales-icon.png"
            // iconBg="bg-[#6366f1]/10"
          />
          <StatItem
            icon={Network}
            value={
              data?.downline_counts?.right_downlines_count?.toString() ?? "0"
            }
            label="Right Downline Members"
            iconColor="text-[#10b981]"
            iconSrc="/icons/right-sales-icon.png"
            // iconBg="bg-[#10b981]/10"
          />
          <StatItem
            icon={ArrowLeft}
            value={`${data?.nowCvCounts?.left_cv_count ?? "0.00"} CV`}
            label="Left Sales"
            iconColor="text-[#f59e0b]"
            iconSrc="/icons/left-carry-icon.png"
            // iconBg="bg-[#f59e0b]/10"
          />
          <StatItem
            icon={ArrowRight}
            value={`${data?.nowCvCounts?.right_cv_count ?? "0.00"} CV`}
            label="Right Sales"
            iconColor="text-[#ef4444]"
            iconSrc="/icons/right-carry-icon.png"
            // iconBg="bg-[#ef4444]/10"
          />
          <StatItem
            icon={Globe}
            value={`${data?.total_cv_counts ?? "0.00"} CV`}
            label="Total Network volume"
            iconColor="text-[#a855f7]"
            iconSrc="/icons/total-network-volume-icon.png"
            // iconBg="bg-[#a855f7]/10"
          />
          <StatItem
            icon={Users}
            value={(
              (data?.downline_counts?.left_downlines_count || 0) +
              (data?.downline_counts?.right_downlines_count || 0)
            ).toString()}
            label="Total down line"
            iconColor="text-[#3b82f6]"
            iconSrc="/icons/total-downline-icon.png"
            // iconBg="bg-[#3b82f6]/10"
          />
        </div>
      </div>
    </div>
  );
}
