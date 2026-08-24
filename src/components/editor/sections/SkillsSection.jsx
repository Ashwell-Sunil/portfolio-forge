import { usePortfolio } from '../../../context/PortfolioContext';
import TagInput from '../shared/TagInput';
import FormField from '../shared/FormField';
import FileUploadField from '../shared/FileUploadField';
import SectionWrapper from '../shared/SectionWrapper';

const SkillIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const CertIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
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

export default function SkillsSection() {
  const { portfolioData, dispatch } = usePortfolio();
  const { skills, certifications } = portfolioData;

  const updateCert = (id, field) => (value) =>
    dispatch({ type: 'UPDATE_CERTIFICATION', payload: { id, data: { [field]: value } } });

  return (
    <SectionWrapper title="Skills & Certifications" icon={<SkillIcon />} defaultOpen={true}>
      {/* Technical Skills */}
      <div className="space-y-2">
        <p className="forge-section-title">Technical Skills</p>
        <TagInput
          id="skills-input"
          tags={skills}
          onChange={(tags) => dispatch({ type: 'SET_SKILLS', payload: tags })}
          placeholder="Go, Rust, TypeScript, Kubernetes, Docker, gRPC..."
        />
      </div>

      <div className="forge-divider" />

      {/* Certifications */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5">
          <span style={{ color: 'var(--pf-ui-accent, #447244)' }}><CertIcon /></span>
          <p className="forge-section-title">Certifications & Credentials</p>
        </div>

        {certifications.length === 0 && (
          <p className="text-[12px] text-center py-1" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>
            No certifications added.
          </p>
        )}

        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="space-y-2.5 p-3 rounded transition-colors"
              style={{
                background: 'var(--pf-input-bg, #FAF7F1)',
                border: '1px solid var(--pf-border-color, #D8CEBE)',
              }}
            >
              <div className="flex items-center justify-between pb-1" style={{ borderBottom: '1px solid var(--pf-border-color, #D8CEBE)' }}>
                <span className="text-[10.5px] font-bold uppercase tracking-wider" style={{ color: 'var(--pf-ui-accent, #447244)' }}>
                  Credential #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'REMOVE_CERTIFICATION', payload: cert.id })}
                  className="spectrum-btn-danger"
                  aria-label={`Remove certification ${index + 1}`}
                >
                  <TrashIcon />
                  <span>Remove</span>
                </button>
              </div>

              <FormField
                id={`cert-name-${cert.id}`}
                label="Certification Name"
                value={cert.name}
                onChange={updateCert(cert.id, 'name')}
                placeholder="AWS Certified Solutions Architect"
              />

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  id={`cert-issuer-${cert.id}`}
                  label="Issuing Organization"
                  value={cert.issuer}
                  onChange={updateCert(cert.id, 'issuer')}
                  placeholder="Amazon Web Services"
                />
                <FormField
                  id={`cert-year-${cert.id}`}
                  label="Year"
                  value={cert.year}
                  onChange={updateCert(cert.id, 'year')}
                  placeholder="2024"
                />
              </div>

              <FormField
                id={`cert-link-${cert.id}`}
                label="Verification Link"
                value={cert.link}
                onChange={updateCert(cert.id, 'link')}
                placeholder="https://credly.com/badges/..."
              />

              {/* Certificate badge or PDF upload */}
              <FileUploadField
                id={`cert-file-${cert.id}`}
                label="Certificate Document / Badge"
                value={cert.imageUrl || cert.fileUrl || ''}
                onChange={updateCert(cert.id, 'imageUrl')}
                accept="image/*,application/pdf"
                hint="Upload certificate document (image or PDF)"
                previewType="file"
                folder="certifications"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => dispatch({ type: 'ADD_CERTIFICATION' })}
            className="spectrum-btn-secondary w-full justify-center"
          >
            <PlusIcon />
            <span>Add Certification</span>
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
