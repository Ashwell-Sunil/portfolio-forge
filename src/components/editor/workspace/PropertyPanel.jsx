import ProfileSection from '../sections/ProfileSection';
import EducationSection from '../sections/EducationSection';
import ExperienceSection from '../sections/ExperienceSection';
import ProjectsSection from '../sections/ProjectsSection';
import SkillsSection from '../sections/SkillsSection';
import ThemeSection from '../sections/ThemeSection';
import SettingsSection from '../sections/SettingsSection';

export default function PropertyPanel({ activeTab, collapsed, onPublish }) {
  return (
    <aside
      className="h-full shrink-0 flex flex-col transition-all duration-300 ease-in-out"
      style={{
        width: collapsed ? 0 : 320,
        background: 'var(--pf-panel-bg, #E4ECE4)',
        borderRight: collapsed ? 'none' : '1px solid var(--pf-border-color, #D8CEBE)',
        overflow: 'hidden',
        visibility: collapsed ? 'hidden' : 'visible',
      }}
      aria-label="Properties"
    >
      {/* Panel Header */}
      <div
        className="flex items-center justify-between px-3.5 h-10 shrink-0 transition-colors"
        style={{
          borderBottom: '1px solid var(--pf-border-color, #D8CEBE)',
          background: 'var(--pf-topbar-bg, #DDEADD)',
          minWidth: 320,
        }}
      >
        <span
          className="text-[11px] font-bold uppercase tracking-[0.12em]"
          style={{ color: 'var(--pf-text-primary, #1B2A1B)' }}
        >
          {activeTab === 'profile' && 'Identity & Bio'}
          {activeTab === 'work' && 'Work & Projects'}
          {activeTab === 'skills' && 'Skills & Certifications'}
          {activeTab === 'theme' && 'Appearance & Theme'}
          {activeTab === 'settings' && 'Publish & Settings'}
        </span>
      </div>

      {/* Panel Body */}
      <div
        className="flex-1 overflow-y-auto px-3.5 py-3.5 space-y-3 spectrum-scroll"
        style={{ minWidth: 320 }}
      >
        {activeTab === 'profile' && (
          <>
            <ProfileSection />
            <EducationSection />
          </>
        )}
        {activeTab === 'work' && (
          <>
            <ExperienceSection />
            <ProjectsSection />
          </>
        )}
        {activeTab === 'skills' && <SkillsSection />}
        {activeTab === 'theme' && <ThemeSection />}
        {activeTab === 'settings' && (
          <>
            <ThemeSection />
            <SettingsSection onPublish={onPublish} />
          </>
        )}
      </div>
    </aside>
  );
}
