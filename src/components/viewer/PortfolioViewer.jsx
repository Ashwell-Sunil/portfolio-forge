import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { generatePortfolioHTML } from '../../utils/generatePortfolioHTML';
import { useAuth } from '../../context/AuthContext';
import FolioVitaeLogo from '../brand/Logo';

export default function PortfolioViewer({ portfolioData, themeId, onBack, isOwner: explicitIsOwner }) {
  const iframeRef = useRef(null);
  const { user } = useAuth();

  const isOwner = explicitIsOwner !== undefined
    ? explicitIsOwner
    : Boolean(
        user?.uid &&
        portfolioData &&
        (
          portfolioData.uid === user.uid ||
          portfolioData.ownerId === user.uid ||
          portfolioData.userId === user.uid ||
          portfolioData.creatorId === user.uid
        )
      );

  useEffect(() => {
    if (!iframeRef.current) return;
    const html = generatePortfolioHTML(portfolioData, themeId);
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
  }, [portfolioData, themeId]);

  return (
    <div className="fixed inset-0 z-40 flex flex-col" style={{ background: '#0b0f1a' }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 py-3 shrink-0"
        style={{ background: 'rgba(11,15,26,0.95)', borderBottom: '1px solid #1f2d45', backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center gap-3">
          <FolioVitaeLogo size={22} textColor="#E2E8F0" accentColor="#38BDF8" />
          <span className="text-forge-text-3 text-xs hidden sm:block">·</span>
          <span className="text-forge-text-3 text-xs hidden sm:block" style={{ color: '#94A3B8' }}>
            {portfolioData?.profile?.name || 'Portfolio'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onBack && isOwner && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-forge-text-2 border border-forge-border hover:border-forge-accent/50 hover:text-forge-accent transition-all"
            >
              ← Edit Portfolio
            </button>
          )}
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
          >
            Build Yours ✦
          </Link>
        </div>
      </div>

      {/* Portfolio rendered in iframe */}
      <iframe
        ref={iframeRef}
        title="Portfolio Preview"
        className="flex-1 w-full border-none"
        sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
