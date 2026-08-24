import { usePortfolio } from '../../../context/PortfolioContext';
import FormField from '../shared/FormField';
import TagInput from '../shared/TagInput';
import FileUploadField from '../shared/FileUploadField';
import SectionWrapper from '../shared/SectionWrapper';

const ProjectIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function ProjectsSection() {
  const { portfolioData, dispatch } = usePortfolio();
  const { projects } = portfolioData;

  const updateProj = (id, field) => (value) =>
    dispatch({ type: 'UPDATE_PROJECT', payload: { id, data: { [field]: value } } });

  return (
    <SectionWrapper title="Projects" icon={<ProjectIcon />} defaultOpen={true}>
      {projects.length === 0 && (
        <p className="text-[12px] text-center py-2" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>
          No projects added yet.
        </p>
      )}

      <div className="space-y-3">
        {projects.map((proj, index) => (
          <div
            key={proj.id}
            className="space-y-2.5 p-3 rounded transition-colors"
            style={{
              background: 'var(--pf-input-bg, #FAF7F1)',
              border: '1px solid var(--pf-border-color, #D8CEBE)',
            }}
          >
            <div className="flex items-center justify-between pb-1" style={{ borderBottom: '1px solid var(--pf-border-color, #D8CEBE)' }}>
              <span className="text-[10.5px] font-bold uppercase tracking-wider" style={{ color: 'var(--pf-ui-accent, #447244)' }}>
                Project #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => dispatch({ type: 'REMOVE_PROJECT', payload: proj.id })}
                className="spectrum-btn-danger"
                aria-label={`Remove project ${index + 1}`}
              >
                <TrashIcon />
                <span>Remove</span>
              </button>
            </div>

            <FormField
              id={`proj-title-${proj.id}`}
              label="Project Title"
              value={proj.title}
              onChange={updateProj(proj.id, 'title')}
              placeholder="Distributed KV Store"
            />

            <FormField
              id={`proj-desc-${proj.id}`}
              label="Description"
              value={proj.description}
              onChange={updateProj(proj.id, 'description')}
              placeholder="High-performance Raft-consensus storage engine..."
              multiline
              rows={2}
            />

            {/* Screenshot file upload */}
            <FileUploadField
              id={`proj-img-${proj.id}`}
              label="Project Visual / Screenshot"
              value={proj.imageUrl || ''}
              onChange={updateProj(proj.id, 'imageUrl')}
              accept="image/*"
              hint="Upload project screenshot or diagram"
              previewType="image"
              folder="projects"
            />

            <TagInput
              id={`proj-stack-${proj.id}`}
              label="Tech Stack"
              tags={proj.techStack}
              onChange={updateProj(proj.id, 'techStack')}
              placeholder="e.g. Rust, Raft, gRPC"
            />

            <FormField
              id={`proj-link-${proj.id}`}
              label="Project / Repo URL"
              value={proj.link}
              onChange={updateProj(proj.id, 'link')}
              placeholder="https://github.com/username/project"
            />

            <label className="flex items-center gap-2 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={Boolean(proj.featured)}
                onChange={(e) => updateProj(proj.id, 'featured')(e.target.checked)}
                className="rounded border-[var(--pf-border-color,#333)] text-[var(--pf-ui-accent,#1473E6)] focus:ring-0"
              />
              <span className="text-[11px] font-medium" style={{ color: 'var(--pf-text-primary, #1B2A1B)' }}>
                Mark as Featured Project
              </span>
            </label>
          </div>
        ))}

        <button
          type="button"
          onClick={() => dispatch({ type: 'ADD_PROJECT' })}
          className="spectrum-btn-secondary w-full justify-center"
        >
          <PlusIcon />
          <span>Add Project</span>
        </button>
      </div>
    </SectionWrapper>
  );
}
