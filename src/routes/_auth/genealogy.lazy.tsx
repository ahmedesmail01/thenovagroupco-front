import { createLazyFileRoute } from "@tanstack/react-router";
import { TransformWrapper } from "react-zoom-pan-pinch";
import { GenealogyFilters } from "../../components/genealogy/GenealogyFilters";
import { GenealogyTree } from "../../components/genealogy/GenealogyTree";
import { useUserData } from "../../features/auth/useUserData";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export const Route = createLazyFileRoute("/_auth/genealogy")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchUserId, setSearchUserId] = useState<string | undefined>(
    undefined,
  );
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useUserData(searchUserId);

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
          onClick={() => setSearchUserId(undefined)}
          className="text-brand-navy underline text-sm cursor-pointer"
        >
          Reset to my profile
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-100px)] overflow-hidden">
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
          <GenealogyFilters onSearch={(id) => setSearchUserId(id)} />
          <GenealogyTree userData={userData} />
        </div>
      </TransformWrapper>
    </div>
  );
}
