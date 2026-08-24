import { useState } from 'react';
import ProfileSection from './sections/ProfileSection';
import EducationSection from './sections/EducationSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ThemeSection from './sections/ThemeSection';

const NAV_ITEMS = [
  { id: 'appearance', label: '✦ Theme' },
  { id: 'profile', label: 'Profile' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
];

export default function EditorPane() {
  const [activeSection, setActiveSection] = useState('profile');

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(`editor-section-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside
      className="w-[38%] min-w-[300px] max-w-[500px] flex flex-col h-full"
      style={{
        background: 'rgba(11,15,26,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(31,45,69,0.6)',
      }}
      aria-label="Portfolio editor"
    >
      {/* Section Nav Pills */}
      <nav
        className="flex gap-1 px-3 py-2 overflow-x-auto shrink-0"
        style={{ borderBottom: '1px solid rgba(31,45,69,0.5)', background: 'rgba(17,24,39,0.6)' }}
        aria-label="Editor sections"
      >
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className={`
              shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide transition-all duration-150
              ${activeSection === item.id
                ? 'bg-forge-accent text-white'
                : 'text-forge-text-3 hover:text-forge-text hover:bg-forge-surface-2'
              }
            `}
            aria-label={`Go to ${item.label} section`}
            aria-current={activeSection === item.id ? 'true' : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
        <div id="editor-section-appearance"><ThemeSection /></div>
        <div id="editor-section-profile"><ProfileSection /></div>
        <div id="editor-section-education"><EducationSection /></div>
        <div id="editor-section-experience"><ExperienceSection /></div>
        <div id="editor-section-projects"><ProjectsSection /></div>
        <div id="editor-section-skills"><SkillsSection /></div>
        <div className="h-8" />
      </div>
    </aside>
  );
}
