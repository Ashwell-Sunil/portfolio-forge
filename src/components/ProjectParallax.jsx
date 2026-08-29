import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, FolderGit2, ArrowUpRight } from 'lucide-react';
import TiltCard from './ui/TiltCard';
import { normalizeImageUrl, formatExternalUrl } from '../utils/urlHelper';

/**
 * ProjectParallax: Clean, minimal bento project grid with subtle frosted glass cards
 */
export default function ProjectParallax({
  projects = [],
  onOpenGallery = null,
  title = 'Featured Work',
  subtitle = 'Selected production applications, systems engineering, and open-source packages.',
}) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="relative w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="relative mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide mb-3 border border-white/10 bg-white/[0.03] backdrop-blur-md text-neutral-400"
        >
          <FolderGit2 size={12} className="text-neutral-300" />
          <span>Projects</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Clean Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: (index % 3) * 0.08,
              }}
              className="h-full"
            >
              <TiltCard
                tiltIntensity={6}
                glareOpacity={0.1}
                className="group h-full flex flex-col p-5 sm:p-6 bg-white/[0.025] hover:bg-white/[0.045] border border-white/10 hover:border-white/20 transition-all"
              >
                {/* Media Image */}
                {imageUrl && (
                  <div
                    className="relative w-full h-44 mb-4 rounded-xl overflow-hidden cursor-zoom-in border border-white/10 bg-neutral-950"
                    onClick={() => onOpenGallery && onOpenGallery(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt={project.title || 'Project Preview'}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {project.featured && (
                      <div className="absolute top-2.5 right-2.5 z-20 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/10 border border-white/20 text-neutral-200 backdrop-blur-md">
                        <Sparkles size={10} />
                        <span>Featured</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Title & Link */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3
                    className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-neutral-200 transition-colors"
                    style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
                  >
                    {project.title || 'Untitled Project'}
                  </h3>

                  {projLink && (
                    <a
                      href={projLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-all shrink-0"
                      title="Open Project"
                    >
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>

                {/* Description */}
                {project.description && (
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4 flex-1 line-clamp-3">
                    {project.description}
                  </p>
                )}

                {/* Tech Stack */}
                {stackList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {stackList.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] border border-white/10 text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
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
