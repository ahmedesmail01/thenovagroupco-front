import { useState } from "react";
import { TrendingUp, Crown } from "lucide-react";
import { cn } from "../../lib/utils";
import Card from "./Card";
import { useTeamPerformance } from "../../hooks/dashboard/useTeamPerformance";
import { UserInfoModal } from "../common/UserInfoModal";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function PerformanceTab({ label, isActive, onClick }: TabProps) {
  // r = corner radius for the rounded top, c = radius for the inverted bottom curves
  const r = 20;
  const c = 20;

  return (
    <div className="relative isolate text-center shrink-0 min-w-[90px]">
      <button
        onClick={onClick}
        className={cn(
          "w-full py-1 px-2 text-[10px] sm:text-[10px] md:text-[12px] font-semibold transition-all relative z-10 whitespace-nowrap",
          isActive ? "text-[#1a2d42]" : "text-slate-400 hover:text-slate-500",
        )}
      >
        {label}
      </button>

      {isActive && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ left: -c, right: -c }}
        >
          <svg
            className="w-full h-full"
            viewBox={`0 0 100 100`}
            preserveAspectRatio="none"
            fill="none"
          >
            {/* 
              Single continuous path for the entire tab shape:
              - Start at bottom-left (0, 100) on the baseline
              - Inverted curve going up to (c%, 100) 
              - Straight up the left side to the top-left corner
              - Rounded top-left corner
              - Straight across the top
              - Rounded top-right corner
              - Straight down the right side
              - Inverted curve going down to (100, 100) on the baseline
            */}
            {/* percentage-based values for c and r */}
            <path
              d={`
                M 0 100
                Q ${(c / (100 + 2 * c)) * 100} 100, ${(c / (100 + 2 * c)) * 100} ${100 - (c / 100) * 100}
                L ${(c / (100 + 2 * c)) * 100} ${(r / 50) * 100}
                Q ${(c / (100 + 2 * c)) * 100} 0, ${((c + r) / (100 + 2 * c)) * 100} 0
                L ${100 - ((c + r) / (100 + 2 * c)) * 100} 0
                Q ${100 - (c / (100 + 2 * c)) * 100} 0, ${100 - (c / (100 + 2 * c)) * 100} ${(r / 50) * 100}
                L ${100 - (c / (100 + 2 * c)) * 100} ${100 - (c / 100) * 100}
                Q ${100 - (c / (100 + 2 * c)) * 100} 100, 100 100
              `}
              fill="white"
              stroke="var(--color-dash-border)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            {/* White line to cover the baseline under the tab */}
            <line
              x1={`${(c / (100 + 2 * c)) * 100}`}
              y1="100"
              x2={`${100 - (c / (100 + 2 * c)) * 100}`}
              y2="100"
              stroke="white"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function TeamPerformanceCard({
  className,
}: {
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState("Rank Overview");
  const [days, setDays] = useState<number>(30);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | number | null>(
    null,
  );
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const { data, isLoading } = useTeamPerformance({ days });

  const tabs = [
    "Top Earners",
    "Rank Overview",
    "Package Overview",
    "New Members",
  ];

  const filterOptions = [
    { label: "7 Days", value: 7 },
    { label: "30 Days", value: 30 },
    { label: "90 Days", value: 90 },
    { label: "Overall", value: 3650 },
  ];

  if (isLoading) {
    return (
      <Card
        className={cn("lg:col-span-2 flex flex-col min-h-[500px]", className)}
        title="Team Performance"
      >
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </Card>
    );
  }

  const performanceData = data;

  // const currentFilterLabel =
  //   filterOptions.find((o) => o.value === days)?.label || "Filter";

  return (
    <>
      <Card
        className={cn("lg:col-span-2 flex flex-col min-h-[500px]", className)}
        title="Team Performance"
        extra={
          <div className="relative">
            {/* <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-semibold transition-colors border border-slate-200 text-slate-400 focus:outline-none"
          >
            {currentFilterLabel} <ChevronDown size={14} />
          </button> */}

            {isFilterOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsFilterOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 overflow-hidden py-1 animate-in fade-in zoom-in duration-200">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setDays(option.value);
                        setIsFilterOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-blue-50",
                        days === option.value
                          ? "text-blue-600 bg-blue-50/50"
                          : "text-slate-600",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        }
      >
        <div className="mt-4 px-0">
          <div className="relative">
            {/* Baseline - Full width inside card padding */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-dash-border z-0" />

            <div className="flex w-full items-center relative z-10 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <PerformanceTab
                  key={tab}
                  label={tab}
                  isActive={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-start py-10">
          {!performanceData || Object.keys(performanceData).length === 0 ? (
            <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-slate-50/30 rounded-3xl border border-dashed border-slate-100">
              <div className="flex flex-col items-center gap-4 text-slate-300">
                <TrendingUp size={64} strokeWidth={1} />
                <p className="font-medium text-sm text-slate-400">
                  No performance data available yet
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full">
              {/* 1. TOP EARNERS TAB */}
              {activeTab === "Top Earners" && (
                <div className="w-full space-y-1">
                  <div className="grid grid-cols-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 pb-2 border-b border-dash-border/50 mb-2">
                    <div className="col-span-2">Member</div>
                    <div className="text-center">Rank</div>
                    <div className="text-right">Earning</div>
                  </div>
                  <div className="max-h-[350px] overflow-y-auto no-scrollbar">
                    {performanceData.top_earners?.length > 0 ? (
                      performanceData.top_earners.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedUserId(item.id_code);
                            setIsUserModalOpen(true);
                          }}
                          className="grid grid-cols-4 py-3 px-4 items-center hover:bg-slate-50 transition-all rounded-xl border-b border-slate-50 last:border-0 cursor-pointer"
                        >
                          <div className="col-span-2 flex items-center gap-3">
                            {idx === 0 ? (
                              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-200 shadow-sm animate-in fade-in zoom-in duration-500">
                                <Crown
                                  size={16}
                                  fill="currentColor"
                                  fillOpacity={0.3}
                                />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                                {idx + 1}
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-bold text-[#1a2d42]">
                                {item.name}
                              </div>
                              <div className="text-[11px] text-slate-400">
                                ID: {item.id_code}
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <span className="inline-flex px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 uppercase border border-slate-200">
                              {item.rank}
                            </span>
                          </div>
                          <div className="text-right text-sm font-black text-blue-600">
                            ${Number(item.total_commission).toLocaleString()}
                          </div>
                        </div>
                      ))
                    ) : (
                      <EmptyState message="No entries in top earners" />
                    )}
                  </div>
                </div>
              )}

              {/* 2. RANK OVERVIEW TAB */}
              {activeTab === "Rank Overview" && (
                <div className="w-full space-y-1">
                  <div className="grid grid-cols-3 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 pb-2 border-b border-dash-border/50 mb-2">
                    <div className="text-left">Rank Level</div>
                    <div className="text-center">Left Team</div>
                    <div className="text-center">Right Team</div>
                  </div>
                  <div className="max-h-[350px] overflow-y-auto no-scrollbar">
                    {performanceData.rank_overview?.map((item, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "grid grid-cols-3 py-3 px-4 items-center transition-all rounded-xl",
                          item.rank === "Total"
                            ? "bg-blue-50/50 mt-2 border-y border-blue-100"
                            : "hover:bg-slate-50 border-b border-slate-50 last:border-0",
                        )}
                      >
                        <div
                          className={cn(
                            "text-sm",
                            item.rank === "Total"
                              ? "font-bold text-blue-600"
                              : "font-semibold text-[#1a2d42]",
                          )}
                        >
                          {item.rank}
                        </div>
                        <div className="text-center text-sm font-bold text-slate-600">
                          {item.left}
                        </div>
                        <div className="text-center text-sm font-bold text-slate-600">
                          {item.right}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. PACKAGE OVERVIEW TAB */}
              {activeTab === "Package Overview" && (
                <div className="w-full space-y-1">
                  <div className="grid grid-cols-3 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 pb-2 border-b border-dash-border/50 mb-2">
                    <div className="text-left">Package Type</div>
                    <div className="text-center">Left Team</div>
                    <div className="text-center">Right Team</div>
                  </div>
                  <div className="max-h-[350px] overflow-y-auto no-scrollbar">
                    {performanceData.package_overview?.map((item, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "grid grid-cols-3 py-3 px-4 items-center transition-all rounded-xl",
                          item.package === "Total"
                            ? "bg-blue-50/50 mt-2 border-y border-blue-100"
                            : "hover:bg-slate-50 border-b border-slate-50 last:border-0",
                        )}
                      >
                        <div
                          className={cn(
                            "text-sm capitalize",
                            item.package === "Total"
                              ? "font-bold text-blue-600"
                              : "font-semibold text-[#1a2d42]",
                          )}
                        >
                          {item.package}
                        </div>
                        <div className="text-center text-sm font-bold text-slate-600">
                          {item.left}
                        </div>
                        <div className="text-center text-sm font-bold text-slate-600">
                          {item.right}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. NEW MEMBERS TAB */}
              {activeTab === "New Members" && (
                <div className="w-full space-y-1">
                  <div className="grid grid-cols-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 pb-2 border-b border-dash-border/50 mb-2">
                    <div className="col-span-2">Member</div>
                    <div className="text-center">Package</div>
                    <div className="text-right">Joined</div>
                  </div>
                  <div className="max-h-[350px] overflow-y-auto no-scrollbar">
                    {performanceData.new_members?.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedUserId(item.id_code);
                          setIsUserModalOpen(true);
                        }}
                        className="grid grid-cols-4 py-3 px-4 items-center hover:bg-slate-50 transition-all rounded-xl border-b border-slate-50 last:border-0 cursor-pointer"
                      >
                        <div className="col-span-2">
                          <div className="text-sm font-bold text-[#1a2d42]">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-400 italic">
                            {item.rank}
                          </div>
                        </div>
                        <div className="text-center">
                          <span className="inline-flex px-2 py-0.5 rounded-full bg-blue-50 text-[10px] font-semibold text-blue-600 capitalize">
                            {item.package}
                          </span>
                        </div>
                        <div className="text-right text-[11px] font-medium text-slate-500">
                          {new Date(item.joined_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      <UserInfoModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        userId={selectedUserId}
      />
    </>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-slate-50/30 rounded-3xl border border-dashed border-slate-100">
      <div className="flex flex-col items-center gap-4 text-slate-300">
        <TrendingUp size={64} strokeWidth={1} />
        <p className="font-medium text-sm text-slate-400">{message}</p>
      </div>
    </div>
  );
}
