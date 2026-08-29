import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { defaultPortfolioData } from '../services/storage';
import PortfolioDocument from '../components/preview/PortfolioDocument';

/**
 * DemoPortfolio – clean static read-only sample portfolio
 */
export default function DemoPortfolio() {
  return (
    <div className="min-h-screen min-h-[100dvh] w-full relative overflow-x-hidden bg-[#0a0a0a] text-neutral-100 selection:bg-white/20 selection:text-white">
      {/* Demo Banner */}
      <div className="sticky top-0 z-50 w-full flex items-center justify-between px-4 sm:px-6 py-2.5 text-xs font-medium backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/10 text-neutral-300">
        <span className="flex items-center gap-2">
          <Sparkles size={13} className="text-neutral-400" />
          <span>Sample Developer Portfolio</span>
        </span>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-all"
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
