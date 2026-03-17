import { createPortal } from "react-dom";
import { COLOR_SCHEMES } from "./types";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  idCode: number | string;
  fullName: string;
  userImage?: string | null;
  rankName?: string | null;
  subscriptionName?: string | null;
  color: "red" | "blue" | "teal";
}

export function UserModal({
  isOpen,
  onClose,
  idCode,
  fullName,
  userImage,
  rankName,
  subscriptionName,
  color,
}: UserModalProps) {
  if (!isOpen || typeof document === "undefined") return null;

  const scheme = COLOR_SCHEMES[color];

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 nodrag cursor-default transition-all"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className="bg-white rounded-4xl p-0 w-full max-w-md shadow-2xl relative border border-slate-100 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Background */}
        <div
          className={`h-32 w-full bg-linear-to-br ${scheme.bg} relative flex items-start justify-end p-4`}
        >
          {/* Decorative inner elements */}
          <div
            className={`absolute top-0 right-0 w-64 h-64 rounded-full ${scheme.shape2} mix-blend-overlay -translate-y-1/2 translate-x-1/2 pointer-events-none`}
          ></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors backdrop-blur-md z-10"
          >
            ✕
          </button>
        </div>

        <div className="px-8 pb-8 pt-0 flex flex-col items-center relative w-full">
          {/* Modal Avatar */}
          <div className="w-28 h-28 rounded-full border-[6px] border-white shadow-lg bg-white relative -mt-14 z-10 p-1 shrink-0">
            <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center overflow-hidden">
              <img
                src={userImage || "/images/game-avatar.png"}
                alt={fullName}
                className={`w-full h-full object-cover ${!userImage ? "pixelated p-4 object-contain" : ""}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/images/game-avatar.png";
                  (e.target as HTMLImageElement).className =
                    "w-full h-full p-4 object-contain pixelated";
                }}
              />
            </div>
          </div>

          <div className="mt-4 text-center w-full">
            <h2
              className="text-2xl font-black text-slate-800 tracking-tight mb-1 truncate w-full"
              title={fullName || "Unknown"}
            >
              {fullName || "Unknown"}
            </h2>
            <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-slate-100 border border-slate-200 shadow-sm mt-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-2">
                ID
              </span>
              <span className="text-sm font-bold text-slate-800">
                {idCode || "--"}
              </span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-4 mt-8">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center hover:bg-slate-100 transition-colors shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Rank
              </span>
              <span
                className={`text-sm font-extrabold pb-1 ${rankName ? "text-[#020617]" : "text-slate-400"}`}
              >
                {rankName || "No Rank"}
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center hover:bg-slate-100 transition-colors shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Subscription
              </span>
              <span
                className={`text-sm font-extrabold truncate w-full pb-1 ${subscriptionName ? "text-[#020617]" : "text-slate-400"}`}
                title={subscriptionName || "None"}
              >
                {subscriptionName || "None"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
