import { usePortfolio } from '../../../context/PortfolioContext';
import { getTheme } from '../../../themes/themes';
import PortfolioDocument from '../../preview/PortfolioDocument';

export default function CanvasPanel() {
  const { portfolioData } = usePortfolio();
  const theme = getTheme(portfolioData?.themeId);

  return (
    <main
      className="flex-1 w-full min-w-0 h-full relative overflow-hidden transition-colors duration-200"
      style={{ background: 'var(--pf-editor-bg, #EDE7DC)' }}
      aria-label="Canvas Live Preview"
    >
      {/* Subtle technical canvas grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `linear-gradient(var(--pf-border-color, #D8CEBE) 1px, transparent 1px), linear-gradient(90deg, var(--pf-border-color, #D8CEBE) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Scrollable Live Document Preview Area with appropriate mobile padding */}
      <div
        className="relative h-full w-full overflow-y-auto overflow-x-hidden spectrum-scroll p-2 sm:p-5 md:p-8 flex justify-center"
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
          overscrollBehaviorY: 'contain',
        }}
      >
        <div
          className="w-full max-w-4xl min-h-full rounded-xl sm:rounded-2xl shadow-xl transition-all duration-200 overflow-x-hidden"
          style={{
            background: theme.colors.pageBg,
            border: '1px solid var(--pf-border-color, #D8CEBE)',
          }}
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
