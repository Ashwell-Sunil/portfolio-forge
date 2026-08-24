import { usePWAInstall } from '../../hooks/usePWAInstall';

const SaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </svg>
);

const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const PublishIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const LogoMark = () => (
  <svg width="26" height="26" viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" rx="10" fill="rgba(99,102,241,0.12)"/>
    <path d="M18 20h10l8 11 8-11h2" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 31l10 11 10-11" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="32" cy="42" r="2.5" fill="#6366f1"/>
  </svg>
);

export default function TopBar({ onSave, onShare, onPublish }) {
  const { canInstall, isInstalled, isInstalling, install } = usePWAInstall();

  return (
    <header
      className="flex items-center justify-between px-4 h-12 border-b border-forge-border shrink-0 relative z-20"
      style={{
        background: 'rgba(11,15,26,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(31,45,69,0.7)',
      }}
      role="banner"
      aria-label="PortfolioForge navigation"
    >
      {/* ── Logo ── */}
      <div className="flex items-center gap-2.5">
        <LogoMark />
        <div className="flex items-baseline gap-0.5">
          <span className="font-display font-bold text-[13px] text-forge-text tracking-tight">Portfolio</span>
          <span className="font-display font-bold text-[13px] gradient-text tracking-tight">Forge</span>
        </div>
        <span className="hidden sm:flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-forge-accent/10 text-forge-accent border border-forge-accent/20 tracking-widest ml-0.5">
          v0.3
        </span>
      </div>

      {/* ── Center live indicator ── */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-forge-success" style={{ boxShadow: '0 0 6px rgba(16,185,129,0.8)' }} />
        <span className="text-[11px] font-medium text-forge-success/80 tracking-wide">Live Preview</span>
      </div>

      {/* ── Actions ── */}
      <div className="flex items-center gap-1.5" role="toolbar" aria-label="Portfolio actions">
        {/* PWA Install Button — shown only when installable */}
        {canInstall && !isInstalled && (
          <button
            id="btn-install-pwa"
            onClick={install}
            disabled={isInstalling}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                       border border-forge-accent/30 text-forge-accent hover:bg-forge-accent/10
                       transition-all duration-200 active:scale-95 animate-install-pulse"
            aria-label="Install PortfolioForge as an app"
            title="Install PortfolioForge app"
          >
            <DownloadIcon />
            {isInstalling ? 'Installing…' : 'Install App'}
          </button>
        )}

        {isInstalled && (
          <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium text-forge-success/70 border border-forge-success/20">
            ✓ Installed
          </span>
        )}

        <div className="w-px h-5 bg-forge-border mx-0.5" />

        <button
          id="btn-share"
          onClick={onShare}
          className="forge-btn-ghost text-xs"
          aria-label="Share portfolio link"
        >
          <ShareIcon />
          <span className="hidden sm:inline">Share</span>
        </button>

        <button
          id="btn-save"
          onClick={onSave}
          className="forge-btn-ghost text-xs"
          aria-label="Save portfolio"
        >
          <SaveIcon />
          <span className="hidden sm:inline">Save</span>
        </button>

        <button
          id="btn-publish"
          onClick={onPublish}
          className="forge-btn-primary text-xs"
          aria-label="Publish portfolio"
        >
          <PublishIcon />
          <span>Publish</span>
        </button>
      </div>
    </header>
  );
}
