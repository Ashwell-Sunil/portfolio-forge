import { useState, useMemo } from 'react';
import { usePortfolioOptional } from '../../context/PortfolioContext';
import { getTheme, themeToCssVars } from '../../themes/themes';
import { generateSlug } from '../../services/storage';
import { normalizeImageUrl } from '../../utils/urlHelper';
import ThemeWatermark from './ThemeWatermark';

// ─── SVG Icons ─────────────────────────────────────────────────────────────
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

const LinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

function parseResponsibilities(text) {
  if (!text) return [];
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[•\-\*]\s*/, ''));
}

// ─── Media Lightbox Component ──────────────────────────────────────────────
function MediaLightbox({ items, index, onClose, onIndex }) {
  if (!items || items.length === 0) return null;
  const current = items[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm font-semibold tracking-wider px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          ✕ Close
        </button>

        {current?.kind === 'image' ? (
          <img
            src={current.src}
            alt={current.caption || 'Project visual'}
            className="max-h-[75vh] w-auto max-w-full rounded-lg shadow-2xl object-contain border border-white/15"
          />
        ) : (
          <iframe
            src={current.src}
            title={current.caption || 'Document Preview'}
            className="w-full h-[75vh] rounded-lg shadow-2xl bg-white"
          />
        )}

        {current?.caption && (
          <p className="text-white/90 text-sm font-medium mt-3 text-center px-4">
            {current.caption}
          </p>
        )}

        {items.length > 1 && (
          <div className="flex gap-2 mt-3">
            {items.map((it, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Section Heading ───────────────────────────────────────────────────────
function SectionHeading({ title, id, theme, delay = 0, centered = false }) {
  const t = theme.colors;
  const isMonospace = theme.effects?.monospace;

  return (
    <div
      className={`mb-6 pf-section-header ${centered ? 'flex flex-col items-center text-center' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`flex items-center gap-3 mb-2.5 ${centered ? 'justify-center' : ''}`}>
        <h2
          id={id}
          className="font-bold tracking-tight transition-colors duration-200"
          style={{
            fontFamily: theme.fonts.display,
            fontSize: 'clamp(1.25rem, 2.2vw, 1.65rem)',
            color: t.headingColor || t.text || 'var(--pf-text-primary)',
            letterSpacing: isMonospace ? '0.04em' : '-0.01em',
            margin: 0,
          }}
        >
          {isMonospace && <span style={{ color: t.accent }}># </span>}
          {title}
        </h2>
      </div>
      <div
        className="h-0.5 rounded-full"
        style={{
          width: centered ? '60px' : '44px',
          background: t.sectionDivider || `linear-gradient(90deg, ${t.accent} 0%, transparent 100%)`,
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

  const themeId = rawData?.themeId || 'sage-cream';
  const layout = rawData?.layout || 'classic';
  const theme = useMemo(() => getTheme(themeId), [themeId]);
  const t = theme.colors;
  const fx = theme.effects;
  const isMonospace = fx.monospace;

  const profile = rawData?.profile || {};
  const education = rawData?.education || [];
  const experience = rawData?.experience || [];
  const projects = rawData?.projects || [];
  const skills = rawData?.skills || [];
  const certifications = rawData?.certifications || [];

  const slug = profile.slug || generateSlug(profile.name);
  const displayFont = theme.fonts.display;
  const bodyFont = theme.fonts.body;

  // Layered card style with soft ambient shadows and glassmorphic blur
  const cardStyle = {
    background: t.cardBg || 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.45) 100%)',
    border: `1px solid ${t.cardBorder || 'rgba(0,0,0,0.08)'}`,
    borderRadius: '16px',
    boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    padding: '24px',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative',
    zIndex: 2,
  };

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

  const cssVars = themeToCssVars(theme);

  const socialLink = (href, icon, label) =>
    href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm transition-all duration-150 hover:scale-105 shadow-sm"
        style={{
          color: t.accent,
          background: t.tag.bg,
          border: `1px solid ${t.tag.border}`,
          textDecoration: 'none',
          fontFamily: isMonospace ? theme.fonts.mono : bodyFont,
        }}
      >
        {icon}
        <span className="truncate max-w-[150px]">{label}</span>
      </a>
    ) : null;

  const avatarPosition = profile.imagePosition || 'right';
  const isAvatarLeft = avatarPosition === 'left';
  const isAvatarCenter = avatarPosition === 'center';
  const avatarDimension =
    profile.imageSize === 'sm' ? 75 : profile.imageSize === 'lg' ? 150 : 110;
  const bentoAvatarDimension =
    profile.imageSize === 'sm' ? 95 : profile.imageSize === 'lg' ? 165 : 130;

  return (
    <article
      key={`article-${themeId}-${layout}`}
      className={`min-h-full relative ${fx.scanlines ? 'scanlines' : ''} pf-preview transition-colors duration-200`}
      style={{
        fontFamily: 'var(--pf-font-body)',
        color: t.text || 'var(--pf-text-primary)',
        background: t.pageBg,
        ...cssVars,
      }}
      aria-label="Live portfolio preview"
    >
      {/* ── Direct Inline SVG Theme Watermark Component (z-index: 1) ── */}
      <ThemeWatermark themeId={themeId} layout={layout} color={t.accent} />

      {/* ── Glow Ambient Orbs for Warm Aesthetics ── */}
      {fx.glowOrbs && (
        <>
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none blur-3xl"
            style={{
              background: `radial-gradient(circle, rgba(${t.accentRgb},0.18) 0%, transparent 70%)`,
              transform: 'translate(25%, -25%)',
              zIndex: 1,
            }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full pointer-events-none blur-3xl"
            style={{
              background: `radial-gradient(circle, rgba(${t.accentRgb},0.12) 0%, transparent 70%)`,
              transform: 'translateY(30%)',
              zIndex: 1,
            }}
          />
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          LAYOUT 1: CLASSIC SPLIT (Balanced Multi-Column Layout)
      ══════════════════════════════════════════════════════════════════════ */}
      {layout === 'classic' && (
        <div className="relative z-[2]">
          {/* Hero Header */}
          <header
            className="relative px-10 pt-16 pb-14 transition-colors duration-200 z-[2]"
            style={{
              borderBottom: `1px solid ${t.border}`,
            }}
          >
            <div
              className={`relative flex ${
                isAvatarCenter
                  ? 'flex-col items-center text-center gap-6'
                  : isAvatarLeft
                  ? 'flex-col md:flex-row md:items-start gap-8'
                  : 'flex-col-reverse md:flex-row md:items-start justify-between gap-8'
              }`}
            >
              {/* Avatar on Left or Center */}
              {(isAvatarLeft || isAvatarCenter) && profile.imageUrl && (
                <div className="shrink-0 transition-all duration-200 relative z-10" style={{ isolation: 'isolate' }}>
                  <img
                    src={normalizeImageUrl(profile.imageUrl)}
                    alt={`${profile.name || 'Profile'} photo`}
                    style={{
                      width: `${avatarDimension}px`,
                      height: `${avatarDimension}px`,
                      borderRadius: '18px',
                      objectFit: 'cover',
                      border: `3px solid ${t.accent}`,
                      backgroundColor: t.surfaceSolid || t.pageBg || '#ffffff',
                      boxShadow: `0 8px 28px rgba(${t.accentRgb},0.22)`,
                      position: 'relative',
                      zIndex: 10,
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className={`flex-1 ${isAvatarCenter ? 'max-w-2xl' : ''}`}>
                <h1
                  className="font-bold leading-[1.15] mb-3 transition-colors duration-200"
                  style={{
                    fontFamily: displayFont,
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                    color: t.nameColor || t.text || 'var(--pf-text-primary)',
                  }}
                >
                  {profile.name || <span style={{ opacity: 0.35 }}>Your Name</span>}
                </h1>

                <p
                  className="text-lg font-semibold mb-6 transition-colors duration-200"
                  style={{
                    color: t.titleColor || t.accent || 'var(--pf-ui-accent)',
                    fontFamily: isMonospace ? theme.fonts.mono : displayFont,
                    letterSpacing: isMonospace ? '0.05em' : '0.02em',
                  }}
                >
                  {profile.title || <span style={{ opacity: 0.35 }}>Professional Title</span>}
                </p>

                <div className={`flex flex-wrap items-center gap-2.5 ${isAvatarCenter ? 'justify-center' : ''}`}>
                  {socialLink(`mailto:${profile.email}`, <MailIcon />, profile.email)}
                  {socialLink(profile.github, <GithubIcon />, 'GitHub')}
                  {socialLink(profile.linkedin, <LinkedInIcon />, 'LinkedIn')}
                  {socialLink(profile.twitter, <TwitterIcon />, 'Twitter')}
                  {profile.resumeLink && (
                    <a
                      href={profile.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all duration-150 hover:scale-105 shadow-sm"
                      style={{
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        background: t.accent,
                        border: `1px solid ${t.accent}`,
                        fontFamily: bodyFont,
                      }}
                    >
                      <LinkIcon />
                      <span>Resume / CV</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Avatar on Right */}
              {!isAvatarLeft && !isAvatarCenter && profile.imageUrl && (
                <div className="shrink-0 transition-all duration-200 relative z-10" style={{ isolation: 'isolate' }}>
                  <img
                    src={normalizeImageUrl(profile.imageUrl)}
                    alt={`${profile.name || 'Profile'} photo`}
                    style={{
                      width: `${avatarDimension}px`,
                      height: `${avatarDimension}px`,
                      borderRadius: '18px',
                      objectFit: 'cover',
                      border: `3px solid ${t.accent}`,
                      backgroundColor: t.surfaceSolid || t.pageBg || '#ffffff',
                      boxShadow: `0 8px 28px rgba(${t.accentRgb},0.22)`,
                      position: 'relative',
                      zIndex: 10,
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </header>

          {/* Body Content */}
          <div className="relative px-10 py-12 space-y-12 z-[2]">
            {profile.about && (
              <section aria-labelledby="pf-about" className="relative z-[2]">
                <SectionHeading title="About" id="pf-about" theme={theme} delay={100} />
                <div style={{ ...cardStyle }}>
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.85', color: t.text2, margin: 0 }}>
                    {profile.about}
                  </p>
                </div>
              </section>
            )}

            {/* Experience & Education */}
            {experience.length > 0 && (
              <section aria-labelledby="pf-exp" className="relative z-[2]">
                <SectionHeading title="Experience" id="pf-exp" theme={theme} delay={150} />
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} style={{ ...cardStyle, borderLeft: `4px solid ${t.accent}` }}>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 style={{ fontFamily: displayFont, fontSize: '1.12rem', fontWeight: 600, color: t.text, margin: '0 0 3px' }}>
                            {exp.role || 'Role'}
                          </h3>
                          <p style={{ fontSize: '0.95rem', fontWeight: 600, color: t.accent, margin: 0 }}>
                            {exp.company || 'Company'}
                          </p>
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, padding: '3px 10px', borderRadius: '6px', background: t.badgeBg, color: t.badgeText }}>
                          {[exp.startDate, exp.endDate || (exp.current ? 'Present' : '')].filter(Boolean).join(' – ')}
                        </span>
                      </div>
                      {exp.responsibilities && (
                        <ul className="space-y-1 mt-3 pl-0 list-none text-sm" style={{ color: t.text2 }}>
                          {parseResponsibilities(exp.responsibilities).map((line, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <span style={{ color: t.accent }}>▸</span>
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section aria-labelledby="pf-proj" className="relative z-[2]">
                <SectionHeading title="Projects" id="pf-proj" theme={theme} delay={200} />
                <div className="pf-masonry">
                  {projects.map((proj) => (
                    <article key={proj.id} className="pf-masonry-item" style={{ ...cardStyle }}>
                      {proj.imageUrl && (
                        <button
                          type="button"
                          onClick={() => openGallery(normalizeImageUrl(proj.imageUrl))}
                          className="block w-full mb-3.5 overflow-hidden rounded-xl group"
                          style={{ border: `1px solid ${t.border}`, padding: 0, cursor: 'zoom-in' }}
                        >
                          <img
                            src={normalizeImageUrl(proj.imageUrl)}
                            alt={proj.title || 'Project screenshot'}
                            className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            style={{ maxHeight: 230 }}
                          />
                        </button>
                      )}
                      <div className="flex items-start justify-between mb-2">
                        <h3 style={{ fontFamily: displayFont, fontSize: '1.1rem', fontWeight: 600, color: t.text, margin: 0 }}>
                          {proj.title || 'Project Title'}
                        </h3>
                        {proj.featured && (
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 9px', borderRadius: '20px', background: t.tag.bg, color: t.tag.text }}>
                            ★ Featured
                          </span>
                        )}
                      </div>
                      {proj.description && <p style={{ fontSize: '0.92rem', lineHeight: '1.7', color: t.text2, marginBottom: '14px' }}>{proj.description}</p>}
                      {proj.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3.5">
                          {proj.techStack.map((tech) => (
                            <span key={tech} className="backdrop-blur-sm" style={{ fontSize: '0.78rem', padding: '3px 10px', borderRadius: '20px', background: t.techTag.bg, color: t.techTag.text, border: `1px solid ${t.techTag.border}` }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-sm" style={{ color: t.accent, textDecoration: 'none' }}>
                          <LinkIcon /><span>View Project →</span>
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Skills & Certifications */}
            {skills.length > 0 && (
              <section aria-labelledby="pf-skills" className="relative z-[2]">
                <SectionHeading title="Skills & Expertise" id="pf-skills" theme={theme} delay={250} />
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill) => (
                    <span key={skill} className="backdrop-blur-sm shadow-sm transition-transform hover:scale-105" style={{ fontSize: '0.92rem', fontWeight: 600, padding: '8px 16px', borderRadius: '9999px', background: t.tag.bg, color: t.tag.text, border: `1px solid ${t.tag.border}` }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {certifications.length > 0 && (
              <section aria-labelledby="pf-certs" className="relative z-[2]">
                <SectionHeading title="Certifications" id="pf-certs" theme={theme} delay={300} />
                <div className="space-y-3.5">
                  {certifications.map((cert) => {
                    const media = cert.imageUrl || cert.fileUrl;
                    return (
                      <div key={cert.id} className="flex items-center justify-between gap-4" style={{ ...cardStyle, padding: '16px 20px' }}>
                        <div className="flex items-center gap-3.5 min-w-0">
                          {media && (
                            <button type="button" onClick={() => openGallery(normalizeImageUrl(media))} className="shrink-0" style={{ padding: 0, border: 0, background: 'transparent', cursor: 'zoom-in' }}>
                              <img src={normalizeImageUrl(media)} alt={cert.name || 'Certificate'} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8, border: `1px solid ${t.border}` }} />
                            </button>
                          )}
                          <div>
                            <p style={{ fontWeight: 600, color: t.text, fontSize: '0.98rem', margin: '0 0 2px' }}>{cert.name || 'Certification'}</p>
                            <p style={{ fontSize: '0.84rem', color: t.text3, margin: 0 }}>{cert.issuer}</p>
                          </div>
                        </div>
                        {cert.link && (
                          <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-semibold" style={{ color: t.accent, textDecoration: 'none' }}>
                            <LinkIcon /><span>Verify</span>
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          LAYOUT 2: MINIMAL CENTERED (Streamlined Single Column Flow)
      ══════════════════════════════════════════════════════════════════════ */}
      {layout === 'minimal' && (
        <div className="max-w-4xl mx-auto px-8 py-20 space-y-16 relative z-[2]">
          {/* Centered Hero */}
          <header className="flex flex-col items-center text-center space-y-5 relative z-[2]">
            {profile.imageUrl && (
              <div className="relative z-10" style={{ isolation: 'isolate' }}>
                <img
                  src={normalizeImageUrl(profile.imageUrl)}
                  alt={`${profile.name || 'Profile'} photo`}
                  style={{
                    width: `${avatarDimension}px`,
                    height: `${avatarDimension}px`,
                    borderRadius: '9999px',
                    objectFit: 'cover',
                    border: `3px solid ${t.accent}`,
                    backgroundColor: t.surfaceSolid || t.pageBg || '#ffffff',
                    boxShadow: `0 10px 30px rgba(${t.accentRgb},0.25)`,
                    position: 'relative',
                    zIndex: 10,
                  }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            )}

            <div>
              <h1
                className="font-bold tracking-tight mb-2"
                style={{
                  fontFamily: displayFont,
                  fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                  color: t.nameColor || t.text,
                }}
              >
                {profile.name || 'Your Name'}
              </h1>
              <p
                className="text-xl font-medium"
                style={{ color: t.titleColor || t.accent, fontFamily: displayFont }}
              >
                {profile.title || 'Professional Title'}
              </p>
            </div>

            {/* Social Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              {socialLink(`mailto:${profile.email}`, <MailIcon />, profile.email)}
              {socialLink(profile.github, <GithubIcon />, 'GitHub')}
              {socialLink(profile.linkedin, <LinkedInIcon />, 'LinkedIn')}
              {socialLink(profile.twitter, <TwitterIcon />, 'Twitter')}
              {profile.resumeLink && (
                <a
                  href={profile.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm hover:scale-105 transition-transform"
                  style={{ color: '#fff', background: t.accent, textDecoration: 'none' }}
                >
                  <LinkIcon /><span>Resume / CV</span>
                </a>
              )}
            </div>
          </header>

          {/* About */}
          {profile.about && (
            <div style={{ ...cardStyle, textAlign: 'center', padding: '32px' }}>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.9', color: t.text2, margin: 0 }}>
                {profile.about}
              </p>
            </div>
          )}

          {/* Projects Single Column */}
          {projects.length > 0 && (
            <section className="relative z-[2]">
              <SectionHeading title="Featured Work" id="min-proj" theme={theme} centered />
              <div className="space-y-8">
                {projects.map((proj) => (
                  <article key={proj.id} style={{ ...cardStyle }}>
                    {proj.imageUrl && (
                      <button
                        type="button"
                        onClick={() => openGallery(normalizeImageUrl(proj.imageUrl))}
                        className="block w-full mb-4 overflow-hidden rounded-xl"
                        style={{ border: `1px solid ${t.border}`, padding: 0, cursor: 'zoom-in' }}
                      >
                        <img
                          src={normalizeImageUrl(proj.imageUrl)}
                          alt={proj.title}
                          className="w-full object-cover max-h-80 hover:scale-102 transition-transform duration-300"
                        />
                      </button>
                    )}
                    <h3 style={{ fontFamily: displayFont, fontSize: '1.25rem', fontWeight: 600, color: t.text, margin: '0 0 6px' }}>
                      {proj.title}
                    </h3>
                    <p style={{ fontSize: '0.98rem', lineHeight: '1.7', color: t.text2, marginBottom: '14px' }}>
                      {proj.description}
                    </p>
                    {proj.techStack?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.techStack.map((tech) => (
                          <span key={tech} className="backdrop-blur-sm" style={{ fontSize: '0.8rem', padding: '3px 12px', borderRadius: '20px', background: t.techTag.bg, color: t.techTag.text, border: `1px solid ${t.techTag.border}` }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-sm" style={{ color: t.accent, textDecoration: 'none' }}>
                        <LinkIcon /><span>View Project →</span>
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Skills Pill Cluster */}
          {skills.length > 0 && (
            <section className="relative z-[2]">
              <SectionHeading title="Skills & Expertise" id="min-skills" theme={theme} centered />
              <div className="flex flex-wrap justify-center gap-3">
                {skills.map((skill) => (
                  <span key={skill} className="backdrop-blur-sm shadow-sm" style={{ fontSize: '0.95rem', fontWeight: 600, padding: '8px 20px', borderRadius: '9999px', background: t.tag.bg, color: t.tag.text, border: `1px solid ${t.tag.border}` }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          LAYOUT 3: BENTO GRID (Dynamic Interactive Asymmetric Layout)
      ══════════════════════════════════════════════════════════════════════ */}
      {layout === 'bento' && (
        <div className="max-w-6xl mx-auto px-8 py-14 space-y-6 relative z-[2]">
          {/* Bento Header Anchor Card (Spans Full) */}
          <div
            className={`p-8 rounded-3xl backdrop-blur-md transition-all relative overflow-hidden ${
              isAvatarCenter
                ? 'flex flex-col items-center text-center gap-6'
                : isAvatarLeft
                ? 'flex flex-col md:flex-row items-center md:items-start gap-8'
                : 'flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8'
            }`}
            style={{
              ...cardStyle,
              background: t.cardBg,
              padding: '36px',
            }}
          >
            {/* Bento Header Inset Theme Watermark */}
            <ThemeWatermark themeId={themeId} color={t.accent} variant="card" />

            {/* Avatar on Left or Center */}
            {(isAvatarLeft || isAvatarCenter) && profile.imageUrl && (
              <div className="shrink-0 transition-all duration-200 relative z-10" style={{ isolation: 'isolate' }}>
                <img
                  src={normalizeImageUrl(profile.imageUrl)}
                  alt={profile.name}
                  style={{
                    width: `${bentoAvatarDimension}px`,
                    height: `${bentoAvatarDimension}px`,
                    borderRadius: '24px',
                    objectFit: 'cover',
                    border: `3px solid ${t.accent}`,
                    backgroundColor: t.surfaceSolid || t.pageBg || '#ffffff',
                    boxShadow: `0 12px 36px rgba(${t.accentRgb},0.25)`,
                    position: 'relative',
                    zIndex: 10,
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className={`flex-1 space-y-4 relative z-[2] ${isAvatarCenter ? 'max-w-2xl' : ''}`}>
              <span
                className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block"
                style={{
                  background: t.tag.bg,
                  color: t.tag.text,
                  border: `1px solid ${t.tag.border}`,
                }}
              >
                Creative Portfolio
              </span>
              <h1
                style={{
                  fontFamily: displayFont,
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                  fontWeight: 800,
                  color: t.nameColor || t.text,
                  margin: 0,
                }}
              >
                {profile.name || 'Your Name'}
              </h1>
              <p
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: t.titleColor || t.accent,
                  margin: 0,
                  fontFamily: displayFont,
                }}
              >
                {profile.title || 'Professional Title'}
              </p>
              {profile.about && (
                <p style={{ fontSize: '1rem', lineHeight: '1.8', color: t.text2, margin: '12px 0 0' }}>
                  {profile.about}
                </p>
              )}
              <div className={`flex flex-wrap gap-2 pt-2 ${isAvatarCenter ? 'justify-center' : ''}`}>
                {socialLink(`mailto:${profile.email}`, <MailIcon />, profile.email)}
                {socialLink(profile.github, <GithubIcon />, 'GitHub')}
                {socialLink(profile.linkedin, <LinkedInIcon />, 'LinkedIn')}
                {profile.resumeLink && (
                  <a
                    href={profile.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm hover:scale-105 transition-transform"
                    style={{ color: '#fff', background: t.accent, textDecoration: 'none' }}
                  >
                    <LinkIcon />
                    <span>Resume</span>
                  </a>
                )}
              </div>
            </div>

            {/* Avatar on Right (default) */}
            {!isAvatarLeft && !isAvatarCenter && profile.imageUrl && (
              <div className="shrink-0 transition-all duration-200 relative z-10" style={{ isolation: 'isolate' }}>
                <img
                  src={normalizeImageUrl(profile.imageUrl)}
                  alt={profile.name}
                  style={{
                    width: `${bentoAvatarDimension}px`,
                    height: `${bentoAvatarDimension}px`,
                    borderRadius: '24px',
                    objectFit: 'cover',
                    border: `3px solid ${t.accent}`,
                    backgroundColor: t.surfaceSolid || t.pageBg || '#ffffff',
                    boxShadow: `0 12px 36px rgba(${t.accentRgb},0.25)`,
                    position: 'relative',
                    zIndex: 10,
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Bento Asymmetric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-[2]">
            {/* Bento Card 1: Featured Projects (Spans 2 Columns) */}
            {projects.length > 0 && (
              <div className="md:col-span-2 space-y-4" style={{ ...cardStyle }}>
                <SectionHeading title="Featured Projects" id="bento-proj" theme={theme} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.45)',
                        border: `1px solid ${t.border}`,
                      }}
                    >
                      {proj.imageUrl && (
                        <img
                          src={normalizeImageUrl(proj.imageUrl)}
                          alt={proj.title}
                          className="w-full h-32 object-cover rounded-lg mb-2.5 cursor-pointer"
                          onClick={() => openGallery(normalizeImageUrl(proj.imageUrl))}
                        />
                      )}
                      <h4 style={{ fontFamily: displayFont, fontWeight: 700, fontSize: '1rem', color: t.text, margin: '0 0 4px' }}>
                        {proj.title}
                      </h4>
                      <p style={{ fontSize: '0.86rem', color: t.text2, lineHeight: '1.6', margin: '0 0 8px' }}>
                        {proj.description}
                      </p>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs font-bold" style={{ color: t.accent, textDecoration: 'none' }}>
                          View Project →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bento Card 2: Technical Skills (Spans 1 Column) */}
            {skills.length > 0 && (
              <div className="space-y-4" style={{ ...cardStyle }}>
                <SectionHeading title="Core Skills" id="bento-skills" theme={theme} />
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="backdrop-blur-sm shadow-xs"
                      style={{
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        background: t.tag.bg,
                        color: t.tag.text,
                        border: `1px solid ${t.tag.border}`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bento Card 3: Experience & Roles (Spans 2 Columns) */}
            {experience.length > 0 && (
              <div className="md:col-span-2 space-y-4" style={{ ...cardStyle }}>
                <SectionHeading title="Experience" id="bento-exp" theme={theme} />
                <div className="space-y-3">
                  {experience.map((exp) => (
                    <div key={exp.id} className="pb-3 border-b last:border-b-0" style={{ borderColor: t.border }}>
                      <div className="flex items-center justify-between gap-2">
                        <h4 style={{ fontFamily: displayFont, fontWeight: 700, fontSize: '1rem', color: t.text, margin: 0 }}>
                          {exp.role} <span style={{ color: t.accent, fontWeight: 500 }}>@ {exp.company}</span>
                        </h4>
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: t.text3 }}>
                          {[exp.startDate, exp.endDate || (exp.current ? 'Present' : '')].filter(Boolean).join(' – ')}
                        </span>
                      </div>
                      {exp.responsibilities && (
                        <p style={{ fontSize: '0.88rem', color: t.text2, margin: '6px 0 0', lineHeight: '1.6' }}>
                          {exp.responsibilities}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bento Card 4: Certifications & Credentials (Spans 1 Column) */}
            {certifications.length > 0 && (
              <div className="space-y-4" style={{ ...cardStyle }}>
                <SectionHeading title="Certifications" id="bento-certs" theme={theme} />
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.4)', border: `1px solid ${t.border}` }}>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: t.text, margin: '0 0 2px' }}>
                        {cert.name}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: t.text3, margin: 0 }}>{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="relative z-[2] py-10 text-center" style={{ borderTop: `1px solid ${t.footerBorder || t.border}` }}>
        <p style={{ fontSize: '0.85rem', color: t.footerText || t.text3, fontFamily: bodyFont }}>
          Built with <span style={{ color: t.accent, fontWeight: 700 }}>Folio Vitae</span>
          {slug && <> · foliovitae.app/<span style={{ color: t.accent, fontWeight: 600 }}>{slug}</span></>}
        </p>
      </footer>

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
