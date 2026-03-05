import { createLazyFileRoute } from "@tanstack/react-router";
import {
  ChevronDown,
  Trophy,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Users,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { TeamSalesCard } from "../../components/dashboard/TeamSalesCard";
import { RankGoalsCard } from "../../components/dashboard/RankGoalsCard";
import { UserProfileCard } from "../../components/dashboard/UserProfileCard";
import SummaryCard from "../../components/dashboard/SummaryCard";
import Card from "../../components/dashboard/Card";
import SummaryRow from "../../components/dashboard/SummaryRow";

export const Route = createLazyFileRoute("/_auth/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState("Rank Overview");

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* SECTION 1: Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Team Sales Component */}
        <TeamSalesCard className="lg:col-span-1" />

        {/* Next Rank Goals Component */}
        <RankGoalsCard className="lg:col-span-1" />

        {/* User Profile Card Component */}
        <UserProfileCard className="lg:col-span-1" />
      </div>

      {/* SECTION 2: Summary Row */}
      <SummaryRow />

      {/* SECTION 3: Map & News */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Member Joinings */}
        <Card
          className="lg:col-span-2"
          title="Member Joinings"
          extra={
            <button className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Show All
            </button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 bg-slate-50/50 rounded-2xl p-4 flex items-center justify-center overflow-hidden grayscale opacity-80">
              <MapPin
                size={48}
                className="text-blue-200 absolute top-10 right-20"
              />
              <MapPin
                size={32}
                className="text-rose-400 absolute bottom-20 left-10"
              />
              <MapPin
                size={40}
                className="text-emerald-400 absolute top-20 left-40"
              />
              <MapPin
                size={24}
                className="text-yellow-400 absolute bottom-10 right-40"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1">
                <button className="bg-white border border-dash-border p-1 rounded-md shadow-sm cursor-pointer hover:bg-slate-50">
                  <Plus size={14} />
                </button>
                <button className="bg-white border border-dash-border p-1 rounded-md shadow-sm cursor-pointer hover:bg-slate-50">
                  <Minus size={14} />
                </button>
              </div>
              <div className="text-[100px] font-black text-slate-200 select-none">
                WORLD
              </div>
            </div>

            <div className="space-y-5">
              {[
                { country: "Canada", color: "bg-orange-400", p: "0.00%" },
                { country: "Egypt", color: "bg-rose-500", p: "0.00%" },
                { country: "Germany", color: "bg-blue-500", p: "0.00%" },
                { country: "Lebanon", color: "bg-emerald-500", p: "0.00%" },
                { country: "Yemen", color: "bg-purple-500", p: "0.00%" },
              ].map((item) => (
                <div key={item.country} className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs font-bold text-[#1a2d42]">
                      {item.country}
                    </span>
                    <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100">
                      {item.p}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full w-[0%]", item.color)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* News & Activities */}
        <Card
          title="News & Activities"
          extra={
            <button className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Show All
            </button>
          }
        >
          <div className="h-[280px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-100 rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-300 mb-4 animate-bounce">
              <Calendar size={32} />
            </div>
            <p className="text-sm font-bold text-slate-400">
              No recent activities
            </p>
            <p className="text-xs text-slate-300 mt-1 uppercase tracking-widest font-medium">
              Coming soon
            </p>
          </div>
        </Card>
      </div>

      {/* SECTION 4: Bottom Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard icon={Trophy} title="Bronze" label="Current Package" />
        <SummaryCard icon={TrendingUp} title="Silver" label="Next Rank" />
        <SummaryCard icon={Users} title="2" label="Referred Members" />
        <SummaryCard icon={Calendar} title="22 Days" label="Member Since" />
      </div>

      {/* SECTION 5: Performance & Events */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Team Performance */}
        <Card
          className="lg:col-span-2"
          title="Team Performance"
          extra={
            <button className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-slate-200">
              Overall <ChevronDown size={14} />
            </button>
          }
        >
          <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-100 pb-4">
            {[
              "Top Earners",
              "Rank Overview",
              "Package Overview",
              "New Members",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                  activeTab === tab
                    ? "bg-white text-blue-600 border-blue-100 shadow-sm"
                    : "bg-transparent text-slate-400 border-transparent hover:text-slate-600",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="h-[300px] flex items-center justify-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <TrendingUp size={48} className="text-blue-100" />
          </div>
        </Card>

        {/* Corporate Events */}
        <Card
          className="lg:col-span-3"
          title="Corporate Events"
          extra={
            <button className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider hover:bg-blue-100">
              Show All
            </button>
          }
        >
          <div className="w-full">
            <div className="flex justify-center items-center gap-8 mb-8">
              <button className="text-slate-400 hover:text-blue-600 transition-colors">
                <ChevronLeft size={20} />
              </button>
              <div className="text-lg font-black text-[#1a2d42]">
                Feb - 2026
              </div>
              <button className="text-slate-400 hover:text-blue-600 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <div
                  key={day}
                  className="bg-slate-50/50 py-3 text-center text-[10px] font-black text-slate-400 tracking-widest"
                >
                  {day}
                </div>
              ))}
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "bg-white aspect-square flex items-center justify-center text-sm font-bold transition-all hover:bg-blue-50 cursor-pointer border-[0.5px] border-slate-50",
                    i + 1 === 5
                      ? "text-blue-600 bg-blue-50/50 ring-1 ring-inset ring-blue-100"
                      : "text-slate-600",
                  )}
                >
                  {i + 1}
                </div>
              ))}
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="bg-slate-50/20 aspect-square flex items-center justify-center text-xs font-bold text-slate-200"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
