import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ExternalLink, Code2, Cpu, ShieldCheck } from 'lucide-react';
import Spotlight from './ui/Spotlight';
import TextReveal from './ui/TextReveal';
import Hero3D from './Hero3D';

/**
 * HeroCinematic
 * Screen-filling, ultra-premium cinematic Hero with Spotlight, Aurora, Word-by-word reveal, and 3D Canvas
 */
export default function HeroCinematic({
  title = 'Build Your Cinematic Developer Portfolio',
  highlightWords = ['Cinematic', 'Portfolio', 'Minutes'],
  subtitle = 'An architectural workspace crafted for elite engineers. Create stunning 3D parallax showcases, glassmorphism layouts, and publish live with sub-second performance.',
  accentColor = '#6366f1',
  primaryCtaText = 'Launch Workspace',
  primaryCtaLink = '/dashboard',
  secondaryCtaText = 'Explore Sample',
  secondaryCtaLink = '/demo',
}) {
  return (
    <div className="relative min-h-[90vh] sm:min-h-screen w-full flex flex-col items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* ── Dynamic Glowing Spotlight Beams ── */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill={accentColor} opacity={0.32} />
      <Spotlight className="top-10 -right-20 md:right-10" fill="#a855f7" opacity={0.22} />

      {/* ── Background Aurora Light Mesh ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 blur-[100px]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 45% at 50% 10%, ${accentColor} 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 20% 40%, #06b6d4 0%, transparent 50%),
            radial-gradient(ellipse 50% 35% at 80% 50%, #9333ea 0%, transparent 55%)
          `,
        }}
      />

      {/* ── Background Grid Accent Lines ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* ── Content Container ── */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">
        {/* Glowing Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-200 border border-white/15 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:border-white/30 transition-all cursor-default"
        >
          <Sparkles size={14} className="text-cyan-400 animate-pulse" />
          <span>Ultra-Premium 3D Architecture</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        </motion.div>

        {/* 3D Interactive Floating Mesh Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg -my-4 sm:-my-6 pointer-events-none sm:pointer-events-auto"
        >
          <Hero3D accentColor={accentColor} />
        </motion.div>

        {/* Staggered Word-by-Word Headline Reveal */}
        <div className="max-w-4xl">
          <TextReveal
            text={title}
            highlightWords={highlightWords}
            highlightColor="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
            delay={0.2}
            staggerDuration={0.06}
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-slate-300/80 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          {subtitle}
        </motion.p>

        {/* Hero Call-To-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto"
        >
          <Link
            to={primaryCtaLink}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden w-full sm:w-auto"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, #7c3aed 100%)`,
              boxShadow: `0 0 35px ${accentColor}60, 0 10px 25px rgba(0,0,0,0.5)`,
            }}
          >
            <span className="relative z-10">{primaryCtaText}</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <Link
            to={secondaryCtaLink}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-bold text-slate-200 border border-white/15 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/30 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto shadow-lg"
          >
            <ExternalLink size={15} className="text-cyan-400" />
            <span>{secondaryCtaText}</span>
          </Link>
        </motion.div>

        {/* Quick Feature Badges Cluster */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400"
        >
          <div className="flex items-center gap-2">
            <Code2 size={15} className="text-cyan-400" />
            <span>3D Physics & Parallax</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu size={15} className="text-indigo-400" />
            <span>Inertia Smooth Scroll</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-emerald-400" />
            <span>Zero Data Loss Guarantee</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
