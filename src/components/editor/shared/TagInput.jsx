import { useState, useRef } from 'react';

const XIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/**
 * Adobe Spectrum-styled tag/chip input inheriting dynamic theme CSS variables
 */
export default function TagInput({ id, label, tags = [], onChange, placeholder = 'Type and press Enter' }) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const addTag = (val) => {
    const trimmed = val.trim().replace(/,+$/, '');
    if (!trimmed || tags.includes(trimmed)) return;
    onChange([...tags, trimmed]);
    setInput('');
  };

  const removeTag = (tag) => {
    onChange(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="spectrum-label">
          {label}
        </label>
      )}
      <div
        className="min-h-[36px] w-full px-2 py-1.5 flex flex-wrap items-center gap-1.5 cursor-text transition-colors"
        style={{
          backgroundColor: 'var(--pf-input-bg, #FAF7F1)',
          border: '1px solid var(--pf-input-border, #CFC2AF)',
          borderRadius: 4,
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors"
            style={{
              backgroundColor: 'var(--pf-card-bg, #EDF5ED)',
              color: 'var(--pf-text-primary, #1B2A1B)',
              border: '1px solid var(--pf-border-color, #B0C6B0)',
            }}
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              aria-label={`Remove ${tag}`}
              className="text-[var(--pf-text-muted,#888)] hover:text-[#ec5b62] transition-colors"
            >
              <XIcon />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input && addTag(input)}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[90px] bg-transparent text-[12px] outline-none"
          style={{
            color: 'var(--pf-text-primary, #1B2A1B)',
          }}
          aria-label={label || 'Tag input'}
        />
      </div>
      <p className="text-[10px]" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>Press Enter or comma to add</p>
    </div>
  );
}
