import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Type, Gauge, FlipHorizontal, Eye } from 'lucide-react';
import { GeneratedContent } from '../types/content';

interface TeleprompterModalProps {
  content: GeneratedContent;
  onClose: () => void;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({ content, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fontSize, setFontSize] = useState<number>(32);
  const [speed, setSpeed] = useState<number>(3); // 1 to 10
  const [isMirrored, setIsMirrored] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Handle auto scrolling
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let lastTime = performance.now();

    const scrollStep = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // scroll speed calculation
      const pixelsPerSecond = speed * 15;
      scrollContainer.scrollTop += pixelsPerSecond * delta;

      if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 10) {
        setIsPlaying(false);
        return;
      }

      animationFrameRef.current = requestAnimationFrame(scrollStep);
    };

    animationFrameRef.current = requestAnimationFrame(scrollStep);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, speed]);

  const handleReset = () => {
    setIsPlaying(false);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col backdrop-blur-xl">
      
      {/* Teleprompter Top Control Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-400" />
            <span>Mode Teleprompter Video</span>
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            "{content.topic}"
          </span>
        </div>

        {/* Adjustments */}
        <div className="flex items-center gap-3 flex-wrap">
          
          {/* Font Size */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
            <Type className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Ukuran:</span>
            <button
              onClick={() => setFontSize(prev => Math.max(18, prev - 4))}
              className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
            >
              -
            </button>
            <span className="font-mono text-slate-100 font-bold w-6 text-center">{fontSize}</span>
            <button
              onClick={() => setFontSize(prev => Math.min(60, prev + 4))}
              className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Speed */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
            <Gauge className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Kecepatan:</span>
            <button
              onClick={() => setSpeed(prev => Math.max(1, prev - 1))}
              className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
            >
              -
            </button>
            <span className="font-mono text-slate-100 font-bold w-4 text-center">{speed}</span>
            <button
              onClick={() => setSpeed(prev => Math.min(10, prev + 1))}
              className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Mirror Toggle */}
          <button
            onClick={() => setIsMirrored(prev => !prev)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isMirrored
                ? 'bg-cyan-950 border border-cyan-700 text-cyan-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
            title="Cermin untuk rigging koper prompter"
          >
            <FlipHorizontal className="w-3.5 h-3.5" />
            <span>Mirror</span>
          </button>

          {/* Play / Pause */}
          <button
            onClick={() => setIsPlaying(prev => !prev)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause Scroll</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Mulai Scroll</span>
              </>
            )}
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
            title="Ulangi dari Awal"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 cursor-pointer"
            title="Tutup Teleprompter"
          >
            <X className="w-5 h-5" />
          </button>

        </div>
      </div>

      {/* Prompter Scrolling Area */}
      <div
        ref={scrollRef}
        className={`flex-1 overflow-y-auto px-6 sm:px-12 py-32 space-y-12 max-w-4xl mx-auto w-full scroll-smooth select-none ${
          isMirrored ? 'scale-x-[-1]' : ''
        }`}
      >
        {/* Reading guide indicator line */}
        <div className="fixed top-1/2 left-0 right-0 h-16 border-y-2 border-indigo-500/30 bg-indigo-500/5 pointer-events-none z-10 flex items-center justify-between px-4">
          <span className="text-[10px] text-indigo-400 font-mono">EYE LEVEL LINE</span>
          <span className="text-[10px] text-indigo-400 font-mono">EYE LEVEL LINE</span>
        </div>

        {content.scenes.map((scene) => (
          <div key={scene.sceneNumber} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-bold uppercase tracking-widest">
                Part {scene.sceneNumber}: {scene.partType} ({scene.timestamp})
              </span>
              <span className="text-xs text-amber-300 font-medium">
                {scene.actingCue}
              </span>
            </div>

            <p
              style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
              className="text-slate-100 font-semibold tracking-wide"
            >
              "{scene.narrationDraft}"
            </p>
          </div>
        ))}

        <div className="pt-32 text-center text-slate-600 text-sm font-semibold">
          --- SELESAI ---
        </div>
      </div>

    </div>
  );
};
