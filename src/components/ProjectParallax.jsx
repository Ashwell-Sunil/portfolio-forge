import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Sparkles, FolderGit2, ArrowUpRight } from 'lucide-react';
import TiltCard from './ui/TiltCard';
import { normalizeImageUrl, formatExternalUrl } from '../utils/urlHelper';

/**
 * ProjectParallax: Ultra-premium 3D parallax project grid with interactive tilt and glassmorphism
 */
export default function ProjectParallax({
  projects = [],
  onOpenGallery = null,
  accentColor = '#6366f1',
  title = 'Featured Projects',
  subtitle = 'Crafted software systems, production web apps, and open-source contributions.',
}) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      {/* Ambient Section Glow Background */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-25"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Section Header */}
      <div className="relative mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10 bg-white/[0.04] backdrop-blur-md text-slate-300 shadow-inner"
        >
          <FolderGit2 size={13} className="text-cyan-400" />
          <span>Curated Portfolio</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* 3D Parallax Tilt Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, index) => {
          const stackList = Array.isArray(project.techStack)
            ? project.techStack
            : typeof project.techStack === 'string'
            ? project.techStack.split(',').map((s) => s.trim()).filter(Boolean)
            : [];

          const projLink = project.link ? formatExternalUrl(project.link) : null;
          const imageUrl = project.imageUrl ? normalizeImageUrl(project.imageUrl) : null;

          return (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
                delay: (index % 3) * 0.12,
              }}
              className="h-full"
            >
              <TiltCard
                tiltIntensity={12}
                glareOpacity={0.22}
                glowColor={accentColor}
                className="group h-full flex flex-col p-5 sm:p-6 bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80"
              >
                {/* Media Screenshot with Zoom Physics */}
                {imageUrl && (
                  <div
                    className="relative w-full h-48 sm:h-52 mb-5 rounded-xl overflow-hidden cursor-zoom-in border border-white/10 bg-slate-950/70"
                    onClick={() => onOpenGallery && onOpenGallery(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt={project.title || 'Project Preview'}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400/20 border border-amber-400/40 text-amber-300 backdrop-blur-md shadow-md">
                        <Sparkles size={11} />
                        <span>Featured</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Project Header */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <h3
                    className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-300"
                    style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
                  >
                    {project.title || 'Untitled Project'}
                  </h3>

                  {projLink && (
                    <a
                      href={projLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200 shrink-0"
                      title="Open Live Project"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>

                {/* Description */}
                {project.description && (
                  <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-5 flex-1 line-clamp-3">
                    {project.description}
                  </p>
                )}

                {/* Tech Stack Pills */}
                {stackList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {stackList.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800/80 border border-slate-700/60 text-slate-300 backdrop-blur-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Live Link Button */}
                {projLink && (
                  <div className="pt-4 mt-4 border-t border-white/[0.06]">
                    <a
                      href={projLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors"
                    >
                      <span>Explore Live Application</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
