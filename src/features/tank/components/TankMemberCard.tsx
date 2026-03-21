import { Loader2 } from "lucide-react";
import { type TankMember, usePlaceMember } from "../useUserTank";

interface TankMemberCardProps {
  member: TankMember;
}

export function TankMemberCard({ member }: TankMemberCardProps) {
  const { mutate: placeMember, isPending } = usePlaceMember();

  const handlePlace = (placement: "left" | "right") => {
    placeMember({ referralId: member.member_id, placement });
  };

  return (
    <div className="bg-[#1a365d] rounded-2xl overflow-hidden shadow-xl w-[320px] relative mt-10">
      {/* Complex Background overlay */}
      <div className="absolute inset-0 bg-linear-to-tl from-transparent via-[#1e3a8a]/40 to-[#0f172a]/60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-[150%] bg-white/5 rounded-[100%] -translate-y-[40%] translate-x-[20%] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-full bg-black/10 rounded-[100%] translate-y-[50%] -translate-x-[20%] pointer-events-none" />

      <div className="p-8 pb-6 relative z-10 flex flex-col h-full text-center">
        <div className="mb-8 space-y-4">
          <p className="text-white text-xl font-bold tracking-wide">
            {member.member_username}
          </p>
          <p className="text-white text-lg tracking-wide opacity-90">
            ID : {member.member_id}
          </p>
          <p className="text-white/70 text-base">
            {member.member_firstname} {member.member_lastname}
          </p>
        </div>

        {member.member_package ? (
          <div className="flex gap-4 w-full mt-auto">
            <button
              onClick={() => handlePlace("left")}
              disabled={isPending}
              className="flex-1 bg-[#ef4444] hover:bg-red-600 disabled:bg-red-400 text-white font-medium px-4 py-3 rounded-md transition-colors text-base shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "TO LEFT"
              )}
            </button>
            <button
              onClick={() => handlePlace("right")}
              disabled={isPending}
              className="flex-1 bg-[#10b981] hover:bg-emerald-600 disabled:bg-emerald-400 text-white font-medium px-4 py-3 rounded-md transition-colors text-base shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "TO RIGHT"
              )}
            </button>
          </div>
        ) : (
          <button
            disabled
            className="w-full bg-white/10 text-white/80 border border-white/20 font-medium px-4 py-3 rounded-md text-sm mt-auto cursor-not-allowed"
          >
            Must Subscribe to add to tank
          </button>
        )}
      </div>
    </div>
  );
}
