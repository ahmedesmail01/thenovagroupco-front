import { TransformComponent } from "react-zoom-pan-pinch";

interface NodeProps {
  id: string;
  count: string;
  color: "red" | "blue" | "teal";
}

function Node({ id, count, color }: NodeProps) {
  const colorSchemes = {
    red: {
      bg: "from-[#ef4444] to-[#f87171]",
      border: "border-red-200/50",
      avatarBg: "bg-red-500/20",
    },
    blue: {
      bg: "from-[#1a365d] to-[#2d4a77]",
      border: "border-blue-200/30",
      avatarBg: "bg-blue-500/20",
    },
    teal: {
      bg: "from-[#0d9488] to-[#14b8a6]",
      border: "border-teal-200/40",
      avatarBg: "bg-teal-500/20",
    },
  };

  const scheme = colorSchemes[color];

  return (
    <div
      className={`p-6 rounded-[2.5rem] border ${scheme.border} bg-linear-to-br ${scheme.bg} shadow-xl w-64 aspect-4/5 flex flex-col items-center justify-center relative group transition-all hover:shadow-2xl`}
    >
      <div
        className={`w-28 h-28 rounded-full border-4 border-white/30 overflow-hidden mb-6 ${scheme.avatarBg} flex items-center justify-center p-2 backdrop-blur-sm`}
      >
        <img
          src="/images/user-placeholder.png"
          alt="Avatar"
          className="w-full h-full object-contain pixelated"
        />
      </div>
      <div className="text-center">
        <p className="text-white/60 text-sm font-bold uppercase tracking-[0.2em] mb-1">
          ID
        </p>
        <p className="text-white text-2xl font-bold tracking-tight mb-2">
          {id}
        </p>
        <p className="text-white/80 text-lg font-medium tracking-wide italic">
          {count}
        </p>
      </div>
    </div>
  );
}

export function GenealogyTree() {
  return (
    <div className="bg-[#f8fafc] rounded-[3rem] p-4 min-h-[700px] border border-slate-200/60 shadow-inner flex flex-col overflow-hidden">
      <TransformComponent
        wrapperStyle={{ width: "100%", height: "100%", flex: 1 }}
        contentStyle={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px",
        }}
      >
        <div className="flex flex-row gap-20 items-center justify-center relative">
          {/* Main Tree Layout */}
          <div className="flex flex-col items-center">
            <Node id="ID" count="400000" color="red" />
          </div>

          <div className="flex flex-col items-center">
            <Node id="ID" count="400000" color="blue" />
          </div>

          <div className="flex flex-col items-center">
            <Node id="ID" count="400000" color="teal" />
          </div>
        </div>
      </TransformComponent>
    </div>
  );
}
