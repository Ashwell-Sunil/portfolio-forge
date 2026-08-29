import React from 'react';
import { motion } from 'motion/react';

/**
 * AuroraBackground
 * Ethereal, layered luminous gradients creating cosmic depth
 */
export default function AuroraBackground({
  children,
  className = '',
  showRadialGradient = true,
  accentColor = '#6366f1',
}) {
  return (
    <div className={`relative flex flex-col items-center justify-center bg-[#05070E] text-slate-100 overflow-hidden ${className}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -inset-[10px] opacity-40 blur-[90px] will-change-transform"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 65% 55% at 50% -10%, ${accentColor} 0%, transparent 60%),
              radial-gradient(ellipse 55% 45% at 85% 15%, #a855f7 0%, transparent 55%),
              radial-gradient(ellipse 50% 40% at 15% 25%, #06b6d4 0%, transparent 50%),
              radial-gradient(ellipse 60% 45% at 60% 60%, #3b82f6 0%, transparent 60%)
            `,
          }}
        />

        {showRadialGradient && (
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-[#05070E]/60 pointer-events-none" />
        )}
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
