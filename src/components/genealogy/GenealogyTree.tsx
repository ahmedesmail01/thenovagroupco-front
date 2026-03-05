import { TransformComponent } from "react-zoom-pan-pinch";

interface NodeProps {
  count: string;
  color: "red" | "blue" | "teal";
}

function Node({ count, color }: NodeProps) {
  const colorSchemes = {
    red: {
      bg: "from-[#ec4899] to-[#ef4444]",
      border: "border-red-400",
      avatarRing: "border-red-500/30",
      shape1: "bg-red-800/10",
      shape2: "bg-white/10",
    },
    blue: {
      bg: "from-[#3b82f6] to-[#1e3a8a]",
      border: "border-blue-400",
      avatarRing: "border-blue-500/30",
      shape1: "bg-blue-800/20",
      shape2: "bg-white/10",
    },
    teal: {
      bg: "from-[#14b8a6] to-[#047857]",
      border: "border-teal-400",
      avatarRing: "border-teal-500/30",
      shape1: "bg-teal-800/20",
      shape2: "bg-white/10",
    },
  };

  const scheme = colorSchemes[color];

  return (
    <div
      className={`p-1.5 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm transition-transform hover:scale-[1.02] duration-300`}
    >
      <div
        className={`p-10 rounded-4xl border ${scheme.border} bg-linear-to-br ${scheme.bg} shadow-inner w-72 aspect-4/5 flex flex-col items-center justify-center relative overflow-hidden group`}
      >
        {/* Background Decorative Circular Shapes */}
        <div
          className={`absolute -bottom-20 -left-20 w-[120%] h-[120%] rounded-full ${scheme.shape1} mix-blend-multiply pointer-events-none`}
        />
        <div
          className={`absolute -top-20 -right-20 w-80 h-80 rounded-full ${scheme.shape2} mix-blend-overlay pointer-events-none`}
        />

        {/* Reflective highlight streak */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-white/10 to-transparent pointer-events-none" />

        {/* Avatar Section */}
        <div className="relative mb-12">
          {/* Thick semi-transparent outer ring */}
          <div
            className={`absolute -inset-4 rounded-full border-12 ${scheme.avatarRing}`}
          />

          <div className="w-28 h-28 rounded-full bg-[#f1f5f9] flex items-center justify-center  shadow-md relative z-10 border-2 border-slate-200/50">
            <img
              src="/images/game-avatar.png"
              alt="Avatar"
              className="w-full h-full object-contain pixelated drop-shadow-sm"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center z-10">
          <h3 className="text-white text-4xl font-normal tracking-wide mb-3 drop-shadow-md">
            ID
          </h3>
          <p className="text-white font-normal text-2xl tracking-widest opacity-95 drop-shadow-sm">
            {count}
          </p>
        </div>
      </div>
    </div>
  );
}

export function GenealogyTree() {
  return (
    <div className="bg-[#f8fafc] rounded-[3rem] p-4 h-full border border-slate-200/60 shadow-inner flex flex-col overflow-hidden">
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
        <div className="flex flex-row gap-20 items-stretch justify-center relative">
          {/* Main Tree Layout */}
          <div className="flex flex-col items-center justify-start pt-20">
            <Node count="400000" color="red" />
          </div>

          {/* Middle Branching Section */}
          <div className="flex flex-col items-center gap-16 relative">
            <Node count="400000" color="blue" />

            {/* Tree Connectors */}
            <div className="absolute top-[320px] left-1/2 -translate-x-1/2 w-[400px] h-10 border-t-2 border-l-2 border-r-2 border-blue-200/60 rounded-t-2xl z-0" />
            <div className="absolute top-[320px] left-1/2 -translate-x-1/2 w-0.5 h-16 bg-blue-200/60 -translate-y-16 z-0" />

            <div className="flex flex-row gap-20">
              <div className="flex flex-col items-center">
                <Node count="400000" color="blue" />
              </div>
              <div className="flex flex-col items-center">
                <Node count="400000" color="blue" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-start pt-20">
            <Node count="400000" color="teal" />
          </div>
        </div>
      </TransformComponent>
    </div>
  );
}
