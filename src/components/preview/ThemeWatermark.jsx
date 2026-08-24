import React from 'react';

/**
 * Dedicated ThemeWatermark Component
 * Fully adaptive across all 3 layout modes: 'classic', 'minimal', and 'bento'.
 * Supports 13 curated aesthetic & dark themes with distinct inline vector artwork.
 */
export default function ThemeWatermark({
  themeId = 'sage-cream',
  layout = 'classic',
  color: propColor,
  variant = 'page',
}) {
  const id = String(themeId || '').toLowerCase();

  const isBlush = id.includes('blush') || id.includes('rose');
  const isSage = (id.includes('sage') || id.includes('olive') || id.includes('cream')) && !isBlush;
  const isOceanic = id.includes('oceanic') || id.includes('drift') || id.includes('marine');
  const isGraphite = id.includes('graphite') || id.includes('minimal');
  const isEngineering = id.includes('engineering') || id.includes('blueprint');
  const isNordic = id.includes('nordic') || id.includes('slate');
  const isMatcha = id.includes('matcha') || id.includes('canvas') || id.includes('zen');
  const isLilac = id.includes('lilac') || id.includes('mist') || id.includes('astral') || id.includes('lavender');
  const isAmber = id.includes('amber') || id.includes('glow') || id.includes('solar');
  const isSandstone = id.includes('sandstone') || id.includes('desert') || id.includes('dune');

  // 3 New Rich Dark Themes
  const isObsidian = id.includes('obsidian') || id.includes('ember');
  const isMidnight = id.includes('midnight') || id.includes('abyss');
  const isEmerald = id.includes('emerald') || id.includes('eclipse');

  const activeColor = propColor || 'var(--pf-accent, currentColor)';

  // If used inside a card (e.g. Bento header card corner accent)
  if (variant === 'card') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
        {/* Blush Rose Card Inset */}
        {isBlush && (
          <div className="absolute -top-6 -right-6 w-56 h-56 pointer-events-none opacity-40">
            <svg viewBox="0 0 300 300" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.8">
              <path
                d="M150 40 C190 20, 240 40, 250 80 C260 120, 230 150, 200 160 C160 170, 120 150, 110 110 C100 70, 120 50, 150 40 Z"
                fill={activeColor}
                fillOpacity="0.12"
              />
              <circle cx="180" cy="110" r="14" fill={activeColor} fillOpacity="0.2" />
              <path d="M190 140 C220 180, 250 230, 270 270" strokeWidth="2" strokeLinecap="round" />
              <path d="M220 180 C250 165, 270 180, 275 200 C255 210, 230 200, 220 180 Z" fill={activeColor} fillOpacity="0.15" />
            </svg>
          </div>
        )}

        {/* Lilac Lavender Card Inset */}
        {isLilac && (
          <div className="absolute -top-6 -right-6 w-56 h-56 pointer-events-none opacity-40">
            <svg viewBox="0 0 300 300" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.8">
              <path d="M 60 280 C 90 190, 140 110, 190 20" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="180" cy="40" rx="9" ry="16" transform="rotate(35 180 40)" fill={activeColor} fillOpacity="0.16" />
              <ellipse cx="160" cy="55" rx="9" ry="16" transform="rotate(-35 160 55)" fill={activeColor} fillOpacity="0.16" />
              <ellipse cx="170" cy="85" rx="10" ry="17" transform="rotate(30 170 85)" fill={activeColor} fillOpacity="0.16" />
              <ellipse cx="145" cy="100" rx="10" ry="17" transform="rotate(-35 145 100)" fill={activeColor} fillOpacity="0.16" />
              <ellipse cx="155" cy="130" rx="10" ry="18" transform="rotate(25 155 130)" fill={activeColor} fillOpacity="0.16" />
            </svg>
          </div>
        )}

        {/* Obsidian Ember Card Inset */}
        {isObsidian && (
          <div className="absolute -top-6 -right-6 w-56 h-56 pointer-events-none opacity-30">
            <svg viewBox="0 0 300 300" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.6">
              <polygon points="150,30 250,90 250,210 150,270 50,210 50,90" />
              <line x1="150" y1="30" x2="150" y2="270" strokeDasharray="4 4" />
              <line x1="50" y1="90" x2="250" y2="210" strokeDasharray="4 4" />
              <line x1="50" y1="210" x2="250" y2="90" strokeDasharray="4 4" />
              <circle cx="150" cy="150" r="8" fill={activeColor} fillOpacity="0.3" />
            </svg>
          </div>
        )}

        {/* Midnight Abyss Card Inset */}
        {isMidnight && (
          <div className="absolute -top-6 -right-6 w-56 h-56 pointer-events-none opacity-30">
            <svg viewBox="0 0 300 300" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.6">
              <circle cx="220" cy="80" r="50" />
              <circle cx="220" cy="80" r="90" strokeDasharray="6 6" />
              <circle cx="220" cy="80" r="130" strokeDasharray="8 8" />
              <circle cx="220" cy="80" r="170" />
            </svg>
          </div>
        )}

        {/* Emerald Eclipse Card Inset */}
        {isEmerald && (
          <div className="absolute -top-6 -right-6 w-56 h-56 pointer-events-none opacity-30">
            <svg viewBox="0 0 300 300" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.8">
              <path d="M 40 280 C 110 200, 180 130, 260 20" strokeWidth="2.2" strokeLinecap="round" />
              <polygon points="180,110 240,60 230,130" fill={activeColor} fillOpacity="0.15" />
              <polygon points="140,160 200,120 180,180" fill={activeColor} fillOpacity="0.15" />
              <polygon points="100,210 160,170 140,230" fill={activeColor} fillOpacity="0.15" />
            </svg>
          </div>
        )}

        {/* Sage Olive Card Inset */}
        {isSage && (
          <div className="absolute -top-6 -right-6 w-56 h-56 pointer-events-none opacity-35">
            <svg viewBox="0 0 300 300" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.8">
              <path d="M 40 280 C 110 200, 170 130, 240 20" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 120 180 C 70 150, 65 120, 95 110 C 130 115, 140 150, 120 180 Z" fill={activeColor} fillOpacity="0.15" />
              <path d="M 160 140 C 210 110, 220 80, 195 75 C 165 80, 155 110, 160 140 Z" fill={activeColor} fillOpacity="0.15" />
              <ellipse cx="120" cy="155" rx="7" ry="11" transform="rotate(-30 120 155)" fill={activeColor} fillOpacity="0.2" />
            </svg>
          </div>
        )}
      </div>
    );
  }

  // ─── Default Page-Level Watermark Container ───
  return (
    <div
      className={`theme-watermark-overlay pointer-events-none select-none absolute inset-0 w-full h-full overflow-hidden pf-layout-${layout}`}
      style={{ zIndex: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* ══════════════════════════════════════════════════════════════════════
          1. BLUSH & ROSE: FLUID BOTANICAL FLORAL & ROSE PETALS
      ══════════════════════════════════════════════════════════════════════ */}
      {isBlush && (
        <>
          <div
            className={`absolute pointer-events-none ${
              layout === 'minimal'
                ? 'top-4 right-4 sm:right-12 w-[22rem] sm:w-[28rem] h-[22rem] sm:h-[28rem]'
                : layout === 'bento'
                ? 'top-2 right-2 sm:right-8 w-[24rem] sm:w-[32rem] h-[24rem] sm:h-[32rem]'
                : 'top-0 right-0 w-[24rem] sm:w-[32rem] md:w-[38rem] h-[24rem] sm:h-[32rem] md:h-[38rem]'
            }`}
          >
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              fill="none"
              stroke={activeColor}
              strokeWidth="1.8"
              style={{ strokeOpacity: 0.42 }}
            >
              <g transform="translate(80, -10)">
                <path
                  d="M160 40 C210 20, 270 40, 280 90 C290 140, 250 170, 220 180 C180 190, 130 170, 120 120 C110 70, 130 50, 160 40 Z"
                  fill={activeColor}
                  fillOpacity="0.1"
                />
                <path
                  d="M90 100 C70 150, 90 210, 140 230 C190 250, 240 230, 260 190 C280 150, 260 100, 220 90 C180 80, 110 70, 90 100 Z"
                  fill={activeColor}
                  fillOpacity="0.09"
                />
                <path
                  d="M200 130 C240 120, 280 150, 270 190 C260 230, 210 250, 170 240 C130 230, 120 190, 140 150 C160 120, 180 130, 200 130 Z"
                  fill={activeColor}
                  fillOpacity="0.11"
                />
                <path
                  d="M170 110 C190 95, 220 100, 230 120 C240 140, 225 160, 205 165 C185 170, 165 155, 160 135 C155 120, 160 115, 170 110 Z"
                  fill={activeColor}
                  fillOpacity="0.14"
                />
                <circle cx="195" cy="135" r="14" fill={activeColor} fillOpacity="0.22" />
                <path d="M190 130 Q195 125 200 130 T195 140" strokeWidth="2.2" />

                <path d="M250 180 C290 220, 330 280, 350 340" strokeWidth="2.2" strokeLinecap="round" />
                <path
                  d="M280 220 C320 205, 345 220, 350 245 C325 255, 295 245, 280 220 Z"
                  fill={activeColor}
                  fillOpacity="0.14"
                />
                <path
                  d="M310 270 C345 260, 370 275, 375 295 C350 305, 325 295, 310 270 Z"
                  fill={activeColor}
                  fillOpacity="0.14"
                />
                <path d="M130 190 C90 230, 60 270, 40 330" strokeWidth="2.2" strokeLinecap="round" />
                <path
                  d="M100 230 C65 220, 40 235, 35 255 C60 265, 85 255, 100 230 Z"
                  fill={activeColor}
                  fillOpacity="0.14"
                />
              </g>

              <path
                d="M50 80 C70 60, 100 70, 105 95 C100 115, 75 120, 55 110 C40 100, 40 85, 50 80 Z"
                fill={activeColor}
                fillOpacity="0.12"
              />
              <path
                d="M100 150 C120 135, 145 145, 145 165 C140 180, 120 185, 105 175 C95 165, 90 155, 100 150 Z"
                fill={activeColor}
                fillOpacity="0.12"
              />
            </svg>
          </div>

          {(layout === 'minimal' || layout === 'bento') && (
            <div className="absolute top-24 left-2 sm:left-8 w-[18rem] sm:w-[24rem] h-[18rem] sm:h-[24rem] pointer-events-none">
              <svg viewBox="0 0 300 300" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.8" style={{ strokeOpacity: 0.35 }}>
                <g transform="translate(20, 20)">
                  <path
                    d="M80 60 C120 35, 165 50, 175 85 C185 120, 150 145, 125 155 C90 165, 55 140, 50 105 Z"
                    fill={activeColor}
                    fillOpacity="0.1"
                  />
                  <circle cx="115" cy="100" r="10" fill={activeColor} fillOpacity="0.18" />
                  <path d="M125 155 C140 200, 170 235, 220 260" strokeWidth="2" />
                  <path d="M150 190 C180 175, 200 190, 205 205 C185 215, 165 205, 150 190 Z" fill={activeColor} fillOpacity="0.12" />
                </g>
              </svg>
            </div>
          )}

          <div className="absolute bottom-6 left-2 sm:left-6 w-[20rem] sm:w-[28rem] h-[20rem] sm:h-[28rem] pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.8" style={{ strokeOpacity: 0.35 }}>
              <g transform="translate(-10, 100)">
                <path
                  d="M120 80 C160 50, 210 70, 220 110 C230 150, 190 180, 160 190 C120 200, 80 170, 75 130 C70 90, 95 85, 120 80 Z"
                  fill={activeColor}
                  fillOpacity="0.1"
                />
                <path
                  d="M130 110 C155 95, 185 105, 190 125 C195 145, 175 165, 155 165 C135 165, 120 145, 125 125 Z"
                  fill={activeColor}
                  fillOpacity="0.14"
                />
                <circle cx="155" cy="135" r="12" fill={activeColor} fillOpacity="0.2" />
                <path d="M160 190 C180 250, 220 290, 280 320" strokeWidth="2" />
                <path d="M200 230 C235 215, 260 230, 265 250 C240 260, 215 250, 200 230 Z" fill={activeColor} fillOpacity="0.12" />
              </g>
            </svg>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          2. LILAC MIST: DELICATE LAVENDER BOTANICAL SPRIGS & BUDS
      ══════════════════════════════════════════════════════════════════════ */}
      {isLilac && (
        <>
          <div
            className={`absolute pointer-events-none ${
              layout === 'minimal'
                ? 'top-4 right-4 sm:right-12 w-[22rem] sm:w-[28rem] h-[22rem] sm:h-[28rem]'
                : layout === 'bento'
                ? 'top-2 right-2 sm:right-8 w-[24rem] sm:w-[32rem] h-[24rem] sm:h-[32rem]'
                : 'top-0 right-0 w-[24rem] sm:w-[32rem] md:w-[38rem] h-[24rem] sm:h-[32rem] md:h-[38rem]'
            }`}
          >
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              fill="none"
              stroke={activeColor}
              strokeWidth="1.8"
              style={{ strokeOpacity: 0.42 }}
            >
              <g transform="translate(120, 10)">
                <path d="M 60 380 C 80 270, 130 160, 180 30" strokeWidth="2.2" strokeLinecap="round" />
                <ellipse cx="170" cy="50" rx="10" ry="18" transform="rotate(35 170 50)" fill={activeColor} fillOpacity="0.16" />
                <ellipse cx="150" cy="65" rx="10" ry="18" transform="rotate(-35 150 65)" fill={activeColor} fillOpacity="0.16" />
                <ellipse cx="160" cy="95" rx="11" ry="19" transform="rotate(30 160 95)" fill={activeColor} fillOpacity="0.16" />
                <ellipse cx="135" cy="110" rx="11" ry="19" transform="rotate(-35 135 110)" fill={activeColor} fillOpacity="0.16" />
                <ellipse cx="145" cy="145" rx="12" ry="20" transform="rotate(25 145 145)" fill={activeColor} fillOpacity="0.16" />
                <ellipse cx="120" cy="160" rx="12" ry="20" transform="rotate(-30 120 160)" fill={activeColor} fillOpacity="0.16" />
                <ellipse cx="130" cy="195" rx="12" ry="21" transform="rotate(20 130 195)" fill={activeColor} fillOpacity="0.16" />
                <ellipse cx="105" cy="210" rx="12" ry="21" transform="rotate(-25 105 210)" fill={activeColor} fillOpacity="0.16" />
                <ellipse cx="115" cy="245" rx="12" ry="21" transform="rotate(20 115 245)" fill={activeColor} fillOpacity="0.16" />
                <ellipse cx="90" cy="260" rx="12" ry="21" transform="rotate(-25 90 260)" fill={activeColor} fillOpacity="0.16" />

                <path d="M 85 300 C 140 275, 185 285, 205 310 C 170 315, 125 310, 85 300 Z" fill={activeColor} fillOpacity="0.12" />
                <path d="M 75 330 C 20 305, -20 315, -40 340 C -5 345, 40 340, 75 330 Z" fill={activeColor} fillOpacity="0.12" />

                <path d="M 70 350 C 40 280, 20 200, 10 120" strokeWidth="1.8" strokeLinecap="round" />
                <ellipse cx="15" cy="140" rx="8" ry="14" transform="rotate(30 15 140)" fill={activeColor} fillOpacity="0.14" />
                <ellipse cx="0" cy="155" rx="8" ry="14" transform="rotate(-30 0 155)" fill={activeColor} fillOpacity="0.14" />
                <ellipse cx="10" cy="180" rx="8" ry="15" transform="rotate(25 10 180)" fill={activeColor} fillOpacity="0.14" />
                <ellipse cx="-5" cy="195" rx="8" ry="15" transform="rotate(-25 -5 195)" fill={activeColor} fillOpacity="0.14" />
              </g>
            </svg>
          </div>

          {(layout === 'minimal' || layout === 'bento') && (
            <div className="absolute top-24 left-2 sm:left-8 w-[18rem] sm:w-[24rem] h-[18rem] sm:h-[24rem] pointer-events-none">
              <svg viewBox="0 0 300 300" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.8" style={{ strokeOpacity: 0.35 }}>
                <g transform="translate(40, 30)">
                  <path d="M 60 240 C 75 160, 100 90, 130 10" strokeWidth="2" strokeLinecap="round" />
                  <ellipse cx="125" cy="30" rx="8" ry="14" transform="rotate(30 125 30)" fill={activeColor} fillOpacity="0.14" />
                  <ellipse cx="110" cy="45" rx="8" ry="14" transform="rotate(-35 110 45)" fill={activeColor} fillOpacity="0.14" />
                  <ellipse cx="115" cy="75" rx="9" ry="15" transform="rotate(25 115 75)" fill={activeColor} fillOpacity="0.14" />
                  <ellipse cx="98" cy="90" rx="9" ry="15" transform="rotate(-30 98 90)" fill={activeColor} fillOpacity="0.14" />
                </g>
              </svg>
            </div>
          )}

          <div className="absolute bottom-6 left-2 sm:left-6 w-[20rem] sm:w-[28rem] h-[20rem] sm:h-[28rem] pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.8" style={{ strokeOpacity: 0.35 }}>
              <g transform="translate(30, 100)">
                <path d="M 60 280 C 80 190, 110 110, 140 20" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="135" cy="40" rx="8" ry="15" transform="rotate(30 135 40)" fill={activeColor} fillOpacity="0.14" />
                <ellipse cx="118" cy="55" rx="8" ry="15" transform="rotate(-35 118 55)" fill={activeColor} fillOpacity="0.14" />
                <ellipse cx="125" cy="85" rx="9" ry="16" transform="rotate(25 125 85)" fill={activeColor} fillOpacity="0.14" />
                <ellipse cx="105" cy="100" rx="9" ry="16" transform="rotate(-30 105 100)" fill={activeColor} fillOpacity="0.14" />
                <ellipse cx="110" cy="130" rx="9" ry="16" transform="rotate(20 110 130)" fill={activeColor} fillOpacity="0.14" />
                <ellipse cx="90" cy="145" rx="9" ry="16" transform="rotate(-25 90 145)" fill={activeColor} fillOpacity="0.14" />
              </g>
            </svg>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          11. OBSIDIAN EMBER: ISOMETRIC GEOMETRIC WIREFRAME GRID
      ══════════════════════════════════════════════════════════════════════ */}
      {isObsidian && (
        <>
          <div className="absolute top-0 right-0 w-[24rem] sm:w-[32rem] md:w-[38rem] h-[24rem] sm:h-[32rem] md:h-[38rem] pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.5" style={{ strokeOpacity: 0.32 }}>
              <g transform="translate(60, 20)">
                {/* Isometric Cube Grid */}
                <polygon points="180,40 300,110 300,250 180,320 60,250 60,110" />
                <polygon points="180,95 245,135 245,215 180,255 115,215 115,135" strokeDasharray="5 5" />
                <line x1="180" y1="40" x2="180" y2="320" />
                <line x1="60" y1="110" x2="300" y2="250" />
                <line x1="60" y1="250" x2="300" y2="110" />
                {/* Ember Wireframe Nodes */}
                <circle cx="180" cy="40" r="5" fill={activeColor} fillOpacity="0.5" />
                <circle cx="300" cy="110" r="5" fill={activeColor} fillOpacity="0.5" />
                <circle cx="300" cy="250" r="5" fill={activeColor} fillOpacity="0.5" />
                <circle cx="180" cy="320" r="5" fill={activeColor} fillOpacity="0.5" />
                <circle cx="60" cy="250" r="5" fill={activeColor} fillOpacity="0.5" />
                <circle cx="60" cy="110" r="5" fill={activeColor} fillOpacity="0.5" />
                <circle cx="180" cy="180" r="7" fill={activeColor} fillOpacity="0.6" />
              </g>
            </svg>
          </div>
          <div className="absolute bottom-6 left-2 sm:left-6 w-[20rem] sm:w-[26rem] h-[20rem] sm:h-[26rem] pointer-events-none">
            <svg viewBox="0 0 300 300" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.5" style={{ strokeOpacity: 0.28 }}>
              <polygon points="150,30 250,90 250,210 150,270 50,210 50,90" />
              <line x1="150" y1="30" x2="150" y2="270" strokeDasharray="4 4" />
            </svg>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          12. MIDNIGHT ABYSS: BATHYMETRIC CONTOUR & SONAR WAVE LINES
      ══════════════════════════════════════════════════════════════════════ */}
      {isMidnight && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.5" style={{ strokeOpacity: 0.28 }}>
            {/* Deep Bathymetric Flow Curves */}
            <path d="M 0 140 C 280 60, 520 220, 780 120 C 900 70, 1000 130, 1050 110" />
            <path d="M 0 260 C 260 170, 500 330, 760 230 C 880 180, 1000 240, 1050 220" />
            <path d="M 0 380 C 240 290, 480 440, 740 340 C 860 290, 1000 350, 1050 330" />
            <path d="M 0 500 C 220 410, 460 550, 720 450 C 840 400, 1000 460, 1050 440" />
            <path d="M 0 620 C 200 530, 440 660, 700 560 C 820 510, 1000 570, 1050 550" />
            <path d="M 0 740 C 180 650, 420 770, 680 670 C 800 620, 1000 680, 1050 660" />
            <path d="M 0 860 C 160 770, 400 880, 660 780 C 780 730, 1000 790, 1050 770" />
            {/* Sonar Depth Echo Arcs (Top Right) */}
            <g transform="translate(650, -40)" strokeWidth="1.6" opacity="0.8">
              <circle cx="250" cy="150" r="80" />
              <circle cx="250" cy="150" r="140" strokeDasharray="6 6" />
              <circle cx="250" cy="150" r="200" />
              <circle cx="250" cy="150" r="260" strokeDasharray="8 8" />
            </g>
          </svg>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          13. EMERALD ECLIPSE: GEOMETRIC BOTANICAL FROND / LEAF VECTORS
      ══════════════════════════════════════════════════════════════════════ */}
      {isEmerald && (
        <>
          <div className="absolute top-0 right-0 w-[24rem] sm:w-[32rem] md:w-[38rem] h-[24rem] sm:h-[32rem] md:h-[38rem] pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.75" style={{ strokeOpacity: 0.35 }}>
              <g transform="translate(100, 10)">
                {/* Geometric Monstera Frond */}
                <path d="M 50 380 C 120 280, 190 180, 270 30" strokeWidth="2.4" strokeLinecap="round" />
                <polygon points="180,100 260,40 240,120" fill={activeColor} fillOpacity="0.16" />
                <polygon points="140,160 220,100 190,180" fill={activeColor} fillOpacity="0.16" />
                <polygon points="100,220 180,160 140,240" fill={activeColor} fillOpacity="0.16" />
                <polygon points="60,280 140,220 100,300" fill={activeColor} fillOpacity="0.16" />
                <polygon points="200,90 120,40 150,110" fill={activeColor} fillOpacity="0.14" />
                <polygon points="160,150 80,100 110,170" fill={activeColor} fillOpacity="0.14" />
                <polygon points="120,210 40,160 70,230" fill={activeColor} fillOpacity="0.14" />
              </g>
            </svg>
          </div>
          <div className="absolute bottom-6 left-2 sm:left-6 w-[20rem] sm:w-[26rem] h-[20rem] sm:h-[26rem] pointer-events-none">
            <svg viewBox="0 0 300 300" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.6" style={{ strokeOpacity: 0.3 }}>
              <g transform="translate(20, 80)">
                <path d="M 40 240 C 90 170, 140 100, 200 10" strokeWidth="2" strokeLinecap="round" />
                <polygon points="140,70 190,30 170,90" fill={activeColor} fillOpacity="0.14" />
                <polygon points="110,120 160,80 140,140" fill={activeColor} fillOpacity="0.14" />
                <polygon points="80,170 130,130 110,190" fill={activeColor} fillOpacity="0.14" />
              </g>
            </svg>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          3. SAGE & OLIVE: ORGANIC MONSTERA & OLIVE BRANCH FOLIAGE
      ══════════════════════════════════════════════════════════════════════ */}
      {isSage && (
        <>
          <div className="absolute top-0 right-0 w-[24rem] sm:w-[32rem] h-[24rem] sm:h-[32rem] pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.8" style={{ strokeOpacity: 0.38 }}>
              <g transform="translate(90, -10)">
                <path d="M 40 380 C 120 280, 200 180, 290 30" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M 140 250 C 80 210, 75 170, 110 160 C 150 165, 160 210, 140 250 Z" fill={activeColor} fillOpacity="0.13" />
                <path d="M 190 190 C 260 150, 275 110, 240 100 C 200 105, 185 150, 190 190 Z" fill={activeColor} fillOpacity="0.13" />
                <path d="M 230 140 C 220 70, 190 50, 165 65 C 175 105, 205 130, 230 140 Z" fill={activeColor} fillOpacity="0.13" />
                <path d="M 100 290 C 40 270, 20 235, 35 220 C 75 225, 100 260, 100 290 Z" fill={activeColor} fillOpacity="0.13" />
                <ellipse cx="140" cy="215" rx="8" ry="13" transform="rotate(-30 140 215)" fill={activeColor} fillOpacity="0.2" />
                <ellipse cx="210" cy="155" rx="8" ry="13" transform="rotate(35 210 155)" fill={activeColor} fillOpacity="0.2" />
              </g>
            </svg>
          </div>
          <div className="absolute bottom-4 left-0 w-[20rem] sm:w-[28rem] h-[20rem] sm:h-[28rem] pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.8" style={{ strokeOpacity: 0.32 }}>
              <g transform="translate(-10, 90)">
                <path d="M 320 20 C 220 100, 150 190, 40 300" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M 190 130 C 250 170, 260 210, 225 220 C 190 210, 180 170, 190 130 Z" fill={activeColor} fillOpacity="0.12" />
                <path d="M 140 180 C 80 215, 70 255, 105 265 C 140 260, 150 215, 140 180 Z" fill={activeColor} fillOpacity="0.12" />
              </g>
            </svg>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          4. OCEANIC DRIFT: CLEAN MARINE WAVES & FLUID SWELLS
      ══════════════════════════════════════════════════════════════════════ */}
      {isOceanic && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.8" style={{ strokeOpacity: 0.3 }}>
            <path d="M 0 120 C 250 40, 500 200, 750 120 C 900 70, 1000 140, 1050 120" />
            <path d="M 0 240 C 250 160, 500 320, 750 240 C 900 190, 1000 260, 1050 240" />
            <path d="M 0 360 C 250 280, 500 440, 750 360 C 900 310, 1000 380, 1050 360" />
            <path d="M 0 480 C 250 400, 500 560, 750 480 C 900 430, 1000 500, 1050 480" />
            <path d="M 0 600 C 250 520, 500 680, 750 600 C 900 550, 1000 620, 1050 600" />
            <path d="M 0 720 C 250 640, 500 800, 750 720 C 900 670, 1000 740, 1050 720" />
            <path d="M 0 840 C 250 760, 500 920, 750 840 C 900 790, 1000 860, 1050 840" />
          </svg>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          5. GRAPHITE MINIMAL: CLEAN TOPOGRAPHIC ELEVATION CONTOURS
      ══════════════════════════════════════════════════════════════════════ */}
      {isGraphite && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.5" style={{ strokeOpacity: 0.28 }}>
            <path d="M 30 100 Q 260 20 520 90 T 980 130" />
            <path d="M 15 190 Q 280 80 540 170 T 990 230" />
            <path d="M 0 280 Q 300 150 570 260 T 1000 340" />
            <path d="M 0 380 Q 320 230 600 360 T 1000 450" />
            <path d="M 0 480 Q 340 310 630 460 T 1000 570" />
            <path d="M 0 580 Q 360 390 660 560 T 1000 690" />
            <path d="M 0 680 Q 380 470 700 660 T 1000 810" />
            <path d="M 0 780 Q 400 550 730 760 T 1000 930" />
            <circle cx="540" cy="170" r="3" fill={activeColor} fillOpacity="0.45" />
            <circle cx="600" cy="360" r="3" fill={activeColor} fillOpacity="0.45" />
            <circle cx="660" cy="560" r="3" fill={activeColor} fillOpacity="0.45" />
          </svg>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          6. ENGINEERING DARK: SLEEK FAINT WIREFRAME & BLUEPRINT GRID
      ══════════════════════════════════════════════════════════════════════ */}
      {isEngineering && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.1" style={{ strokeOpacity: 0.18 }}>
            <g opacity="0.6">
              <line x1="200" y1="0" x2="200" y2="1000" strokeDasharray="6 6" />
              <line x1="500" y1="0" x2="500" y2="1000" strokeDasharray="6 6" />
              <line x1="800" y1="0" x2="800" y2="1000" strokeDasharray="6 6" />
              <line x1="0" y1="200" x2="1000" y2="200" strokeDasharray="6 6" />
              <line x1="0" y1="500" x2="1000" y2="500" strokeDasharray="6 6" />
              <line x1="0" y1="800" x2="1000" y2="800" strokeDasharray="6 6" />
            </g>
            <g transform="translate(680, 80)">
              <rect x="0" y="0" width="220" height="220" strokeDasharray="8 6" />
              <circle cx="0" cy="0" r="8" fill={activeColor} fillOpacity="0.3" />
              <circle cx="220" cy="0" r="8" fill={activeColor} fillOpacity="0.3" />
              <circle cx="0" cy="220" r="8" fill={activeColor} fillOpacity="0.3" />
              <circle cx="220" cy="220" r="8" fill={activeColor} fillOpacity="0.3" />
              <path d="M 0 110 L 110 110 L 110 220" strokeWidth="1.5" />
              <circle cx="110" cy="110" r="12" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          7. NORDIC SLATE: REFINED BAUHAUS POLYGONAL GEOMETRY
      ══════════════════════════════════════════════════════════════════════ */}
      {isNordic && (
        <div className="absolute top-0 right-0 w-[24rem] sm:w-[32rem] h-[24rem] sm:h-[32rem] pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.5" style={{ strokeOpacity: 0.35 }}>
            <g transform="translate(70, 20)">
              <polygon points="150,20 270,90 270,230 150,300 30,230 30,90" />
              <polygon points="150,60 230,110 230,205 150,255 70,205 70,110" strokeDasharray="5 5" />
              <line x1="150" y1="20" x2="150" y2="300" />
              <line x1="30" y1="90" x2="270" y2="230" />
              <line x1="30" y1="230" x2="270" y2="90" />
            </g>
          </svg>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          8. MATCHA CANVAS: ZEN ENSO & MINIMAL BAMBOO STALKS
      ══════════════════════════════════════════════════════════════════════ */}
      {isMatcha && (
        <>
          <div className="absolute top-0 right-0 w-[24rem] sm:w-[32rem] h-[24rem] sm:h-[32rem] pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.8" style={{ strokeOpacity: 0.38 }}>
              <g transform="translate(90, 20)">
                <path
                  d="M 150 40 C 230 40 290 100 290 180 C 290 260 230 320 150 320 C 70 320 15 260 15 180 C 15 110 60 55 130 42"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                <circle cx="150" cy="180" r="95" strokeDasharray="5 7" strokeWidth="1.4" />
              </g>
            </svg>
          </div>
          <div className="absolute top-0 left-4 w-28 h-full pointer-events-none">
            <svg viewBox="0 0 100 800" preserveAspectRatio="none" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="2.2" style={{ strokeOpacity: 0.3 }}>
              <line x1="50" y1="0" x2="50" y2="240" strokeLinecap="round" />
              <line x1="50" y1="255" x2="50" y2="520" strokeLinecap="round" />
              <line x1="50" y1="535" x2="50" y2="800" strokeLinecap="round" />
              <path d="M 50 250 C 90 220 120 230 135 250 C 105 260 75 255 50 250 Z" fill={activeColor} fillOpacity="0.14" />
              <path d="M 50 530 C 10 500 -20 510 -35 530 C -5 540 25 535 50 530 Z" fill={activeColor} fillOpacity="0.14" />
            </svg>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          9. AMBER GLOW: TASTEFUL GEOMETRIC SUNBURST & SOLAR ARCS
      ══════════════════════════════════════════════════════════════════════ */}
      {isAmber && (
        <div className="absolute top-0 right-0 w-[24rem] sm:w-[32rem] h-[24rem] sm:h-[32rem] pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.6" style={{ strokeOpacity: 0.38 }}>
            <g transform="translate(170, -20)">
              <circle cx="200" cy="100" r="60" />
              <circle cx="200" cy="100" r="110" strokeDasharray="6 6" />
              <circle cx="200" cy="100" r="160" />
              <circle cx="200" cy="100" r="210" strokeDasharray="5 7" />
              <circle cx="200" cy="100" r="260" />
              <line x1="200" y1="100" x2="-10" y2="320" strokeDasharray="5 7" opacity="0.65" />
              <line x1="200" y1="100" x2="30" y2="200" opacity="0.65" />
              <line x1="200" y1="100" x2="100" y2="330" opacity="0.65" />
            </g>
          </svg>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          10. SANDSTONE DESERT: FLOWING DUNE CONTOURS & STRATA
      ══════════════════════════════════════════════════════════════════════ */}
      {(isSandstone || (!isBlush && !isSage && !isOceanic && !isGraphite && !isEngineering && !isNordic && !isMatcha && !isLilac && !isAmber && !isObsidian && !isMidnight && !isEmerald)) && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full" fill="none" stroke={activeColor} strokeWidth="1.6" style={{ strokeOpacity: 0.3 }}>
            <path d="M 0 140 C 240 70, 480 240, 1000 100" />
            <path d="M 0 260 C 260 170, 510 350, 1000 200" />
            <path d="M 0 380 C 280 270, 540 460, 1000 300" />
            <path d="M 0 500 C 300 370, 570 570, 1000 400" />
            <path d="M 0 620 C 320 470, 600 680, 1000 500" />
            <path d="M 0 740 C 340 570, 630 790, 1000 600" />
            <path d="M 0 860 C 360 670, 660 900, 1000 700" />
          </svg>
        </div>
      )}
    </div>
  );
}
