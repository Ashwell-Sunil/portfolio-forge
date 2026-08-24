import { usePortfolio } from '../../../context/PortfolioContext';
import FormField from '../shared/FormField';
import SectionWrapper from '../shared/SectionWrapper';

const ExpIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
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

export default function ExperienceSection() {
  const { portfolioData, dispatch } = usePortfolio();
  const { experience } = portfolioData;

  const updateExp = (id, field) => (value) => {
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id, data: { [field]: value } } });
  };

  const toggleCurrent = (id, checked) => {
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: { id, data: { current: checked, endDate: checked ? 'Present' : '' } },
    });
  };

  return (
    <SectionWrapper title="Work Experience" icon={<ExpIcon />} defaultOpen={true}>
      {experience.length === 0 && (
        <p className="text-[12px] text-center py-2" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>
          No work experience entries yet.
        </p>
      )}

      <div className="space-y-3">
        {experience.map((exp, index) => (
          <div
            key={exp.id}
            className="space-y-2.5 p-3 rounded transition-colors"
            style={{
              background: 'var(--pf-input-bg, #FAF7F1)',
              border: '1px solid var(--pf-border-color, #D8CEBE)',
            }}
          >
            <div className="flex items-center justify-between pb-1" style={{ borderBottom: '1px solid var(--pf-border-color, #D8CEBE)' }}>
              <span className="text-[10.5px] font-bold uppercase tracking-wider" style={{ color: 'var(--pf-ui-accent, #447244)' }}>
                Role #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => dispatch({ type: 'REMOVE_EXPERIENCE', payload: exp.id })}
                className="spectrum-btn-danger"
                aria-label={`Remove experience ${index + 1}`}
              >
                <TrashIcon />
                <span>Remove</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <FormField
                id={`exp-role-${exp.id}`}
                label="Role / Title"
                value={exp.role}
                onChange={updateExp(exp.id, 'role')}
                placeholder="Principal Architect"
              />
              <FormField
                id={`exp-company-${exp.id}`}
                label="Company"
                value={exp.company}
                onChange={updateExp(exp.id, 'company')}
                placeholder="NeuralCloud Labs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <FormField
                id={`exp-start-${exp.id}`}
                label="Start Date"
                value={exp.startDate}
                onChange={updateExp(exp.id, 'startDate')}
                placeholder="2022"
              />
              <FormField
                id={`exp-end-${exp.id}`}
                label="End Date"
                value={exp.endDate}
                onChange={updateExp(exp.id, 'endDate')}
                placeholder="Present"
                disabled={exp.current}
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={Boolean(exp.current)}
                onChange={(e) => toggleCurrent(exp.id, e.target.checked)}
                className="rounded border-[var(--pf-border-color,#333)] text-[var(--pf-ui-accent,#1473E6)] focus:ring-0"
              />
              <span className="text-[11px]" style={{ color: 'var(--pf-text-primary, #1B2A1B)' }}>Currently working here</span>
            </label>

            <FormField
              id={`exp-resp-${exp.id}`}
              label="Key Responsibilities (One per line)"
              type="textarea"
              value={exp.responsibilities}
              onChange={updateExp(exp.id, 'responsibilities')}
              placeholder="• Architected microservices with 99.999% uptime&#10;• Reduced latency by 45% using Rust"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => dispatch({ type: 'ADD_EXPERIENCE' })}
          className="spectrum-btn-secondary w-full justify-center"
        >
          <PlusIcon />
          <span>Add Work Experience</span>
        </button>
      </div>
    </SectionWrapper>
  );
}
