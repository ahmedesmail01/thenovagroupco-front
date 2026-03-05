import { Search, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { useControls } from "react-zoom-pan-pinch";

export function GenealogyFilters() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Search Bar */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:w-80">
          <input
            type="text"
            placeholder="id"
            className="w-full bg-white border border-dash-border rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-dash-accent/20 focus:border-dash-accent transition-all shadow-sm text-slate-900"
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-dash-muted"
            size={18}
          />
        </div>
        <button className="bg-[#1a365d] text-white px-8 py-2.5 rounded-lg font-semibold text-sm hover:bg-brand-navy transition-colors shadow-sm">
          GET
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <button
          onClick={() => zoomIn()}
          className="flex items-center gap-2 bg-[#f1f5f9] hover:bg-dash-border text-[#1a365d] px-4 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
        >
          <ZoomIn size={16} /> ZOOM IN
        </button>
        <button
          onClick={() => zoomOut()}
          className="flex items-center gap-2 bg-[#f1f5f9] hover:bg-dash-border text-[#1a365d] px-4 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
        >
          <ZoomOut size={16} /> ZOOM OUT
        </button>
        <button
          onClick={() => resetTransform()}
          className="flex items-center gap-2 bg-[#f1f5f9] hover:bg-dash-border text-[#1a365d] px-4 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shadow-sm uppercase"
        >
          <Maximize2 size={16} /> Go full screen
        </button>
      </div>
    </div>
  );
}
