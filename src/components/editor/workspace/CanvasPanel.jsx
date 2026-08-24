import { usePortfolio } from '../../../context/PortfolioContext';
import { getTheme } from '../../../themes/themes';
import PortfolioDocument from '../../preview/PortfolioDocument';

export default function CanvasPanel() {
  const { portfolioData } = usePortfolio();
  const theme = getTheme(portfolioData?.themeId);

  return (
    <main
      className="flex-1 min-w-0 h-full relative overflow-hidden transition-colors duration-200"
      style={{ background: 'var(--pf-editor-bg, #1e1e1e)' }}
      aria-label="Canvas Live Preview"
    >
      {/* Subtle technical canvas grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `linear-gradient(var(--pf-border-color, #2a2a2a) 1px, transparent 1px), linear-gradient(90deg, var(--pf-border-color, #2a2a2a) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Scrollable Live Document Preview Area */}
      <div className="relative h-full overflow-y-auto spectrum-scroll">
        <div
          className="min-h-full transition-colors duration-200"
          style={{ background: theme.colors.pageBg }}
        >
          <PortfolioDocument
            key={`doc-${portfolioData?.themeId || 'default'}-${portfolioData?.layout || 'classic'}`}
            data={portfolioData}
          />
        </div>
      </div>
    </main>
  );
}
