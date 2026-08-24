/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        forge: {
          bg: '#0b0f1a',
          surface: '#111827',
          'surface-2': '#1a2234',
          'surface-3': '#1e2d45',
          border: '#1f2d45',
          'border-2': '#2a3f5f',
          text: '#e2e8f0',
          'text-2': '#94a3b8',
          'text-3': '#64748b',
          accent: '#6366f1',
          'accent-2': '#818cf8',
          'accent-glow': 'rgba(99, 102, 241, 0.15)',
          violet: '#a78bfa',
          cyan: '#22d3ee',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.35s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'toast-in': 'toastIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'toast-out': 'toastOut 0.2s ease-in',
        'install-pulse': 'installPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(99,102,241,0)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(99,102,241,0.25)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(16px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        toastOut: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(8px) scale(0.95)' },
        },
        installPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(99,102,241,0.4)' },
          '50%': { boxShadow: '0 0 0 6px rgba(99,102,241,0)' },
        },
      },
      boxShadow: {
        'forge': '0 4px 24px rgba(0,0,0,0.4)',
        'forge-lg': '0 8px 48px rgba(0,0,0,0.5)',
        'accent': '0 4px 20px rgba(99,102,241,0.25)',
        'card': '0 2px 16px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
