import React, { useState } from 'react';
import { X, BookOpen, Lightbulb, ArrowRight, Sparkles } from 'lucide-react';

interface PresetTopicsModalProps {
  onSelectTopic: (topic: string, theme?: string) => void;
  onClose: () => void;
}

const PRESET_CATEGORIES = [
  {
    id: 'productivity',
    name: 'Produktivitas & Karir',
    icon: '⚡',
    topics: [
      { title: '3 Trik Psikologi Biar Tetap Fokus Pas Kerja Remote', theme: 'Minimalist Flat Vector 2D' },
      { title: 'Alasan Kenapa Jam Kerja 8 Jam Mulai Ketinggalan Zaman', theme: 'Warm Cinematic Moody' },
      { title: 'Cara Mengatasi Burnout Tanpa Harus Resign dari Pekerjaan', theme: 'Clean Pastel Line Art' },
      { title: 'Rahasia Rutinitas Pagi 15 Menit yang Bikin Energi Stabil', theme: 'Minimalist Flat Vector 2D' }
    ]
  },
  {
    id: 'finance',
    name: 'Keuangan & Bisnis',
    icon: '💰',
    topics: [
      { title: 'Cara Mengatur Gaji 5 Juta Biar Tetap Bisa Tabung & Investor', theme: 'Minimalist Flat Vector 2D' },
      { title: 'Kenapa Orang Kaya Suka Punya Banyak Sumber Income Pasif?', theme: 'Dark Cyberpunk Neon' },
      { title: '3 Kesalahan Finansial Anak Muda di Umur 20-an yang Bikin Menyesal', theme: 'Warm Cinematic Moody' },
      { title: 'Perbedaan Mentalitas Si Kaya vs Si Miskin Menurut Riset', theme: 'Retro Comic Vintage 90s' }
    ]
  },
  {
    id: 'tech',
    name: 'Teknologi & AI',
    icon: '🤖',
    topics: [
      { title: 'AI yang Bakal Meringankan Pekerjaan Administrasi di 2026', theme: 'Dark Cyberpunk Neon' },
      { title: 'Bahaya Privasi yang Jarang Orang Tahu Pas Pakai WiFi Publik', theme: 'Dark Cyberpunk Neon' },
      { title: 'Cara Pakai AI Buat Bantu Nulis Email & Laporan Kerja Cepat', theme: 'Minimalist Flat Vector 2D' },
      { title: '3 Fitur HP Rahasia yang Jarang Dipakai Orang Padahal Sangat Canggih', theme: '3D Claymation Modern' }
    ]
  },
  {
    id: 'lifestyle',
    name: 'Kesehatan & Lifestyle',
    icon: '🌿',
    topics: [
      { title: 'Bahaya Sering Begadang & Kurang Tidur yang Bikin Otak Lambat', theme: 'Warm Cinematic Moody' },
      { title: 'Efek Samping Minum Kopi Pas Perut Kosong di Pagi Hari', theme: 'Clean Pastel Line Art' },
      { title: '3 Kebiasaan Sederhana yang Bikin Wajah Keliatan Awet Muda', theme: 'Clean Pastel Line Art' },
      { title: 'Cara Mengurangi Kecanduan Scroll Sosmed Sebelum Tidur', theme: 'Minimalist Flat Vector 2D' }
    ]
  },
  {
    id: 'storytelling',
    name: 'Misteri & Storytelling',
    icon: '🕵️‍♂️',
    topics: [
      { title: 'Misteri Hilangnya Peradaban Atlantis yang Belum Terpecahkan', theme: 'Warm Cinematic Moody' },
      { title: 'Fakta Aneh Segitiga Bermuda yang Akhirnya Ditemukan Ilmuwan', theme: 'Dark Cyberpunk Neon' },
      { title: 'Sejarah Singkat Bagaimana Uang Kertas Pertama Kali Diciptakan', theme: 'Retro Comic Vintage 90s' }
    ]
  }
];

export const PresetTopicsModal: React.FC<PresetTopicsModalProps> = ({
  onSelectTopic,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('productivity');

  const selectedCategory = PRESET_CATEGORIES.find(c => c.id === activeTab) || PRESET_CATEGORIES[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Pustaka Ide & Topik Konten Short
              </h3>
              <p className="text-xs text-slate-400">
                Pilih topik populer untuk langsung mengisi draf narasi & prompt faceless.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 cursor-pointer transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Niche Tabs */}
        <div className="flex items-center gap-1 p-3 bg-slate-950 border-b border-slate-800 overflow-x-auto">
          {PRESET_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Topic Items List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {selectedCategory.topics.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/60 flex items-center justify-between gap-4 group transition-all"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors">
                  "{item.title}"
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Rekomendasi Tema Desain:</span>
                  <span className="text-[10px] font-medium bg-slate-900 text-cyan-300 px-2 py-0.5 rounded border border-slate-800">
                    🎨 {item.theme}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectTopic(item.title, item.theme);
                  onClose();
                }}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-800 hover:border-indigo-500 text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
              >
                <span>Pakai Topik Ini</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>💡 Kamu juga bisa mengetik topik kustom milikmu sendiri kapan saja.</span>
          <button
            onClick={onClose}
            className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
