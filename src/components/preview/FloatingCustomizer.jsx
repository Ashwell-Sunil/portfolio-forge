import { useRef, useState, useEffect } from 'react';
import { GripHorizontal, Palette, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { THEMES } from '../../themes/themes';

export default function FloatingCustomizer() {
  const { portfolioData, dispatch } = usePortfolio();
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const [collapsed, setCollapsed] = useState(false);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, initialX: 20, initialY: 20 });

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      initialX: pos.x,
      initialY: pos.y,
    };
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos({
      x: Math.max(10, Math.min(window.innerWidth - 260, dragRef.current.initialX + dx)),
      y: Math.max(10, Math.min(window.innerHeight - 200, dragRef.current.initialY + dy)),
    });
  };

  const onPointerUp = (e) => {
    dragRef.current.active = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const activeThemeId = portfolioData?.themeId || 'engineering-dark';

  return (
    <div
      className="absolute z-40 select-none transition-shadow"
      style={{
        left: pos.x,
        top: pos.y,
        width: 230,
        boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px #383838',
        borderRadius: 4,
      }}
    >
      <div
        className="overflow-hidden"
        style={{
          background: '#252525',
          border: '1px solid #323232',
          borderRadius: 4,
        }}
      >
        {/* Drag Handle Bar */}
        <div
          className="flex items-center justify-between px-2.5 h-8 cursor-grab active:cursor-grabbing transition-colors"
          style={{
            background: '#2c2c2c',
            borderBottom: '1px solid #383838',
            color: '#b3b3b3',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          title="Drag to reposition theme customizer"
        >
          <div className="flex items-center gap-1.5 pointer-events-none">
            <GripHorizontal size={13} className="text-[#888]" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-white">
              Theme Switcher
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed((v) => !v);
            }}
            className="text-[10px] text-[#888] hover:text-white p-1"
            title={collapsed ? 'Expand' : 'Collapse'}
            aria-label={collapsed ? 'Expand customizer' : 'Collapse customizer'}
          >
            {collapsed ? '▼' : '▲'}
          </button>
        </div>

        {/* Theme List */}
        {!collapsed && (
          <div className="p-2 space-y-1.5" style={{ background: '#222222' }}>
            {THEMES.map((theme) => {
              const active = activeThemeId === theme.id;
              const isTerminal = theme.id === 'terminal-cyber';
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => dispatch({ type: 'SET_THEME', payload: theme.id })}
                  className="w-full flex items-center justify-between px-2.5 py-2 text-left transition-all"
                  style={{
                    borderRadius: 3,
                    background: active ? '#1473E6' : '#2b2b2b',
                    border: `1px solid ${active ? '#1473E6' : '#383838'}`,
                    color: active ? '#ffffff' : '#d8d8d8',
                  }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 flex items-center justify-center text-[8px]"
                      style={{
                        background: theme.preview.bg,
                        border: `1px solid ${theme.preview.accent}`,
                        color: theme.preview.accent,
                      }}
                    >
                      {active ? '✓' : ''}
                    </span>
                    <div className="min-w-0">
                      <p
                        className="text-[11.5px] font-semibold truncate leading-tight"
                        style={{ fontFamily: isTerminal ? "'JetBrains Mono', monospace" : 'inherit' }}
                      >
                        {theme.name}
                      </p>
                      <p
                        className="text-[9.5px] truncate mt-0.5"
                        style={{ color: active ? '#d2e4ff' : '#888888' }}
                      >
                        {theme.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 ml-1"
                    style={{
                      background: theme.preview.accent,
                      boxShadow: `0 0 6px ${theme.preview.accent}`,
                    }}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
