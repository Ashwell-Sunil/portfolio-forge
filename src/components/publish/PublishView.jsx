import { usePortfolio } from '../../context/PortfolioContext';
import { getTheme } from '../../themes/themes';
import { generateSlug } from '../../services/storage';
import PortfolioDocument from '../preview/PortfolioDocument';

const ArrowLeftIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function PublishView({ onBack }) {
  const { portfolioData } = usePortfolio();
  const theme = getTheme(portfolioData.themeId);
  const slug = portfolioData.profile.slug || generateSlug(portfolioData.profile.name);
  const publicUrl = `https://portfolioforge.app/${slug}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
    } catch (e) {
      console.warn('Clipboard failed:', e);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: theme.colors.pageBg }}>
      {/* Publish toolbar */}
      <div
        className="flex items-center justify-between px-6 py-3 shrink-0 z-10"
        style={{
          background: 'rgba(11,15,26,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${theme.colors.border}`,
        }}
      >
        <button
          onClick={onBack}
          id="btn-back-to-editor"
          className="forge-btn-ghost text-sm"
          aria-label="Back to editor"
        >
          <ArrowLeftIcon />
          Back to Editor
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${theme.colors.border}` }}>
            <GlobeIcon />
            <span className="text-xs font-mono text-forge-text-2">
              portfolioforge.app/<span style={{ color: theme.colors.accent }}>{slug}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-forge-success text-xs font-semibold"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}>
            <CheckIcon />Published
          </div>

          <button
            id="btn-copy-publish-url"
            onClick={handleCopyUrl}
            className="forge-btn-primary text-xs"
            aria-label="Copy published portfolio URL"
          >
            Copy Link
          </button>
        </div>
      </div>

      {/* Announcement */}
      <div className="shrink-0 px-6 py-2 text-center"
        style={{
          background: `rgba(${theme.colors.accentRgb},0.06)`,
          borderBottom: `1px solid rgba(${theme.colors.accentRgb},0.12)`,
        }}>
        <p className="text-xs" style={{ color: theme.colors.text3 }}>
          🚀 <span style={{ color: theme.colors.text2, fontWeight: 500 }}>Published with {theme.icon} {theme.name} theme.</span>
          {' '}Anyone with{' '}
          <span style={{ color: theme.colors.accent }}>{publicUrl}</span>
          {' '}would see this page.
        </p>
      </div>

      {/* Full portfolio */}
      <div className="flex-1 overflow-y-auto">
        <PortfolioDocument />
      </div>
    </div>
  );
}
