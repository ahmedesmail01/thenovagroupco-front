import { Settings2, X } from "lucide-react";
import { useRef } from "react";

interface CommissionFiltersProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  onReset: () => void;
}

export function CommissionFilters({
  selectedDate,
  onDateChange,
  onReset,
}: CommissionFiltersProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenPicker = () => {
    const input = inputRef.current;
    if (!input) return;

    // showPicker is the standard way to programmatically open the date picker
    if ("showPicker" in input) {
      try {
        (input as any).showPicker();
        return;
      } catch {
        // Fallback to click if showPicker fails
      }
    }

    input.click();
  };

  return (
    <div className="mb-8 px-4 flex items-center gap-4">
      {/* Interactive Gradient Button */}
      <div
        onClick={handleOpenPicker}
        className="relative group overflow-hidden rounded-xl shadow-lg shadow-slate-200 transition-all active:scale-[0.98] cursor-pointer"
      >
        <div className="flex items-center gap-3 bg-linear-to-r from-[#1e3a5f] via-[#2a4d7d] to-[#1e3a5f] px-6 py-3 text-white border border-white/10">
          <Settings2 className="w-5 h-5 opacity-80" />
          <span className="font-bold text-sm tracking-wide whitespace-nowrap">
            {selectedDate
              ? new Date(selectedDate).toLocaleDateString()
              : "Filter By Date"}
          </span>
        </div>
        <input
          ref={inputRef}
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
        />
      </div>

      {selectedDate && (
        <button
          onClick={onReset}
          className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2 transition-all border border-red-100 shadow-sm"
        >
          <X className="w-4 h-4" />
          Reset
        </button>
      )}
    </div>
  );
}
