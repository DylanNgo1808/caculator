
import React from 'react';

interface RoiGaugeProps {
  roi: number;
}

const RoiGauge: React.FC<RoiGaugeProps> = ({ roi }) => {
  const GAUGE_MAX_ROI = 500; // Cap the gauge visually at 500%
  const clampedRoi = Math.min(Math.max(roi, 0), GAUGE_MAX_ROI);
  const percentage = clampedRoi / GAUGE_MAX_ROI;
  const angle = percentage * 180;
  
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;       
  }

  const arcPath = describeArc(100, 100, 70, 0, angle);

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <svg viewBox="0 0 200 110" className="w-full">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <path d={describeArc(100, 100, 70, 0, 180)} fill="none" stroke="#4B5563" strokeWidth="20" strokeLinecap="round" />
        <path d={arcPath} fill="none" stroke="url(#gaugeGradient)" strokeWidth="20" strokeLinecap="round" />
        <text x="100" y="90" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#FFFFFF">
          {isFinite(roi) ? roi.toFixed(0) : '...'}%
        </text>
         <text x="100" y="110" textAnchor="middle" fontSize="14" fill="#D1D5DB">
          ROI
        </text>
      </svg>
    </div>
  );
};

export default RoiGauge;
