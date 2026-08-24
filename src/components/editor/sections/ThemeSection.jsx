import { Palette, Check, Sparkles, LayoutGrid, Columns, AlignCenter } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { THEMES, getTheme } from '../../../themes/themes';
import SectionWrapper from '../shared/SectionWrapper';

const LAYOUTS = [
  {
    id: 'classic',
    name: 'Classic Split',
    desc: 'Side-by-side header with balanced 2-column content grid.',
    icon: <Columns size={13} />,
  },
  {
    id: 'minimal',
    name: 'Minimal Centered',
    desc: 'Streamlined single-column with centered hero & airy rhythm.',
    icon: <AlignCenter size={13} />,
  },
  {
    id: 'bento',
    name: 'Bento Grid',
    desc: 'Dynamic asymmetric card grid grouping projects & credentials.',
    icon: <LayoutGrid size={13} />,
  },
];

export default function ThemeSection() {
  const { portfolioData, dispatch } = usePortfolio();
  const activeThemeId = portfolioData.themeId || 'sage-cream';
  const activeLayout = portfolioData.layout || 'classic';
  const currentTheme = getTheme(activeThemeId);

  const handleSelectTheme = (themeId) => {
    dispatch({ type: 'SET_THEME', payload: themeId });
  };

  const handleSelectLayout = (layoutId) => {
    dispatch({ type: 'SET_LAYOUT', payload: layoutId });
  };

  return (
    <SectionWrapper title="Appearance & Layout" icon={<Palette size={13} />} defaultOpen={true}>
      <div className="space-y-4">
        {/* Theme Swatches in a Clean Responsive Grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="spectrum-label">Curated Aesthetic & Dark Themes ({THEMES.length})</label>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--pf-ui-accent, #447244)' }}>
              {currentTheme.name}
            </span>
          </div>

          <div
            className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 p-2.5 rounded transition-colors"
            style={{
              background: 'var(--pf-input-bg, #FAF7F1)',
              border: '1px solid var(--pf-border-color, #D8CEBE)',
            }}
          >
            {THEMES.map((theme) => {
              const isActive = activeThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleSelectTheme(theme.id)}
                  title={`${theme.name} • ${theme.subtitle}`}
                  aria-label={`Select ${theme.name} theme`}
                  className="group relative flex flex-col items-center gap-1 p-1 rounded transition-all transform active:scale-95"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor: theme.preview.accent,
                      border: `2px solid ${isActive ? 'var(--pf-text-primary, #1B2A1B)' : theme.preview.border}`,
                      boxShadow: isActive
                        ? `0 0 0 2px var(--pf-ui-accent, ${theme.preview.accent}), 0 2px 8px rgba(0,0,0,0.18)`
                        : '0 1px 3px rgba(0,0,0,0.08)',
                      transform: isActive ? 'scale(1.15)' : 'scale(1)',
                    }}
                  >
                    {isActive ? (
                      <Check size={12} className="text-white drop-shadow stroke-[2.5]" />
                    ) : (
                      <span className="text-[9px] opacity-70 group-hover:opacity-100 transition-opacity">
                        {theme.icon}
                      </span>
                    )}
                  </div>
                  <span
                    className="text-[8.5px] font-medium truncate max-w-[52px] text-center transition-colors"
                    style={{
                      color: isActive ? 'var(--pf-text-primary, #1B2A1B)' : 'var(--pf-text-muted, #6B7A6E)',
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    {theme.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Layout Switcher Modes */}
        <div>
          <label className="spectrum-label mb-2">Portfolio Layout Engine</label>
          <div className="grid grid-cols-3 gap-1.5">
            {LAYOUTS.map((lay) => {
              const isSelected = activeLayout === lay.id;
              return (
                <button
                  key={lay.id}
                  type="button"
                  onClick={() => handleSelectLayout(lay.id)}
                  className="flex flex-col items-center gap-1 p-2 rounded text-center transition-all"
                  style={{
                    background: isSelected ? 'var(--pf-ui-accent, #447244)' : 'var(--pf-input-bg, #FAF7F1)',
                    color: isSelected ? 'var(--pf-ui-accent-text, #ffffff)' : 'var(--pf-text-primary, #1B2A1B)',
                    border: `1px solid ${isSelected ? 'var(--pf-ui-accent, #447244)' : 'var(--pf-border-color, #D8CEBE)'}`,
                    boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
                  }}
                  title={lay.desc}
                >
                  <div className="flex items-center gap-1 text-[11px] font-bold">
                    {lay.icon}
                    <span>{lay.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Theme & Watermark Info Card */}
        <div
          className="p-3 rounded space-y-2 transition-all"
          style={{
            background: 'var(--pf-card-bg, #EDF5ED)',
            border: '1px solid var(--pf-border-color, #D8CEBE)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">{currentTheme.icon}</span>
              <div>
                <p className="text-[12px] font-semibold" style={{ color: 'var(--pf-text-primary, #1B2A1B)' }}>
                  {currentTheme.name}
                </p>
                <p className="text-[10px]" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>
                  {currentTheme.subtitle} • {currentTheme.watermark}
                </p>
              </div>
            </div>
            <span
              className="text-[9.5px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1"
              style={{
                background: currentTheme.colors.tag.bg,
                color: currentTheme.colors.tag.text,
                border: `1px solid currentTheme.colors.tag.border`,
              }}
            >
              <Sparkles size={10} />
              Active
            </span>
          </div>

          <p className="text-[11px] leading-relaxed" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>
            {currentTheme.description}
          </p>

          {/* Color Palette Breakdown */}
          <div className="flex items-center justify-between pt-1 text-[10px]" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>
            <div className="flex items-center gap-1.5">
              <div
                className="w-3.5 h-3.5 rounded-full border shadow-sm"
                style={{ background: currentTheme.colors.pageBg, borderColor: currentTheme.colors.border }}
                title="Page Background"
              />
              <span>Page</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-3.5 h-3.5 rounded-full border shadow-sm"
                style={{ background: currentTheme.colors.accent, borderColor: currentTheme.colors.accent }}
                title="Theme Accent"
              />
              <span>Accent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-3.5 h-3.5 rounded-full border shadow-sm"
                style={{ background: currentTheme.colors.surface, borderColor: currentTheme.colors.border }}
                title="Surface"
              />
              <span>Surface</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-3.5 h-3.5 rounded-full border shadow-sm"
                style={{ background: currentTheme.colors.text, borderColor: currentTheme.colors.border }}
                title="Typography"
              />
              <span>Text</span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
