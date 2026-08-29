import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { defaultPortfolioData } from '../services/storage';
import PortfolioDocument from '../components/preview/PortfolioDocument';

/**
 * DemoPortfolio – a fully static, read-only page rendering sample data
 */
export default function DemoPortfolio() {
  return (
    <div className="min-h-screen min-h-[100dvh] w-full relative overflow-x-hidden bg-[#05070E] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Demo Banner */}
      <div className="sticky top-0 z-50 w-full flex items-center justify-between px-4 sm:px-6 py-2.5 text-xs font-semibold backdrop-blur-2xl bg-slate-950/80 border-b border-white/10 text-slate-200 shadow-lg">
        <span className="flex items-center gap-2">
          <Sparkles size={14} className="text-cyan-400 animate-pulse" />
          <span>Interactive 3D Sample Portfolio Showcase</span>
        </span>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-white shadow-md transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)',
            }}
          >
            <span>Build Yours</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Read-only portfolio render */}
      <PortfolioDocument data={defaultPortfolioData} />
    </div>
  );
}
