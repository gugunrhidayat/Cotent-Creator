import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Copy, Check, Play, Square, Tv, Clock, FileText, Bookmark, Share2 } from 'lucide-react';
import { GeneratedContent } from '../types/content';

interface FullScriptViewProps {
  content: GeneratedContent;
  onOpenTeleprompter: () => void;
}

export const FullScriptView: React.FC<FullScriptViewProps> = ({
  content,
  onOpenTeleprompter
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Setup TTS Audio
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleTTS = () => {
    if (!('speechSynthesis' in window)) {
      alert('Fitur Text-to-Speech tidak didukung di browser ini.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    // Combine narration without acting cues for natural speech
    const cleanSpeechText = content.scenes
      .map(s => s.narrationDraft)
      .join('. ');

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setSpeechUtterance(utterance);
    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const copyFullScript = () => {
    const formattedScript = `JUDUL / TOPIK: ${content.topic}
TEMA DESAIN: ${content.theme}
ESTIMASI DURASI: ${content.duration} Detik
TONE: ${content.tone}

--- DRAF NARASI LENGKAP ---

` + content.scenes.map(s => `[PART ${s.sceneNumber}: ${s.partType} - ${s.timestamp}]
Petunjuk: ${s.actingCue}
"${s.narrationDraft}"`).join('\n\n');

    navigator.clipboard.writeText(formattedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Cards Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Estimasi Durasi</p>
            <p className="text-sm font-bold text-slate-100">{content.duration} Detik</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Jumlah Kata</p>
            <p className="text-sm font-bold text-slate-100">{content.totalWords} Kata</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Gaya Bahasa</p>
            <p className="text-sm font-bold text-slate-100 truncate max-w-[120px]">{content.tone}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Jumlah Scene</p>
            <p className="text-sm font-bold text-slate-100">{content.scenes.length} Part</p>
          </div>
        </div>
      </div>

      {/* Main Narration Script Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        
        {/* Controls header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span>Draf Narasi Siap Rekam / Dubbing</span>
            </h3>
            <p className="text-xs text-slate-400">
              Gaya bahasa luwes, santai, dan komunikatif untuk short video.
            </p>
          </div>

          <div className="flex items-center gap-2">
            
            {/* TTS Audio Player */}
            <button
              onClick={toggleTTS}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop Suara AI</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dengar Contoh Narasi</span>
                </>
              )}
            </button>

            {/* Teleprompter button */}
            <button
              onClick={onOpenTeleprompter}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Mode Teleprompter</span>
            </button>

            {/* Copy button */}
            <button
              onClick={copyFullScript}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Semua</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Formatted Script Body */}
        <div className="space-y-4">
          {content.scenes.map((scene) => (
            <div
              key={scene.sceneNumber}
              className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 transition-all hover:border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  Part {scene.sceneNumber}: {scene.partType} ({scene.timestamp})
                </span>
                <span className="text-[11px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                  {scene.actingCue}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans font-normal pl-3 border-l-2 border-indigo-500/60">
                "{scene.narrationDraft}"
              </p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
