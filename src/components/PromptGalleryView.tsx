import React, { useState } from 'react';
import { Copy, Check, Download, ShieldCheck, Image, FileCode } from 'lucide-react';
import { GeneratedContent } from '../types/content';

interface PromptGalleryViewProps {
  content: GeneratedContent;
}

export const PromptGalleryView: React.FC<PromptGalleryViewProps> = ({ content }) => {
  const [copiedAllEn, setCopiedAllEn] = useState(false);
  const [copiedAllId, setCopiedAllId] = useState(false);

  const copyAll = (lang: 'en' | 'id') => {
    const text = content.scenes
      .map(
        s =>
          `[Scene ${s.sceneNumber} - ${s.partType}]\n` +
          (lang === 'en' ? s.imagePromptEn : s.imagePromptId)
      )
      .join('\n\n');

    navigator.clipboard.writeText(text);
    if (lang === 'en') {
      setCopiedAllEn(true);
      setTimeout(() => setCopiedAllEn(false), 2000);
    } else {
      setCopiedAllId(true);
      setTimeout(() => setCopiedAllId(false), 2000);
    }
  };

  const downloadFile = (format: 'txt' | 'json') => {
    let blob: Blob;
    let filename: string;

    if (format === 'json') {
      blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
      filename = `prompts_${content.topic.slice(0, 20)}.json`;
    } else {
      const txt = `TOPIK: ${content.topic}
TEMA DESAIN: ${content.theme}
GAYA ART: Faceless (Tanpa Mata, Tanpa Hidung, Tanpa Mulut)

===========================================
LIST AI IMAGE PROMPTS (MIDJOURNEY / FLUX / DALL-E)
===========================================

` + content.scenes.map(s => `SCENE ${s.sceneNumber} [${s.partType}]:
ENGLISH PROMPT:
${s.imagePromptEn}

INDONESIA PROMPT:
${s.imagePromptId}
-------------------------------------------`).join('\n\n');

      blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
      filename = `prompts_${content.topic.slice(0, 20)}.txt`;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Faceless Enforcement Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-cyan-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>Garansi Prompt Faceless AI</span>
              <span className="px-2 py-0.5 rounded bg-cyan-900/80 text-cyan-300 text-[10px]">100% Faceless</span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Setiap prompt secara eksplisit menyertakan instruksi khusus: <span className="text-cyan-300 font-mono">faceless character, no eyes, no nose, no mouth, smooth blank featureless face</span>.
            </p>
          </div>
        </div>

        {/* Global Export Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            onClick={() => copyAll('en')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/30 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copiedAllEn ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Semua Prompt Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Semua (English)</span>
              </>
            )}
          </button>

          <button
            onClick={() => downloadFile('txt')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh TXT</span>
          </button>

          <button
            onClick={() => downloadFile('json')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-400" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* List of Prompts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.scenes.map((scene) => (
          <div
            key={scene.sceneNumber}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
                  <Image className="w-4 h-4 text-cyan-400" />
                  <span>Scene {scene.sceneNumber}: {scene.partType}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded">
                  {scene.timestamp}
                </span>
              </div>

              {/* English Prompt */}
              <div className="space-y-1 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">English AI Prompt (Optimal):</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-cyan-200 leading-relaxed">
                  {scene.imagePromptEn}
                </div>
              </div>

              {/* Indonesian Description */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">Deskripsi Bahasa Indonesia:</span>
                <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  {scene.imagePromptId}
                </p>
              </div>
            </div>

            {/* Individual Copy Button */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Gaya: {content.theme}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(scene.imagePromptEn);
                  alert(`Prompt Scene ${scene.sceneNumber} tersalin!`);
                }}
                className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Prompt</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
