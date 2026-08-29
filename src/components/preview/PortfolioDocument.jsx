import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ExternalLink, Award, GraduationCap, Briefcase, Code, Link as LinkIcon } from 'lucide-react';
import { usePortfolioOptional } from '../../context/PortfolioContext';
import { getTheme, themeToCssVars } from '../../themes/themes';
import { generateSlug } from '../../services/storage';
import { normalizeImageUrl, formatExternalUrl } from '../../utils/urlHelper';
import ThemeWatermark from './ThemeWatermark';
import ProjectParallax from '../ProjectParallax';
import TiltCard from '../ui/TiltCard';
import Spotlight from '../ui/Spotlight';
import TextReveal from '../ui/TextReveal';

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

function parseResponsibilities(text) {
  if (!text) return [];
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[•\-*]\s*/, ''));
}

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

// ─── Section Heading with Cyan Line ─────────────────────────────────────────
function SectionHeading({ title, icon = null, delay = 0, centered = false }) {
  return (
    <div
      className={`mb-8 ${centered ? 'flex flex-col items-center text-center' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`flex items-center gap-3 mb-2.5 ${centered ? 'justify-center' : ''}`}>
        {icon && <span className="text-cyan-400">{icon}</span>}
        <h2
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          {title}
        </h2>
      </div>
      <div
        className="h-0.5 rounded-full"
        style={{
          width: centered ? '70px' : '50px',
          background: 'linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, transparent 100%)',
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

  const themeId = rawData?.themeId || 'dark-obsidian';
  const layout = rawData?.layout || 'bento';
  const theme = useMemo(() => getTheme(themeId), [themeId]);
  const accentColor = theme?.colors?.accent || '#6366f1';

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
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-xl border border-white/10 bg-white/[0.04] text-slate-200 hover:text-white hover:bg-white/[0.09] hover:border-white/25 transition-all duration-200 hover:scale-105 shadow-md"
      >
        {icon}
        <span className="truncate max-w-[150px]">{label}</span>
      </a>
    );
  };

  const avatarDimension = profile.imageSize === 'sm' ? 95 : profile.imageSize === 'lg' ? 160 : 125;

  return (
    <article
      key={`article-${themeId}-${layout}`}
      className="min-h-full relative bg-[#05070E] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden"
    >
      {/* ── Background Ambient Spotlight & Beam ── */}
      <Spotlight className="-top-32 left-1/4" fill={accentColor} opacity={0.25} />
      <Spotlight className="top-1/2 -right-20" fill="#06b6d4" opacity={0.18} />

      {/* ── Subtle Background Grid Lines ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          CINEMATIC HERO HEADER
      ══════════════════════════════════════════════════════════════════════ */}
      <header className="relative pt-16 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-6 sm:p-10 md:p-14 rounded-3xl border border-white/[0.09] bg-gradient-to-b from-slate-900/60 via-slate-950/60 to-slate-950/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10 overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="pointer-events-none absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20"
            style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
          />

          {/* Profile Photo */}
          {profile.imageUrl && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="shrink-0 relative group"
            >
              <div className="relative rounded-3xl p-1.5 bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                <img
                  src={normalizeImageUrl(profile.imageUrl)}
                  alt={profile.name || 'Profile'}
                  style={{
                    width: `${avatarDimension}px`,
                    height: `${avatarDimension}px`,
                  }}
                  className="rounded-[22px] object-cover bg-slate-900"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* Bio & Intro Details */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-300 border border-cyan-500/25 bg-cyan-500/10 backdrop-blur-md">
              <Sparkles size={12} />
              <span>Developer Portfolio</span>
            </div>

            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
            >
              {profile.name || 'Your Name'}
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
              {profile.title || 'Professional Title'}
            </p>

            {profile.about && (
              <p className="text-sm sm:text-base text-slate-300/85 leading-relaxed max-w-3xl pt-1">
                {profile.about}
              </p>
            )}

            {/* Social Links & Resume */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-3">
              {socialLink(`mailto:${profile.email}`, <MailIcon />, profile.email)}
              {socialLink(profile.github, <GithubIcon />, 'GitHub')}
              {socialLink(profile.linkedin, <LinkedInIcon />, 'LinkedIn')}
              {socialLink(profile.twitter, <TwitterIcon />, 'Twitter')}
              {profile.resumeLink && (
                <a
                  href={formatExternalUrl(profile.resumeLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                    boxShadow: '0 0 20px rgba(99,102,241,0.5)',
                  }}
                >
                  <LinkIcon size={14} />
                  <span>Resume / CV</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          FEATURED PROJECTS 3D PARALLAX SHOWCASE
      ══════════════════════════════════════════════════════════════════════ */}
      {projects.length > 0 && (
        <ProjectParallax
          projects={projects}
          onOpenGallery={openGallery}
          accentColor={accentColor}
          title="Featured Work & Projects"
          subtitle="Interactive production systems, technical architectures, and developer tooling."
        />
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          EXPERIENCE & EDUCATION TIMELINE (3D TILT CARDS)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Experience Section */}
          {experience.length > 0 && (
            <div className="space-y-6">
              <SectionHeading title="Experience" icon={<Briefcase size={22} />} />
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <motion.div
                    key={exp.id || idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                  >
                    <TiltCard
                      tiltIntensity={8}
                      className="p-6 bg-slate-900/50 border border-slate-800 hover:border-slate-700"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3
                            className="text-base sm:text-lg font-bold text-white tracking-tight"
                            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
                          >
                            {exp.role || 'Role'}
                          </h3>
                          <p className="text-xs sm:text-sm font-semibold text-cyan-400">
                            {exp.company || 'Company'}
                          </p>
                        </div>
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 whitespace-nowrap">
                          {[exp.startDate, exp.endDate || (exp.current ? 'Present' : '')].filter(Boolean).join(' – ')}
                        </span>
                      </div>
                      {exp.responsibilities && (
                        <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mt-3">
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
            <div className="space-y-6">
              <SectionHeading title="Education" icon={<GraduationCap size={22} />} />
              <div className="space-y-4">
                {education.map((edu, idx) => {
                  const degreeText = formatDegree(edu);
                  const dates = formatEduDates(edu);

                  return (
                    <motion.div
                      key={edu.id || idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                    >
                      <TiltCard
                        tiltIntensity={8}
                        className="p-6 bg-slate-900/50 border border-slate-800 hover:border-slate-700"
                      >
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <h3
                            className="text-base sm:text-lg font-bold text-white tracking-tight"
                            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
                          >
                            {degreeText}
                          </h3>
                          {dates && (
                            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 whitespace-nowrap">
                              {dates}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-indigo-400 mb-2">
                          {edu.institution || 'Institution'}
                        </p>
                        {edu.gpa && (
                          <p className="text-xs text-slate-400">
                            <span className="font-semibold text-slate-300">GPA / Grade:</span> {edu.gpa}
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
          CORE SKILLS PILLS CLUSTER
      ══════════════════════════════════════════════════════════════════════ */}
      {skills.length > 0 && (
        <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
          <SectionHeading title="Skills & Technical Arsenal" icon={<Code size={22} />} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2.5 p-6 rounded-3xl border border-white/[0.08] bg-slate-950/50 backdrop-blur-xl"
          >
            {skills.map((skill, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/[0.04] border border-white/10 text-slate-200 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-200 cursor-default shadow-xs"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          CERTIFICATIONS & CREDENTIALS
      ══════════════════════════════════════════════════════════════════════ */}
      {certifications.length > 0 && (
        <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
          <SectionHeading title="Certifications & Honors" icon={<Award size={22} />} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, idx) => {
              const media = cert.imageUrl || cert.fileUrl;
              const certYear = cert.year || cert.date || '';
              const certLink = cert.link || cert.fileUrl ? formatExternalUrl(cert.link || cert.fileUrl) : null;

              return (
                <motion.div
                  key={cert.id || idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                >
                  <TiltCard
                    tiltIntensity={8}
                    className="p-4 bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-3.5"
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
                            className="w-10 h-10 object-cover"
                          />
                        </button>
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-white truncate">
                          {cert.name || 'Certification'}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          {cert.issuer && <span className="truncate max-w-[120px]">{cert.issuer}</span>}
                          {cert.issuer && certYear && <span>·</span>}
                          {certYear && <span className="text-cyan-400 font-semibold">{certYear}</span>}
                        </div>
                      </div>
                    </div>
                    {certLink && (
                      <a
                        href={certLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
                        title="Verify Credential"
                      >
                        <ExternalLink size={14} />
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
      <footer className="relative z-10 py-12 px-6 border-t border-white/[0.08] text-center text-xs text-slate-500">
        <p>
          Crafted with <span className="text-cyan-400 font-bold">Folio Vitae</span>
          {slug && (
            <>
              {' '}
              · foliovitae.app/<span className="text-cyan-400 font-semibold">{slug}</span>
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
