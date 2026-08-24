import React from 'react';

/**
 * Clean & Simple Minimalist PortfolioForge Logo & Icon
 * Features an ultra-minimal geometric "PF" monogram on a rounded dark tile.
 */
export function LogoIcon({ size = 28, className = '', accentColor = '#447244' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 ${className}`}
      aria-hidden="true"
    >
      {/* Clean Dark Rounded Tile */}
      <rect width="32" height="32" rx="8" fill="#18181B" />
      
      {/* P Stem & Loop */}
      <path
        d="M10 8v16"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M10 8h7.5a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4H10"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* F Crossbar in Theme Accent */}
      <path
        d="M10 16.5h6"
        stroke={accentColor || '#447244'}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function PortfolioForgeLogo({
  size = 28,
  showText = true,
  subtitle,
  textColor,
  accentColor = '#447244',
  className = '',
  iconClassName = '',
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoIcon size={size} className={iconClassName} accentColor={accentColor} />
      {showText && (
        <div className="flex flex-col select-none">
          <span
            className="font-bold text-[15px] tracking-tight leading-tight transition-colors"
            style={{ color: textColor || 'currentColor' }}
          >
            PortfolioForge
          </span>
          {subtitle && (
            <span
              className="text-[9.5px] font-bold uppercase tracking-widest leading-none mt-0.5 opacity-80"
              style={{ color: accentColor }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
