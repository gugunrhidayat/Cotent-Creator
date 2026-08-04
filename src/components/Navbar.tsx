import React from 'react';
import { Sparkles, BookOpen, History, Plus, FileText, Wand2 } from 'lucide-react';

interface NavbarProps {
  onNewDraft: () => void;
  onOpenPresets: () => void;
  onOpenDrafts: () => void;
  savedDraftsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNewDraft,
  onOpenPresets,
  onOpenDrafts,
  savedDraftsCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Content Creator Studio
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60 uppercase tracking-wide">
                Shorts & Reels
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Generator Narasi Video & AI Image Prompt Faceless
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenPresets}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
            title="Inspirasi & Ide Topik"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Ide Topik</span>
          </button>

          <button
            onClick={onOpenDrafts}
            className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
            title="Draf Tersimpan"
          >
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Draf Saya</span>
            {savedDraftsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                {savedDraftsCount}
              </span>
            )}
          </button>

          <button
            onClick={onNewDraft}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Draf Baru</span>
          </button>
        </div>

      </div>
    </header>
  );
};
