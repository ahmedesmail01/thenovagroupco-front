import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  useUserTank,
  type TankMember,
  usePlaceMember,
} from "../../features/tank/useUserTank";
import { useUserData } from "../../features/auth/useUserData";
import { Loader2, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";

export const Route = createLazyFileRoute("/_auth/tank")({
  component: TankRouteComponent,
});

interface TankMemberCardProps {
  member: TankMember;
}

function TankMemberCard({ member }: TankMemberCardProps) {
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

function TankRouteComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: tankData,
    isLoading,
    isError,
    error,
  } = useUserTank(currentPage);
  const { data: userData } = useUserData();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (tankData?.tank.last_page || 1)) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <Loader2 className="w-12 h-12 animate-spin text-brand-navy" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-red-500 font-medium">Error loading tank members</p>
        <p className="text-slate-500 text-sm">
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
      </div>
    );
  }

  const tank = tankData?.tank;
  const currentMember = tank?.data[0];

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col">
      {/* Top Header */}
      <div className="bg-[#788a99] rounded-t-lg px-8 py-5 flex justify-between items-center text-white">
        <h2 className="text-lg font-semibold tracking-wide">Tank Members</h2>
        <p className="text-base font-semibold tracking-wide">
          YOUR ID : {userData?.profile.id_code || "******"}
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#f8fafc] border border-slate-100 rounded-b-lg flex flex-col relative shadow-sm">
        <div className="flex-1 m-8 bg-[#f8fafc] rounded-2xl flex flex-col items-center justify-center relative">
          {/* Main Card Container */}
          <div className="flex-1 flex items-center justify-center">
            {currentMember ? (
              <TankMemberCard member={currentMember} />
            ) : (
              <div className="text-slate-400 font-medium italic">
                No members in tank
              </div>
            )}
          </div>

          {/* Dynamic Pagination UI */}
          {tank && tank.last_page > 0 && (
            <div className="flex items-center justify-center gap-3 mt-auto pb-12 overflow-x-auto max-w-full px-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 min-w-[40px] rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm border border-slate-100 font-bold cursor-pointer"
              >
                &lt;
              </button>

              {Array.from({ length: tank.last_page }, (_, i) => i + 1).map(
                (page) => {
                  // Show current, first, last, and neighbors
                  if (
                    page === 1 ||
                    page === tank.last_page ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={cn(
                          "w-10 h-10 min-w-[40px] rounded-full flex items-center justify-center transition-all shadow-sm font-semibold text-base cursor-pointer",
                          currentPage === page
                            ? "bg-[#335c82] text-white shadow-md scale-110"
                            : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-100",
                        )}
                      >
                        {page}
                      </button>
                    );
                  }
                  // Show ellipses
                  if (
                    (page === 2 && currentPage > 3) ||
                    (page === tank.last_page - 1 &&
                      currentPage < tank.last_page - 2)
                  ) {
                    return (
                      <div
                        key={page}
                        className="w-10 h-10 min-w-[40px] flex items-center justify-center text-slate-400"
                      >
                        ...
                      </div>
                    );
                  }
                  return null;
                },
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === tank.last_page}
                className="w-10 h-10 min-w-[40px] rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm border border-slate-100 font-bold cursor-pointer"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
