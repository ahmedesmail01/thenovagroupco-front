import { useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../lib/utils";
import { PERIOD_LABELS, PERIODS, type TimePeriod } from "./constants";

interface TimePeriodDropdownProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
}

export function TimePeriodDropdown({
  selectedPeriod,
  onPeriodChange,
  isDropdownOpen,
  setIsDropdownOpen,
}: TimePeriodDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl text-[11px] font-bold text-white transition-all border border-white/10 backdrop-blur-md hover:border-white/20 active:scale-95 shadow-sm"
      >
        <span className="tracking-wide uppercase opacity-90">{PERIOD_LABELS[selectedPeriod]}</span>
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform duration-300 opacity-70",
            isDropdownOpen && "rotate-180 opacity-100",
          )}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-brand-surface/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-100 ring-1 ring-white/5 animate-in fade-in zoom-in duration-200">
          {PERIODS.map((period) => (
            <button
              key={period}
              onMouseDown={(e) => {
                e.stopPropagation();
                onPeriodChange(period);
                setIsDropdownOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-3 text-[11px] font-semibold transition-all flex items-center justify-between group",
                selectedPeriod === period
                  ? "text-blue-400 bg-white/5"
                  : "text-white/60 hover:text-white hover:bg-white/10",
              )}
            >
              <span className="tracking-wide">{PERIOD_LABELS[period]}</span>
              {selectedPeriod === period && (
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
