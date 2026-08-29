import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Palette,
  Layers,
  CloudUpload,
  ExternalLink,
  Cpu,
  Zap,
  Globe,
} from 'lucide-react';
import { THEMES } from '../themes/themes';
import FolioVitaeLogo from '../components/brand/Logo';
import HeroCinematic from '../components/HeroCinematic';
import ProjectParallax from '../components/ProjectParallax';
import TiltCard from '../components/ui/TiltCard';
import Spotlight from '../components/ui/Spotlight';
import { defaultPortfolioData } from '../services/storage';

export default function LandingPage() {
  const [activeThemeId, setActiveThemeId] = useState('dark-obsidian');
  const activeTheme = THEMES.find((t) => t.id === activeThemeId) || THEMES[0];
  const accentColor = activeTheme?.colors?.accent || '#6366f1';

  // Sample featured projects for the live landing showcase
  const showcaseProjects = defaultPortfolioData.projects || [
    {
      id: 'proj-1',
      title: 'NeuralTrace AI Observability',
      description: 'Distributed trace visualization and LLM latency diagnostics engine with sub-millisecond metrics processing.',
      techStack: ['React', 'Three.js', 'Go', 'TailwindCSS'],
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      link: 'https://github.com',
    },
    {
      id: 'proj-2',
      title: 'Quantum Ledger Protocol',
      description: 'Decentralized consensus framework featuring zero-knowledge proof verification and cryptographic auditing.',
      techStack: ['Rust', 'TypeScript', 'WASM', 'PostgreSQL'],
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
      link: 'https://github.com',
    },
    {
      id: 'proj-3',
      title: 'Vortex Real-time Mesh Router',
      description: 'High-concurrency WebSocket clustering architecture handling 500k active duplex connections.',
      techStack: ['Node.js', 'Redis', 'Docker', 'React 19'],
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      link: 'https://github.com',
    },
  ];

  return (
    <div className="min-h-screen relative flex flex-col font-sans bg-[#05070E] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ── Fixed Top Navigation Bar with Glassmorphism ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-slate-950/70 border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="group flex items-center gap-2.5" title="Folio Vitae">
            <FolioVitaeLogo
              size={34}
              subtitle="Cinematic Studio"
              textColor="#ffffff"
              accentColor="#38bdf8"
              iconClassName="group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Nav Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/demo"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08] hover:border-white/20 transition-all hover:scale-105"
            >
              <span>Explore Demo</span>
              <ExternalLink size={12} className="text-cyan-400" />
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full text-white shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                boxShadow: '0 0 25px rgba(99, 102, 241, 0.45)',
              }}
            >
              <span>Launch Studio</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── 1. Massive Cinematic Screen-Filling Hero Section ── */}
      <HeroCinematic
        title="Build Your Cinematic Developer Portfolio in Minutes"
        highlightWords={['Cinematic', 'Developer', 'Portfolio', 'Minutes']}
        subtitle="Transform your engineering trajectory with 3D physics tilt grids, high-performance Lenis inertia scrolling, and ethereal glassmorphism styling."
        accentColor="#6366f1"
        primaryCtaText="Launch Studio Workspace"
        primaryCtaLink="/dashboard"
        secondaryCtaText="View Demo Portfolio"
        secondaryCtaLink="/demo"
      />

      {/* ── 2. 3D Parallax Project Showcase Section ── */}
      <ProjectParallax
        projects={showcaseProjects}
        accentColor="#6366f1"
        title="Interactive 3D Project Physics"
        subtitle="Hover over the project cards to experience multi-axis 3D tilt physics, real-time light glare tracking, and smooth responsive parallax depth."
      />

      {/* ── 3. Ultra-Premium Architectural Feature Pillars (3D Tilt Cards) ── */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
        <Spotlight className="top-1/3 left-1/4" fill="#3b82f6" opacity={0.18} />

        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10 bg-white/[0.04] backdrop-blur-md text-cyan-300"
          >
            <Zap size={13} />
            <span>Architecture & Engine</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            Engineered for Precision & Impact
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal"
          >
            Every micro-interaction is tuned for maximum fidelity, responsiveness, and aesthetic excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pillar 1: Dynamic 3D Mesh Engine */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="h-full"
          >
            <TiltCard
              tiltIntensity={14}
              glowColor="#6366f1"
              className="h-full p-8 flex flex-col justify-between bg-slate-950/60 border border-slate-800/80"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
                  <Palette size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  Dynamic 3D Aesthetics
                </h3>
                <p className="text-sm text-slate-300/80 leading-relaxed mb-6">
                  Switch dynamically between curated obsidian, cyberpunk, and cosmic themes with synchronized ambient lighting and metallic canvas reflections.
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-semibold text-indigo-400">
                <span>Real-time Material Sync</span>
                <span>→</span>
              </div>
            </TiltCard>
          </motion.div>

          {/* Pillar 2: 3D Parallax Layout Engine */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="h-full"
          >
            <TiltCard
              tiltIntensity={14}
              glowColor="#06b6d4"
              className="h-full p-8 flex flex-col justify-between bg-slate-950/60 border border-slate-800/80"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30">
                  <Layers size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  ProjectParallax & Glass Grid
                </h3>
                <p className="text-sm text-slate-300/80 leading-relaxed mb-6">
                  Replace outdated flat grids with multi-dimensional glass cards that react to user mouse velocity with physics-based spring smoothing.
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <span>Framer Motion Springs</span>
                <span>→</span>
              </div>
            </TiltCard>
          </motion.div>

          {/* Pillar 3: Zero-Latency Cloud Storage */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-full"
          >
            <TiltCard
              tiltIntensity={14}
              glowColor="#10b981"
              className="h-full p-8 flex flex-col justify-between bg-slate-950/60 border border-slate-800/80"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                  <CloudUpload size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  Zero-Friction Cloud Sync
                </h3>
                <p className="text-sm text-slate-300/80 leading-relaxed mb-6">
                  Manage multiple portfolios with Google Authentication, upload project artifacts, and broadcast live globally with instant edge caching.
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span>Firestore & Edge CDN</span>
                <span>→</span>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Bottom Cinematic Radiant CTA Banner ── */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-20 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-10 sm:p-16 rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-950/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Ambient Inner Spotlight */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl opacity-70" />

          <h2
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight relative z-10"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            Ready to Build Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
              Cinematic Portfolio?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300/80 max-w-xl mx-auto mb-10 leading-relaxed relative z-10">
            Start customizing your project parallax layout immediately in the visual editor or connect your authentication for automatic cloud synchronization.
          </p>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                boxShadow: '0 0 35px rgba(99, 102, 241, 0.5)',
              }}
            >
              <span>Launch Studio Workspace</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/demo"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-slate-200 border border-white/15 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/30 transition-all hover:scale-105"
            >
              <ExternalLink size={15} className="text-cyan-400" />
              <span>Explore Demo</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto py-10 px-6 border-t border-white/[0.08] bg-slate-950/80 text-center text-xs text-slate-400 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FolioVitaeLogo size={22} showText={true} textColor="#ffffff" accentColor="#38bdf8" />
            <span className="text-slate-500">— Cinematic Developer Portfolio Studio</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/demo" className="hover:text-slate-200 transition-colors">
              Sample Showcase
            </Link>
            <Link to="/dashboard" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              Launch Studio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
