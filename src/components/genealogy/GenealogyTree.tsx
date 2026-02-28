interface NodeProps {
  id: string;
  color: "red" | "navy" | "green";
}

function Node({ id, color }: NodeProps) {
  const colorClasses = {
    red: "from-red-500 to-red-600 border-red-200 shadow-red-100",
    navy: "from-slate-700 to-slate-800 border-slate-200 shadow-slate-100",
    green:
      "from-emerald-500 to-emerald-600 border-emerald-200 shadow-emerald-100",
  };

  return (
    <div
      className={`p-4 rounded-[2rem] border bg-gradient-to-br ${colorClasses[color]} shadow-2xl w-full max-w-[240px] aspect-[4/5] flex flex-col items-center justify-center relative group transition-transform hover:scale-105`}
    >
      <div className="w-24 h-24 rounded-full border-4 border-white/20 overflow-hidden mb-6 bg-white/10 shadow-inner">
        <img
          src="/images/user-placeholder.png"
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center">
        <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">
          ID
        </p>
        <p className="text-white text-xl font-bold tracking-tight">{id}</p>
      </div>
    </div>
  );
}

export function GenealogyTree() {
  return (
    <div className="bg-slate-50/50 rounded-[2.5rem] p-4 md:p-12 min-h-[600px] flex items-center justify-center border border-dash-border/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 w-full max-w-5xl items-center place-items-center relative">
        {/* Connector lines (simplified visual representation) */}
        <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

        <div className="z-10 w-full flex justify-center mt-12 md:mt-24">
          <Node id="400000" color="red" />
        </div>
        <div className="z-10 w-full flex justify-center -mt-12 md:-mt-24">
          <Node id="400000" color="navy" />
        </div>
        <div className="z-10 w-full flex justify-center mt-12 md:mt-24">
          <Node id="400000" color="green" />
        </div>
      </div>
    </div>
  );
}
