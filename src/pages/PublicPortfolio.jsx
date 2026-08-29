import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Sparkles, Edit3, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isFirebaseConfigured } from '../services/firebase';
import { loadPortfolioByUsername } from '../services/firestore';
import { loadPortfolio, defaultPortfolioData, normalizeSlug } from '../services/storage';
import { getTheme, themeToCssVars } from '../themes/themes';
import PortfolioDocument from '../components/preview/PortfolioDocument';

export default function PublicPortfolio() {
  const { username } = useParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      setIsLoading(true);
      setData(null);

      const currentSlug = normalizeSlug(username);

      if (!currentSlug) {
        if (!isCancelled) {
          setData(null);
          setIsLoading(false);
        }
        return;
      }

      // 1. DEMO BYPASS: Check if slug is demo / sample
      if (
        currentSlug === 'demo' ||
        currentSlug === 'sample' ||
        currentSlug === 'sample-portfolio' ||
        currentSlug === 'alex-vance' ||
        currentSlug === 'view-demo'
      ) {
        if (!isCancelled) {
          setData(defaultPortfolioData);
          setIsLoading(false);
        }
        return;
      }

      // 2. Check local storage for active session previews (/preview or /me)
      let localData = null;
      try {
        localData = loadPortfolio(user?.uid);
      } catch (e) {
        console.warn('Could not read local storage:', e);
      }

      if (localData && (currentSlug === 'preview' || currentSlug === 'me')) {
        if (!isCancelled) {
          setData(localData);
          setIsLoading(false);
        }
        return;
      }

      // 3. Query Firestore by slug
      let foundData = null;
      if (isFirebaseConfigured) {
        try {
          foundData = await loadPortfolioByUsername(currentSlug);
        } catch (err) {
          console.warn('Firestore load failed:', err);
        }
      }

      // 4. Fallback: check matching local slug if offline or saved locally in this session
      if (!foundData && localData) {
        const localSlug = normalizeSlug(localData.profile?.slug || localData.slug || localData.profile?.name || '');
        if (localSlug === currentSlug || localData.uid === currentSlug) {
          foundData = localData;
        }
      }

      if (!isCancelled) {
        setData(foundData);
        setIsLoading(false);
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [username, user?.uid]);

  const activeTheme = getTheme(data?.themeId || 'sage-cream');
  const cssVars = themeToCssVars(activeTheme);

  // Strict ownership check:
  // The authenticated Firebase user ID must match the owner/creator ID of this specific portfolio
  const isOwner = Boolean(
    user?.uid &&
    data &&
    (
      data.uid === user.uid ||
      data.ownerId === user.uid ||
      data.userId === user.uid ||
      data.creatorId === user.uid
    )
  );

  if (isLoading) {
    return (
      <div className="min-h-screen min-h-[100dvh] w-full flex items-center justify-center bg-[#05070E] text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-[11px] font-mono tracking-widest text-cyan-400 font-semibold">LOADING PORTFOLIO...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen min-h-[100dvh] w-full flex items-center justify-center px-6 bg-[#05070E] text-slate-100">
        <div className="text-center space-y-4 max-w-sm p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl shadow-2xl">
          <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-cyan-400 bg-cyan-500/10 border border-cyan-500/30">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Portfolio Not Found</h1>
            <p className="text-[13px] text-slate-400 mt-1">
              No published developer portfolio found at <code className="text-cyan-400 font-semibold">/{username}</code>.
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/dashboard"
              className="inline-flex justify-center w-full py-2.5 rounded-full font-bold text-xs text-white shadow-lg transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
              }}
            >
              Create Your Portfolio
            </Link>
            <Link
              to="/"
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors pt-1"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-h-[100dvh] w-full relative overflow-x-hidden bg-[#05070E] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Pristine Public Read-Only Portfolio Document */}
      <PortfolioDocument data={data} />

      {/* Floating Navigation Controls */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
        <Link
          to="/"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-semibold backdrop-blur-2xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800/80 shadow-2xl transition-all hover:scale-105"
          title="Back to Folio Vitae Home"
        >
          <ArrowLeft size={13} />
          <span className="hidden sm:inline">Home</span>
        </Link>

        {/* Strictly show Edit button ONLY if currently authenticated user matches portfolio creator/owner ID */}
        {isOwner ? (
          <Link
            to="/editor"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold text-white shadow-xl transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              boxShadow: '0 0 25px rgba(99, 102, 241, 0.5)',
            }}
            title="Edit your portfolio in workspace"
          >
            <Edit3 size={13} />
            <span>Edit Portfolio</span>
          </Link>
        ) : (
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold text-white shadow-xl transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              boxShadow: '0 0 25px rgba(99, 102, 241, 0.5)',
            }}
            title="Build your own portfolio"
          >
            <Sparkles size={13} />
            <span>Build Yours</span>
          </Link>
        )}
      </div>
    </div>
  );
}
