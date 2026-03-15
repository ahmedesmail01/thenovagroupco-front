import {
  type UserDataResponse,
  useDownline,
  type DownlineMember,
} from "../../features/auth/useUserData";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { TransformComponent } from "react-zoom-pan-pinch";

interface NodeProps {
  userId: number | string;
  idCode: number | string;
  fullName: string;
  userImage?: string | null;
  rankName?: string | null;
  subscriptionName?: string | null;
  color: "red" | "blue" | "teal";
  isRoot?: boolean;
}

function GenealogyNode({
  userId,
  idCode,
  fullName,
  userImage,
  rankName,
  subscriptionName,
  color,
}: NodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: downline, isLoading } = useDownline(userId);

  // console.log("Node:", { userId, idCode, downline });

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

  // Safely get a child leg and its user ID
  const getLeg = (leg: unknown): DownlineMember | null => {
    if (!leg || typeof leg !== "object") return null;
    const typedLeg = leg as DownlineMember;
    const uid = typedLeg.user_id || typedLeg.id;
    if (!uid) return null;
    return typedLeg;
  };

  const leftLeg = downline ? getLeg(downline.members?.left_leg_member) : null;
  const rightLeg = downline ? getLeg(downline.members?.right_leg_member) : null;
  const hasChildren = !!(leftLeg || rightLeg);

  // We only render a valid user card if userId is truthy
  if (!userId) {
    return null;
  }

  return (
    <div className="flex flex-col items-center relative gap-8">
      {/* Node Card */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="p-1.5 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm transition-transform hover:scale-[1.02] duration-300 relative z-10 cursor-pointer"
      >
        <div
          className={`p-6 rounded-4xl border ${scheme.border} bg-linear-to-br ${scheme.bg} shadow-inner w-56 aspect-4/5 flex flex-col items-center justify-center relative overflow-hidden group`}
        >
          {/* Background Decorative Circular Shapes */}
          <div
            className={`absolute -bottom-20 -left-20 w-[120%] h-[120%] rounded-full ${scheme.shape1} mix-blend-multiply pointer-events-none`}
          />
          <div
            className={`absolute -top-20 -right-20 w-80 h-80 rounded-full ${scheme.shape2} mix-blend-overlay pointer-events-none`}
          />

          {/* Avatar Section */}
          <div className="relative mb-6">
            <div
              className={`absolute -inset-2 rounded-full border-8 ${scheme.avatarRing}`}
            />
            <div className="w-20 h-20 rounded-full bg-[#f1f5f9] flex items-center justify-center shadow-md relative z-10 border-2 border-slate-200/50 overflow-hidden">
              <img
                src={userImage || "/images/game-avatar.png"}
                alt="Avatar"
                className={`w-full h-full object-cover ${!userImage ? "pixelated drop-shadow-sm p-2 object-contain" : ""}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/images/game-avatar.png";
                  (e.target as HTMLImageElement).className =
                    "w-full h-full p-2 object-contain pixelated drop-shadow-sm";
                }}
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="text-center z-10">
            <h3
              className="text-white text-lg font-bold tracking-wide mb-1 drop-shadow-md truncate w-full max-w-[176px]"
              title={fullName || "Unknown"}
            >
              {fullName || "Unknown"}
            </h3>
            {rankName && (
              <p className="text-white/90 text-xs font-semibold uppercase tracking-wider mb-1 px-2 py-0.5 bg-black/20 rounded-full inline-block">
                {rankName}
              </p>
            )}
            <p className="text-white font-normal text-sm opacity-90 mb-1 mt-1">
              ID: {idCode || "--"}
            </p>
          </div>
        </div>
      </div>

      {/* User Info Modal */}
      {isModalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 nodrag cursor-default transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            <div
              className="bg-white rounded-[2rem] p-0 w-full max-w-md shadow-2xl relative border border-slate-100 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
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
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors backdrop-blur-md z-10"
                >
                  ✕
                </button>
              </div>

              <div className="px-8 pb-8 pt-0 flex flex-col items-center relative w-full">
                {/* Modal Avatar */}
                <div className="w-28 h-28 rounded-full border-[6px] border-white shadow-lg bg-white relative -mt-14 z-10 p-1 flex-shrink-0">
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
        )}

      {/* Expand Button */}
      {(isLoading || hasChildren) && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="relative z-50 nodrag w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
          ) : isExpanded ? (
            <ChevronUp className="w-6 h-6 text-slate-600" />
          ) : (
            <ChevronDown className="w-6 h-6 text-slate-600" />
          )}
        </button>
      )}

      {/* Children Section */}
      {isExpanded && downline && hasChildren && (
        <div className="relative pt-12">
          {/* horizontal connector line */}
          {leftLeg && rightLeg && (
            <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-slate-200" />
          )}

          {/* vertical connector line from parent */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-200" />

          <div className="flex gap-12">
            {leftLeg ? (
              <div className="relative flex flex-col items-center">
                {/* vertical line to child */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-slate-200" />
                <GenealogyNode
                  userId={leftLeg.user_id || leftLeg.id}
                  idCode={leftLeg.user_id_code || leftLeg.id_code!}
                  fullName={
                    leftLeg.user_first_name
                      ? `${leftLeg.user_first_name} ${leftLeg.user_last_name}`.trim()
                      : leftLeg.user_name || leftLeg.full_name!
                  }
                  userImage={leftLeg.user_image}
                  rankName={leftLeg.rank_name}
                  subscriptionName={
                    typeof leftLeg.subscription === "string"
                      ? leftLeg.subscription
                      : leftLeg.subscription?.name
                  }
                  color="blue"
                />
              </div>
            ) : (
              <div className="w-56" />
            )}

            {rightLeg ? (
              <div className="relative flex flex-col items-center">
                {/* vertical line to child */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-slate-200" />
                <GenealogyNode
                  userId={rightLeg.user_id || rightLeg.id}
                  idCode={rightLeg.user_id_code || rightLeg.id_code!}
                  fullName={
                    rightLeg.user_first_name
                      ? `${rightLeg.user_first_name} ${rightLeg.user_last_name}`.trim()
                      : rightLeg.user_name || rightLeg.full_name!
                  }
                  userImage={rightLeg.user_image}
                  rankName={rightLeg.rank_name}
                  subscriptionName={
                    typeof rightLeg.subscription === "string"
                      ? rightLeg.subscription
                      : rightLeg.subscription?.name
                  }
                  color="teal"
                />
              </div>
            ) : (
              <div className="w-56" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface GenealogyTreeProps {
  userData?: UserDataResponse;
}

export function GenealogyTree({ userData }: GenealogyTreeProps) {
  if (!userData) return null;

  const root = userData["user data"];
  const profile = userData.profile;

  return (
    <div className="bg-[#f8fafc] rounded-[3rem] p-4 h-full border border-slate-200/60 shadow-inner flex flex-col overflow-auto">
      <TransformComponent
        wrapperStyle={{ width: "100%", height: "100%", flex: 1 }}
        contentStyle={{
          width: "100%",
          minHeight: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "300px 200px",
        }}
      >
        <GenealogyNode
          userId={root.id}
          idCode={root.id_code}
          fullName={
            root.first_name
              ? `${root.first_name} ${root.last_name || ""}`.trim()
              : root.username
          }
          userImage={root.image}
          rankName={null} // Rank isn't available in root profile response directly in same format
          subscriptionName={profile.subscription}
          color="red"
          isRoot={true}
        />
      </TransformComponent>
    </div>
  );
}
