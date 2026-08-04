import React, { useState } from 'react';
import { Copy, Check, Sparkles, Volume2, Image, ShieldAlert } from 'lucide-react';
import { ScenePart } from '../types/content';
import { FacelessCanvasIllustration } from './FacelessIllustration';

interface StoryboardCardProps {
  scene: ScenePart;
  theme: string;
}

export const StoryboardCard: React.FC<StoryboardCardProps> = ({ scene, theme }) => {
  const [copiedNarration, setCopiedNarration] = useState(false);
  const [copiedPromptEn, setCopiedPromptEn] = useState(false);
  const [copiedPromptId, setCopiedPromptId] = useState(false);
  const [activePromptTab, setActivePromptTab] = useState<'en' | 'id'>('en');

  const handleCopy = (text: string, setCopiedState: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  // Color styles per part type
  const getBadgeStyle = () => {
    switch (scene.partType) {
      case 'Hook':
        return 'bg-rose-950/80 text-rose-300 border-rose-800/80';
      case 'Foreshadow':
        return 'bg-purple-950/80 text-purple-300 border-purple-800/80';
      case 'Isi':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-800/80';
      case 'CTA':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col gap-4 hover:border-slate-700 transition-all">
      
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getBadgeStyle()}`}>
            Part {scene.sceneNumber}: {scene.partType}
          </span>
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded-md border border-slate-800">
            ⏱️ {scene.timestamp}
          </span>
        </div>
        <span className="text-[11px] font-semibold text-cyan-400 flex items-center gap-1 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/50">
          <ShieldAlert className="w-3 h-3 text-cyan-400" />
          <span>Faceless (Tanpa Muka)</span>
        </span>
      </div>

      {/* Grid: Left Narasi Script, Right Image Canvas Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Narasi Voiceover Section (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-indigo-400" />
                <span>Draf Narasi (Gaya Tidak Kaku)</span>
              </span>
              <button
                onClick={() => handleCopy(scene.narrationDraft, setCopiedNarration)}
                className="text-[11px] font-medium text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              >
                {copiedNarration ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Salin Narasi</span>
                  </>
                )}
              </button>
            </div>

            {/* Acting / Voice Cue */}
            <div className="text-[11px] font-semibold text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-800/40 mb-2 inline-block">
              🎭 Petunjuk Suara: {scene.actingCue}
            </div>

            {/* Voiceover Text */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3.5 text-slate-100 text-sm leading-relaxed font-sans">
              "{scene.narrationDraft}"
            </div>
          </div>

          {/* AI Image Prompt Section */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Image className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-slate-200">Draft Prompt Gambar AI</span>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-[10px] font-semibold">
                <button
                  onClick={() => setActivePromptTab('en')}
                  className={`px-2 py-0.5 rounded-md cursor-pointer transition-all ${
                    activePromptTab === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  English (Recommended)
                </button>
                <button
                  onClick={() => setActivePromptTab('id')}
                  className={`px-2 py-0.5 rounded-md cursor-pointer transition-all ${
                    activePromptTab === 'id' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Indonesia
                </button>
              </div>
            </div>

            {/* Prompt Text Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 font-mono relative group">
              <p className="line-clamp-3 leading-relaxed">
                {activePromptTab === 'en' ? scene.imagePromptEn : scene.imagePromptId}
              </p>
            </div>

            {/* Copy Prompt Button */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400">
                ✨ Siap dipaste ke Midjourney, FLUX, DALL-E, atau Ideogram
              </span>
              <button
                onClick={() => {
                  if (activePromptTab === 'en') {
                    handleCopy(scene.imagePromptEn, setCopiedPromptEn);
                  } else {
                    handleCopy(scene.imagePromptId, setCopiedPromptId);
                  }
                }}
                className="text-[11px] font-medium text-cyan-300 hover:text-cyan-200 bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-800/80 px-2.5 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer"
              >
                {(activePromptTab === 'en' ? copiedPromptEn : copiedPromptId) ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Prompt Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Salin Prompt ({activePromptTab.toUpperCase()})</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Visual Preview Illustration (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Preview Visual Faceless ({theme})</span>
            </span>
            <FacelessCanvasIllustration
              theme={theme}
              partType={scene.partType}
              sceneNumber={scene.sceneNumber}
            />
            <p className="text-[11px] text-slate-400 text-center italic">
              "{scene.visualDescription}"
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
