export function TopStatCard({
  title,
  value,
  accentClass,
}: {
  title: string;
  value: string;
  accentClass: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 py-8 shadow-sm border border-slate-50 flex flex-col justify-center relative overflow-hidden h-32">
      {/* Accent Line */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1 rounded-r-md ${accentClass}`}
      />
      <div className="pl-3 space-y-1.5">
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <p className="text-slate-800 text-[26px] font-semibold tracking-wide">
          {value}
        </p>
      </div>
    </div>
  );
}
