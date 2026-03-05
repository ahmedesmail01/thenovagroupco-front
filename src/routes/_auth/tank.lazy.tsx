import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/tank")({
  component: TankRouteComponent,
});

function TankMemberCard() {
  return (
    <div className="bg-[#1a365d] rounded-2xl overflow-hidden shadow-xl w-[320px] relative mt-10">
      {/* Complex Background overlay */}
      <div className="absolute inset-0 bg-linear-to-tl from-transparent via-[#1e3a8a]/40 to-[#0f172a]/60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-[150%] bg-white/5 rounded-[100%] -translate-y-[40%] translate-x-[20%] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-full bg-black/10 rounded-[100%] translate-y-[50%] -translate-x-[20%] pointer-events-none" />

      <div className="p-8 pb-6 relative z-10 flex flex-col h-full">
        <div className="text-left mb-10 space-y-4">
          <p className="text-white text-lg tracking-wide">Maria10</p>
          <p className="text-white text-lg tracking-wide">ID : ******</p>
          <p className="text-white text-lg tracking-wide">
            Mobile : 0120930293
          </p>
        </div>

        <div className="flex gap-4 w-full mt-auto">
          <button className="flex-1 bg-[#ef4444] hover:bg-red-600 text-white font-medium px-4 py-3 rounded-md transition-colors text-base shadow-sm">
            TO LEFT
          </button>
          <button className="flex-1 bg-[#10b981] hover:bg-emerald-600 text-white font-medium px-4 py-3 rounded-md transition-colors text-base shadow-sm">
            TO RIGHT
          </button>
        </div>
      </div>
    </div>
  );
}

function TankRouteComponent() {
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col">
      {/* Top Header */}
      <div className="bg-[#788a99] rounded-t-lg px-8 py-5 flex justify-between items-center text-white">
        <h2 className="text-lg font-semibold tracking-wide">Tank Members</h2>
        <p className="text-base font-semibold tracking-wide">
          YOUR ID : 400000
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#f8fafc] border border-slate-100 rounded-b-lg flex flex-col relative shadow-sm">
        <div className="flex-1 m-8 bg-[#f8fafc] rounded-2xl flex flex-col items-center justify-center relative">
          {/* Main Card Container */}
          <div className="flex-1 flex items-center justify-center">
            <TankMemberCard />
          </div>

          {/* Large Pagination aligned with Card */}
          <div className="flex items-center justify-between w-[320px] mt-auto pb-12">
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm border border-slate-100 font-bold">
              &lt;
            </button>
            <button className="w-10 h-10 rounded-full bg-[#335c82] flex items-center justify-center text-white shadow-md font-semibold text-base">
              1
            </button>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm border border-slate-100 font-semibold text-base">
              2
            </button>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm border border-slate-100 font-semibold text-base">
              3
            </button>
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-500 shadow-sm border border-slate-100 font-bold tracking-widest leading-none pb-2">
              ...
            </div>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm border border-slate-100 font-semibold text-base">
              10
            </button>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm border border-slate-100 font-bold">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
