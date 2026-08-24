import { CloudUpload, LogOut, Link2, RotateCcw, Trash2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';
import { isFirebaseConfigured } from '../../../services/firebase';
import {
  generateSlug,
  defaultPortfolioData,
  blankPortfolioData,
  savePortfolio,
  clearPortfolio,
} from '../../../services/storage';
import { DEFAULT_THEME_ID } from '../../../themes/themes';
import FormField from '../shared/FormField';
import SectionWrapper from '../shared/SectionWrapper';

export default function SettingsSection({ onPublish }) {
  const { user, signOut } = useAuth();
  const { portfolioData, dispatch } = usePortfolio();
  const slug = portfolioData.profile?.slug || generateSlug(portfolioData.profile?.name);
  const publicPath = `/${slug || 'username'}`;

  const handleResetSample = () => {
    if (window.confirm('Reset all fields to the sample engineer portfolio?')) {
      const sampleData = {
        ...defaultPortfolioData,
        uid: user?.uid,
        userId: user?.uid,
        ownerId: user?.uid,
        creatorId: user?.uid,
      };
      dispatch({ type: 'RESET', payload: sampleData });
      if (user?.uid) {
        savePortfolio(sampleData, user.uid);
      } else {
        savePortfolio(sampleData);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all portfolio data and start from scratch?')) {
      const cleanData = {
        ...blankPortfolioData,
        uid: user?.uid,
        userId: user?.uid,
        ownerId: user?.uid,
        creatorId: user?.uid,
        themeId: portfolioData.themeId || DEFAULT_THEME_ID,
        layout: portfolioData.layout || 'classic',
      };
      // Reset all portfolio sections (Profile, Education, Experience, Projects, Skills, Certifications)
      dispatch({
        type: 'RESET',
        payload: cleanData,
      });
      // Clear persistence and save clean state to prevent repopulating on refresh
      clearPortfolio(user?.uid);
      if (user?.uid) {
        savePortfolio(cleanData, user.uid);
      } else {
        savePortfolio(cleanData);
      }
    }
  };

  return (
    <SectionWrapper title="Publish & Settings" defaultOpen={true}>
      <div className="space-y-3.5">
        {/* User Badge */}
        <div
          className="flex items-center gap-2.5 p-2 rounded transition-colors"
          style={{
            background: 'var(--pf-input-bg, #FAF7F1)',
            border: '1px solid var(--pf-border-color, #D8CEBE)',
          }}
        >
          <div
            className="w-8 h-8 rounded flex items-center justify-center text-[12px] font-bold text-white shrink-0 shadow-sm"
            style={{ background: 'var(--pf-ui-accent, #447244)' }}
          >
            {(user?.displayName || user?.email || 'U').slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold truncate" style={{ color: 'var(--pf-text-primary, #1B2A1B)' }}>
              {user?.displayName || 'Active Workspace Session'}
            </p>
            <p className="text-[10px] truncate" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>
              {user?.email || user?.uid}
            </p>
          </div>
          {user?.isDemo && (
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded border"
              style={{
                background: 'var(--pf-card-bg, #EDF5ED)',
                borderColor: 'var(--pf-border-color, #B0C6B0)',
                color: 'var(--pf-text-muted, #6B7A6E)',
              }}
            >
              LOCAL
            </span>
          )}
        </div>

        <FormField
          id="settings-slug"
          label="Public Slug / URL"
          value={portfolioData.profile?.slug || ''}
          onChange={(value) =>
            dispatch({
              type: 'UPDATE_PROFILE',
              payload: { slug: value.toLowerCase().replace(/[^a-z0-9-]/g, '') },
            })
          }
          placeholder="alex-vance"
          hint="Your unique public handle for sharing."
        />

        <div
          className="flex items-center gap-2 p-2 rounded text-[11.5px] transition-colors"
          style={{
            background: 'var(--pf-input-bg, #FAF7F1)',
            border: '1px solid var(--pf-border-color, #D8CEBE)',
            color: 'var(--pf-text-muted, #6B7A6E)',
          }}
        >
          <Link2 size={13} style={{ color: 'var(--pf-ui-accent, #447244)' }} className="shrink-0" />
          <span className="truncate font-mono">foliovitae.app<strong style={{ color: 'var(--pf-text-primary, #1B2A1B)' }}>{publicPath}</strong></span>
        </div>

        <p className="text-[10.5px] leading-relaxed" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>
          {isFirebaseConfigured
            ? '✓ Firebase is connected. Clicking "Save & Publish" stores this document directly into Firestore under your User ID.'
            : 'ℹ Firebase credentials in firebase.js are empty. Publishing will save locally until keys are added.'}
        </p>

        {/* Primary Save & Publish */}
        <button
          type="button"
          className="spectrum-btn-primary w-full justify-center py-2"
          onClick={onPublish}
        >
          <CloudUpload size={14} />
          <span>Save & Publish Portfolio</span>
        </button>

        <div className="forge-divider" />
        <p className="forge-section-title">Template Tools</p>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="spectrum-btn-secondary justify-center text-[11px] py-1.5"
            onClick={handleResetSample}
            title="Load the rich demo engineer dataset"
          >
            <RotateCcw size={12} />
            <span>Sample Data</span>
          </button>
          <button
            type="button"
            className="spectrum-btn-danger justify-center text-[11px] py-1.5"
            onClick={handleClearAll}
            title="Clear all fields to start blank"
          >
            <Trash2 size={12} />
            <span>Clear All</span>
          </button>
        </div>

        <button
          type="button"
          className="spectrum-btn-ghost w-full justify-center mt-1 text-[11px]"
          onClick={signOut}
        >
          <LogOut size={13} />
          <span>Sign Out</span>
        </button>
      </div>
    </SectionWrapper>
  );
}
