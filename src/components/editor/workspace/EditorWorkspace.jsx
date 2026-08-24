import { useCallback, useEffect, useState } from 'react';
import {
  CloudUpload,
  ExternalLink,
  Check,
  Copy,
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  Menu,
  X,
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { usePortfolio } from '../../../context/PortfolioContext';
import { useAuth } from '../../../context/AuthContext';
import { useAutoSave } from '../../../hooks/useAutoSave';
import {
  savePortfolio,
  loadPortfolio,
  generateSlug,
  normalizeSlug,
  blankPortfolioData,
  defaultPortfolioData,
} from '../../../services/storage';
import { isFirebaseConfigured } from '../../../services/firebase';
import { savePortfolioToFirestore, loadPortfolioByUid } from '../../../services/firestore';
import { getTheme, DEFAULT_THEME_ID, themeToEditorCssVars } from '../../../themes/themes';
import LeftToolbar, { TABS } from './LeftToolbar';
import PropertyPanel from './PropertyPanel';
import CanvasPanel from './CanvasPanel';
import ProfileSection from '../sections/ProfileSection';
import EducationSection from '../sections/EducationSection';
import ExperienceSection from '../sections/ExperienceSection';
import ProjectsSection from '../sections/ProjectsSection';
import SkillsSection from '../sections/SkillsSection';
import ThemeSection from '../sections/ThemeSection';
import SettingsSection from '../sections/SettingsSection';
import Toast from '../../shell/Toast';
import FolioVitaeLogo from '../../brand/Logo';

export default function EditorWorkspace() {
  const location = useLocation();
  const { user } = useAuth();
  const { portfolioData, dispatch } = usePortfolio();
  const [activeTab, setActiveTab] = useState('profile');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const [publishModal, setPublishModal] = useState(null);

  // If user navigated with ?new=true or ?sample=true, initialize requested state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('new') === 'true') {
      const freshData = {
        ...blankPortfolioData,
        uid: user?.uid,
        userId: user?.uid,
        ownerId: user?.uid,
        creatorId: user?.uid,
        themeId: DEFAULT_THEME_ID,
        layout: 'classic',
      };
      dispatch({ type: 'RESET', payload: freshData });
      if (user?.uid) {
        savePortfolio(freshData, user.uid);
      }
      window.history.replaceState({}, '', '/editor');
    } else if (params.get('sample') === 'true') {
      const sampleData = {
        ...defaultPortfolioData,
        uid: user?.uid,
        userId: user?.uid,
        ownerId: user?.uid,
        creatorId: user?.uid,
      };
      dispatch({ type: 'RESET', payload: sampleData });
      if (user?.uid) {
        savePortfolio(sampleData, user.uid);
      }
      window.history.replaceState({}, '', '/editor');
    }
  }, [location.search, dispatch, user?.uid]);

  useAutoSave(portfolioData, user?.uid);

  const currentTheme = getTheme(portfolioData?.themeId);
  const editorCssVars = themeToEditorCssVars(currentTheme);

  useEffect(() => {
    // Only load remote/cached data if user did not explicitly request a blank/sample workspace in this session
    const params = new URLSearchParams(location.search);
    if (params.get('new') === 'true' || params.get('sample') === 'true') return undefined;
    if (!user?.uid) return undefined;

    let cancelled = false;

    async function loadWorkspaceData() {
      let foundData = null;

      // 1. Check user-scoped local storage for active working draft
      try {
        const local = loadPortfolio(user.uid);
        if (
          local &&
          (local.uid === user.uid || local.userId === user.uid || local.ownerId === user.uid)
        ) {
          foundData = local;
        }
      } catch (e) {
        console.warn('Local workspace fetch error:', e);
      }

      // 2. If no local draft exists, fetch user's published portfolio from Firestore
      if (!foundData && isFirebaseConfigured && !user.isDemo) {
        try {
          const remote = await loadPortfolioByUid(user.uid);
          if (
            remote &&
            (remote.uid === user.uid || remote.userId === user.uid || remote.ownerId === user.uid)
          ) {
            foundData = remote;
            savePortfolio(remote, user.uid);
          }
        } catch (e) {
          console.warn('Firestore workspace fetch error:', e);
        }
      }

      // 3. If no portfolio belongs to this user yet, initialize a clean workspace stamped with their user ID
      if (!foundData) {
        foundData = {
          ...blankPortfolioData,
          uid: user.uid,
          userId: user.uid,
          ownerId: user.uid,
          creatorId: user.uid,
          themeId: DEFAULT_THEME_ID,
          layout: 'classic',
        };
      }

      if (!cancelled) {
        dispatch({ type: 'RESET', payload: foundData });
      }
    }

    loadWorkspaceData();

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
    const targetUid = user?.uid || portfolioData.uid || portfolioData.userId;
    const dataToSave = {
      ...portfolioData,
      uid: targetUid,
      ownerId: targetUid,
      userId: targetUid,
      creatorId: targetUid,
    };
    savePortfolio(dataToSave, targetUid);

    const rawSlug = portfolioData.profile?.slug || generateSlug(portfolioData.profile?.name);
    const slug = normalizeSlug(rawSlug);

    try {
      if (isFirebaseConfigured && targetUid && !user?.isDemo) {
        const { username } = await savePortfolioToFirestore(targetUid, dataToSave);
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

  const slug = normalizeSlug(portfolioData.profile?.slug || generateSlug(portfolioData.profile?.name));

  return (
    <div
      className="flex flex-col h-screen h-[100dvh] w-full max-w-full overflow-hidden spectrum-app transition-colors duration-200"
      style={{
        background: 'var(--pf-editor-bg, #EDE7DC)',
        color: 'var(--pf-text-primary, #1B2A1B)',
        ...editorCssVars,
      }}
    >
      {/* ── Mobile-First Responsive Top Bar ── */}
      <header
        className="h-12 shrink-0 flex items-center justify-between px-3 sm:px-4 select-none transition-colors duration-200 z-30 relative"
        style={{
          background: 'var(--pf-topbar-bg, #E4DCCF)',
          borderBottom: '1px solid var(--pf-border-color, #D2C6B4)',
        }}
      >
        {/* Left Side: Mobile Hamburger + Folio Vitae Logo + Desktop Breadcrumbs */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer"
            style={{
              background: 'var(--pf-card-bg, #FCFAF6)',
              border: '1px solid var(--pf-border-color, #D8CEBE)',
              color: 'var(--pf-text-primary, #1B2A1B)',
            }}
            aria-label={mobileMenuOpen ? 'Close editor menu' : 'Open editor menu'}
            title="Open Editor Menu & Properties"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Brand Logo (Always visible, uncluttered) */}
          <Link to="/" className="group shrink-0 flex items-center" title="Return to Home">
            <FolioVitaeLogo
              size={22}
              showText={true}
              textColor="var(--pf-text-primary, #1B2A1B)"
              accentColor="var(--pf-ui-accent, #447244)"
              iconClassName="group-hover:scale-105"
            />
          </Link>

          {/* Dashboard Link (Desktop only) */}
          <Link
            to="/dashboard"
            className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border transition-all hover:scale-105"
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

          {/* Active Theme Info (Desktop only) */}
          <div
            className="hidden lg:flex items-center gap-2 pl-2"
            style={{ borderLeft: '1px solid var(--pf-border-color, #D2C6B4)' }}
          >
            <span className="text-[11px]" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>Theme:</span>
            <span className="text-[11px] font-bold flex items-center gap-1.5" style={{ color: 'var(--pf-text-primary, #1B2A1B)' }}>
              <span>{currentTheme.icon}</span>
              <span>{currentTheme.name}</span>
            </span>
          </div>
        </div>

        {/* Right Side: Desktop Secondary Links + Compact Mobile Save Button */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Public Preview Link (Desktop only) */}
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

          {/* User Profile Status Badge (Desktop only) */}
          <div
            className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full border shadow-sm transition-all"
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
              {user?.displayName || user?.email || 'Active Session'}
            </span>
          </div>

          {/* Compact Save Button (Mobile: 'Save' / Desktop: 'Save & Publish') */}
          <button
            type="button"
            onClick={handlePublish}
            disabled={publishing}
            className="spectrum-btn-primary h-8 px-3 sm:px-3.5 text-xs font-bold rounded-full shadow-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <CloudUpload size={13} />
            <span className="sm:hidden">{publishing ? 'Saving…' : 'Save'}</span>
            <span className="hidden sm:inline">{publishing ? 'Publishing…' : 'Save & Publish'}</span>
          </button>
        </div>
      </header>

      {/* ── Main Workspace Body ── */}
      <div className="flex flex-1 min-h-0 relative overflow-hidden">
        {/* Desktop Leftmost Tool Tab Navigation (Hidden on Mobile) */}
        <div className="hidden md:flex h-full shrink-0">
          <LeftToolbar
            activeTab={activeTab}
            onChange={(tab) => {
              setActiveTab(tab);
              if (collapsed) setCollapsed(false);
            }}
          />
        </div>

        {/* Desktop Collapsible Property Panel Wrapper (Hidden on Mobile) */}
        <div className="hidden md:flex relative shrink-0 h-full">
          <PropertyPanel
            activeTab={activeTab}
            collapsed={collapsed}
            onPublish={handlePublish}
          />

          {/* Two-Way Desktop Collapse/Expand Toggle Button */}
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

        {/* Live Canvas Preview Panel (Full-width on Mobile) */}
        <CanvasPanel />
      </div>

      {/* ── Mobile Slide-Over Drawer (Properties & Navigation) ── */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            className="relative w-[90vw] max-w-sm h-full flex flex-col shadow-2xl z-10 overflow-hidden"
            style={{
              background: 'var(--pf-panel-bg, #E4ECE4)',
              borderRight: '1px solid var(--pf-border-color, #D8CEBE)',
            }}
          >
            {/* Drawer Header */}
            <div
              className="h-12 px-4 shrink-0 flex items-center justify-between border-b"
              style={{
                background: 'var(--pf-topbar-bg, #DDEADD)',
                borderColor: 'var(--pf-border-color, #D8CEBE)',
              }}
            >
              <div className="flex items-center gap-2">
                <FolioVitaeLogo size={18} textColor="var(--pf-text-primary, #1B2A1B)" accentColor="var(--pf-ui-accent, #447244)" />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--pf-text-primary, #1B2A1B)' }}>
                  Editor Workspace
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#4A584A] hover:bg-black/10 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Mobile Navigation Tabs */}
            <div
              className="px-2 py-2 flex items-center gap-1.5 overflow-x-auto border-b shrink-0 spectrum-scroll"
              style={{
                background: 'var(--pf-toolbar-bg, #2a382a)',
                borderColor: 'var(--pf-border-color, #3a4a3a)',
              }}
            >
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer"
                    style={{
                      background: active ? 'var(--pf-ui-accent, #447244)' : 'transparent',
                      color: active ? '#ffffff' : '#D1D5DB',
                    }}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Links Row inside Mobile Menu */}
            <div
              className="px-3 py-2 flex items-center justify-between text-xs border-b shrink-0"
              style={{
                background: 'var(--pf-topbar-bg, #DDEADD)',
                borderColor: 'var(--pf-border-color, #D8CEBE)',
              }}
            >
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1 font-semibold text-[#447244] hover:underline"
              >
                <LayoutDashboard size={13} />
                <span>Dashboard</span>
              </Link>
              <a
                href={`/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-semibold text-[#447244] hover:underline"
              >
                <ExternalLink size={13} />
                <span>View Public Page</span>
              </a>
            </div>

            {/* Mobile Property Panel Content */}
            <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3.5 spectrum-scroll">
              {activeTab === 'profile' && (
                <>
                  <ProfileSection />
                  <EducationSection />
                </>
              )}
              {activeTab === 'work' && (
                <>
                  <ExperienceSection />
                  <ProjectsSection />
                </>
              )}
              {activeTab === 'skills' && <SkillsSection />}
              {activeTab === 'theme' && <ThemeSection />}
              {activeTab === 'settings' && (
                <>
                  <ThemeSection />
                  <SettingsSection onPublish={handlePublish} />
                </>
              )}
            </div>
          </div>
        </div>
      )}

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
