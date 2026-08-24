import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PortfolioForgeLogo from '../brand/Logo';

export default function LoginScreen({ redirectTo = '/editor' }) {
  const { signInWithGoogle, configured, error } = useAuth();
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSignIn = async () => {
    setBusy(true);
    setLocalError('');
    try {
      await signInWithGoogle();
    } catch (err) {
      setLocalError(err.message || 'Sign-in failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ background: '#F6F2EB' }}
    >
      <div
        className="w-full max-w-[420px] shadow-2xl rounded"
        style={{ background: '#FFFFFF', border: '1px solid #E2D7C7' }}
      >
        <div className="px-8 pt-8 pb-6 border-b" style={{ borderColor: '#EFE7DA' }}>
          <div className="mb-5">
            <PortfolioForgeLogo
              size={36}
              subtitle="Creative Cloud Workspace"
              textColor="#2D3748"
              accentColor="#447244"
            />
          </div>
          <h1 className="text-[22px] font-semibold text-[#2D3748] tracking-tight">Sign in to Editor</h1>
          <p className="text-[13px] text-[#718096] mt-2 leading-relaxed">
            Access the Adobe-style portfolio workspace with live customizer and cloud publishing.
          </p>
        </div>

        <div className="px-8 py-6 space-y-4">
          {!configured && (
            <div
              className="text-[12px] leading-relaxed p-3 rounded"
              style={{ background: '#FBF8F3', border: '1px solid #EFE4D6', color: '#556052' }}
            >
              <span className="font-semibold text-[#3B603B]">Local Mode Active:</span> Firebase keys are unconfigured. You can sign in immediately to the demo workspace.
            </div>
          )}

          {(error || localError) && (
            <p className="text-[12px] text-[#ec5b62]">⚠ {error || localError}</p>
          )}

          <button
            type="button"
            onClick={handleSignIn}
            disabled={busy}
            className="spectrum-btn-primary w-full justify-center h-10 text-[13px]"
            style={{ background: '#729972', borderColor: '#729972' }}
          >
            {busy ? 'Connecting…' : configured ? 'Continue with Google' : 'Enter Demo Workspace'}
          </button>

          <Link
            to="/"
            className="block text-center text-[12.5px] text-[#718096] hover:text-[#2D3748] transition-colors"
          >
            ← View Public Portfolio
          </Link>
          <p className="sr-only">{redirectTo}</p>
        </div>
      </div>
    </div>
  );
}
