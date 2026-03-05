import { createLazyFileRoute } from "@tanstack/react-router";
import { TransformWrapper } from "react-zoom-pan-pinch";
import { GenealogyFilters } from "../../components/genealogy/GenealogyFilters";
import { GenealogyTree } from "../../components/genealogy/GenealogyTree";

export const Route = createLazyFileRoute("/_auth/genealogy")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-4 md:p-8 space-y-6 flex flex-col h-[calc(100vh-100px)] overflow-hidden">
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        centerOnInit={true}
      >
        <div className="flex flex-col h-full gap-6">
          <GenealogyFilters />
          <GenealogyTree />
        </div>
      </TransformWrapper>
    </div>
  );
}
