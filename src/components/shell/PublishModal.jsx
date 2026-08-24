import { useState, useCallback, useEffect } from 'react';
import { encodeDataToURLHash, buildShareURL } from '../../utils/shareLink';
import { downloadPortfolioHTML } from '../../utils/htmlDownload';

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

export default function PublishModal({ portfolioData, themeId, onClose }) {
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Immediately generate the URL on mount since it's fully offline/client-side now
  useEffect(() => {
    let active = true;
    encodeDataToURLHash(portfolioData, themeId)
      .then(base64 => {
        if (active) setShareUrl(buildShareURL(base64));
      })
      .catch(err => {
        console.error(err);
        if (active) setErrorMsg('Failed to compress data. Ensure no excessively large images are attached.');
      });
    return () => { active = false; };
  }, [portfolioData, themeId]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  }, [shareUrl]);

  const isTooLong = shareUrl.length > 2000;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]"
        style={{ background: '#111827', border: '1px solid #1f2d45' }}
        role="dialog" aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-forge-border shrink-0">
          <div>
            <h2 className="text-sm font-bold text-forge-text">Share Your Portfolio 🚀</h2>
            <p className="text-xs text-forge-text-3 mt-0.5">100% offline, serverless sharing</p>
          </div>
          <button onClick={onClose} className="forge-btn-ghost p-1.5" aria-label="Close"><XIcon /></button>
        </div>

        <div className="px-6 py-6 space-y-5 overflow-y-auto">
          
          {errorMsg ? (
            <div className="rounded-lg px-3 py-2.5 text-xs"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <p className="text-forge-error font-semibold mb-1">⚠ Compression Failed</p>
              <p className="text-forge-text-3">{errorMsg}</p>
            </div>
          ) : (
            <>
              {/* Link generator */}
              <div className="rounded-xl p-4 space-y-4"
                style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.05),rgba(139,92,246,0.03))', border: '1px solid rgba(99,102,241,0.2)' }}>
                
                <div className="flex items-center gap-2">
                  <span className="text-base">🔗</span>
                  <span className="text-xs font-bold text-forge-accent uppercase tracking-widest">Shareable Link</span>
                </div>

                {!shareUrl ? (
                  <div className="flex items-center gap-3 py-2 text-forge-text-3 text-xs">
                    <div className="w-4 h-4 border-2 border-forge-accent border-t-transparent rounded-full animate-spin" />
                    Compressing data...
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        readOnly value={shareUrl}
                        className="flex-1 text-[11px] font-mono px-3 py-2 rounded-lg border border-forge-border bg-forge-surface text-forge-text-2 truncate"
                        onClick={e => e.target.select()}
                        aria-label="Shareable URL"
                      />
                      <button id="btn-copy-link" onClick={handleCopy}
                        className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                          copied
                            ? 'bg-forge-success/15 text-forge-success border border-forge-success/30'
                            : 'bg-forge-accent text-white hover:opacity-90'
                        }`}>
                        {copied ? <><CheckIcon />Copied!</> : <><CopyIcon />Copy</>}
                      </button>
                    </div>

                    {isTooLong && (
                      <p className="text-[11px] text-amber-400/80 flex items-start gap-2 bg-amber-400/10 p-2 rounded border border-amber-400/20">
                        <span className="shrink-0 mt-0.5">⚠</span>
                        <span>This link is extremely long ({shareUrl.length} chars) because of large image uploads. Some social apps might truncate it. Consider using the HTML Export below instead.</span>
                      </p>
                    )}

                    <div className="flex gap-2">
                      <button onClick={() => window.open(shareUrl, '_blank')}
                        className="flex-1 py-2 rounded-lg text-xs font-semibold border border-forge-border text-forge-text-2 hover:border-forge-accent/50 hover:text-forge-accent transition-all">
                        ↗ Test Link in New Tab
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* HTML Export */}
              <div className="rounded-xl p-4 space-y-3"
                style={{ background: 'rgba(31,45,69,0.3)', border: '1px solid #1f2d45' }}>
                <div className="flex items-center gap-2">
                  <span className="text-base">📄</span>
                  <span className="text-xs font-bold text-forge-text-2 uppercase tracking-widest">Export Standalone HTML</span>
                </div>
                <p className="text-xs text-forge-text-3 leading-relaxed">
                  Download your complete portfolio as a single `.html` file. You can send this file to anyone or host it for free on GitHub Pages.
                </p>
                <button
                  onClick={() => downloadPortfolioHTML(portfolioData, themeId)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:bg-white/10 border border-forge-border hover:border-forge-text-2"
                >
                  <DownloadIcon /> Download HTML File
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
