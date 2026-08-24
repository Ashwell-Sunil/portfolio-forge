import { createContext, useContext, useReducer } from 'react';
import { blankPortfolioData } from '../services/storage';
import { DEFAULT_THEME_ID } from '../themes/themes';

// ─── Context ───────────────────────────────────────────────────────────────
export const PortfolioContext = createContext(null);

// ─── Helpers ───────────────────────────────────────────────────────────────
const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// ─── Reducer ───────────────────────────────────────────────────────────────
function portfolioReducer(state, action) {
  switch (action.type) {
    // Theme
    case 'SET_THEME':
      return { ...state, themeId: action.payload };

    // Layout Mode (classic, minimal, bento)
    case 'SET_LAYOUT':
      return { ...state, layout: action.payload };

    // Profile
    case 'UPDATE_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.payload } };

    // Education
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [
          ...state.education,
          { id: makeId(), degree: '', institution: '', startYear: '', endYear: '', gpa: '' },
        ],
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map(e =>
          e.id === action.payload.id ? { ...e, ...action.payload.data } : e
        ),
      };
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter(e => e.id !== action.payload) };

    // Experience
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [
          ...state.experience,
          { id: makeId(), role: '', company: '', startDate: '', endDate: '', current: false, responsibilities: '' },
        ],
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map(e =>
          e.id === action.payload.id ? { ...e, ...action.payload.data } : e
        ),
      };
    case 'REMOVE_EXPERIENCE':
      return { ...state, experience: state.experience.filter(e => e.id !== action.payload) };

    // Projects
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [
          ...state.projects,
          { id: makeId(), title: '', description: '', techStack: [], link: '', featured: false },
        ],
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.id ? { ...p, ...action.payload.data } : p
        ),
      };
    case 'REMOVE_PROJECT':
      return { ...state, projects: state.projects.filter(p => p.id !== action.payload) };

    // Skills
    case 'SET_SKILLS':
      return { ...state, skills: action.payload };
    case 'ADD_SKILL':
      if (!action.payload || state.skills.includes(action.payload)) return state;
      return { ...state, skills: [...state.skills, action.payload] };
    case 'REMOVE_SKILL':
      return { ...state, skills: state.skills.filter(s => s !== action.payload) };

    // Certifications
    case 'ADD_CERTIFICATION':
      return {
        ...state,
        certifications: [
          ...state.certifications,
          { id: makeId(), name: '', issuer: '', year: '', link: '' },
        ],
      };
    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload.data } : c
        ),
      };
    case 'REMOVE_CERTIFICATION':
      return { ...state, certifications: state.certifications.filter(c => c.id !== action.payload) };

    // Reset / full replace
    case 'RESET':
      return action.payload;

    default:
      return state;
  }
}

// ─── Default initializer ───────────────────────────────────────────────────
// IMPORTANT: We intentionally do NOT call loadPortfolio() here without a uid.
// Doing so returns defaultPortfolioData (the sample), causing the editor canvas
// to show stale/wrong data before the EditorWorkspace async uid-scoped load runs.
// Instead, we start with a clean blank slate; EditorWorkspace's useEffect will
// dispatch RESET with the correct user-scoped data once auth resolves.
function initState() {
  return {
    ...blankPortfolioData,
    themeId: DEFAULT_THEME_ID,
  };
}

// ─── Provider ──────────────────────────────────────────────────────────────
export function PortfolioProvider({ children }) {
  const [portfolioData, dispatch] = useReducer(portfolioReducer, null, initState);

  return (
    <PortfolioContext.Provider value={{ portfolioData, dispatch }}>
      {children}
    </PortfolioContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────
export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}

export function usePortfolioOptional() {
  return useContext(PortfolioContext);
}
