import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  PlusCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Clock,
  Trash2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { loadPortfolio, clearPortfolio } from '../services/storage';
import { loadPortfolioByUid, deletePortfolioFromFirestore } from '../services/firestore';
import { isFirebaseConfigured } from '../services/firebase';
import { getTheme, DEFAULT_THEME_ID } from '../themes/themes';
import Toast from '../components/shell/Toast';
import FolioVitaeLogo from '../components/brand/Logo';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recentPortfolio, setRecentPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkExisting() {
      let foundData = null;

      // 1. Check local storage
      try {
        const local = loadPortfolio();
        if (local && (local.profile?.name || local.profile?.title || local.projects?.length > 0)) {
          foundData = local;
        }
      } catch (err) {
        console.warn('Local storage check error:', err);
      }

      // 2. Check Firestore if authenticated
      if (isFirebaseConfigured && user?.uid && !user.isDemo) {
        try {
          const remote = await loadPortfolioByUid(user.uid);
          if (remote && (remote.profile?.name || remote.projects?.length > 0)) {
            foundData = remote;
          }
        } catch (err) {
          console.warn('Firestore fetch error:', err);
        }
      }

      if (!cancelled) {
        setRecentPortfolio(foundData);
        setLoading(false);
      }
    }

    checkExisting();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const handleContinueRecent = () => {
    navigate('/editor');
  };

  const handleCreateNew = () => {
    navigate('/editor?new=true');
  };

  const handleLoadSample = () => {
    navigate('/editor?sample=true');
  };

  const handleDeleteRecent = async (e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this saved portfolio? This will remove all local and published data.')) {
      return;
    }

    setDeleting(true);
    try {
      // 1. Clear from localStorage
      clearPortfolio();

      // 2. Delete from Firestore if connected
      if (isFirebaseConfigured && user?.uid && !user.isDemo) {
        await deletePortfolioFromFirestore(user.uid, recentPortfolio?.profile?.slug || recentPortfolio?.username);
      }

      setRecentPortfolio(null);
      setToast({ message: 'Portfolio deleted successfully.', type: 'success' });
    } catch (err) {
      console.error('Delete error:', err);
      setToast({ message: 'Could not delete portfolio completely.', type: 'error' });
    } finally {
      setDeleting(false);
    }
  };

  // Recent theme information for portfolio badge metadata
  const currentTheme = getTheme(recentPortfolio?.themeId || DEFAULT_THEME_ID);

  return (
    <div className="min-h-screen relative flex flex-col font-sans overflow-x-hidden bg-[#FAF7F2] text-[#1B2A1B]">
      {/* Soft Ambient Sage Light Glow (Matches Landing Page) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full pointer-events-none blur-3xl opacity-25"
        style={{
          background: 'radial-gradient(circle, #447244 0%, transparent 70%)',
        }}
      />

      {/* Unified Sage/Cream Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF7F2]/85 border-b border-[#E2DCD2]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="group" title="Return to Home">
            <FolioVitaeLogo
              size={34}
              subtitle="Dashboard"
              textColor="#1B2A1B"
              accentColor="#447244"
              iconClassName="group-hover:scale-105"
            />
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium px-3.5 py-1.5 rounded-full border border-[#E2DCD2] bg-[#FFFFFF] text-[#4A584A] shadow-sm hidden sm:inline-block">
              👤 {user?.displayName || user?.email || 'Active Workspace Session'}
            </span>
            <Link
              to="/editor"
              className="text-xs font-bold px-4 py-2 rounded-full text-white bg-[#447244] hover:bg-[#365D36] shadow-md shadow-[#447244]/25 transition-all hover:scale-105"
            >
              Open Editor
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 pt-12 pb-16 z-10">
        {/* Intro */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-[#D3DFD3] bg-[#EAF0EA] text-[#2B4C2B] shadow-sm">
            <Sparkles size={13} />
            <span>Portfolio Selection & Management</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-[#1B2A1B]"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            Choose Your Workspace
          </h1>
          <p className="text-sm leading-relaxed text-[#4A584A]">
            Continue working on your previous portfolio, start fresh with a clean slate, or explore the pre-filled sample.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Continue Recent Portfolio (if exists) */}
          {recentPortfolio ? (
            <div
              onClick={handleContinueRecent}
              className="group p-6 rounded-2xl border border-[#E2DCD2] hover:border-[#447244] bg-[#FFFFFF] transition-all duration-200 hover:scale-[1.02] cursor-pointer relative overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl hover:shadow-[#447244]/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-[#447244] shadow-sm">
                      <Clock size={20} />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[#EAF0EA] text-[#2B4C2B] border border-[#D3DFD3]">
                      Recent Portfolio
                    </span>
                  </div>

                  {/* Clean Delete Button */}
                  <button
                    type="button"
                    onClick={handleDeleteRecent}
                    disabled={deleting}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#C53030] bg-[#FFF5F5] hover:bg-[#FED7D7] border border-[#FEB2B2] transition-all z-20"
                    title="Delete this saved portfolio"
                    aria-label="Delete saved portfolio"
                  >
                    <Trash2 size={12} />
                    <span>{deleting ? 'Deleting…' : 'Delete'}</span>
                  </button>
                </div>

                <h3 className="text-lg font-bold mb-1 text-[#1B2A1B]">
                  {recentPortfolio.profile?.name || 'Untitled Portfolio'}
                </h3>
                <p className="text-xs font-semibold mb-3 text-[#447244]">
                  {recentPortfolio.profile?.title || 'Engineering Portfolio'}
                </p>

                <p className="text-xs leading-relaxed line-clamp-2 mb-4 text-[#4A584A]">
                  {recentPortfolio.profile?.about || 'Includes custom projects, experience timeline, and credentials.'}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#6B7A6E]">
                  <span className="px-2.5 py-1 rounded-full border border-[#E2DCD2] bg-[#F7F4EE] text-[#4A584A] flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: currentTheme.colors.accent }}
                    />
                    <span>{currentTheme.name}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full border border-[#E2DCD2] bg-[#F7F4EE] text-[#4A584A]">
                    📁 {recentPortfolio.projects?.length || 0} Projects
                  </span>
                  <span className="px-2.5 py-1 rounded-full border border-[#E2DCD2] bg-[#F7F4EE] text-[#4A584A]">
                    ⚡ {recentPortfolio.skills?.length || 0} Skills
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#EFE9E0] flex items-center justify-between">
                <span className="text-xs font-bold text-[#447244]">
                  Continue Previous Work
                </span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-[#447244] transition-transform group-hover:translate-x-1">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl border border-[#E2DCD2] bg-[#FFFFFF] flex flex-col justify-center items-center text-center space-y-2 opacity-80 shadow-sm">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 bg-[#F4EFEA] text-[#6B7A6E]">
                <Clock size={18} />
              </div>
              <p className="text-sm font-bold text-[#1B2A1B]">No Recent Portfolio</p>
              <p className="text-xs max-w-xs text-[#4A584A]">
                You haven't saved a portfolio yet. Click "Create New Portfolio" to start with a clean slate.
              </p>
            </div>
          )}

          {/* Card 2: Create New Blank Portfolio */}
          <div
            onClick={handleCreateNew}
            className="group p-6 rounded-2xl border border-[#E2DCD2] hover:border-[#447244] bg-[#FFFFFF] transition-all duration-200 hover:scale-[1.02] cursor-pointer flex flex-col justify-between shadow-md hover:shadow-xl hover:shadow-[#447244]/10"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-[#447244] shadow-sm">
                  <PlusCircle size={20} />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[#F4EFEA] text-[#4A584A] border border-[#E2DCD2]">
                  Clean Slate
                </span>
              </div>

              <h3 className="text-lg font-bold mb-1 text-[#1B2A1B]">
                Create New Portfolio
              </h3>
              <p className="text-xs font-semibold mb-3 text-[#447244]">
                Start Blank & Reset to Default Theme
              </p>

              <p className="text-xs leading-relaxed mb-4 text-[#4A584A]">
                Initializes a fresh, empty workspace with clean default theme settings so you can craft your portfolio from scratch.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#EFE9E0] flex items-center justify-between">
              <span className="text-xs font-bold text-[#447244]">
                Start Fresh Workspace
              </span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-[#447244] transition-transform group-hover:translate-x-1">
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* Card 3: Load Sample Portfolio */}
          <div
            onClick={handleLoadSample}
            className="group p-6 rounded-2xl border border-[#E2DCD2] hover:border-[#447244] bg-[#F7F4EE] transition-all duration-200 hover:scale-[1.02] cursor-pointer flex flex-col justify-between md:col-span-2 shadow-sm hover:shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-[#447244] shadow-sm shrink-0">
                  <RotateCcw size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B2A1B]">
                    Load Distributed Systems Sample Dataset
                  </h4>
                  <p className="text-xs text-[#4A584A]">
                    Pre-fills Alex Vance's cloud infrastructure projects, Stanford degrees, and CKS certifications.
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold px-4 py-2 rounded-full text-white bg-[#447244] hover:bg-[#365D36] self-start sm:self-auto shrink-0 shadow-md shadow-[#447244]/25 transition-all">
                Load Demo Template →
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </div>
  );
}
