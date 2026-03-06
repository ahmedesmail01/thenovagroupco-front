import { createLazyFileRoute } from "@tanstack/react-router";
import { TransformWrapper } from "react-zoom-pan-pinch";
import { GenealogyFilters } from "../../components/genealogy/GenealogyFilters";
import { GenealogyTree } from "../../components/genealogy/GenealogyTree";

export const Route = createLazyFileRoute("/_auth/genealogy")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="  space-y-6 flex flex-col h-[calc(100vh-100px)] overflow-hidden">
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
          <GenealogyFilters />
          <GenealogyTree />
        </div>
      </TransformWrapper>
    </div>
  );
}
