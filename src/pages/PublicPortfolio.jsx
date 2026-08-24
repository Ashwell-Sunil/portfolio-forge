import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Sparkles, Edit3, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isFirebaseConfigured } from '../services/firebase';
import { loadPortfolioByUsername } from '../services/firestore';
import { loadPortfolio, defaultPortfolioData, generateSlug } from '../services/storage';
import { getTheme, themeToCssVars } from '../themes/themes';
import PortfolioDocument from '../components/preview/PortfolioDocument';

export default function PublicPortfolio() {
  const { username } = useParams();
  const { user } = useAuth();
  const [state, setState] = useState('loading');
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // 1. DEMO BYPASS: If slug is 'demo', 'sample', 'sample-portfolio', 'alex-vance', or empty root
      const rawUser = String(username || '').toLowerCase().trim();
      const normalizedUser = rawUser.replace(/[^a-z0-9-]/g, '');

      if (
        !normalizedUser ||
        normalizedUser === 'demo' ||
        normalizedUser === 'sample' ||
        normalizedUser === 'sample-portfolio' ||
        normalizedUser === 'alex-vance' ||
        normalizedUser === 'view-demo'
      ) {
        if (!cancelled) {
          setData(defaultPortfolioData);
          setState('done');
        }
        return;
      }

      // Check local storage for active session previews (/preview or /me)
      let localData = null;
      try {
        localData = loadPortfolio(user?.uid);
      } catch (e) {
        console.warn('Could not read local storage:', e);
      }

      if (localData && (normalizedUser === 'preview' || normalizedUser === 'me')) {
        if (!cancelled) {
          setData(localData);
          setState('done');
        }
        return;
      }

      // 2. Query Firestore by slug / username
      if (isFirebaseConfigured) {
        try {
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Firestore fetch timeout')), 4000)
          );

          const remote = await Promise.race([
            loadPortfolioByUsername(normalizedUser),
            timeoutPromise,
          ]);

          if (cancelled) return;

          if (remote && (remote.profile?.name || remote.projects?.length > 0)) {
            setData(remote);
            setState('done');
            return;
          }
        } catch (err) {
          console.warn('Firestore load failed or timed out:', err);
        }
      }

      // 3. Check matching local slug if offline or recently saved in session
      if (!cancelled) {
        const localSlug = (localData?.profile?.slug || generateSlug(localData?.profile?.name || '')).toLowerCase();
        if (localData && (localSlug === normalizedUser || localData.slug === normalizedUser) && localData.profile?.name) {
          setData(localData);
          setState('done');
        } else {
          setState('missing');
        }
      }
    }

    setState('loading');
    load();

    return () => {
      cancelled = true;
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

  if (state === 'loading') {
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

  if (state === 'missing' || !data) {
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
      className="min-h-screen relative public-portfolio-root overflow-y-auto"
      style={{
        background: activeTheme.colors.pageBg,
        color: activeTheme.colors.text,
        ...cssVars,
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
