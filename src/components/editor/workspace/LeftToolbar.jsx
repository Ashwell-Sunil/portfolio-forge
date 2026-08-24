import { User, Briefcase, Code2, Palette, Settings } from 'lucide-react';

const TABS = [
  { id: 'profile', label: 'Identity', icon: User },
  { id: 'work', label: 'Work & Projects', icon: Briefcase },
  { id: 'skills', label: 'Skills & Certs', icon: Code2 },
  { id: 'theme', label: 'Appearance & Theme', icon: Palette },
  { id: 'settings', label: 'Publish & Account', icon: Settings },
];

export default function LeftToolbar({ activeTab, onChange }) {
  return (
    <nav
      className="h-full shrink-0 flex flex-col items-center py-2.5 gap-1.5 transition-colors"
      style={{
        width: 48,
        background: 'var(--pf-toolbar-bg, #1e1e1e)',
        borderRight: '1px solid var(--pf-border-color, #323232)',
      }}
      aria-label="Editor tools"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            title={tab.label}
            aria-label={tab.label}
            aria-current={active ? 'page' : undefined}
            onClick={() => onChange(tab.id)}
            className="w-9 h-9 flex items-center justify-center transition-all"
            style={{
              borderRadius: 3,
              background: active ? 'var(--pf-ui-accent, #1473E6)' : 'transparent',
              color: active ? 'var(--pf-ui-accent-text, #ffffff)' : 'var(--pf-text-muted, #b3b3b3)',
            }}
          >
            <Icon size={18} strokeWidth={1.8} />
          </button>
        );
      })}
    </nav>
  );
}
