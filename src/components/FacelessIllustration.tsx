import React from 'react';

interface FacelessIllustrationProps {
  theme: string;
  partType: 'Hook' | 'Foreshadow' | 'Isi' | 'CTA';
  sceneNumber: number;
}

export const FacelessIllustration: React.FC<FacelessIllustrationProps> = ({ theme, partType, sceneNumber }) => {
  const lowerTheme = theme.toLowerCase();

  // Determine color palette based on theme
  let bgGradient = 'from-slate-900 to-indigo-950';
  let accentGlow = 'rgba(99, 102, 241, 0.4)';
  let headFill = '#f8fafc';
  let torsoFill = '#334155';
  let iconColor = '#818cf8';
  let borderStroke = '#475569';

  if (lowerTheme.includes('cyberpunk') || lowerTheme.includes('neon')) {
    bgGradient = 'from-purple-950 via-slate-950 to-cyan-950';
    accentGlow = 'rgba(6, 182, 212, 0.6)';
    headFill = '#f8fafc';
    torsoFill = '#0f172a';
    iconColor = '#22d3ee';
    borderStroke = '#0891b2';
  } else if (lowerTheme.includes('warm') || lowerTheme.includes('moody') || lowerTheme.includes('cinematic')) {
    bgGradient = 'from-amber-950 via-stone-900 to-neutral-950';
    accentGlow = 'rgba(245, 158, 11, 0.5)';
    headFill = '#fef3c7';
    torsoFill = '#292524';
    iconColor = '#fbbf24';
    borderStroke = '#d97706';
  } else if (lowerTheme.includes('pastel') || lowerTheme.includes('line art')) {
    bgGradient = 'from-rose-950 via-slate-900 to-indigo-950';
    accentGlow = 'rgba(244, 63, 94, 0.3)';
    headFill = '#ffffff';
    torsoFill = '#475569';
    iconColor = '#fb7185';
    borderStroke = '#f43f5e';
  } else if (lowerTheme.includes('claymation') || lowerTheme.includes('3d')) {
    bgGradient = 'from-blue-950 via-indigo-950 to-slate-900';
    accentGlow = 'rgba(129, 140, 248, 0.5)';
    headFill = '#e0e7ff';
    torsoFill = '#1e1b4b';
    iconColor = '#60a5fa';
    borderStroke = '#6366f1';
  } else if (lowerTheme.includes('comic') || lowerTheme.includes('retro') || lowerTheme.includes('vintage')) {
    bgGradient = 'from-amber-950 via-red-950 to-stone-900';
    accentGlow = 'rgba(239, 68, 68, 0.5)';
    headFill = '#fef08a';
    torsoFill = '#451a03';
    iconColor = '#f97316';
    borderStroke = '#ea580c';
  }

  // Icons based on scene type
  const renderSceneSymbol = () => {
    switch (partType) {
      case 'Hook':
        return (
          <g transform="translate(220, 25)">
            <circle cx="20" cy="20" r="18" fill="none" stroke={iconColor} strokeWidth="3" opacity="0.9" />
            <path d="M 20 10 L 20 22 M 20 28 L 20 30" stroke={iconColor} strokeWidth="4" strokeLinecap="round" />
          </g>
        );
      case 'Foreshadow':
        return (
          <g transform="translate(220, 25)">
            <polygon points="20,5 35,32 5,32" fill="none" stroke={iconColor} strokeWidth="3" />
            <circle cx="20" cy="22" r="3" fill={iconColor} />
          </g>
        );
      case 'Isi':
        return (
          <g transform="translate(220, 25)">
            <path d="M 5 25 L 15 12 L 25 20 L 35 5" fill="none" stroke={iconColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="35" cy="5" r="4" fill={iconColor} />
          </g>
        );
      case 'CTA':
        return (
          <g transform="translate(220, 25)">
            <path d="M 20 5 L 20 25 M 10 17 L 20 26 L 30 17" stroke={iconColor} strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <rect x="5" y="29" width="30" height="4" rx="2" fill={iconColor} />
          </g>
        );
    }
  };

  return {
    render() {
      return null;
    }
  };
};

export function FacelessCanvasIllustration({ theme, partType, sceneNumber }: FacelessIllustrationProps) {
  const lowerTheme = theme.toLowerCase();

  let headFill = '#f8fafc';
  let torsoFill = '#1e293b';
  let iconColor = '#818cf8';
  let borderStroke = '#475569';
  let bgClass = 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950';

  if (lowerTheme.includes('cyberpunk') || lowerTheme.includes('neon')) {
    bgClass = 'bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950';
    headFill = '#f8fafc';
    torsoFill = '#0f172a';
    iconColor = '#22d3ee';
    borderStroke = '#0891b2';
  } else if (lowerTheme.includes('warm') || lowerTheme.includes('moody') || lowerTheme.includes('cinematic')) {
    bgClass = 'bg-gradient-to-br from-amber-950 via-stone-900 to-zinc-950';
    headFill = '#fef3c7';
    torsoFill = '#292524';
    iconColor = '#fbbf24';
    borderStroke = '#d97706';
  } else if (lowerTheme.includes('pastel') || lowerTheme.includes('line art')) {
    bgClass = 'bg-gradient-to-br from-rose-950 via-slate-900 to-indigo-950';
    headFill = '#ffffff';
    torsoFill = '#334155';
    iconColor = '#fb7185';
    borderStroke = '#f43f5e';
  } else if (lowerTheme.includes('claymation') || lowerTheme.includes('3d')) {
    bgClass = 'bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900';
    headFill = '#e0e7ff';
    torsoFill = '#1e1b4b';
    iconColor = '#60a5fa';
    borderStroke = '#6366f1';
  } else if (lowerTheme.includes('comic') || lowerTheme.includes('retro') || lowerTheme.includes('vintage')) {
    bgClass = 'bg-gradient-to-br from-amber-950 via-red-950 to-stone-900';
    headFill = '#fef08a';
    torsoFill = '#451a03';
    iconColor = '#f97316';
    borderStroke = '#ea580c';
  }

  return (
    <div className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-slate-700/60 shadow-inner flex flex-col justify-between p-4 ${bgClass}`}>
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Top Banner */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
            Scene {sceneNumber} • {partType}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-950/80 text-indigo-300 border border-indigo-800/50">
            👤 FACELESS ART
          </span>
        </div>
        <span className="text-[10px] font-medium text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded backdrop-blur">
          {theme}
        </span>
      </div>

      {/* Main SVG Faceless Character Visualization */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-1">
        <svg viewBox="0 0 280 140" className="w-full h-full max-h-[120px] drop-shadow-xl" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id={`glow-${sceneNumber}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id={`headGrad-${sceneNumber}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={headFill} />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>

          {/* Background Ambient Glow Circle */}
          <circle cx="140" cy="70" r="55" fill={iconColor} opacity="0.15" filter={`url(#glow-${sceneNumber})`} />

          {/* Torso / Body Silhouette */}
          <path
            d="M 100 135 C 100 100, 115 85, 140 85 C 165 85, 180 100, 180 135 Z"
            fill={torsoFill}
            stroke={borderStroke}
            strokeWidth="2"
          />

          {/* Neck */}
          <rect x="133" y="68" width="14" height="20" rx="3" fill={headFill} opacity="0.9" />

          {/* Faceless Head - Smooth Egg Shape, ZERO facial features */}
          <ellipse
            cx="140"
            cy="50"
            rx="22"
            ry="27"
            fill={`url(#headGrad-${sceneNumber})`}
            stroke={borderStroke}
            strokeWidth="2.5"
          />

          {/* Faceless Shine Highlight */}
          <ellipse cx="132" cy="42" rx="6" ry="10" fill="#ffffff" opacity="0.3" transform="rotate(-20 132 42)" />

          {/* Floating Theme Symbolic Elements */}
          {partType === 'Hook' && (
            <g transform="translate(180, 20)">
              <circle cx="15" cy="15" r="14" fill={iconColor} opacity="0.2" />
              <path d="M 15 7 L 15 17 M 15 21 L 15 23" stroke={iconColor} strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {partType === 'Foreshadow' && (
            <g transform="translate(180, 20)">
              <rect x="5" y="5" width="20" height="20" rx="4" fill="none" stroke={iconColor} strokeWidth="2.5" transform="rotate(15 15 15)" />
              <circle cx="15" cy="15" r="3" fill={iconColor} />
            </g>
          )}

          {partType === 'Isi' && (
            <g transform="translate(180, 20)">
              <path d="M 4 22 L 12 12 L 20 17 L 28 6" fill="none" stroke={iconColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="28" cy="6" r="3" fill={iconColor} />
            </g>
          )}

          {partType === 'CTA' && (
            <g transform="translate(180, 20)">
              <path d="M 15 5 L 15 20 M 8 13 L 15 20 L 22 13" stroke={iconColor} strokeWidth="3" strokeLinecap="round" fill="none" />
              <rect x="4" y="23" width="22" height="3" rx="1.5" fill={iconColor} />
            </g>
          )}

          {/* Left Floating Dot Sparkles */}
          <circle cx="80" cy="40" r="3" fill={iconColor} opacity="0.6" />
          <circle cx="95" cy="25" r="2" fill={iconColor} opacity="0.4" />
          <circle cx="205" cy="55" r="3" fill={iconColor} opacity="0.5" />
        </svg>
      </div>

      {/* Bottom Tag */}
      <div className="relative z-10 text-center">
        <p className="text-[11px] text-slate-300 font-mono tracking-tight bg-slate-950/70 py-1 px-3 rounded-md border border-slate-800/80 backdrop-blur inline-block max-w-full truncate">
          🚫 No Eyes • No Nose • No Mouth (Faceless Guaranteed)
        </p>
      </div>
    </div>
  );
}
