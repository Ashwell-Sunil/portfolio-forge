import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  LayoutGrid,
  Layers,
  CloudUpload,
  ExternalLink,
  Zap,
} from 'lucide-react';
import FolioVitaeLogo from '../components/brand/Logo';
import HeroCinematic from '../components/HeroCinematic';
import ProjectParallax from '../components/ProjectParallax';
import TiltCard from '../components/ui/TiltCard';
import Spotlight from '../components/ui/Spotlight';
import { defaultPortfolioData } from '../services/storage';

export default function LandingPage() {
  const showcaseProjects = defaultPortfolioData.projects || [
    {
      id: 'proj-1',
      title: 'NeuralTrace AI Diagnostics',
      description: 'Distributed trace visualization and LLM latency diagnostics engine with sub-millisecond metrics processing.',
      techStack: ['React', 'TypeScript', 'Go', 'TailwindCSS'],
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
      title: 'Vortex Real-time Mesh',
      description: 'High-concurrency WebSocket clustering architecture handling 500k active duplex connections.',
      techStack: ['Node.js', 'Redis', 'Docker', 'React 19'],
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      link: 'https://github.com',
    },
  ];

  return (
    <div className="min-h-screen relative flex flex-col font-sans bg-[#0a0a0a] text-neutral-100 overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* ── Minimal Top Navigation Bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="group flex items-center gap-2.5" title="Folio Vitae">
            <FolioVitaeLogo
              size={32}
              subtitle="Studio"
              textColor="#ffffff"
              accentColor="#ffffff"
              iconClassName="group-hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Nav Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/demo"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-neutral-300 hover:text-white hover:bg-white/[0.07] hover:border-white/20 transition-all"
            >
              <span>Demo</span>
              <ExternalLink size={12} className="text-neutral-400" />
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-full text-black bg-white hover:bg-neutral-200 shadow-sm transition-all hover:scale-102 active:scale-98"
            >
              <span>Launch Studio</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── 1. Minimal Screen-Filling Hero Section ── */}
      <HeroCinematic
        title="Craft Your Minimal Developer Portfolio"
        highlightWords={['Developer', 'Portfolio']}
        subtitle="A clean architectural workspace for software engineers. Build minimalist bento grid showcases, frosted glass cards, and publish live with instant edge speed."
        primaryCtaText="Launch Studio"
        primaryCtaLink="/dashboard"
        secondaryCtaText="Explore Demo"
        secondaryCtaLink="/demo"
      />

      {/* ── 2. Minimal Bento Project Showcase ── */}
      <ProjectParallax
        projects={showcaseProjects}
        title="Featured Work"
        subtitle="Minimalist cards with subtle frosted glass surfaces, smooth tilt physics, and instant responsive layouts."
      />

      {/* ── 3. Minimal Architectural Feature Bento ── */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
        <Spotlight className="top-1/3 left-1/2 -translate-x-1/2" fill="#ffffff" opacity={0.03} />

        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3 border border-white/10 bg-white/[0.03] text-neutral-400"
          >
            <Zap size={12} className="text-neutral-300" />
            <span>Architecture</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            Engineered for Minimalism & Speed
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal"
          >
            Clean aesthetics without noise, saturated colors, or visual clutter.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* Card 1: Minimal Bento Grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0 }}
            className="h-full"
          >
            <TiltCard
              tiltIntensity={6}
              className="h-full p-6 sm:p-7 flex flex-col justify-between bg-white/[0.025] border border-white/10 hover:border-white/20"
            >
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-white/10 text-white border border-white/10">
                  <LayoutGrid size={20} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight">
                  Frosted Glass Bento
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                  Clean frosted glass cards with subtle border highlights that adapt smoothly across desktop, tablet, and mobile devices.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-medium text-neutral-400">
                <span>Subtle Physics</span>
                <span>→</span>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 2: Smooth Inertia Scroll */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="h-full"
          >
            <TiltCard
              tiltIntensity={6}
              className="h-full p-6 sm:p-7 flex flex-col justify-between bg-white/[0.025] border border-white/10 hover:border-white/20"
            >
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-white/10 text-white border border-white/10">
                  <Layers size={20} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight">
                  Lenis Smooth Scroll
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                  Buttery smooth normalized scrolling with Framer Motion fade-ins as sections glide gracefully into view.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-medium text-neutral-400">
                <span>Smooth Motion</span>
                <span>→</span>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 3: Instant Cloud Publishing */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="h-full"
          >
            <TiltCard
              tiltIntensity={6}
              className="h-full p-6 sm:p-7 flex flex-col justify-between bg-white/[0.025] border border-white/10 hover:border-white/20"
            >
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-white/10 text-white border border-white/10">
                  <CloudUpload size={20} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight">
                  Zero-Friction Sync
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                  Instant cloud persistence with Google Authentication, custom project uploads, and permanent public share URLs.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-medium text-neutral-400">
                <span>Cloud Storage</span>
                <span>→</span>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Minimal CTA Banner ── */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl"
        >
          <h2
            className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3 leading-tight"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            Ready to Build Your Minimal Portfolio?
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mb-8 leading-relaxed">
            Create and customize your minimal bento layout instantly in the visual studio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-black bg-white hover:bg-neutral-200 transition-all hover:scale-102 active:scale-98"
            >
              <span>Launch Studio</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/demo"
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-neutral-300 border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 transition-all hover:scale-102"
            >
              <ExternalLink size={14} className="text-neutral-400" />
              <span>Explore Demo</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto py-8 px-6 border-t border-white/10 bg-[#0a0a0a] text-center text-xs text-neutral-500 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <FolioVitaeLogo size={20} showText={true} textColor="#ffffff" accentColor="#ffffff" />
            <span className="text-neutral-600">— Minimal Developer Portfolio Studio</span>
          </div>

          <div className="flex items-center gap-5">
            <Link to="/demo" className="hover:text-neutral-300 transition-colors">
              Demo
            </Link>
            <Link to="/dashboard" className="text-white hover:underline font-medium transition-colors">
              Studio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
