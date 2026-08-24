import { usePortfolio } from '../../context/PortfolioContext';
import { getTheme } from '../../themes/themes';
import PortfolioDocument from './PortfolioDocument';

const RefreshIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>
);

export default function PreviewPane() {
  const { portfolioData } = usePortfolio();
  const theme = getTheme(portfolioData.themeId);
  const isLight = theme.editorUi?.isLight ?? (theme.id !== 'engineering-dark');

  return (
    <main
      className="flex-1 flex flex-col h-full overflow-hidden"
      style={{ background: theme.colors.pageBg }}
      aria-label="Live portfolio preview"
    >
      {/* Browser chrome bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 shrink-0 transition-colors duration-300"
        style={{
          background: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(17,24,39,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.colors.border}`,
        }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>

        {/* URL bar */}
        <div
          className="flex-1 flex items-center gap-2 rounded-md px-3 py-1"
          style={{
            background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={isLight ? '#9ca3af' : '#475569'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span
            className="text-[11px] font-mono tracking-tight transition-colors duration-300"
            style={{ color: isLight ? '#6b7280' : '#64748b' }}
          >
            foliovitae.app/
            <span style={{ color: theme.colors.accent }}>preview</span>
          </span>

          {/* Theme badge */}
          <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded"
            style={{
              background: `rgba(${theme.colors.accentRgb},0.1)`,
              color: theme.colors.accent,
              border: `1px solid rgba(${theme.colors.accentRgb},0.2)`,
            }}>
            {theme.icon} {theme.name}
          </span>
        </div>

        <button
          className="p-1.5 rounded opacity-50 hover:opacity-100 transition-opacity"
          style={{ color: isLight ? '#374151' : '#64748b' }}
          aria-label="Simulated refresh"
          title="Live preview — updates instantly"
        >
          <RefreshIcon />
        </button>

        <div className="flex items-center gap-1.5 text-[10px] shrink-0" style={{ color: '#10b981' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#10b981', boxShadow: '0 0 4px rgba(16,185,129,0.8)' }} />
          Live
        </div>
      </div>

      {/* Preview scroll area */}
      <div
        className="flex-1 overflow-y-auto transition-colors duration-500"
        style={{ background: theme.colors.pageBg }}
      >
        <PortfolioDocument />
      </div>
    </main>
  );
}
