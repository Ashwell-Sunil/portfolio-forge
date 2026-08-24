/**
 * Browser-side portfolio HTML generator.
 * Runs entirely client-side — no backend needed.
 * Images are already base64 data URIs (from FileReader), so no embedding step needed.
 */

const THEMES = {
  'engineering-dark': {
    pageBg: '#0b0f1a', heroBg: 'linear-gradient(135deg,#0b0f1a 0%,#0f172a 60%,#1a1030 100%)',
    bodyBg: '#0d1117', cardBg: 'linear-gradient(145deg,#1a2234,#111827)', cardBorder: '#1f2d45',
    text: '#e2e8f0', text2: '#94a3b8', text3: '#64748b',
    accent: '#6366f1', accent2: '#818cf8', accentRgb: '99,102,241',
    nameGrad: 'linear-gradient(135deg,#fff 0%,#e2e8f0 60%,#a78bfa 100%)',
    titleColor: '#818cf8', headingColor: '#f1f5f9',
    sectionLine: 'linear-gradient(90deg,rgba(99,102,241,0.5),transparent)',
    tag: 'rgba(99,102,241,0.1)', tagText: '#a5b4fc', tagBorder: 'rgba(99,102,241,0.25)',
    tech: 'rgba(167,139,250,0.08)', techText: '#c4b5fd', techBorder: 'rgba(167,139,250,0.2)',
    dot: '#6366f1', dotGlow: 'rgba(99,102,241,0.6)', line: 'rgba(99,102,241,0.2)',
    footerBorder: 'rgba(31,45,69,0.6)', footerText: '#475569',
    badge: 'rgba(99,102,241,0.1)', badgeText: '#818cf8', badgeBorder: 'rgba(99,102,241,0.2)',
    grid: true, glowOrbs: true, mono: false, scanlines: false, glass: false,
    displayFont: "'Space Grotesk',Inter,sans-serif", bodyFont: "Inter,system-ui,sans-serif",
  },
  'minimal-light': {
    pageBg: '#fff', heroBg: '#fff', bodyBg: '#fafafa', cardBg: '#fff', cardBorder: '#e5e7eb',
    text: '#111827', text2: '#374151', text3: '#9ca3af',
    accent: '#111827', accent2: '#374151', accentRgb: '17,24,39',
    nameGrad: 'none', nameColor: '#111827', titleColor: '#6b7280', headingColor: '#111827',
    sectionLine: 'linear-gradient(90deg,#111827,transparent)',
    tag: '#f3f4f6', tagText: '#374151', tagBorder: '#e5e7eb',
    tech: '#f9fafb', techText: '#4b5563', techBorder: '#e5e7eb',
    dot: '#111827', dotGlow: 'none', line: '#e5e7eb',
    footerBorder: '#e5e7eb', footerText: '#9ca3af',
    badge: '#f3f4f6', badgeText: '#6b7280', badgeBorder: '#e5e7eb',
    grid: false, glowOrbs: false, mono: false, scanlines: false, glass: false,
    displayFont: "Inter,sans-serif", bodyFont: "Inter,system-ui,sans-serif",
  },
  'editorial-glass': {
    pageBg: '#0f0a1e', heroBg: 'linear-gradient(135deg,#1a0533 0%,#0f0a2e 40%,#001a33 100%)',
    bodyBg: 'linear-gradient(170deg,#0f0a1e,#0a1030 50%,#001825)',
    cardBg: 'rgba(255,255,255,0.04)', cardBorder: 'rgba(255,255,255,0.1)',
    text: '#f0e6ff', text2: '#c4b5fd', text3: '#7c6ea0',
    accent: '#e879f9', accent2: '#c084fc', accentRgb: '232,121,249',
    nameGrad: 'linear-gradient(135deg,#e879f9,#818cf8 50%,#22d3ee)',
    titleColor: '#c084fc', headingColor: '#f0e6ff',
    sectionLine: 'linear-gradient(90deg,rgba(232,121,249,0.5),transparent)',
    tag: 'rgba(232,121,249,0.1)', tagText: '#e879f9', tagBorder: 'rgba(232,121,249,0.25)',
    tech: 'rgba(192,132,252,0.08)', techText: '#c084fc', techBorder: 'rgba(192,132,252,0.2)',
    dot: '#e879f9', dotGlow: 'rgba(232,121,249,0.6)', line: 'rgba(232,121,249,0.15)',
    footerBorder: 'rgba(255,255,255,0.06)', footerText: '#7c6ea0',
    badge: 'rgba(232,121,249,0.08)', badgeText: '#c084fc', badgeBorder: 'rgba(232,121,249,0.2)',
    grid: false, glowOrbs: true, mono: false, scanlines: false, glass: true,
    displayFont: "'Space Grotesk',Inter,sans-serif", bodyFont: "Inter,system-ui,sans-serif",
  },
  'terminal-cyber': {
    pageBg: '#000', heroBg: '#000', bodyBg: '#000', cardBg: '#050505', cardBorder: 'rgba(0,255,65,0.2)',
    text: '#00ff41', text2: '#00cc33', text3: '#006618',
    accent: '#00ff41', accent2: '#39ff14', accentRgb: '0,255,65',
    nameGrad: 'none', nameColor: '#00ff41', titleColor: '#ffb700', headingColor: '#00ff41',
    sectionLine: 'linear-gradient(90deg,rgba(0,255,65,0.6),transparent)',
    tag: 'rgba(0,255,65,0.06)', tagText: '#00ff41', tagBorder: 'rgba(0,255,65,0.3)',
    tech: 'rgba(255,183,0,0.06)', techText: '#ffb700', techBorder: 'rgba(255,183,0,0.25)',
    dot: '#00ff41', dotGlow: 'rgba(0,255,65,0.8)', line: 'rgba(0,255,65,0.25)',
    footerBorder: 'rgba(0,255,65,0.15)', footerText: '#006618',
    badge: 'rgba(0,255,65,0.06)', badgeText: '#00cc33', badgeBorder: 'rgba(0,255,65,0.2)',
  'obsidian-ember': {
    pageBg: '#0f1115', heroBg: 'linear-gradient(135deg,#0f1115 0%,#15181f 60%,#1f232d 100%)',
    bodyBg: '#11141a', cardBg: '#181b22', cardBorder: '#2c303d',
    text: '#f1f3f5', text2: '#9ca3af', text3: '#6b7280',
    accent: '#d97736', accent2: '#b85e22', accentRgb: '217,119,54',
    nameGrad: 'linear-gradient(135deg,#fff 0%,#f1f3f5 60%,#d97736 100%)',
    titleColor: '#f59e0b', headingColor: '#f1f3f5',
    sectionLine: 'linear-gradient(90deg,rgba(217,119,54,0.5),transparent)',
    tag: 'rgba(217,119,54,0.14)', tagText: '#fed7aa', tagBorder: 'rgba(217,119,54,0.3)',
    tech: 'rgba(156,163,175,0.12)', techText: '#e5e7eb', techBorder: 'rgba(156,163,175,0.25)',
    dot: '#d97736', dotGlow: 'rgba(217,119,54,0.6)', line: '#2c303d',
    footerBorder: '#2c303d', footerText: '#6b7280',
    badge: 'rgba(217,119,54,0.14)', badgeText: '#fdba74', badgeBorder: 'rgba(217,119,54,0.3)',
    grid: true, glowOrbs: true, mono: false, scanlines: false, glass: false,
    displayFont: "'Space Grotesk',Inter,sans-serif", bodyFont: "Inter,system-ui,sans-serif",
  },
  'midnight-abyss': {
    pageBg: '#0a0e17', heroBg: 'linear-gradient(135deg,#0a0e17 0%,#101626 60%,#182238 100%)',
    bodyBg: '#0c111c', cardBg: '#131b2e', cardBorder: '#23304b',
    text: '#e8edf5', text2: '#94a3b8', text3: '#64748b',
    accent: '#3b82f6', accent2: '#1d4ed8', accentRgb: '59,130,246',
    nameGrad: 'linear-gradient(135deg,#fff 0%,#e8edf5 60%,#3b82f6 100%)',
    titleColor: '#60a5fa', headingColor: '#e8edf5',
    sectionLine: 'linear-gradient(90deg,rgba(59,130,246,0.5),transparent)',
    tag: 'rgba(59,130,246,0.14)', tagText: '#bfdbfe', tagBorder: 'rgba(59,130,246,0.3)',
    tech: 'rgba(148,163,184,0.12)', techText: '#e2e8f0', techBorder: 'rgba(148,163,184,0.25)',
    dot: '#3b82f6', dotGlow: 'rgba(59,130,246,0.6)', line: '#23304b',
    footerBorder: '#23304b', footerText: '#64748b',
    badge: 'rgba(59,130,246,0.14)', badgeText: '#93c5fd', badgeBorder: 'rgba(59,130,246,0.3)',
    grid: false, glowOrbs: true, mono: false, scanlines: false, glass: false,
    displayFont: "'Space Grotesk',Inter,sans-serif", bodyFont: "Inter,system-ui,sans-serif",
  },
  'emerald-eclipse': {
    pageBg: '#0b130e', heroBg: 'linear-gradient(135deg,#0b130e 0%,#111e16 60%,#192d22 100%)',
    bodyBg: '#0d1610', cardBg: '#14221a', cardBorder: '#233d2f',
    text: '#e9f5ed', text2: '#a7c4b2', text3: '#6b8e78',
    accent: '#10b981', accent2: '#059669', accentRgb: '16,185,129',
    nameGrad: 'linear-gradient(135deg,#fff 0%,#e9f5ed 60%,#10b981 100%)',
    titleColor: '#34d399', headingColor: '#e9f5ed',
    sectionLine: 'linear-gradient(90deg,rgba(16,185,129,0.5),transparent)',
    tag: 'rgba(16,185,129,0.14)', tagText: '#a7f3d0', tagBorder: 'rgba(16,185,129,0.3)',
    tech: 'rgba(167,196,178,0.12)', techText: '#e9f5ed', techBorder: 'rgba(167,196,178,0.25)',
    dot: '#10b981', dotGlow: 'rgba(16,185,129,0.6)', line: '#233d2f',
    footerBorder: '#233d2f', footerText: '#6b8e78',
    badge: 'rgba(16,185,129,0.14)', badgeText: '#6ee7b7', badgeBorder: 'rgba(16,185,129,0.3)',
    grid: false, glowOrbs: true, mono: false, scanlines: false, glass: false,
    displayFont: "'Space Grotesk',Inter,sans-serif", bodyFont: "Inter,system-ui,sans-serif",
  },
};

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatExternalUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';
  if (/^(?:mailto:|tel:|blob:|data:)/i.test(trimmed)) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('//')) return `https:${trimmed}`;
  return `https://${trimmed}`;
}

function responsibilityList(text, t) {
  if (!text) return '';
  const lines = text.split('\n').filter(l => l.trim()).map(l => l.replace(/^[•\-]\s*/, ''));
  const bullet = t.mono ? '>' : '▸';
  return `<ul class="resp-list">${lines.map(l =>
    `<li><span class="bullet" style="color:${t.accent}">${bullet}</span>${esc(l)}</li>`
  ).join('')}</ul>`;
}

function socialLinks(profile, t) {
  const links = [];
  if (profile.email)      links.push(`<a href="mailto:${esc(profile.email)}" class="social-link"><span class="icon">✉</span>${esc(profile.email)}</a>`);
  if (profile.github)     links.push(`<a href="${esc(formatExternalUrl(profile.github))}" target="_blank" rel="noopener noreferrer" class="social-link"><span class="icon">⌥</span>GitHub</a>`);
  if (profile.linkedin)   links.push(`<a href="${esc(formatExternalUrl(profile.linkedin))}" target="_blank" rel="noopener noreferrer" class="social-link"><span class="icon">in</span>LinkedIn</a>`);
  if (profile.twitter)    links.push(`<a href="${esc(formatExternalUrl(profile.twitter))}" target="_blank" rel="noopener noreferrer" class="social-link"><span class="icon">𝕏</span>Twitter</a>`);
  if (profile.resumeLink) links.push(`<a href="${esc(formatExternalUrl(profile.resumeLink))}" target="_blank" rel="noopener noreferrer" class="social-link resume-link">Resume ↗</a>`);
  return links.length ? `<div class="social-row">${links.join('')}</div>` : '';
}

function sectionHeading(text, t) {
  const prefix = t.mono ? `<span style="color:${t.accent}">▶ </span>` : '';
  return `<div class="section-heading">
    ${prefix}<h2 style="color:${t.headingColor};font-family:${t.displayFont}">${esc(text)}</h2>
    <div class="section-line" style="background:${t.sectionLine}"></div>
  </div>`;
}

function generateCSS(t) {
  const gridCSS = t.grid ? (t.mono
    ? `background-image:linear-gradient(rgba(0,255,65,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,65,0.07) 1px,transparent 1px);background-size:20px 20px;`
    : `background-image:linear-gradient(rgba(99,102,241,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.12) 1px,transparent 1px);background-size:36px 36px;`) : '';

  return `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-size:16px;-webkit-font-smoothing:antialiased}
body{background:${t.pageBg};color:${t.text};font-family:${t.bodyFont};min-height:100vh}
a{color:${t.accent};text-decoration:none}a:hover{opacity:0.75}
img{max-width:100%;display:block}
${t.scanlines ? `body::after{content:'';position:fixed;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.12) 2px,rgba(0,0,0,0.12) 4px);z-index:9999}` : ''}
.hero{position:relative;overflow:hidden;background:${t.heroBg};padding:56px 48px 48px}
.hero-grid{position:absolute;inset:0;pointer-events:none;${gridCSS}}
.orb1{position:absolute;top:0;right:0;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(${t.accentRgb},0.18),transparent 70%);transform:translate(30%,-30%);pointer-events:none}
.orb2{position:absolute;bottom:0;left:33%;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(${t.accentRgb},0.1),transparent 70%);transform:translateY(40%);pointer-events:none}
.hero-inner{position:relative;display:flex;align-items:flex-start;justify-content:space-between;gap:32px}
.hero-text{flex:1;min-width:0}
.term-cmd{color:${t.titleColor};font-size:.75rem;letter-spacing:.05em;margin-bottom:12px;opacity:.8}
h1.name{font-family:${t.displayFont};font-weight:700;line-height:1.1;font-size:clamp(2rem,5vw,3.6rem);margin-bottom:12px;${t.nameGrad !== 'none' ? `background:${t.nameGrad};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text` : `color:${t.nameColor || t.text}`};${t.mono ? `text-shadow:0 0 20px rgba(${t.accentRgb},0.5)` : ''}}
.title{font-family:${t.displayFont};font-size:1rem;font-weight:600;color:${t.titleColor};letter-spacing:.04em;margin-bottom:20px}
.avatar{width:96px;height:96px;border-radius:${t.mono ? '4px' : '14px'};object-fit:cover;border:2px solid rgba(${t.accentRgb},.35);box-shadow:0 0 28px rgba(${t.accentRgb},.2);flex-shrink:0}
.social-row{display:flex;flex-wrap:wrap;gap:12px 20px;align-items:center}
.social-link{display:inline-flex;align-items:center;gap:6px;font-size:.875rem;color:${t.text2};transition:color .15s}
.social-link:hover{color:${t.accent}}
.social-link .icon{font-size:.8rem;opacity:.7}
.resume-link{padding:4px 12px;border-radius:6px;border:1px solid rgba(${t.accentRgb},.35);background:rgba(${t.accentRgb},.06);color:${t.accent}}
.body{background:${t.bodyBg};padding:48px;min-height:200px}
.section{margin-bottom:48px;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) both}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.section:nth-child(1){animation-delay:.05s}.section:nth-child(2){animation-delay:.12s}.section:nth-child(3){animation-delay:.2s}.section:nth-child(4){animation-delay:.28s}.section:nth-child(5){animation-delay:.36s}.section:nth-child(6){animation-delay:.44s}
.section-heading{display:flex;align-items:center;gap:12px;margin-bottom:24px}
.section-heading h2{font-size:.8rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap}
.section-line{flex:1;height:1px;min-width:20px}
.about-text{font-size:1.0625rem;line-height:1.85;color:${t.text2};max-width:62ch}
.edu-items{display:flex;flex-direction:column;gap:20px}
.edu-item{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;padding-bottom:20px;border-bottom:1px solid rgba(${t.accentRgb},.08)}
.edu-item:last-child{border-bottom:none;padding-bottom:0}
.edu-degree{font-family:${t.displayFont};font-size:1.1rem;font-weight:600;color:${t.text};margin-bottom:4px}
.edu-inst{font-size:.9375rem;color:${t.accent2};margin-bottom:4px}
.edu-gpa{font-size:.8125rem;color:${t.text3}}
.badge{font-size:.8125rem;font-weight:600;padding:4px 10px;border-radius:6px;background:${t.badge};color:${t.badgeText};border:1px solid ${t.badgeBorder};white-space:nowrap}
.exp-items{display:flex;flex-direction:column;gap:32px}
.exp-item{position:relative;padding-left:20px;border-left:1px solid ${t.line}}
.exp-dot{position:absolute;left:-7px;top:6px;width:14px;height:14px;border-radius:50%;background:${t.dot};box-shadow:${t.dotGlow !== 'none' ? `0 0 10px ${t.dotGlow}` : 'none'}}
.exp-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:8px}
.exp-role{font-family:${t.displayFont};font-size:1.1rem;font-weight:600;color:${t.text};margin-bottom:3px}
.exp-company{font-size:.9375rem;font-weight:500;color:${t.accent2}}
.exp-dates{font-size:.8125rem;color:${t.text3};white-space:nowrap;margin-top:2px}
.resp-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:6px}
.resp-list li{display:flex;align-items:flex-start;gap:8px;font-size:.9375rem;line-height:1.65;color:${t.text2}}
.bullet{flex-shrink:0;margin-top:.35em;font-size:.6rem}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
.proj-grid.single{grid-template-columns:1fr}
.proj-card{border-radius:14px;padding:20px;background:${t.glass ? 'rgba(255,255,255,0.04)' : t.cardBg};border:1px solid ${t.cardBorder};transition:transform .2s,box-shadow .2s;animation:cardPop .45s cubic-bezier(.16,1,.3,1) both}
.proj-card:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(${t.accentRgb},.12)}
.proj-card.featured{border-color:rgba(${t.accentRgb},.4);box-shadow:0 0 24px rgba(${t.accentRgb},.12)}
@keyframes cardPop{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:none}}
.proj-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px}
.proj-title{font-family:${t.displayFont};font-size:1.05rem;font-weight:600;color:${t.text}}
.feat-badge{font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:20px;background:${t.tag};color:${t.tagText};border:1px solid ${t.tagBorder};letter-spacing:.05em;white-space:nowrap;margin-left:8px;text-transform:uppercase}
.proj-desc{font-size:.9rem;line-height:1.65;color:${t.text2};margin-bottom:12px}
.proj-img{width:100%;height:140px;object-fit:cover;border-radius:8px;margin-bottom:12px;border:1px solid ${t.cardBorder}}
.tech-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
.tech-tag{font-size:.75rem;padding:3px 9px;border-radius:20px;background:${t.tech};color:${t.techText};border:1px solid ${t.techBorder}}
.proj-link{display:inline-flex;align-items:center;gap:6px;font-size:.875rem;color:${t.accent}}
.skills-wrap{display:flex;flex-wrap:wrap;gap:8px}
.skill-tag{font-size:.9rem;font-weight:500;padding:7px 14px;border-radius:10px;background:${t.tag};color:${t.tagText};border:1px solid ${t.tagBorder}}
.cert-item{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 0;border-bottom:1px solid ${t.footerBorder}}
.cert-item:last-child{border-bottom:none}
.cert-name{font-weight:600;font-size:.9375rem;color:${t.text};margin-bottom:2px}
.cert-issuer{font-size:.8125rem;color:${t.text3}}
.cert-meta{display:flex;align-items:center;gap:12px;flex-shrink:0}
.cert-year{font-size:.8125rem;color:${t.text3}}
.cert-link{font-size:.8125rem;color:${t.accent}}
footer{padding:24px 0 0;border-top:1px solid ${t.footerBorder};text-align:center;margin-top:0}
footer p{font-size:.8125rem;color:${t.footerText}}
footer .brand{color:${t.accent}}
@media(max-width:640px){
  .hero{padding:32px 20px 28px}
  .body{padding:28px 20px}
  .hero-inner{flex-direction:column-reverse;gap:16px}
  .avatar{width:72px;height:72px}
  h1.name{font-size:clamp(1.8rem,8vw,2.5rem)}
  .proj-grid{grid-template-columns:1fr}
}`;
}

export function generatePortfolioHTML(data, themeId = 'engineering-dark') {
  const {
    profile = {},
    education = [],
    experience = [],
    projects = [],
    skills = [],
    certifications = [],
  } = data;

  const t = THEMES[themeId] || THEMES['engineering-dark'];
  const css = generateCSS(t);

  const slug = profile.slug
    || (profile.name || '').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 30)
    || 'portfolio';

  const avatarHtml = profile.imageUrl
    ? `<img src="${profile.imageUrl}" alt="${esc(profile.name)} photo" class="avatar">`
    : '';

  const aboutHtml = profile.about ? `
    <section class="section">
      ${sectionHeading('About', t)}
      <p class="about-text">${esc(profile.about)}</p>
    </section>` : '';

  const eduHtml = education.length ? `
    <section class="section">
      ${sectionHeading('Education', t)}
      <div class="edu-items">
        ${education.map(e => {
          const degreeText = e.degree && e.major && !e.degree.toLowerCase().includes(e.major.toLowerCase())
            ? `${esc(e.degree)} · ${esc(e.major)}`
            : esc(e.degree || e.major || 'Degree');
          const dates = [e.startDate || e.startYear, e.endDate || e.endYear || (e.current ? 'Present' : '')].filter(Boolean).join(' – ');
          return `
          <div class="edu-item">
            <div>
              <div class="edu-degree">${degreeText}</div>
              <div class="edu-inst">${esc(e.institution || '')}</div>
              ${e.gpa ? `<div class="edu-gpa">GPA: ${esc(e.gpa)}</div>` : ''}
            </div>
            ${dates ? `<span class="badge">${esc(dates)}</span>` : ''}
          </div>`;
        }).join('')}
      </div>
    </section>` : '';

  const expHtml = experience.length ? `
    <section class="section">
      ${sectionHeading('Experience', t)}
      <div class="exp-items">
        ${experience.map(e => `
          <div class="exp-item">
            <div class="exp-dot"></div>
            <div class="exp-header">
              <div>
                <div class="exp-role">${esc(e.role || '')}</div>
                <div class="exp-company">${esc(e.company || '')}</div>
              </div>
              <span class="exp-dates">${esc([e.startDate, e.endDate || (e.current ? 'Present' : '')].filter(Boolean).join(' – '))}</span>
            </div>
            ${responsibilityList(e.responsibilities, t)}
          </div>`).join('')}
      </div>
    </section>` : '';

  const projHtml = projects.length ? `
    <section class="section">
      ${sectionHeading('Projects', t)}
      <div class="proj-grid${projects.length === 1 ? ' single' : ''}">
        ${projects.map(p => {
          const stackList = Array.isArray(p.techStack)
            ? p.techStack
            : (typeof p.techStack === 'string' ? p.techStack.split(',').map(s => s.trim()).filter(Boolean) : []);
          return `
          <article class="proj-card${p.featured ? ' featured' : ''}">
            ${p.imageUrl ? `<img src="${p.imageUrl}" alt="${esc(p.title)} screenshot" class="proj-img">` : ''}
            <div class="proj-header">
              <div class="proj-title">${esc(p.title || '')}</div>
              ${p.featured ? `<span class="feat-badge">${t.mono ? '[FEAT]' : '★ Featured'}</span>` : ''}
            </div>
            ${p.description ? `<div class="proj-desc">${esc(p.description)}</div>` : ''}
            ${stackList.length ? `<div class="tech-tags">${stackList.map(s => `<span class="tech-tag">${esc(s)}</span>`).join('')}</div>` : ''}
            ${p.link ? `<a href="${esc(formatExternalUrl(p.link))}" target="_blank" rel="noopener noreferrer" class="proj-link">↗ ${t.mono ? '$ open' : 'View Project'}</a>` : ''}
          </article>`;
        }).join('')}
      </div>
    </section>` : '';

  const skillsHtml = skills.length ? `
    <section class="section">
      ${sectionHeading('Skills', t)}
      <div class="skills-wrap">
        ${skills.map(s => `<span class="skill-tag">${esc(s)}</span>`).join('')}
      </div>
    </section>` : '';

  const certsHtml = certifications.length ? `
    <section class="section">
      ${sectionHeading('Certifications', t)}
      ${certifications.map(c => {
        const certYear = c.year || c.date || '';
        return `
        <div class="cert-item">
          <div>
            <div class="cert-name">${esc(c.name || '')}</div>
            <div style="display:flex;gap:8px;align-items:center;margin-top:2px;">
              ${c.issuer ? `<span class="cert-issuer">${esc(c.issuer)}</span>` : ''}
              ${c.issuer && certYear ? `<span style="color:${t.text3};font-size:.8125rem">·</span>` : ''}
              ${certYear ? `<span class="cert-year" style="color:${t.accent};font-weight:600">${esc(certYear)}</span>` : ''}
            </div>
          </div>
          <div class="cert-meta">
            ${c.fileUrl ? `<a href="${esc(formatExternalUrl(c.fileUrl))}" target="_blank" rel="noopener noreferrer" class="cert-link">📎 View</a>` : ''}
            ${c.link && !c.fileUrl ? `<a href="${esc(formatExternalUrl(c.link))}" target="_blank" rel="noopener noreferrer" class="cert-link">↗ Verify</a>` : ''}
          </div>
        </div>`;
      }).join('')}
    </section>` : '';

  const fonts = `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="description" content="${esc((profile.about || '').slice(0, 160) || `Portfolio of ${profile.name}`)}">
<meta property="og:title" content="${esc(profile.name)} — Portfolio">
<meta property="og:description" content="${esc((profile.about || '').slice(0, 160))}">
${profile.imageUrl ? `<meta property="og:image" content="${profile.imageUrl}">` : ''}
<title>${esc(profile.name || 'Portfolio')} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${fonts}" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<article>
  <header class="hero">
    <div class="hero-grid"></div>
    ${t.glowOrbs ? '<div class="orb1"></div><div class="orb2"></div>' : ''}
    <div class="hero-inner">
      <div class="hero-text">
        ${t.mono && profile.name ? `<div class="term-cmd">$ whoami</div>` : ''}
        <h1 class="name">${esc(profile.name || 'Your Name')}</h1>
        <div class="title">${t.mono && profile.title ? '> ' : ''}${esc(profile.title || '')}</div>
        ${socialLinks(profile, t)}
      </div>
      ${avatarHtml}
    </div>
  </header>
  <div class="body">
    ${aboutHtml}${eduHtml}${expHtml}${projHtml}${skillsHtml}${certsHtml}
    <footer>
      <p>Built with <span class="brand">Folio Vitae</span></p>
    </footer>
  </div>
</article>
</body>
</html>`;
}
