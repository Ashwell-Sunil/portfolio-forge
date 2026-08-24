import { useCallback, useEffect, useState } from 'react';
import { CloudUpload, ExternalLink, Check, Copy, PanelLeftClose, PanelLeftOpen, LayoutDashboard } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../../context/PortfolioContext';
import { useAuth } from '../../../context/AuthContext';
import { useAutoSave } from '../../../hooks/useAutoSave';
import { savePortfolio, generateSlug, blankPortfolioData, defaultPortfolioData } from '../../../services/storage';
import { isFirebaseConfigured } from '../../../services/firebase';
import { savePortfolioToFirestore, loadPortfolioByUid } from '../../../services/firestore';
import { getTheme, DEFAULT_THEME_ID, themeToEditorCssVars } from '../../../themes/themes';
import LeftToolbar from './LeftToolbar';
import PropertyPanel from './PropertyPanel';
import CanvasPanel from './CanvasPanel';
import Toast from '../../shell/Toast';
import PortfolioForgeLogo from '../../brand/Logo';

export default function EditorWorkspace() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { portfolioData, dispatch } = usePortfolio();
  const [activeTab, setActiveTab] = useState('profile');
  const [collapsed, setCollapsed] = useState(false);
  const [toast, setToast] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const [publishModal, setPublishModal] = useState(null);

  // If user navigated with ?new=true or ?sample=true, initialize requested state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('new') === 'true') {
      dispatch({
        type: 'RESET',
        payload: {
          ...blankPortfolioData,
          themeId: DEFAULT_THEME_ID,
          layout: 'classic',
        },
      });
      window.history.replaceState({}, '', '/editor');
    } else if (params.get('sample') === 'true') {
      dispatch({ type: 'RESET', payload: defaultPortfolioData });
      window.history.replaceState({}, '', '/editor');
    }
  }, [location.search, dispatch]);

  useAutoSave(portfolioData);

  const currentTheme = getTheme(portfolioData?.themeId);
  const editorCssVars = themeToEditorCssVars(currentTheme);

  useEffect(() => {
    // Only load remote data if user did not explicitly request a blank/sample workspace in this session
    const params = new URLSearchParams(location.search);
    if (params.get('new') === 'true' || params.get('sample') === 'true') return undefined;

    if (!user?.uid || user.isDemo || !isFirebaseConfigured) return undefined;
    let cancelled = false;
    loadPortfolioByUid(user.uid)
      .then((remote) => {
        if (!cancelled && remote) dispatch({ type: 'RESET', payload: remote });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [user?.uid, user?.isDemo, dispatch, location.search]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const handlePublish = useCallback(async () => {
    if (!portfolioData.profile?.name?.trim()) {
      showToast('Please add your name in Profile before publishing', 'error');
      return;
    }

    setPublishing(true);
    savePortfolio(portfolioData);

    const slug = (portfolioData.profile?.slug || generateSlug(portfolioData.profile?.name))
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '');

    try {
      if (isFirebaseConfigured && user?.uid && !user.isDemo) {
        const { username } = await savePortfolioToFirestore(user.uid, portfolioData);
        setPublishModal({
          url: `${window.location.origin}/${username}`,
          slug: username,
          isFirebase: true,
        });
        showToast(`Published successfully to /${username}`);
      } else {
        setPublishModal({
          url: `${window.location.origin}/${slug}`,
          slug,
          isFirebase: false,
        });
        showToast(`Portfolio saved! Live at /${slug}`);
      }
    } catch (err) {
      console.error('Publish error:', err);
      showToast(err.message || 'Publish failed', 'error');
    } finally {
      setPublishing(false);
    }
  }, [portfolioData, showToast, user]);

  const slug = portfolioData.profile?.slug || generateSlug(portfolioData.profile?.name);

  return (
    <div
      className="flex flex-col h-screen w-screen overflow-hidden spectrum-app transition-colors duration-200"
      style={{
        background: 'var(--pf-editor-bg, #EDE7DC)',
        color: 'var(--pf-text-primary, #1B2A1B)',
        ...editorCssVars,
      }}
    >
      {/* ── Adobe Spectrum Workspace Top Bar ── */}
      <header
        className="h-11 shrink-0 flex items-center justify-between px-3.5 select-none transition-colors duration-200"
        style={{
          background: 'var(--pf-topbar-bg, #E4DCCF)',
          borderBottom: '1px solid var(--pf-border-color, #D2C6B4)',
        }}
      >
        {/* Brand & App Title */}
        <div className="flex items-center gap-3">
          <Link to="/" className="group" title="Return to Home">
            <PortfolioForgeLogo
              size={24}
              showText={true}
              textColor="var(--pf-text-primary, #1B2A1B)"
              accentColor="var(--pf-ui-accent, #447244)"
              iconClassName="group-hover:scale-105"
            />
          </Link>

          <Link
            to="/dashboard"
            className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border transition-all hover:scale-105"
            style={{
              background: 'var(--pf-input-bg, #FAF7F1)',
              borderColor: 'var(--pf-border-color, #D8CEBE)',
              color: 'var(--pf-text-muted, #6B7A6E)',
            }}
            title="Open Portfolio Dashboard / Switcher"
          >
            <LayoutDashboard size={11} />
            <span>Dashboard</span>
          </Link>

          <div
            className="hidden sm:flex items-center gap-2 pl-2"
            style={{ borderLeft: '1px solid var(--pf-border-color, #D2C6B4)' }}
          >
            <span className="text-[11px]" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>Theme:</span>
            <span className="text-[11px] font-bold flex items-center gap-1.5" style={{ color: 'var(--pf-text-primary, #1B2A1B)' }}>
              <span>{currentTheme.icon}</span>
              <span>{currentTheme.name}</span>
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Public Preview Link */}
          <a
            href={`/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="spectrum-btn-ghost h-7 px-3 text-[11.5px] hidden sm:inline-flex items-center gap-1.5 rounded-full"
            style={{
              border: '1px solid var(--pf-border-color, #D2C6B4)',
              background: 'var(--pf-card-bg, #EDF5ED)',
              color: 'var(--pf-text-primary, #1B2A1B)',
            }}
            title="Open public portfolio in a new tab"
          >
            <ExternalLink size={12} style={{ color: 'var(--pf-ui-accent, #447244)' }} />
            <span>View Public Site</span>
          </a>

          {/* Refined User Profile Status Badge */}
          <div
            className="flex items-center gap-2 px-2.5 py-1 rounded-full border shadow-sm transition-all"
            style={{
              background: 'var(--pf-input-bg, #FAF7F1)',
              borderColor: 'var(--pf-border-color, #D2C6B4)',
            }}
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="absolute w-3 h-3 rounded-full bg-[#10b981]/30 animate-ping" />
            </div>
            <span
              className="text-[11.5px] font-semibold max-w-[130px] truncate"
              style={{ color: 'var(--pf-text-primary, #1B2A1B)' }}
            >
              {user?.displayName || user?.email || 'Ashwell Sunil'}
            </span>
          </div>

          {/* Primary Save & Publish */}
          <button
            type="button"
            onClick={handlePublish}
            disabled={publishing}
            className="spectrum-btn-primary h-7 px-3.5 text-[12px] font-bold rounded-full shadow-sm"
          >
            <CloudUpload size={13} />
            <span>{publishing ? 'Publishing…' : 'Save & Publish'}</span>
          </button>
        </div>
      </header>

      {/* ── Main Workspace Body ── */}
      <div className="flex flex-1 min-h-0 relative overflow-hidden">
        {/* Leftmost Tool Tab Navigation */}
        <LeftToolbar
          activeTab={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            if (collapsed) setCollapsed(false);
          }}
        />

        {/* Collapsible Property Panel Wrapper */}
        <div className="relative flex shrink-0 h-full">
          <PropertyPanel
            activeTab={activeTab}
            collapsed={collapsed}
            onPublish={handlePublish}
          />

          {/* Smooth Two-Way Collapse/Expand Toggle Button (Always visible on divider border) */}
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="absolute top-1/2 -right-3 z-30 w-6 h-10 flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
            style={{
              background: 'var(--pf-card-bg, #FCFAF6)',
              border: '1px solid var(--pf-border-color, #D8CEBE)',
              borderRadius: 4,
              color: 'var(--pf-text-primary, #1B2A1B)',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
            title={collapsed ? 'Expand Property Panel' : 'Collapse Property Panel'}
            aria-label={collapsed ? 'Expand Property Panel' : 'Collapse Property Panel'}
          >
            {collapsed ? <PanelLeftOpen size={13} /> : <PanelLeftClose size={13} />}
          </button>
        </div>

        {/* Live Canvas Preview Panel */}
        <CanvasPanel />
      </div>

      {/* ── Publish Success Modal ── */}
      {publishModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
          onClick={() => setPublishModal(null)}
        >
          <div
            className="w-full max-w-md p-6 rounded-2xl shadow-2xl transition-all"
            style={{
              background: 'var(--pf-card-bg, #FCFAF6)',
              border: '1px solid var(--pf-border-color, #D8CEBE)',
              color: 'var(--pf-text-primary, #1B2A1B)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#10b981]/20 border border-[#10b981]/40 text-[#10b981]">
                <Check size={18} />
              </div>
              <h2 className="text-base font-bold" style={{ color: 'var(--pf-text-primary, #1B2A1B)' }}>
                Portfolio Published!
              </h2>
            </div>

            <p className="text-[13px] mt-2 leading-relaxed" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>
              {publishModal.isFirebase
                ? 'Your portfolio is synchronized to Google Firestore and live for the world.'
                : 'Your portfolio is saved and ready for public sharing.'}
            </p>

            <div
              className="flex items-center justify-between p-3 my-4 rounded-xl font-mono text-[12px]"
              style={{
                background: 'var(--pf-input-bg, #FAF7F1)',
                border: '1px solid var(--pf-input-border, #CFC2AF)',
              }}
            >
              <span className="truncate pr-2 font-semibold" style={{ color: 'var(--pf-ui-accent, #447244)' }}>
                {publishModal.url}
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(publishModal.url);
                  showToast('URL copied to clipboard!');
                }}
                className="spectrum-btn-secondary py-1 px-2.5 text-[11px] shrink-0 rounded-md"
              >
                <Copy size={11} />
                <span>Copy</span>
              </button>
            </div>

            <div className="flex gap-2 justify-end mt-4">
              <button
                type="button"
                onClick={() => setPublishModal(null)}
                className="spectrum-btn-ghost text-[12px] px-3.5 py-1.5"
              >
                Done
              </button>
              <a
                href={publishModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="spectrum-btn-primary text-[12px] px-4 py-1.5 rounded-full font-bold"
              >
                <ExternalLink size={13} />
                <span>Open Live Site</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Notification Toast ── */}
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </div>
  );
}
