/**
 * PortfolioForge 10 Diverse, Theme-Specific SVG Background Graphics
 * Each theme has a completely unique, thematically accurate SVG pattern.
 * Opacity calibrated to 0.08 - 0.14 for noticeable visual depth and perfect legibility.
 */

export default function BackgroundWatermarks({ type, color = '#447244' }) {
  switch (type) {
    // ─── 1. Blush & Rose: Delicate Floral Petals & Rose Buds ──────────────────
    case 'floral-petals':
    case 'floral':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
          <svg className="absolute -top-12 -right-12 w-[38rem] h-[38rem] opacity-[0.12]" viewBox="0 0 400 400" fill="none" stroke={color} strokeWidth="1.8">
            <circle cx="200" cy="200" r="32" fill={color} fillOpacity="0.2" />
            <path d="M200 40 C235 110 235 155 200 160 C165 155 165 110 200 40 Z" fill={color} fillOpacity="0.18" />
            <path d="M200 360 C235 290 235 245 200 240 C165 245 165 290 200 360 Z" fill={color} fillOpacity="0.18" />
            <path d="M40 200 C110 235 155 235 160 200 C155 165 110 165 40 200 Z" fill={color} fillOpacity="0.18" />
            <path d="M360 200 C290 235 245 235 240 200 C245 165 290 165 360 200 Z" fill={color} fillOpacity="0.18" />
            <path d="M85 85 C145 135 170 160 160 170 C150 180 125 155 85 85 Z" fill={color} fillOpacity="0.14" />
            <path d="M315 315 C255 265 230 240 240 230 C250 220 275 245 315 315 Z" fill={color} fillOpacity="0.14" />
            <path d="M315 85 C265 145 240 170 230 160 C220 150 245 125 315 85 Z" fill={color} fillOpacity="0.14" />
            <path d="M85 315 C135 255 160 230 170 240 C180 250 155 275 85 315 Z" fill={color} fillOpacity="0.14" />
          </svg>
          <svg className="absolute -bottom-24 -left-24 w-[34rem] h-[34rem] opacity-[0.10]" viewBox="0 0 400 400" fill="none" stroke={color} strokeWidth="1.8">
            <circle cx="200" cy="200" r="30" fill={color} fillOpacity="0.2" />
            <path d="M200 40 C235 110 235 155 200 160 C165 155 165 110 200 40 Z" fill={color} fillOpacity="0.18" />
            <path d="M200 360 C235 290 235 245 200 240 C165 245 165 290 200 360 Z" fill={color} fillOpacity="0.18" />
            <path d="M40 200 C110 235 155 235 160 200 C155 165 110 165 40 200 Z" fill={color} fillOpacity="0.18" />
            <path d="M360 200 C290 235 245 235 240 200 C245 165 290 165 360 200 Z" fill={color} fillOpacity="0.18" />
          </svg>
        </div>
      );

    // ─── 2. Sage & Olive: Organic Monstera & Olive Leaf Foliage (No Florals) ──
    case 'monstera-olive':
    case 'botanical-vines':
    case 'botanical':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
          <svg className="absolute -top-14 -right-14 w-[42rem] h-[42rem] opacity-[0.12]" viewBox="0 0 500 500" fill="none" stroke={color} strokeWidth="2.2">
            {/* Monstera & Olive Leaf Stem */}
            <path d="M 50 480 C 180 380 260 260 420 50" strokeLinecap="round" />
            {/* Olive Leaf Clusters along stem */}
            <path d="M 220 310 C 150 260 140 210 180 200 C 230 210 240 270 220 310 Z" fill={color} fillOpacity="0.2" />
            <path d="M 270 240 C 350 200 370 150 330 140 C 280 145 260 200 270 240 Z" fill={color} fillOpacity="0.2" />
            <path d="M 330 170 C 310 90 270 60 240 80 C 250 130 290 160 330 170 Z" fill={color} fillOpacity="0.2" />
            <path d="M 170 370 C 90 350 60 310 80 280 C 130 290 160 330 170 370 Z" fill={color} fillOpacity="0.2" />
            <path d="M 380 100 C 440 60 460 20 430 10 C 390 20 370 60 380 100 Z" fill={color} fillOpacity="0.2" />
            {/* Olive berries */}
            <ellipse cx="210" cy="270" rx="9" ry="14" transform="rotate(-30 210 270)" fill={color} fillOpacity="0.25" />
            <ellipse cx="300" cy="190" rx="9" ry="14" transform="rotate(35 300 190)" fill={color} fillOpacity="0.25" />
          </svg>
          <svg className="absolute -bottom-20 -left-20 w-[38rem] h-[38rem] opacity-[0.09]" viewBox="0 0 500 500" fill="none" stroke={color} strokeWidth="2.2">
            <path d="M 450 20 C 320 120 240 240 80 450" strokeLinecap="round" />
            <path d="M 280 190 C 350 240 360 290 320 300 C 270 290 260 230 280 190 Z" fill={color} fillOpacity="0.2" />
            <path d="M 230 260 C 150 300 130 350 170 360 C 220 355 240 300 230 260 Z" fill={color} fillOpacity="0.2" />
          </svg>
        </div>
      );

    // ─── 3. Oceanic Drift: Abstract Fluid Marine Waves & Swells ─────────────
    case 'marine-waves':
    case 'maritime-waves':
    case 'oceanic':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
          <svg className="absolute -top-16 -right-16 w-[48rem] h-[48rem] opacity-[0.13]" viewBox="0 0 600 600" fill="none" stroke={color} strokeWidth="2.4">
            <path d="M 0 80 C 150 10 300 150 450 80 C 600 10 750 150 900 80" />
            <path d="M 0 160 C 150 90 300 230 450 160 C 600 90 750 230 900 160" />
            <path d="M 0 240 C 150 170 300 310 450 240 C 600 170 750 310 900 240" />
            <path d="M 0 320 C 150 250 300 390 450 320 C 600 250 750 390 900 320" />
            <path d="M 0 400 C 150 330 300 470 450 400 C 600 330 750 470 900 400" />
            <path d="M 0 480 C 150 410 300 550 450 480 C 600 410 750 550 900 480" />
          </svg>
          <svg className="absolute -bottom-24 -left-24 w-[42rem] h-[42rem] opacity-[0.10]" viewBox="0 0 600 600" fill="none" stroke={color} strokeWidth="2.2">
            <path d="M 0 100 C 150 170 300 30 450 100 C 600 170 750 30 900 100" />
            <path d="M 0 180 C 150 250 300 110 450 180 C 600 250 750 110 900 180" />
            <path d="M 0 260 C 150 330 300 190 450 260 C 600 330 750 190 900 260" />
          </svg>
        </div>
      );

    // ─── 4. Graphite Minimal: Clean Elevation Contour Topographic Map Lines ──
    case 'topographic-map':
    case 'topographic-lines':
    case 'topography':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
          <svg className="absolute -top-12 -right-12 w-[46rem] h-[46rem] opacity-[0.12]" viewBox="0 0 500 500" fill="none" stroke={color} strokeWidth="1.8">
            <path d="M 30 80 Q 140 10 260 70 T 470 100" />
            <path d="M 10 140 Q 150 60 280 130 T 490 170" />
            <path d="M 0 200 Q 160 110 300 190 T 500 240" />
            <path d="M 0 260 Q 170 160 320 250 T 510 310" />
            <path d="M 0 320 Q 180 210 340 310 T 520 380" />
            <path d="M 0 380 Q 190 260 360 370 T 530 450" />
            <path d="M 0 440 Q 200 310 380 430 T 540 500" />
            {/* Elevation Index Numbers */}
            <circle cx="280" cy="130" r="3" fill={color} />
            <circle cx="320" cy="250" r="3" fill={color} />
          </svg>
          <svg className="absolute -bottom-20 -left-20 w-[38rem] h-[38rem] opacity-[0.09]" viewBox="0 0 500 500" fill="none" stroke={color} strokeWidth="1.8">
            <path d="M 0 80 Q 180 160 340 60 T 500 130" />
            <path d="M 0 150 Q 190 230 360 130 T 500 200" />
            <path d="M 0 220 Q 200 300 380 200 T 500 270" />
          </svg>
        </div>
      );

    // ─── 5. Engineering Dark: Precise CAD Blueprint & Circuit Grid ──────────
    case 'cad-blueprint':
    case 'blueprint-schematic':
    case 'circuit':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
          <svg className="absolute -top-8 -right-8 w-[44rem] h-[44rem] opacity-[0.14]" viewBox="0 0 500 500" fill="none" stroke={color} strokeWidth="1.6">
            {/* CAD Grid Lines */}
            <path d="M 50 50 H 450 V 450 H 50 Z" strokeDasharray="10 6" />
            <path d="M 50 150 H 450 M 50 250 H 450 M 50 350 H 450" strokeOpacity="0.45" />
            <path d="M 150 50 V 450 M 250 50 V 450 M 350 50 V 450" strokeOpacity="0.45" />
            {/* Circuit Traces & Nodes */}
            <circle cx="150" cy="150" r="14" fill={color} fillOpacity="0.25" />
            <circle cx="350" cy="250" r="14" fill={color} fillOpacity="0.25" />
            <circle cx="250" cy="350" r="14" fill={color} fillOpacity="0.25" />
            <path d="M 150 150 L 250 150 L 250 250 L 350 250 L 350 350" strokeWidth="2.8" />
            <path d="M 150 350 L 150 250 L 250 250" strokeWidth="2.2" strokeDasharray="4 4" />
          </svg>
          <svg className="absolute -bottom-20 -left-20 w-[38rem] h-[38rem] opacity-[0.11]" viewBox="0 0 500 500" fill="none" stroke={color} strokeWidth="1.6">
            <rect x="80" y="80" width="340" height="340" strokeDasharray="8 6" />
            <line x1="80" y1="80" x2="420" y2="420" />
            <line x1="420" y1="80" x2="80" y2="420" />
          </svg>
        </div>
      );

    // ─── 6. Nordic Slate: Geometric Bauhaus & Architectural Wireframes ───────
    case 'bauhaus-geometry':
    case 'architectural-grid':
    case 'nordic':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
          <svg className="absolute -top-14 -right-14 w-[46rem] h-[46rem] opacity-[0.12]" viewBox="0 0 500 500" fill="none" stroke={color} strokeWidth="2">
            {/* Bauhaus Interlocking Hexagons & Triangles */}
            <polygon points="250,40 460,150 460,370 250,480 40,370 40,150" />
            <polygon points="250,110 390,190 390,330 250,410 110,330 110,190" strokeDasharray="6 8" />
            <line x1="250" y1="40" x2="250" y2="480" />
            <line x1="40" y1="150" x2="460" y2="370" />
            <line x1="40" y1="370" x2="460" y2="150" />
            <circle cx="250" cy="260" r="60" strokeDasharray="4 6" />
          </svg>
          <svg className="absolute -bottom-24 -left-24 w-[38rem] h-[38rem] opacity-[0.09]" viewBox="0 0 500 500" fill="none" stroke={color} strokeWidth="2">
            <polygon points="250,50 450,160 450,360 250,470 50,360 50,160" />
            <line x1="250" y1="50" x2="250" y2="470" />
          </svg>
        </div>
      );

    // ─── 7. Matcha Canvas: Minimalist Japanese Zen Enso & Bamboo Lines ──────
    case 'zen-enso':
    case 'bamboo-leaves':
    case 'bamboo':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
          <svg className="absolute -top-12 -right-12 w-[44rem] h-[44rem] opacity-[0.12]" viewBox="0 0 500 500" fill="none" stroke={color} strokeWidth="2.4">
            {/* Japanese Zen Enso Circle */}
            <path
              d="M 250 60 C 360 60 440 140 440 250 C 440 360 360 440 250 440 C 140 440 60 360 60 250 C 60 160 120 80 220 62"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="250" cy="250" r="120" strokeDasharray="6 8" strokeWidth="1.8" />
            {/* Minimalist Zen Bamboo Shoots */}
            <path d="M 120 0 V 160 M 120 175 V 335 M 120 350 V 500" strokeWidth="3" />
            <path d="M 120 170 C 160 140 190 150 200 170 C 170 180 140 175 120 170 Z" fill={color} fillOpacity="0.2" />
            <path d="M 120 345 C 80 320 50 330 40 350 C 70 360 100 355 120 345 Z" fill={color} fillOpacity="0.2" />
          </svg>
          <svg className="absolute -bottom-24 -left-24 w-[38rem] h-[38rem] opacity-[0.09]" viewBox="0 0 500 500" fill="none" stroke={color} strokeWidth="2.4">
            <path
              d="M 250 80 C 340 80 420 160 420 250 C 420 340 340 420 250 420 C 160 420 80 340 80 250 C 80 180 130 100 210 82"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );

    // ─── 8. Lilac Mist: Celestial Star Chart & Astral Point Lines ───────────
    case 'star-chart':
    case 'constellation-stars':
    case 'celestial':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
          <svg className="absolute -top-12 -right-12 w-[46rem] h-[46rem] opacity-[0.12]" viewBox="0 0 500 500" fill="none" stroke={color} strokeWidth="1.8">
            {/* Celestial Star Chart Coordinates */}
            <circle cx="250" cy="250" r="160" strokeDasharray="6 8" />
            <circle cx="250" cy="250" r="100" strokeDasharray="4 6" />
            <circle cx="250" cy="250" r="40" fill={color} fillOpacity="0.15" />
            {/* Constellation Nodes */}
            <circle cx="140" cy="170" r="5" fill={color} />
            <circle cx="220" cy="120" r="6" fill={color} />
            <circle cx="320" cy="150" r="5.5" fill={color} />
            <circle cx="370" cy="240" r="5" fill={color} />
            <circle cx="310" cy="340" r="6" fill={color} />
            <circle cx="170" cy="330" r="5" fill={color} />
            {/* Constellation Star Lines */}
            <path d="M 140 170 L 220 120 L 320 150 L 370 240 L 310 340 L 170 330 Z" strokeWidth="2" />
            <path d="M 250 60 V 440 M 60 250 H 440" strokeOpacity="0.4" />
          </svg>
          <svg className="absolute -bottom-24 -left-24 w-[38rem] h-[38rem] opacity-[0.09]" viewBox="0 0 500 500" fill="none" stroke={color} strokeWidth="1.8">
            <circle cx="250" cy="250" r="130" strokeDasharray="5 7" />
            <circle cx="190" cy="190" r="5" fill={color} />
            <circle cx="290" cy="210" r="6" fill={color} />
            <circle cx="250" cy="310" r="5" fill={color} />
            <path d="M 190 190 L 290 210 L 250 310 Z" strokeWidth="2" />
          </svg>
        </div>
      );

    // ─── 9. Amber Glow: Sunburst Arcs & Concentric Radial Geometry ──────────
    case 'sunburst-arcs':
    case 'sunray-arcs':
    case 'contours':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
          <svg className="absolute -top-16 -right-16 w-[48rem] h-[48rem] opacity-[0.13]" viewBox="0 0 500 500" fill="none" stroke={color} strokeWidth="2.2">
            {/* Concentric Sunburst Arcs */}
            <circle cx="450" cy="50" r="90" />
            <circle cx="450" cy="50" r="160" strokeDasharray="8 10" />
            <circle cx="450" cy="50" r="230" />
            <circle cx="450" cy="50" r="300" strokeDasharray="6 8" />
            <circle cx="450" cy="50" r="370" />
            <circle cx="450" cy="50" r="440" strokeDasharray="10 12" />
            {/* Radiating Geometric Sunbeams */}
            <line x1="450" y1="50" x2="50" y2="450" strokeWidth="2" strokeDasharray="6 8" />
            <line x1="450" y1="50" x2="100" y2="250" strokeWidth="1.8" />
            <line x1="450" y1="50" x2="250" y2="400" strokeWidth="1.8" />
            <line x1="450" y1="50" x2="0" y2="180" strokeWidth="1.8" />
          </svg>
          <svg className="absolute -bottom-24 -left-24 w-[40rem] h-[40rem] opacity-[0.09]" viewBox="0 0 500 500" fill="none" stroke={color} strokeWidth="2.2">
            <circle cx="50" cy="450" r="110" />
            <circle cx="50" cy="450" r="220" strokeDasharray="8 10" />
            <circle cx="50" cy="450" r="330" />
          </svg>
        </div>
      );

    // ─── 10. Sandstone Desert: Flowing Sand Dune Curves & Strata Lines ──────
    case 'desert-strata':
    case 'dune-ripples':
    case 'ripples':
    default:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
          <svg className="absolute -top-16 -right-16 w-[48rem] h-[48rem] opacity-[0.13]" viewBox="0 0 600 600" fill="none" stroke={color} strokeWidth="2.2">
            {/* Flowing Wind-Swept Dune Strata */}
            <path d="M 0 140 C 190 70 340 220 600 100" />
            <path d="M 0 210 C 200 130 360 290 600 160" />
            <path d="M 0 280 C 210 190 380 360 600 220" />
            <path d="M 0 350 C 220 250 400 430 600 280" />
            <path d="M 0 420 C 230 310 420 500 600 340" />
            <path d="M 0 490 C 240 370 440 570 600 400" />
          </svg>
          <svg className="absolute -bottom-24 -left-24 w-[42rem] h-[42rem] opacity-[0.09]" viewBox="0 0 600 600" fill="none" stroke={color} strokeWidth="2.2">
            <path d="M 0 170 C 210 260 380 100 600 200" />
            <path d="M 0 250 C 220 340 400 170 600 270" />
            <path d="M 0 330 C 230 420 420 240 600 340" />
          </svg>
        </div>
      );
  }
}
