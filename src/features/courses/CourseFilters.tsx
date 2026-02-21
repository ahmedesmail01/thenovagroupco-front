import { useState } from "react";
import { type CourseFiltersType } from "../../features/courses/courseQueries";

const CATEGORIES = [
  "Development",
  "Business",
  "Finance & Accounting",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Lifestyle",
  "Photography & Video",
  "Music",
  "Health & Fitness",
];
const TOOLS = [
  "HTML 5",
  "CSS 3",
  "React",
  "Webflow",
  "Node.js",
  "Laravel",
  "Saas",
  "Wordpress",
];
const LEVELS = ["All Level", "Beginner", "Intermediate", "Expert"];
const PACKAGES = ["Basic", "Premium", "Pro"];
const DURATIONS = [
  "6-12 Months",
  "3-6 Months",
  "1-3 Months",
  "1-4 Weeks",
  "1-7 Days",
];

interface CourseFiltersProps {
  filters: CourseFiltersType;
  onChange: (f: CourseFiltersType) => void;
}

export function CourseFilters({ filters, onChange }: CourseFiltersProps) {
  const toggle = (key: keyof CourseFiltersType, item: string) => {
    const current = (filters[key] as string[] | undefined) || [];
    const next = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    onChange({ ...filters, [key]: next.length ? next : undefined });
  };

  const clearAll = () => onChange({});
  const hasFilters = Object.values(filters).some(
    (v) => v && (Array.isArray(v) ? v.length > 0 : true),
  );

  return (
    <div className="flex flex-col gap-6 text-sm">
      {/* Clear all */}
      {hasFilters && (
        <button
          className="text-xs text-brand-blue-light hover:underline text-left"
          onClick={clearAll}
        >
          Clear all filters
        </button>
      )}

      <FilterGroup
        label="CATEGORY"
        items={CATEGORIES}
        selected={filters.categories}
        onToggle={(i) => toggle("categories", i)}
      />
      <FilterGroup
        label="TOOLS"
        items={TOOLS}
        selected={filters.tools}
        onToggle={(i) => toggle("tools", i)}
      />
      <FilterGroup
        label="COURSE LEVEL"
        items={LEVELS}
        selected={filters.levels}
        onToggle={(i) => toggle("levels", i)}
      />
      <FilterGroup
        label="PACKAGES"
        items={PACKAGES}
        selected={filters.packages}
        onToggle={(i) => toggle("packages", i)}
      />
      <FilterGroup
        label="DURATION"
        items={DURATIONS}
        selected={filters.durations}
        onToggle={(i) => toggle("durations", i)}
      />
    </div>
  );
}

interface FilterGroupProps {
  label: string;
  items: string[];
  selected?: string[];
  onToggle: (item: string) => void;
}

function FilterGroup({
  label,
  items,
  selected = [],
  onToggle,
}: FilterGroupProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-brand-border pb-5">
      <button
        className="flex items-center justify-between w-full font-semibold text-text-primary uppercase tracking-wider text-xs mb-3 hover:text-white transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span>
          {label}
          {selected.length > 0 && (
            <span className="ml-2 text-[10px] bg-brand-blue text-white px-1.5 py-0.5 rounded-full font-bold lowercase">
              {selected.length}
            </span>
          )}
        </span>
        <span className="text-text-muted">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <label
              key={item}
              className="flex items-center justify-between cursor-pointer group"
            >
              <span className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={selected.includes(item)}
                  onChange={() => onToggle(item)}
                  className="w-4 h-4 accent-brand-blue rounded cursor-pointer"
                />
                <span
                  className={`transition-colors text-xs ${selected.includes(item) ? "text-white font-medium" : "text-text-secondary group-hover:text-white"}`}
                >
                  {item}
                </span>
              </span>
              <span className="text-text-muted text-[10px]">1345</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
