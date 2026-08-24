import { usePortfolio } from '../../../context/PortfolioContext';
import { normalizeSlug } from '../../../services/storage';
import FormField from '../shared/FormField';
import FileUploadField from '../shared/FileUploadField';
import SectionWrapper from '../shared/SectionWrapper';

const ProfileIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function ProfileSection() {
  const { portfolioData, dispatch } = usePortfolio();
  const { profile } = portfolioData;

  const update = (field) => (value) => dispatch({ type: 'UPDATE_PROFILE', payload: { [field]: value } });

  return (
    <SectionWrapper title="Personal Profile" icon={<ProfileIcon />} defaultOpen={true}>
      <div className="space-y-3">
        <FormField
          id="profile-name"
          label="Full Name *"
          value={profile.name}
          onChange={update('name')}
          placeholder="Your Full Name"
        />

        <FormField
          id="profile-title"
          label="Professional Title *"
          value={profile.title}
          onChange={update('title')}
          placeholder="Senior Distributed Systems & Cloud Architect"
        />

        <FormField
          id="profile-about"
          label="Bio / About"
          value={profile.about}
          onChange={update('about')}
          placeholder="Specializing in high-throughput distributed systems..."
          multiline
          rows={3}
        />

        <div className="grid grid-cols-2 gap-2">
          <FormField
            id="profile-email"
            label="Email"
            type="email"
            value={profile.email}
            onChange={update('email')}
            placeholder="alex@devmail.io"
          />
          <FormField
            id="profile-slug"
            label="Public Slug"
            value={profile.slug}
            onChange={(val) => update('slug')(normalizeSlug(val))}
            placeholder="alex-vance"
            hint="foliovitae.app/{slug}"
          />
        </div>

        <div className="forge-divider" />
        <p className="forge-section-title">Media & Documents</p>

        {/* Profile Image File Upload */}
        <FileUploadField
          id="profile-image"
          label="Profile Photo"
          value={profile.imageUrl}
          onChange={update('imageUrl')}
          accept="image/*"
          hint="Upload photo from your device"
          previewType="image"
          folder="avatars"
        />

        {/* Profile Picture Appearance Controls (Size & Position) */}
        <div
          className="p-3 rounded space-y-3 transition-colors"
          style={{
            background: 'var(--pf-card-bg, #EDF5ED)',
            border: '1px solid var(--pf-border-color, #B0C6B0)',
          }}
        >
          <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--pf-text-primary, #1B2A1B)' }}>
            Avatar Layout & Dimensions
          </p>

          {/* Position Toggle */}
          <div>
            <label className="spectrum-label mb-1.5">Avatar Alignment</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'left', label: 'Left' },
                { id: 'center', label: 'Center' },
                { id: 'right', label: 'Right' },
              ].map((pos) => {
                const isSelected = (profile.imagePosition || 'right') === pos.id;
                return (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => update('imagePosition')(pos.id)}
                    className="py-1 px-2 rounded text-[11px] font-semibold transition-all text-center"
                    style={{
                      background: isSelected ? 'var(--pf-ui-accent, #447244)' : 'var(--pf-input-bg, #FAF7F1)',
                      color: isSelected ? 'var(--pf-ui-accent-text, #ffffff)' : 'var(--pf-text-primary, #1B2A1B)',
                      border: `1px solid ${isSelected ? 'var(--pf-ui-accent, #447244)' : 'var(--pf-border-color, #D8CEBE)'}`,
                    }}
                  >
                    {pos.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Preset Selector */}
          <div>
            <label className="spectrum-label mb-1.5">Avatar Dimension</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'sm', label: 'Small (75px)' },
                { id: 'md', label: 'Medium (110px)' },
                { id: 'lg', label: 'Large (150px)' },
              ].map((sz) => {
                const isSelected = (profile.imageSize || 'md') === sz.id;
                return (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => update('imageSize')(sz.id)}
                    className="py-1 px-2 rounded text-[11px] font-semibold transition-all text-center"
                    style={{
                      background: isSelected ? 'var(--pf-ui-accent, #447244)' : 'var(--pf-input-bg, #FAF7F1)',
                      color: isSelected ? 'var(--pf-ui-accent-text, #ffffff)' : 'var(--pf-text-primary, #1B2A1B)',
                      border: `1px solid ${isSelected ? 'var(--pf-ui-accent, #447244)' : 'var(--pf-border-color, #D8CEBE)'}`,
                    }}
                  >
                    {sz.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* PDF Resume File Upload */}
        <FileUploadField
          id="profile-resume"
          label="Resume / CV (PDF)"
          value={profile.resumeLink}
          onChange={update('resumeLink')}
          accept="application/pdf,image/*"
          hint="Upload your resume document (PDF or image)"
          previewType="file"
          folder="resumes"
        />

        <div className="forge-divider" />
        <p className="forge-section-title">Social & Profiles</p>

        <div className="space-y-2.5">
          <FormField
            id="profile-github"
            label="GitHub"
            type="url"
            value={profile.github}
            onChange={update('github')}
            placeholder="https://github.com/username"
          />
          <FormField
            id="profile-linkedin"
            label="LinkedIn"
            type="url"
            value={profile.linkedin}
            onChange={update('linkedin')}
            placeholder="https://linkedin.com/in/username"
          />
          <FormField
            id="profile-twitter"
            label="Twitter / X"
            type="url"
            value={profile.twitter}
            onChange={update('twitter')}
            placeholder="https://x.com/username"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
