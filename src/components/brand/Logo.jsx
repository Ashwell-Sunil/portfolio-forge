import React from 'react';

/**
 * Clean & Elegant Minimalist Folio Vitae Logo & Icon
 * Features an ultra-minimal geometric "FV" monogram on a rounded dark tile.
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

      {/* F Stem & Bars */}
      <path
        d="M8.5 8.5v15"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M8.5 8.5h8"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M8.5 15h5.5"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* V in Theme Accent */}
      <path
        d="M17.5 13l3.5 10.5 4-10.5"
        stroke={accentColor || '#447244'}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FolioVitaeLogo({
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
            Folio Vitae
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

export { FolioVitaeLogo as PortfolioForgeLogo };

