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
      <div
        className="min-h-screen min-h-[100dvh] w-full flex items-center justify-center transition-colors"
        style={{ background: '#FAF7F2' }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#447244] border-t-transparent rounded-full animate-spin" />
          <p className="text-[11px] font-mono tracking-widest text-[#4F684F] font-semibold">LOADING PORTFOLIO...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className="min-h-screen min-h-[100dvh] w-full flex items-center justify-center px-6"
        style={{ background: '#FAF7F2' }}
      >
        <div
          className="text-center space-y-4 max-w-sm p-8 rounded-2xl shadow-xl"
          style={{ background: '#F3F8F3', border: '1px solid #BACDBA' }}
        >
          <div
            className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-[#447244]"
            style={{ background: 'rgba(68, 114, 68, 0.15)', border: '1px solid rgba(68, 114, 68, 0.3)' }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#1B2A1B]">Portfolio Not Found</h1>
            <p className="text-[13px] text-[#384E38] mt-1">
              No published developer portfolio found at <code className="text-[#447244] font-semibold">/{username}</code>.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              to="/dashboard"
              className="spectrum-btn-primary inline-flex justify-center w-full py-2.5 rounded-lg font-bold"
            >
              Create Your Portfolio
            </Link>
            <Link
              to="/"
              className="text-xs font-semibold text-[#447244] hover:underline pt-1"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
      {/* Pristine Public Read-Only Portfolio Document */}
      <PortfolioDocument data={data} />

      {/* Floating Navigation Controls */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
        <Link
          to="/"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-semibold shadow-lg transition-all hover:scale-105"
          style={{
            background: activeTheme.colors.cardBg,
            border: `1px solid ${activeTheme.colors.cardBorder}`,
            color: activeTheme.colors.text,
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          }}
          title="Back to Folio Vitae Home"
        >
          <ArrowLeft size={13} />
          <span className="hidden sm:inline">Home</span>
        </Link>

        {/* Strictly show Edit button ONLY if currently authenticated user matches portfolio creator/owner ID */}
        {isOwner ? (
          <Link
            to="/editor"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold text-white shadow-xl transition-all hover:scale-105"
            style={{
              background: activeTheme.colors.accent,
              boxShadow: `0 4px 18px ${activeTheme.preview.accent}60`,
            }}
            title="Edit your portfolio in workspace"
          >
            <Edit3 size={13} />
            <span>Edit Portfolio</span>
          </Link>
        ) : (
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold text-white shadow-xl transition-all hover:scale-105"
            style={{
              background: activeTheme.colors.accent,
              boxShadow: `0 4px 18px ${activeTheme.preview.accent}60`,
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
