import React from "react";

interface SalesDonutChartProps {
  leftCv: number;
  rightCv: number;
}

export function SalesDonutChart({ leftCv, rightCv }: SalesDonutChartProps) {
  const totalCv = leftCv + rightCv || 1;
  const rightRatio = rightCv / totalCv;
  const dashArray = 427;
  const dashOffset = dashArray - dashArray * rightRatio;

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative z-10">
      <div className="relative w-44 h-44 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="88"
            cy="88"
            r="68"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="20"
            fill="transparent"
          />
          {/* Progress Circle (Salmon/Coral) */}
          <circle
            cx="88"
            cy="88"
            r="68"
            stroke="#ff5e5e"
            strokeWidth="20"
            fill="transparent"
            strokeDasharray={dashArray.toString()}
            strokeDashoffset={dashOffset.toString()}
            strokeLinecap="round"
            className="drop-shadow-[0_0_15px_rgba(255,94,94,0.4)] transition-all duration-1000"
          />
        </svg>
      </div>
    </div>
  );
}
