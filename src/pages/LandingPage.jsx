import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Palette,
  Layers,
  CloudUpload,
  ExternalLink,
} from 'lucide-react';
import { THEMES } from '../themes/themes';
import FolioVitaeLogo from '../components/brand/Logo';

export default function LandingPage() {
  const [activeThemeId, setActiveThemeId] = useState('sage-cream');
  const activeTheme = THEMES.find((t) => t.id === activeThemeId) || THEMES[0];

  return (
    <div
      className="min-h-screen relative flex flex-col font-sans transition-colors duration-500 overflow-x-hidden"
      style={{
        backgroundColor: activeTheme.colors.pageBg,
        color: activeTheme.colors.text,
      }}
    >
      {/* ── Background Ambient Light Orbs ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full pointer-events-none blur-3xl opacity-30 transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${activeTheme.preview.accent} 0%, transparent 70%)`,
        }}
      />

      {/* ── Top Navigation Bar ── */}
      <nav
        className="border-b sticky top-0 z-40 backdrop-blur-md transition-colors duration-300"
        style={{
          borderColor: activeTheme.colors.border,
          backgroundColor: `${activeTheme.colors.pageBg}CC`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group" title="Folio Vitae">
            <FolioVitaeLogo
              size={34}
              subtitle="Workspace"
              textColor={activeTheme.colors.text}
              accentColor={activeTheme.colors.accent}
              iconClassName="group-hover:scale-105"
            />
          </Link>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/alex-vance"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all hover:scale-105"
              style={{
                background: activeTheme.colors.surface,
                borderColor: activeTheme.colors.border,
                color: activeTheme.colors.text,
              }}
            >
              <span>Explore Sample</span>
              <ExternalLink size={12} />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full text-white shadow-md transition-all hover:scale-105"
              style={{
                background: activeTheme.colors.accent,
                boxShadow: `0 4px 14px ${activeTheme.preview.accent}40`,
              }}
            >
              <span>Launch Workspace</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Main Hero Section ── */}
      <section className="relative pt-16 pb-14 px-6 max-w-4xl mx-auto text-center z-10">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5 border shadow-sm transition-all"
          style={{
            background: activeTheme.colors.tag.bg,
            color: activeTheme.colors.tag.text,
            borderColor: activeTheme.colors.tag.border,
          }}
        >
          <Sparkles size={13} />
          <span>10+ Curated Aesthetic Themes & Multiple Layouts</span>
        </div>

        {/* Hero Title */}
        <h1
          className="font-extrabold tracking-tight leading-[1.15] mb-5 text-4xl sm:text-5xl md:text-6xl"
          style={{
            color: activeTheme.colors.text,
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
          }}
        >
          Build Your Developer Portfolio in{' '}
          <span style={{ color: activeTheme.colors.accent }}>Minutes</span>
        </h1>

        {/* Concise Subtitle */}
        <p
          className="text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-normal"
          style={{ color: activeTheme.colors.text2 }}
        >
          A precision workspace crafted for engineers. Customize aesthetic pastel themes with organic watermarks,
          switch between Classic, Minimal, and Bento layouts, and publish live in seconds.
        </p>

        {/* Hero Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95"
            style={{
              background: activeTheme.colors.accent,
              boxShadow: `0 8px 24px ${activeTheme.preview.accent}50`,
            }}
          >
            <span>Create Your Portfolio</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/alex-vance"
            target="_blank"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border transition-all hover:scale-105"
            style={{
              background: activeTheme.colors.cardBg,
              borderColor: activeTheme.colors.border,
              color: activeTheme.colors.text,
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            }}
          >
            <ExternalLink size={15} />
            <span>View Demo Portfolio</span>
          </Link>
        </div>

        {/* Curated Theme Quick Switcher */}
        <div className="pt-2">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3 opacity-75"
            style={{ color: activeTheme.colors.text3 }}
          >
            Explore Curated Palettes:
          </p>
          <div
            className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full border shadow-sm"
            style={{
              background: activeTheme.colors.cardBg,
              borderColor: activeTheme.colors.border,
            }}
          >
            {THEMES.slice(0, 5).map((theme) => {
              const isSelected = activeThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setActiveThemeId(theme.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105"
                  style={{
                    background: isSelected ? theme.colors.accent : 'transparent',
                    color: isSelected ? '#ffffff' : activeTheme.colors.text,
                  }}
                >
                  <span
                    className="w-3 h-3 rounded-full border"
                    style={{ background: theme.preview.accent, borderColor: theme.preview.border }}
                  />
                  <span>{theme.name}</span>
                </button>
              );
            })}
            <Link
              to="/dashboard"
              className="text-xs font-bold px-3 py-1.5 opacity-80 hover:opacity-100 transition-opacity"
              style={{ color: activeTheme.colors.accent }}
            >
              +5 More in Editor →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Three Core Pillars Section ── */}
      <section className="py-12 px-6 max-w-5xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Dynamic Theme Engine */}
          <div
            className="p-6 rounded-2xl border transition-all hover:translate-y-[-4px]"
            style={{
              background: activeTheme.colors.cardBg,
              borderColor: activeTheme.colors.cardBorder,
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white shadow-sm"
              style={{ background: activeTheme.colors.accent }}
            >
              <Palette size={20} />
            </div>
            <h3 className="text-base font-bold mb-2">Dynamic Theme Engine</h3>
            <p className="text-xs leading-relaxed" style={{ color: activeTheme.colors.text2 }}>
              Switch between 10 curated pastel palettes with organic watermarks, soft cards, and eye-friendly low-contrast surfaces.
            </p>
          </div>

          {/* Pillar 2: Flexible Editor Panel */}
          <div
            className="p-6 rounded-2xl border transition-all hover:translate-y-[-4px]"
            style={{
              background: activeTheme.colors.cardBg,
              borderColor: activeTheme.colors.cardBorder,
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white shadow-sm"
              style={{ background: activeTheme.colors.accent }}
            >
              <Layers size={20} />
            </div>
            <h3 className="text-base font-bold mb-2">Flexible Editor & Layouts</h3>
            <p className="text-xs leading-relaxed" style={{ color: activeTheme.colors.text2 }}>
              Choose between Classic Split, Minimal Centered, and Bento Grid layouts with real-time synchronized canvas previews.
            </p>
          </div>

          {/* Pillar 3: Firestore Cloud Storage */}
          <div
            className="p-6 rounded-2xl border transition-all hover:translate-y-[-4px]"
            style={{
              background: activeTheme.colors.cardBg,
              borderColor: activeTheme.colors.cardBorder,
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white shadow-sm"
              style={{ background: activeTheme.colors.accent }}
            >
              <CloudUpload size={20} />
            </div>
            <h3 className="text-base font-bold mb-2">Firestore Cloud Storage</h3>
            <p className="text-xs leading-relaxed" style={{ color: activeTheme.colors.text2 }}>
              Securely manage multiple portfolios, upload project screenshots and resume documents, and publish live with one click.
            </p>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ── */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-center z-10">
        <div
          className="p-10 rounded-3xl border shadow-xl relative overflow-hidden"
          style={{
            background: activeTheme.colors.surface,
            borderColor: activeTheme.colors.border,
          }}
        >
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3"
            style={{ color: activeTheme.colors.text }}
          >
            Ready to Build Your Engineering Portfolio?
          </h2>
          <p className="text-xs sm:text-sm max-w-lg mx-auto mb-7" style={{ color: activeTheme.colors.text2 }}>
            Start immediately in the live editor or connect Google authentication for cloud sync.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
            style={{
              background: activeTheme.colors.accent,
              boxShadow: `0 6px 20px ${activeTheme.preview.accent}45`,
            }}
          >
            <span>Launch Workspace</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="mt-auto py-8 px-6 border-t text-center text-xs transition-colors duration-300"
        style={{
          borderColor: activeTheme.colors.border,
          color: activeTheme.colors.text3,
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FolioVitaeLogo
              size={22}
              showText={true}
              textColor={activeTheme.colors.text}
              accentColor={activeTheme.colors.accent}
            />
            <span>— The Elegant Portfolio Workspace</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/alex-vance" className="hover:underline">
              Sample Portfolio
            </Link>
            <Link to="/dashboard" className="hover:underline font-semibold" style={{ color: activeTheme.colors.accent }}>
              Launch Workspace
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
