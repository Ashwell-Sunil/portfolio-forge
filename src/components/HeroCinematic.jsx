import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ExternalLink, Code2, Cpu, ShieldCheck } from 'lucide-react';
import Spotlight from './ui/Spotlight';
import TextReveal from './ui/TextReveal';

/**
 * HeroCinematic
 * Minimal, elegant, and cinematic Hero section with sharp typography and frosted glass styling
 */
export default function HeroCinematic({
  title = 'Craft Your Minimal Developer Portfolio',
  highlightWords = ['Developer', 'Portfolio'],
  subtitle = 'A refined workspace designed for software engineers. Build minimalist bento grid showcases, frosted glass cards, and publish live with instant edge speed.',
  primaryCtaText = 'Launch Workspace',
  primaryCtaLink = '/dashboard',
  secondaryCtaText = 'Explore Demo',
  secondaryCtaLink = '/demo',
}) {
  return (
    <div className="relative min-h-[75vh] sm:min-h-[85vh] w-full flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* ── Subtle Monochrome Spotlight ── */}
      <Spotlight className="-top-32 left-1/2 -translate-x-1/2" fill="#ffffff" opacity={0.04} />

      {/* ── Subtle Radial Vignette ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)',
        }}
      />

      {/* ── Content Container ── */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">
        {/* Minimal Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide text-neutral-300 border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-white/20 transition-all cursor-default"
        >
          <Sparkles size={13} className="text-neutral-400" />
          <span>Minimalist Studio & Bento Architecture</span>
        </motion.div>

        {/* Staggered Word-by-Word Headline */}
        <div className="max-w-3xl">
          <TextReveal
            text={title}
            highlightWords={highlightWords}
            highlightColor="text-white font-extrabold"
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.12]"
            delay={0.15}
            staggerDuration={0.05}
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed font-normal"
        >
          {subtitle}
        </motion.p>

        {/* Clean Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full sm:w-auto"
        >
          <Link
            to={primaryCtaLink}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-black bg-white hover:bg-neutral-200 shadow-md transition-all duration-200 hover:scale-102 active:scale-98 w-full sm:w-auto"
          >
            <span>{primaryCtaText}</span>
            <ArrowRight size={15} />
          </Link>

          <Link
            to={secondaryCtaLink}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-neutral-300 border border-white/10 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.07] hover:border-white/20 transition-all hover:scale-102 active:scale-98 w-full sm:w-auto"
          >
            <span>{secondaryCtaText}</span>
            <ExternalLink size={14} className="text-neutral-400" />
          </Link>
        </motion.div>

        {/* Feature Points */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 font-medium"
        >
          <div className="flex items-center gap-1.5">
            <Code2 size={14} className="text-neutral-400" />
            <span>Minimal Bento Grid</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu size={14} className="text-neutral-400" />
            <span>Lenis Smooth Scroll</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-neutral-400" />
            <span>Zero Data Loss</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
