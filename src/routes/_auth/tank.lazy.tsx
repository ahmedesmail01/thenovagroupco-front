import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/tank")({
  component: TankRouteComponent,
});

function TankMemberCard() {
  return (
    <div className="bg-linear-to-br from-[#1b3b5c] to-[#0a1e35] rounded-xl overflow-hidden shadow-2xl border border-white/10 w-[350px]">
      <div className="p-8 pb-6 relative overflow-hidden">
        {/* Background decorative curve */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-xl mix-blend-overlay pointer-events-none" />

        <div className="relative z-10 text-left mb-8 space-y-3">
          <p className="text-white/90 text-sm font-medium">Maria10</p>
          <p className="text-white text-sm font-medium">ID : ******</p>
          <p className="text-white/80 text-sm font-medium">
            Mobile : 0120930293
          </p>
        </div>

        <div className="flex gap-4 relative z-10 w-full justify-between mt-auto">
          <button className="flex-1 bg-[#ef4444] hover:bg-red-600 text-white text-xs font-semibold px-4 py-2.5 rounded-sm transition-colors uppercase tracking-wide">
            To Left
          </button>
          <button className="flex-1 bg-[#10b981] hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-sm transition-colors uppercase tracking-wide">
            To Right
          </button>
        </div>
      </div>
    </div>
  );
}

function TankRouteComponent() {
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col ">
      {/* Top Header */}
      <div className="bg-[#788a99] rounded-t-lg  px-8 py-5 flex justify-between items-center text-white  ">
        <h2 className="text-lg font-semibold tracking-wide">Tank Members</h2>
        <p className="text-base font-semibold tracking-wide">
          YOUR ID : 400000
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10 bg-[#f8fafc]  border border-slate-100 rounded-b-lg shrink-0 flex flex-col items-center justify-center relative shadow-sm">
        <div className="p-10 bg-gray-100 rounded-2xl w-full h-full flex flex-col items-center justify-center">
          {/* The Card */}
          <div className="mb-16">
            <TankMemberCard />
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-2 mt-8 z-10 shadow-sm bg-white rounded-full p-1 border border-slate-100">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors text-sm">
              &lt;
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[#295175] text-white text-xs font-medium shadow-sm">
              1
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors text-xs font-medium">
              2
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors text-xs font-medium">
              3
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-slate-400 text-xs">
              ...
            </span>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors text-xs font-medium">
              10
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors text-sm">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
