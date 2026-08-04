import React, { useState } from 'react';
import { X, History, Trash2, ArrowRight, Calendar, Clock, Search } from 'lucide-react';
import { GeneratedContent } from '../types/content';

interface SavedDraftsModalProps {
  drafts: GeneratedContent[];
  onSelectDraft: (draft: GeneratedContent) => void;
  onDeleteDraft: (id: string) => void;
  onClose: () => void;
}

export const SavedDraftsModal: React.FC<SavedDraftsModalProps> = ({
  drafts,
  onSelectDraft,
  onDeleteDraft,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = drafts.filter(
    d =>
      d.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.theme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Riwayat Draf Tersimpan ({drafts.length})
              </h3>
              <p className="text-xs text-slate-400">
                Akses kembali draf narasi dan prompt gambar AI yang pernah kamu buat.
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

        {/* Search Bar */}
        <div className="p-3 bg-slate-950 border-b border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari berdasarkan topik atau tema desain..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none"
            />
          </div>
        </div>

        {/* List of Saved Drafts */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <History className="w-8 h-8 mx-auto opacity-40" />
              <p className="text-sm font-medium">Belum ada draf tersimpan.</p>
              <p className="text-xs text-slate-600">
                Buat konten baru di halaman utama dan draf akan tersimpan secara otomatis!
              </p>
            </div>
          ) : (
            filtered.map((draft) => (
              <div
                key={draft.id}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1.5 max-w-xl">
                  <h4 className="text-sm font-bold text-slate-100 line-clamp-2">
                    "{draft.topic}"
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      🎨 {draft.theme}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      {draft.duration}s
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(draft.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onSelectDraft(draft);
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
                  >
                    <span>Buka Draf</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteDraft(draft.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-800 transition-all cursor-pointer"
                    title="Hapus Draf"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
