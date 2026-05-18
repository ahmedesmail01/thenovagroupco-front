import { createLazyFileRoute } from "@tanstack/react-router";
import { Download, FileText, Megaphone } from "lucide-react";
import { usePromotionalTools } from "../../features/promotional/promotionalQueries";

export const Route = createLazyFileRoute("/_auth/promotional")({
  component: PromotionalPage,
});

function PromotionalPage() {
  const { data: tools, isLoading, isError } = usePromotionalTools();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-dash-border/50 pb-6">
        <div className="p-3 bg-purple-100 rounded-xl">
          <Megaphone className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Promotional Tools</h1>
          <p className="text-sm text-gray-500 mt-1">
            Access and download marketing materials, guides, and flyers.
          </p>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-dash-border/50 overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-200" />
              <div className="p-5 space-y-4">
                <div className="h-6 bg-gray-200 rounded-md w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-md w-full" />
                  <div className="h-4 bg-gray-200 rounded-md w-5/6" />
                </div>
                <div className="pt-4 mt-4 border-t border-dash-border/50">
                  <div className="h-10 bg-gray-200 rounded-lg w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 flex flex-col items-center justify-center text-center space-y-2">
          <p className="font-semibold">Failed to load promotional tools.</p>
          <p className="text-sm text-red-500">Please try again later.</p>
        </div>
      ) : !tools || tools.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-dash-border/50 p-12 flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-4 bg-gray-50 rounded-full">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">No tools available</p>
            <p className="text-sm text-gray-500 mt-1">
              Check back later for new promotional materials.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-dash-border/50 overflow-hidden hover:shadow-md transition-shadow flex flex-col group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={tool.thumbnail}
                  alt={tool.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 line-clamp-1" title={tool.title}>
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-3 flex-1" title={tool.description}>
                  {tool.description}
                </p>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-dash-border/50">
                  <a
                    href={tool.pdf_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium rounded-lg transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    View / Download PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
