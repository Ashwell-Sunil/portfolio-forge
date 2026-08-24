import { useState } from 'react';

const ChevronIcon = ({ open }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/**
 * Adobe Spectrum-styled Collapsible Accordion Section
 * Inherits dynamic theme CSS variables
 */
export default function SectionWrapper({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="overflow-hidden transition-colors"
      style={{
        background: 'var(--pf-accordion-bg, #F5EFE6)',
        border: '1px solid var(--pf-border-color, #D8CEBE)',
        borderRadius: 4,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 text-left transition-colors"
        style={{
          background: open ? 'var(--pf-accordion-hover, #EBE3D6)' : 'var(--pf-accordion-bg, #F5EFE6)',
          borderBottom: open ? '1px solid var(--pf-border-color, #D8CEBE)' : 'none',
        }}
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          {icon && <span style={{ color: 'var(--pf-ui-accent, #447244)' }}>{icon}</span>}
          <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: 'var(--pf-text-primary, #1B2A1B)' }}>
            {title}
          </span>
        </div>
        <span style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>
          <ChevronIcon open={open} />
        </span>
      </button>

      {open && (
        <div className="p-3 space-y-3 transition-colors" style={{ background: 'var(--pf-card-bg, #FCFAF6)' }}>
          {children}
        </div>
      )}
    </div>
  );
}
