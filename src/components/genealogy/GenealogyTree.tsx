import {
  type UserDataResponse,
  useDownline,
} from "../../features/auth/useUserData";
import { useState } from "react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { TransformComponent } from "react-zoom-pan-pinch";

interface NodeProps {
  userId: number | string;
  idCode: number | string;
  fullName: string;
  subscriptionName?: string;
  color: "red" | "blue" | "teal";
  isRoot?: boolean;
}

function GenealogyNode({
  userId,
  idCode,
  fullName,
  // subscriptionName,s
  color,
}: NodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: downline, isLoading } = useDownline(userId);

  const hasChildren = !!(
    downline?.members?.left_leg_member || downline?.members?.right_leg_member
  );

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
    <div className="flex flex-col items-center relative gap-8">
      {/* Node Card */}
      <div className="p-1.5 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm transition-transform hover:scale-[1.02] duration-300 relative z-10">
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
            <div className="w-20 h-20 rounded-full bg-[#f1f5f9] flex items-center justify-center shadow-md relative z-10 border-2 border-slate-200/50">
              <img
                src="/images/game-avatar.png"
                alt="Avatar"
                className="w-full h-full object-contain pixelated drop-shadow-sm"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="text-center z-10">
            <h3 className="text-white text-lg font-bold tracking-wide mb-1 drop-shadow-md truncate w-44">
              {fullName}
            </h3>
            <p className="text-white font-normal text-sm opacity-90 mb-1">
              ID: {idCode}
            </p>
            {/* {subscriptionName && (
              <p className="text-white font-bold text-xs uppercase tracking-tighter bg-black/20 px-2 py-0.5 rounded-full inline-block">
                {subscriptionName}
              </p>
            )} */}
          </div>
        </div>
      </div>

      {/* Expand Button */}
      {(isLoading || hasChildren) && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors z-20"
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
      {isExpanded && downline && (
        <div className="relative pt-12">
          {/* horizontal connector line */}
          {downline.members.left_leg_member &&
            downline.members.right_leg_member && (
              <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-slate-200" />
            )}

          {/* vertical connector line from parent */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-200" />

          <div className="flex gap-12">
            {downline.members.left_leg_member ? (
              <div className="relative flex flex-col items-center">
                {/* vertical line to child */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-slate-200" />
                <GenealogyNode
                  userId={downline.members.left_leg_member.user_id}
                  idCode={downline.members.left_leg_member.id_code}
                  fullName={downline.members.left_leg_member.full_name}
                  subscriptionName={
                    typeof downline.members.left_leg_member.subscription ===
                    "string"
                      ? downline.members.left_leg_member.subscription
                      : downline.members.left_leg_member.subscription?.name
                  }
                  color="blue"
                />
              </div>
            ) : (
              <div className="w-56" />
            )}

            {downline.members.right_leg_member ? (
              <div className="relative flex flex-col items-center">
                {/* vertical line to child */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-slate-200" />
                <GenealogyNode
                  userId={downline.members.right_leg_member.user_id}
                  idCode={downline.members.right_leg_member.id_code}
                  fullName={downline.members.right_leg_member.full_name}
                  subscriptionName={
                    typeof downline.members.right_leg_member.subscription ===
                    "string"
                      ? downline.members.right_leg_member.subscription
                      : downline.members.right_leg_member.subscription?.name
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
    <div className="bg-[#f8fafc] rounded-[3rem] p-4 h-full border border-slate-200/60 shadow-inner flex flex-col overflow-hidden">
      <TransformComponent
        wrapperStyle={{ width: "100%", height: "100%", flex: 1 }}
        contentStyle={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "200px",
        }}
      >
        <GenealogyNode
          userId={root.id}
          idCode={root.id_code}
          fullName={root.username}
          subscriptionName={profile.subscription}
          color="red"
        />
      </TransformComponent>
    </div>
  );
}
