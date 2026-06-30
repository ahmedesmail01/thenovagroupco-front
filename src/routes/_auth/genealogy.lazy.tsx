import { createLazyFileRoute } from "@tanstack/react-router";
import { TransformWrapper } from "react-zoom-pan-pinch";
import { GenealogyFilters } from "../../components/genealogy/GenealogyFilters";
import { GenealogyTree } from "../../components/genealogy/GenealogyTree";
import { useUserData, useUserByIdData } from "../../features/auth/useUserData";
import { UserInfoModal } from "../../components/common/UserInfoModal";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const Route = createLazyFileRoute("/_auth/genealogy")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchMemberId, setSearchMemberId] = useState<string | undefined>(
    undefined,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: currentUserData,
    isLoading: isLoadCurrent,
    isError: isErrCurrent,
    error: errCurrent,
  } = useUserData();

  const {
    data: searchUserData,
    isLoading: isLoadSearch,
    isError: isErrSearch,
    error: errSearch,
  } = useUserByIdData(searchMemberId);

  useEffect(() => {
    // Determine if we just successfully fetched a user by ID
    if (
      searchMemberId &&
      searchUserData &&
      searchUserData.status &&
      !isLoadSearch &&
      !isErrSearch
    ) {
      // Use setTimeout to avoid synchronous setState warning
      const timer = setTimeout(() => setIsModalOpen(true), 0);
      return () => clearTimeout(timer);
    }

    // Handle search error
    if (searchMemberId && isErrSearch && errSearch) {
      toast.error(
        errSearch instanceof Error ? errSearch.message : "User not found",
      );
      const timer = setTimeout(() => setSearchMemberId(undefined), 0); // Reset search on error
      return () => clearTimeout(timer);
    }
  }, [searchMemberId, searchUserData, isLoadSearch, isErrSearch, errSearch]);

  const isLoading = searchMemberId ? isLoadSearch : isLoadCurrent;
  const isError = searchMemberId ? isErrSearch : isErrCurrent;
  const error = searchMemberId ? errSearch : errCurrent;
  const userData = searchMemberId ? searchUserData : currentUserData;

  // Resolve the Member ID for the UserInfoModal (searched user or logged-in user)
  const rootMemberId = searchMemberId
    ? searchUserData && "user" in searchUserData
      ? searchUserData.user.member?.id
      : undefined
    : currentUserData && "user data" in currentUserData
      ? currentUserData["user data"].member?.id
      : undefined;

  const handleReset = () => {
    setSearchMemberId(undefined);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <Loader2 className="w-10 h-10 animate-spin text-[#1a365d]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-4">
        <p className="text-red-500 font-medium">Error loading genealogy data</p>
        <p className="text-slate-500 text-sm">
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
        <button
          onClick={handleReset}
          className="text-brand-navy underline text-sm cursor-pointer"
        >
          Reset to my profile
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-100px)] overflow-hidden relative">
      <TransformWrapper
        initialScale={0.7}
        minScale={0.2}
        maxScale={2}
        initialPositionX={0}
        initialPositionY={0}
        centerOnInit={true}
        limitToBounds={false}
      >
        <div className="flex flex-col h-full gap-6">
          <GenealogyFilters
            onSearch={(id) => setSearchMemberId(id)}
            onReset={handleReset}
            onOpenInfo={() => setIsModalOpen(true)}
            hasSearch={!!searchMemberId}
          />
          <GenealogyTree userData={userData} />
        </div>
      </TransformWrapper>

      <UserInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={rootMemberId || null}
      />
    </div>
  );
}
