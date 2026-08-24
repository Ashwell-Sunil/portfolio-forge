import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginScreen from './LoginScreen';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [ready] = useState(true);

  if (loading || !ready) {
    return (
      <div className="h-screen w-screen flex items-center justify-center" style={{ background: '#1e1e1e' }}>
        <div className="w-8 h-8 border-2 border-[#1473E6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen redirectTo={location.pathname} />;
  }

  return children;
}

export function RequireAuthRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/editor" replace />;
  return null;
}
