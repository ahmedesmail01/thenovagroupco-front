import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Plus, Minus } from "lucide-react";
import { cn } from "../../lib/utils";
import Card from "./Card";

// Using the same reliable source as before, but with a confirmed working URL
const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";

interface CountryStatsProps {
  country: string;
  color: string;
  percentage: string;
  code: string;
}

const countries: CountryStatsProps[] = [
  {
    country: "Canada",
    code: "CAN",
    color: "bg-orange-400",
    percentage: "10.00%",
  },
  { country: "Egypt", code: "EGY", color: "bg-rose-500", percentage: "80.00%" },
  {
    country: "Germany",
    code: "DEU",
    color: "bg-blue-500",
    percentage: "60.00%",
  },
  {
    country: "Lebanon",
    code: "LBN",
    color: "bg-emerald-500",
    percentage: "30.00%",
  },
  {
    country: "Yemen",
    code: "YEM",
    color: "bg-purple-500",
    percentage: "40.00%",
  },
];

const decorativeHighlights: Record<string, string> = {
  // ISO Numeric IDs for countries because world-atlas uses numeric IDs
  "840": "#fbbf24", // USA
  "076": "#f43f5e", // BRA
  "566": "#10b981", // NGA
  "156": "#a855f7", // CHN
  "360": "#3b82f6", // IDN
  "124": "#fbbf24", // CAN (if stats fail by name)
  "818": "#f43f5e", // EGY
  "276": "#3b82f6", // DEU
};

function CountryProgessItem({
  country,
  color,
  percentage,
}: {
  country: string;
  color: string;
  percentage: string;
}) {
  return (
    <div className="space-y-3 py-4 border-b border-slate-50 last:border-0 relative z-10">
      <div className="flex justify-between items-center">
        <span className="text-[18px] text-slate-400">{country}</span>
        <div
          className={cn(
            "px-3 py-1 rounded-lg border text-[12px] font-bold",
            color
              .replace("bg-", "text-")
              .replace("400", "500")
              .replace("500", "500"),
            color
              .replace("bg-", "border-")
              .replace("400", "200")
              .replace("500", "200"),
          )}
        >
          {percentage}
        </div>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000",
            color,
          )}
          style={{ width: percentage }}
        />
      </div>
    </div>
  );
}

export function MemberJoiningsCard({ className }: { className?: string }) {
  const [position, setPosition] = useState({
    coordinates: [10, 20],
    zoom: 1.5,
  });

  return (
    <Card
      className={cn("lg:col-span-2 overflow-hidden", className)}
      title="Member Joinings"
      extra={
        <button className="text-[14px] font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
          Show All
        </button>
      }
    >
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-center">
        <div className="relative w-full lg:w-[50%] h-64 lg:h-96 flex items-center justify-center bg-white overflow-hidden rounded-2xl border border-slate-100">
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <button
              onClick={() =>
                setPosition((p) => ({ ...p, zoom: Math.min(p.zoom * 1.5, 8) }))
              }
              className="w-8 h-8 bg-[#1a2d42] text-white rounded flex items-center justify-center shadow-lg"
            >
              <Plus size={18} />
            </button>
            <button
              onClick={() =>
                setPosition((p) => ({ ...p, zoom: Math.max(p.zoom / 1.5, 1) }))
              }
              className="w-8 h-8 bg-[#1a2d42] text-white rounded flex items-center justify-center shadow-lg"
            >
              <Minus size={18} />
            </button>
          </div>

          <ComposableMap
            projectionConfig={{ scale: 130 }}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates as [number, number]}
              onMoveEnd={setPosition}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) => {
                  return geographies && geographies.length > 0
                    ? geographies.map((geo) => {
                        const id = geo.id; // numeric string in world-atlas
                        const name = geo.properties.name;

                        const stats = countries.find((c) => c.country === name);
                        let fillColor = "#F1F5F9";

                        if (stats) {
                          if (stats.color.includes("orange"))
                            fillColor = "#fbbf24";
                          else if (stats.color.includes("rose"))
                            fillColor = "#f43f5e";
                          else if (stats.color.includes("blue"))
                            fillColor = "#3b82f6";
                          else if (stats.color.includes("emerald"))
                            fillColor = "#10b981";
                          else if (stats.color.includes("purple"))
                            fillColor = "#a855f7";
                        } else if (decorativeHighlights[id]) {
                          fillColor = decorativeHighlights[id];
                        }

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={fillColor}
                            stroke="#FFF"
                            strokeWidth={0.5}
                            style={{
                              default: { outline: "none" },
                              hover: { fill: "#E2E8F0", outline: "none" },
                              pressed: { outline: "none" },
                            }}
                          />
                        );
                      })
                    : null;
                }}
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>

        <div className="w-full lg:w-[50%] bg-[#f8f9fc]/50 rounded-2xl p-6 space-y-2">
          {countries.map((item) => (
            <CountryProgessItem key={item.country} {...item} />
          ))}
        </div>
      </div>
    </Card>
  );
}
