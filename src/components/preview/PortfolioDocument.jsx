import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ExternalLink, Award, GraduationCap, Briefcase, Code, Link as LinkIcon } from 'lucide-react';
import { usePortfolioOptional } from '../../context/PortfolioContext';
import { generateSlug } from '../../services/storage';
import { normalizeImageUrl, formatExternalUrl } from '../../utils/urlHelper';
import ProjectParallax from '../ProjectParallax';
import TiltCard from '../ui/TiltCard';
import Spotlight from '../ui/Spotlight';

// ─── SVG Social Icons ───────────────────────────────────────────────────────
const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function formatDegree(edu) {
  if (edu.degree && edu.major && !edu.degree.toLowerCase().includes(edu.major.toLowerCase())) {
    return `${edu.degree} · ${edu.major}`;
  }
  return edu.degree || edu.major || 'Degree';
}

function formatEduDates(edu) {
  const start = edu.startDate || edu.startYear;
  const end = edu.endDate || edu.endYear || (edu.current ? 'Present' : '');
  return [start, end].filter(Boolean).join(' – ');
}

// ─── Media Lightbox ────────────────────────────────────────────────────────
function MediaLightbox({ items, index, onClose, onIndex }) {
  if (!items || items.length === 0) return null;
  const current = items[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm font-semibold tracking-wider px-3.5 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          ✕ Close
        </button>

        {current?.kind === 'image' ? (
          <img
            src={current.src}
            alt={current.caption || 'Project visual'}
            className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border border-white/20"
          />
        ) : (
          <iframe
            src={current.src}
            title={current.caption || 'Document Preview'}
            className="w-full h-[75vh] rounded-2xl shadow-2xl bg-white"
          />
        )}

        {current?.caption && (
          <p className="text-white/90 text-sm font-medium mt-3 text-center px-4">
            {current.caption}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Section Heading ───────────────────────────────────────────────────────
function SectionHeading({ title, icon = null, delay = 0, centered = false }) {
  return (
    <div
      className={`mb-6 ${centered ? 'flex flex-col items-center text-center' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`flex items-center gap-2.5 mb-2 ${centered ? 'justify-center' : ''}`}>
        {icon && <span className="text-neutral-400">{icon}</span>}
        <h2
          className="text-xl sm:text-2xl font-bold tracking-tight text-white"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          {title}
        </h2>
      </div>
      <div
        className="h-0.5 rounded-full bg-white/10"
        style={{
          width: centered ? '60px' : '40px',
        }}
      />
    </div>
  );
}

// ─── Main Portfolio Document ───────────────────────────────────────────────
export default function PortfolioDocument({ data: propData }) {
  const context = usePortfolioOptional();
  const rawData = propData || context?.portfolioData;

  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const profile = rawData?.profile || {};
  const education = rawData?.education || [];
  const experience = rawData?.experience || [];
  const projects = rawData?.projects || [];
  const skills = rawData?.skills || [];
  const certifications = rawData?.certifications || [];

  const slug = profile.slug || generateSlug(profile.name);

  const gallery = useMemo(() => {
    const list = [];
    projects.forEach((p) => {
      if (p.imageUrl) list.push({ src: normalizeImageUrl(p.imageUrl), kind: 'image', caption: p.title });
    });
    certifications.forEach((c) => {
      const u = c.imageUrl || c.fileUrl;
      if (u) {
        const isPdf = u.includes('.pdf') || u.startsWith('data:application/pdf');
        list.push({ src: normalizeImageUrl(u), kind: isPdf ? 'pdf' : 'image', caption: c.name });
      }
    });
    return list;
  }, [projects, certifications]);

  const openGallery = (src) => {
    const norm = normalizeImageUrl(src);
    const idx = gallery.findIndex((item) => item.src === norm);
    setLightbox({ open: true, index: idx >= 0 ? idx : 0 });
  };

  const socialLink = (href, icon, label) => {
    if (!href) return null;
    const formattedUrl = href.startsWith('mailto:') ? href : formatExternalUrl(href);
    return (
      <a
        href={formattedUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border border-white/10 bg-white/[0.03] text-neutral-300 hover:text-white hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200"
      >
        {icon}
        <span className="truncate max-w-[150px]">{label}</span>
      </a>
    );
  };

  const avatarDimension = profile.imageSize === 'sm' ? 90 : profile.imageSize === 'lg' ? 140 : 110;

  return (
    <article className="min-h-full relative bg-[#0a0a0a] text-neutral-200 font-sans overflow-x-hidden">
      {/* ── Subtle Monochrome Spotlight ── */}
      <Spotlight className="-top-32 left-1/2 -translate-x-1/2" fill="#ffffff" opacity={0.03} />

      {/* ══════════════════════════════════════════════════════════════════════
          MINIMAL HERO HEADER
      ══════════════════════════════════════════════════════════════════════ */}
      <header className="relative pt-12 sm:pt-20 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-6 sm:p-10 rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8"
        >
          {/* Profile Photo */}
          {profile.imageUrl && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="shrink-0 relative"
            >
              <div className="rounded-2xl p-1 bg-white/10 border border-white/10">
                <img
                  src={normalizeImageUrl(profile.imageUrl)}
                  alt={profile.name || 'Profile'}
                  style={{
                    width: `${avatarDimension}px`,
                    height: `${avatarDimension}px`,
                  }}
                  className="rounded-[14px] object-cover bg-neutral-900"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* Bio & Intro Details */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-medium text-neutral-400 border border-white/10 bg-white/[0.03]">
              <Sparkles size={11} className="text-neutral-400" />
              <span>Portfolio</span>
            </div>

            <h1
              className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15]"
              style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
            >
              {profile.name || 'Your Name'}
            </h1>

            <p className="text-base sm:text-lg font-medium text-neutral-300">
              {profile.title || 'Professional Title'}
            </p>

            {profile.about && (
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl pt-1">
                {profile.about}
              </p>
            )}

            {/* Social Links & Resume */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              {socialLink(`mailto:${profile.email}`, <MailIcon />, profile.email)}
              {socialLink(profile.github, <GithubIcon />, 'GitHub')}
              {socialLink(profile.linkedin, <LinkedInIcon />, 'LinkedIn')}
              {socialLink(profile.twitter, <TwitterIcon />, 'Twitter')}
              {profile.resumeLink && (
                <a
                  href={formatExternalUrl(profile.resumeLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-all"
                >
                  <LinkIcon size={13} />
                  <span>Resume / CV</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          FEATURED PROJECTS MINIMAL BENTO GRID
      ══════════════════════════════════════════════════════════════════════ */}
      {projects.length > 0 && (
        <ProjectParallax
          projects={projects}
          onOpenGallery={openGallery}
          title="Featured Projects"
          subtitle="Production systems, web applications, and developer software."
        />
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          EXPERIENCE & EDUCATION BENTO (FROSTED GLASS CARDS)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Experience Section */}
          {experience.length > 0 && (
            <div className="space-y-4">
              <SectionHeading title="Experience" icon={<Briefcase size={20} />} />
              <div className="space-y-3.5">
                {experience.map((exp, idx) => (
                  <motion.div
                    key={exp.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                  >
                    <TiltCard
                      tiltIntensity={5}
                      className="p-5 bg-white/[0.025] hover:bg-white/[0.045] border border-white/10 hover:border-white/20"
                    >
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <div>
                          <h3
                            className="text-sm sm:text-base font-bold text-white tracking-tight"
                            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
                          >
                            {exp.role || 'Role'}
                          </h3>
                          <p className="text-xs font-medium text-neutral-300">
                            {exp.company || 'Company'}
                          </p>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-400 whitespace-nowrap">
                          {[exp.startDate, exp.endDate || (exp.current ? 'Present' : '')].filter(Boolean).join(' – ')}
                        </span>
                      </div>
                      {exp.responsibilities && (
                        <p className="text-xs text-neutral-400 leading-relaxed mt-2.5">
                          {exp.responsibilities}
                        </p>
                      )}
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <div className="space-y-4">
              <SectionHeading title="Education" icon={<GraduationCap size={20} />} />
              <div className="space-y-3.5">
                {education.map((edu, idx) => {
                  const degreeText = formatDegree(edu);
                  const dates = formatEduDates(edu);

                  return (
                    <motion.div
                      key={edu.id || idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: idx * 0.06 }}
                    >
                      <TiltCard
                        tiltIntensity={5}
                        className="p-5 bg-white/[0.025] hover:bg-white/[0.045] border border-white/10 hover:border-white/20"
                      >
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <h3
                            className="text-sm sm:text-base font-bold text-white tracking-tight"
                            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
                          >
                            {degreeText}
                          </h3>
                          {dates && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-400 whitespace-nowrap">
                              {dates}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-neutral-300 mb-1">
                          {edu.institution || 'Institution'}
                        </p>
                        {edu.gpa && (
                          <p className="text-xs text-neutral-400">
                            <span className="text-neutral-300">GPA / Grade:</span> {edu.gpa}
                          </p>
                        )}
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CORE SKILLS
      ══════════════════════════════════════════════════════════════════════ */}
      {skills.length > 0 && (
        <section className="relative py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
          <SectionHeading title="Skills & Tech Stack" icon={<Code size={20} />} />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2 p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md"
          >
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/10 text-neutral-300 hover:text-white hover:border-white/20 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          CERTIFICATIONS
      ══════════════════════════════════════════════════════════════════════ */}
      {certifications.length > 0 && (
        <section className="relative py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
          <SectionHeading title="Certifications" icon={<Award size={20} />} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {certifications.map((cert, idx) => {
              const media = cert.imageUrl || cert.fileUrl;
              const certYear = cert.year || cert.date || '';
              const certLink = cert.link || cert.fileUrl ? formatExternalUrl(cert.link || cert.fileUrl) : null;

              return (
                <motion.div
                  key={cert.id || idx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <TiltCard
                    tiltIntensity={5}
                    className="p-3.5 bg-white/[0.025] hover:bg-white/[0.045] border border-white/10 hover:border-white/20 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {media && (
                        <button
                          type="button"
                          onClick={() => openGallery(normalizeImageUrl(media))}
                          className="shrink-0 rounded-lg overflow-hidden border border-white/10 cursor-zoom-in"
                        >
                          <img
                            src={normalizeImageUrl(media)}
                            alt={cert.name || 'Certificate'}
                            className="w-9 h-9 object-cover"
                          />
                        </button>
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-xs sm:text-sm text-white truncate">
                          {cert.name || 'Certification'}
                        </p>
                        <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                          {cert.issuer && <span className="truncate max-w-[110px]">{cert.issuer}</span>}
                          {cert.issuer && certYear && <span>·</span>}
                          {certYear && <span>{certYear}</span>}
                        </div>
                      </div>
                    </div>
                    {certLink && (
                      <a
                        href={certLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-md bg-white/[0.04] border border-white/10 text-neutral-400 hover:text-white transition-colors shrink-0"
                        title="Verify"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="relative z-10 py-10 px-6 border-t border-white/10 text-center text-xs text-neutral-500">
        <p>
          Crafted with <span className="text-neutral-300 font-semibold">Folio Vitae</span>
          {slug && (
            <>
              {' '}
              · foliovitae.app/<span className="text-neutral-400">{slug}</span>
            </>
          )}
        </p>
      </footer>

      {/* ── Media Lightbox Modal ── */}
      {lightbox.open && (
        <MediaLightbox
          items={gallery}
          index={lightbox.index}
          onClose={() => setLightbox({ open: false, index: 0 })}
          onIndex={(index) => setLightbox({ open: true, index })}
        />
      )}
    </article>
  );
}
