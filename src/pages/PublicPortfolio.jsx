import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Sparkles, Edit3, ArrowLeft } from 'lucide-react';
import { isFirebaseConfigured } from '../services/firebase';
import { loadPortfolioByUsername } from '../services/firestore';
import { loadPortfolio, defaultPortfolioData, generateSlug } from '../services/storage';
import { getTheme, themeToCssVars } from '../themes/themes';
import PortfolioDocument from '../components/preview/PortfolioDocument';

export default function PublicPortfolio() {
  const { username } = useParams();
  const [state, setState] = useState('loading');
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // 1. Check local storage first (instant access for active editor session)
      let localData = null;
      try {
        localData = loadPortfolio();
      } catch (e) {
        console.warn('Could not read local storage:', e);
      }

      // If viewing root or if username matches active local portfolio slug
      if (!username) {
        if (!cancelled) {
          setData(localData || defaultPortfolioData);
          setState('done');
        }
        return;
      }

      const normalizedUser = String(username || '').toLowerCase().trim();
      const localSlug = (localData?.profile?.slug || generateSlug(localData?.profile?.name || '')).toLowerCase();

      // If user is previewing their own active local portfolio
      if (localData && (localSlug === normalizedUser || normalizedUser === 'preview' || normalizedUser === 'me')) {
        if (!cancelled) {
          setData(localData);
          setState('done');
        }
        return;
      }

      // If user requested the sample slug
      if (normalizedUser === 'alex-vance') {
        if (!cancelled) {
          setData(defaultPortfolioData);
          setState('done');
        }
        return;
      }

      // 2. Try Firestore with a strict 2-second timeout safeguard so it never hangs
      if (isFirebaseConfigured) {
        try {
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Firestore fetch timeout')), 2000)
          );

          const remote = await Promise.race([
            loadPortfolioByUsername(normalizedUser),
            timeoutPromise,
          ]);

          if (cancelled) return;

          if (remote) {
            setData(remote);
            setState('done');
            return;
          }
        } catch (err) {
          console.warn('Firestore load failed or timed out:', err);
        }
      }

      // 3. Fallback: if remote didn't resolve, fallback gracefully to active editor data or sample
      if (!cancelled) {
        if (localData?.profile?.name) {
          setData(localData);
          setState('done');
        } else {
          setData(defaultPortfolioData);
          setState('done');
        }
      }
    }

    // Safety fallback: if anything stalls, force done state within 2.2 seconds
    const safetyTimer = setTimeout(() => {
      if (!cancelled && state === 'loading') {
        const fallback = loadPortfolio() || defaultPortfolioData;
        setData(fallback);
        setState('done');
      }
    }, 2200);

    load();

    return () => {
      cancelled = true;
      clearTimeout(safetyTimer);
    };
  }, [username, state]);

  const activeTheme = getTheme(data?.themeId || 'sage-cream');
  const cssVars = themeToCssVars(activeTheme);

  if (state === 'loading') {
    return (
      <div
        className="min-h-screen flex items-center justify-center transition-colors"
        style={{ background: '#E4ECE4' }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-3 border-[#447244] border-t-transparent rounded-full animate-spin" />
          <p className="text-[11px] font-mono tracking-widest text-[#4F684F]">LOADING PORTFOLIO...</p>
        </div>
      </div>
    );
  }

  if (state === 'missing' || !data) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: '#E4ECE4' }}
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
          <Link
            to="/editor"
            className="spectrum-btn-primary inline-flex justify-center w-full py-2.5 rounded-lg font-bold"
          >
            Create Your Portfolio in Editor
          </Link>
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
      {/* Pristine Public Portfolio Document */}
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
          title="Back to PortfolioForge Home"
        >
          <ArrowLeft size={13} />
          <span className="hidden sm:inline">Home</span>
        </Link>

        <Link
          to="/editor"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold text-white shadow-xl transition-all hover:scale-105"
          style={{
            background: activeTheme.colors.accent,
            boxShadow: `0 4px 18px ${activeTheme.preview.accent}60`,
          }}
          title="Open Adobe Spectrum Portfolio Workspace"
        >
          <Edit3 size={13} />
          <span>Editor Workspace</span>
        </Link>
      </div>
    </div>
  );
}
