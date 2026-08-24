import { usePortfolio } from '../../../context/PortfolioContext';
import FormField from '../shared/FormField';
import SectionWrapper from '../shared/SectionWrapper';

const EducationIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
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

export default function EducationSection() {
  const { portfolioData, dispatch } = usePortfolio();
  const { education } = portfolioData;

  const updateEdu = (id, field) => (value) => {
    dispatch({ type: 'UPDATE_EDUCATION', payload: { id, data: { [field]: value } } });
  };

  return (
    <SectionWrapper title="Education" icon={<EducationIcon />} defaultOpen={true}>
      {education.length === 0 && (
        <p className="text-[12px] text-center py-2" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>
          No education entries yet.
        </p>
      )}

      <div className="space-y-3">
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className="space-y-2.5 p-3 rounded transition-colors"
            style={{
              background: 'var(--pf-input-bg, #FAF7F1)',
              border: '1px solid var(--pf-border-color, #D8CEBE)',
            }}
          >
            <div className="flex items-center justify-between pb-1" style={{ borderBottom: '1px solid var(--pf-border-color, #D8CEBE)' }}>
              <span className="text-[10.5px] font-bold uppercase tracking-wider" style={{ color: 'var(--pf-ui-accent, #447244)' }}>
                Education #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => dispatch({ type: 'REMOVE_EDUCATION', payload: edu.id })}
                className="spectrum-btn-danger"
                aria-label={`Remove education entry ${index + 1}`}
              >
                <TrashIcon />
                <span>Remove</span>
              </button>
            </div>

            <FormField
              id={`edu-degree-${edu.id}`}
              label="Degree / Major"
              value={edu.degree}
              onChange={updateEdu(edu.id, 'degree')}
              placeholder="M.S. Computer Science"
            />
            <FormField
              id={`edu-institution-${edu.id}`}
              label="Institution / University"
              value={edu.institution}
              onChange={updateEdu(edu.id, 'institution')}
              placeholder="Stanford University"
            />
            <div className="grid grid-cols-3 gap-2">
              <FormField
                id={`edu-start-${edu.id}`}
                label="Start"
                value={edu.startYear}
                onChange={updateEdu(edu.id, 'startYear')}
                placeholder="2017"
              />
              <FormField
                id={`edu-end-${edu.id}`}
                label="End"
                value={edu.endYear}
                onChange={updateEdu(edu.id, 'endYear')}
                placeholder="2019"
              />
              <FormField
                id={`edu-gpa-${edu.id}`}
                label="GPA"
                value={edu.gpa}
                onChange={updateEdu(edu.id, 'gpa')}
                placeholder="3.94"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => dispatch({ type: 'ADD_EDUCATION' })}
          className="spectrum-btn-secondary w-full justify-center"
        >
          <PlusIcon />
          <span>Add Education</span>
        </button>
      </div>
    </SectionWrapper>
  );
}
