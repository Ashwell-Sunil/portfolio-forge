import { useEffect, useRef } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onDismiss, duration = 2800 }) {
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(onDismiss, duration);
    return () => clearTimeout(timerRef.current);
  }, [duration, onDismiss]);

  const icons = {
    success: <CheckCircle2 size={16} className="text-[#10b981] shrink-0" />,
    error: <AlertCircle size={16} className="text-[#ef4444] shrink-0" />,
    info: <Info size={16} className="text-[#3b82f6] shrink-0" />,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md text-xs font-semibold animate-toast-in transition-all"
      style={{
        background: 'var(--pf-card-bg, #FCFAF6)',
        border: '1px solid var(--pf-border-color, #D8CEBE)',
        color: 'var(--pf-text-primary, #1B2A1B)',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.14), 0 2px 8px rgba(0, 0, 0, 0.06)',
      }}
    >
      {icons[type] || icons.success}
      <span className="max-w-sm truncate">{message}</span>
      <button
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="ml-1.5 p-0.5 rounded-full hover:opacity-75 transition-opacity"
        style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}
      >
        <X size={13} />
      </button>
    </div>
  );
}
