import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { defaultPortfolioData } from '../services/storage';
import { getTheme, themeToCssVars } from '../themes/themes';
import PortfolioDocument from '../components/preview/PortfolioDocument';

/**
 * DemoPortfolio – a fully static, read-only page that renders the
 * hardcoded sample portfolio data.  No Firebase calls are made here.
 */
export default function DemoPortfolio() {
  const activeTheme = getTheme(defaultPortfolioData.themeId || 'sage-cream');
  const cssVars = themeToCssVars(activeTheme);

  return (
    <div
      className="min-h-screen min-h-[100dvh] w-full relative overflow-x-hidden"
      style={{
        background: activeTheme.colors.pageBg,
        color: activeTheme.colors.text,
        ...cssVars,
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Demo Banner */}
      <div
        className="sticky top-0 z-50 w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold"
        style={{
          background: activeTheme.colors.accent,
          color: '#fff',
        }}
      >
        <span className="flex items-center gap-2">
          <Sparkles size={13} />
          This is a read-only sample portfolio — for demonstration purposes only.
        </span>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link
            to="/dashboard"
            className="px-3 py-1 rounded-full font-bold transition-all hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.35)',
            }}
          >
            Build Yours →
          </Link>
        </div>
      </div>

      {/* Read-only portfolio render */}
      <PortfolioDocument data={defaultPortfolioData} />
    </div>
  );
}
