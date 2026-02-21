interface StepperProps {
  steps: string[];
  current: number;
}

export function Stepper({ steps, current }: StepperProps) {
  return (
    <div className="flex items-center justify-between w-full mb-8 overflow-x-auto pb-4 scrollbar-hide">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1 min-w-[36px]">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 text-sm font-semibold transition-all
                ${done ? "bg-brand-blue border-brand-blue text-white" : ""}
                ${active ? "border-brand-blue text-brand-blue bg-transparent shadow-[0_0_10px_rgba(43,108,176,0.3)]" : ""}
                ${!done && !active ? "border-brand-border text-text-muted" : ""}`}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className={`text-xs whitespace-nowrap hidden sm:block ${active ? "text-white font-medium" : "text-text-muted"}`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 min-w-[20px] ${done ? "bg-brand-blue" : "bg-brand-border"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
