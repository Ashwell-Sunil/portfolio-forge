import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../services/firebase';

const AuthContext = createContext(null);

const DEMO_USER = {
  uid: 'demo-local-user',
  displayName: 'Demo Engineer',
  email: 'demo@foliovitae.local',
  photoURL: '',
  isDemo: true,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return undefined;
    }

    const unsub = onAuthStateChanged(auth, (next) => {
      setUser(next);
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    error,
    configured: isFirebaseConfigured,
    async signInWithGoogle() {
      setError('');
      if (!isFirebaseConfigured || !auth) {
        setUser(DEMO_USER);
        return DEMO_USER;
      }
      try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
      } catch (err) {
        setError(err.message || 'Google sign-in failed');
        throw err;
      }
    },
    async signOut() {
      setError('');
      if (isFirebaseConfigured && auth) {
        await firebaseSignOut(auth);
      }
      setUser(null);
    },
  }), [user, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
