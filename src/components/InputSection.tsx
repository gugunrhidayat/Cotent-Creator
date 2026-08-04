import React, { useState } from 'react';
import { Sparkles, Palette, Clock, MessageSquare, Lightbulb, Zap } from 'lucide-react';
import { GenerationRequest } from '../types/content';

interface InputSectionProps {
  onGenerate: (req: GenerationRequest) => void;
  isLoading: boolean;
  onOpenPresets: () => void;
}

const THEME_OPTIONS = [
  { id: 'Minimalist Flat Vector 2D', label: 'Minimalist Flat 2D', icon: '🎨' },
  { id: 'Dark Cyberpunk Neon Aesthetic', label: 'Dark Cyberpunk Neon', icon: '🌙' },
  { id: 'Warm Cinematic Moody Lighting', label: 'Warm Moody Cinematic', icon: '☕' },
  { id: 'Clean Pastel Line Art', label: 'Clean Pastel Line Art', icon: '✏️' },
  { id: '3D Claymation Modern Soft', label: '3D Claymation Modern', icon: '🧊' },
  { id: 'Retro Comic Vintage 90s', label: 'Retro Comic Vintage 90s', icon: '📺' },
];

const TONE_OPTIONS = [
  'Santai & Kasual (Ngobrol Temen)',
  'Storytelling Seru & Penasaran',
  'To The Point & Informatif',
  'Humor Reflektif & Sentilan',
  'Motivasi & Inspiratif'
];

const QUICK_TOPICS = [
  '3 Trik Psikologi Biar Tetap Fokus Pas Kerja Remote',
  'Alasan Kenapa Jam Kerja 8 Jam Mulai Ketinggalan Zaman',
  'Cara Mengatur Keuangan Gaji 5 Juta Biar Bisa Nabung',
  'AI yang Bakal Meringankan Pekerjaan Harian di 2026'
];

export const InputSection: React.FC<InputSectionProps> = ({
  onGenerate,
  isLoading,
  onOpenPresets
}) => {
  const [topic, setTopic] = useState('');
  const [theme, setTheme] = useState('Minimalist Flat Vector 2D');
  const [customTheme, setCustomTheme] = useState('');
  const [duration, setDuration] = useState<number>(30);
  const [tone, setTone] = useState('Santai & Kasual (Ngobrol Temen)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    const finalTheme = customTheme.trim() ? customTheme.trim() : theme;
    onGenerate({
      topic: topic.trim(),
      theme: finalTheme,
      duration,
      tone
    });
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Topic / Premise Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Topik Utama / Premis Konten</span>
              <span className="text-xs font-normal text-rose-400">*Wajib</span>
            </label>
            <button
              type="button"
              onClick={onOpenPresets}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Lihat Ide Topik</span>
            </button>
          </div>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Contoh: 3 Kebiasaan Pagi Orang Sukses yang Bikin Produktif atau Alasan Kenapa Tidur Cukup Penting untuk Otak..."
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl p-3.5 text-slate-100 text-sm placeholder-slate-500 resize-none transition-all outline-none"
            required
          />

          {/* Quick Topic Ideas Pills */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-medium text-slate-400 mr-1">Coba ide:</span>
            {QUICK_TOPICS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setTopic(item)}
                className="text-[11px] bg-slate-800/80 hover:bg-indigo-950/80 hover:text-indigo-200 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700/80 transition-all cursor-pointer truncate max-w-[280px]"
              >
                "{item}"
              </button>
            ))}
          </div>
        </div>

        {/* Design Theme Column */}
        <div>
          <label className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-2">
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>Tema Desain (Menentukan Prompt Gambar AI Faceless)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {THEME_OPTIONS.map((t) => {
              const isSelected = theme === t.id && !customTheme;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTheme(t.id);
                    setCustomTheme('');
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/90 border-indigo-500 text-indigo-200 shadow-sm shadow-indigo-500/20'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="text-base">{t.icon}</span>
                  <span className="truncate">{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Custom Theme Input */}
          <div className="mt-2.5">
            <input
              type="text"
              value={customTheme}
              onChange={(e) => setCustomTheme(e.target.value)}
              placeholder="Atau ketik Tema Desain Kustom (misal: 'Futuristic Noir Dark Pencil Sketch')..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Duration & Tone Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Target Duration */}
          <div>
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Target Durasi Short Video</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`py-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    duration === d
                      ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300 shadow-sm shadow-emerald-500/20'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {d}s
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Estimasi {duration * 2.5} kata ({duration < 30 ? 'Cepat & Padat' : 'Sedang & Informatif'})
            </p>
          </div>

          {/* Tone of Voice */}
          <div>
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span>Gaya Bahasa / Tone</span>
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2 text-xs text-slate-200 outline-none cursor-pointer"
            >
              {TONE_OPTIONS.map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-1">
              *Secara otomatis menggunakan gaya bahasa percakapan yang tidak kaku.
            </p>
          </div>

        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
              isLoading || !topic.trim()
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-indigo-600/30 hover:shadow-indigo-500/40 active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Membuat Draf Narasi & Prompt Faceless...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Buat Konten Otomatis (Hook, Foreshadow, Narasi & Prompt Faceless)</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
