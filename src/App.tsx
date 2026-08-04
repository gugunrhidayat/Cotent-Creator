import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { InputSection } from './components/InputSection';
import { StoryboardCard } from './components/StoryboardCard';
import { FullScriptView } from './components/FullScriptView';
import { PromptGalleryView } from './components/PromptGalleryView';
import { TeleprompterModal } from './components/TeleprompterModal';
import { PresetTopicsModal } from './components/PresetTopicsModal';
import { SavedDraftsModal } from './components/SavedDraftsModal';
import { GeneratedContent, GenerationRequest } from './types/content';
import { Sparkles, Layers, FileText, Image as ImageIcon, Flame, Anchor, Eye, Share2, AlertCircle } from 'lucide-react';

const STORAGE_KEY = 'content_creator_drafts_v1';

export default function App() {
  const [currentContent, setCurrentContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'storyboard' | 'script' | 'prompts'>('storyboard');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals
  const [showTeleprompter, setShowTeleprompter] = useState<boolean>(false);
  const [showPresets, setShowPresets] = useState<boolean>(false);
  const [showDraftsModal, setShowDraftsModal] = useState<boolean>(false);

  // Saved Drafts
  const [savedDrafts, setSavedDrafts] = useState<GeneratedContent[]>([]);

  // Load saved drafts from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedDrafts(parsed);
          // Set latest draft as initial state if exists
          if (parsed.length > 0 && !currentContent) {
            setCurrentContent(parsed[0]);
          }
        }
      }
    } catch (e) {
      console.error('Failed to load saved drafts:', e);
    }
  }, []);

  // Save new draft to localStorage
  const saveDraftLocally = (newContent: GeneratedContent) => {
    setSavedDrafts(prev => {
      const updated = [newContent, ...prev.filter(d => d.id !== newContent.id)].slice(0, 30);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
      return updated;
    });
  };

  const handleDeleteDraft = (id: string) => {
    setSavedDrafts(prev => {
      const updated = prev.filter(d => d.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save updated drafts:', e);
      }
      return updated;
    });
    if (currentContent?.id === id) {
      setCurrentContent(null);
    }
  };

  // Generate content call to backend API endpoint
  const handleGenerate = async (req: GenerationRequest) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req)
      });

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);
      }

      const data: GeneratedContent = await res.json();
      setCurrentContent(data);
      saveDraftLocally(data);
      setActiveTab('storyboard');
      
      // Scroll to content view smoothly
      window.scrollTo({ top: 350, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Generate content error:', err);
      setErrorMessage(err.message || 'Gagal membuat draf konten. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        onNewDraft={() => {
          setCurrentContent(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPresets={() => setShowPresets(true)}
        onOpenDrafts={() => setShowDraftsModal(true)}
        savedDraftsCount={savedDrafts.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Error Alert if any */}
        {errorMessage && (
          <div className="bg-rose-950/80 border border-rose-800 text-rose-200 p-4 rounded-xl flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-rose-200 font-bold"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Hero Form Section */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-6 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
              Content Creator Studio Shorts & Reels
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Cukup masukkan <span className="text-slate-200 font-medium">Topik / Premis</span> dan <span className="text-slate-200 font-medium">Tema Desain</span>. Langsung terisi otomatis <span className="text-indigo-300 font-medium">Hook, Foreshadow, Isi, CTA, Draf Narasi</span> dan <span className="text-cyan-300 font-medium">Prompt Gambar AI Faceless</span>.
            </p>
          </div>

          <InputSection
            onGenerate={handleGenerate}
            isLoading={isLoading}
            onOpenPresets={() => setShowPresets(true)}
          />
        </section>

        {/* Display Generated Content */}
        {currentContent && (
          <section className="space-y-6 pt-4 border-t border-slate-800/80">
            
            {/* Topic Header & Meta Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase tracking-wider">
                    DRAF TERGENERASI
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(currentContent.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-100">
                  "{currentContent.topic}"
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5 text-slate-300 font-medium">
                  <span>🎨 Tema:</span>
                  <span className="text-cyan-300 font-semibold">{currentContent.theme}</span>
                </div>
                <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5 text-slate-300 font-medium">
                  <span>⏱️ Durasi:</span>
                  <span className="text-emerald-300 font-semibold">{currentContent.duration}s</span>
                </div>
                <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5 text-slate-300 font-medium">
                  <span>💬 Tone:</span>
                  <span className="text-indigo-300 font-semibold">{currentContent.tone}</span>
                </div>
              </div>
            </div>

            {/* Content Structure Breakdown Summary (Hook, Foreshadow, Isi, CTA) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* Hook */}
              <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-300 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-rose-400" />
                    <span>HOOK (0-3s)</span>
                  </span>
                  <span className="text-[10px] bg-rose-900/80 text-rose-200 px-1.5 py-0.5 rounded font-mono">
                    Atensi
                  </span>
                </div>
                <p className="text-xs text-slate-200 line-clamp-3 italic">
                  "{currentContent.hookSummary}"
                </p>
              </div>

              {/* Foreshadow */}
              <div className="bg-purple-950/40 border border-purple-800/60 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-300 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-purple-400" />
                    <span>FORESHADOW (3-7s)</span>
                  </span>
                  <span className="text-[10px] bg-purple-900/80 text-purple-200 px-1.5 py-0.5 rounded font-mono">
                    Penasaran
                  </span>
                </div>
                <p className="text-xs text-slate-200 line-clamp-3 italic">
                  "{currentContent.foreshadowSummary}"
                </p>
              </div>

              {/* Isi */}
              <div className="bg-indigo-950/40 border border-indigo-800/60 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>ISI KONTEN</span>
                  </span>
                  <span className="text-[10px] bg-indigo-900/80 text-indigo-200 px-1.5 py-0.5 rounded font-mono">
                    Value Poin
                  </span>
                </div>
                <p className="text-xs text-slate-200 line-clamp-3 italic">
                  "{currentContent.isiSummary}"
                </p>
              </div>

              {/* CTA */}
              <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                    <Anchor className="w-3.5 h-3.5 text-emerald-400" />
                    <span>CTA (AKHIR)</span>
                  </span>
                  <span className="text-[10px] bg-emerald-900/80 text-emerald-200 px-1.5 py-0.5 rounded font-mono">
                    Engagement
                  </span>
                </div>
                <p className="text-xs text-slate-200 line-clamp-3 italic">
                  "{currentContent.ctaSummary}"
                </p>
              </div>

            </div>

            {/* Tab Navigation Controls */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('storyboard')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'storyboard'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Storyboard & Prompt Faceless</span>
                  <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-indigo-950 text-indigo-300 font-mono">
                    {currentContent.scenes.length} Part
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('script')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'script'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Draf Narasi Lengkap & Audio</span>
                </button>

                <button
                  onClick={() => setActiveTab('prompts')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'prompts'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>Galeri Prompt AI</span>
                </button>
              </div>
            </div>

            {/* Tab Content Panels */}
            {activeTab === 'storyboard' && (
              <div className="space-y-4">
                {currentContent.scenes.map((scene) => (
                  <StoryboardCard
                    key={scene.sceneNumber}
                    scene={scene}
                    theme={currentContent.theme}
                  />
                ))}
              </div>
            )}

            {activeTab === 'script' && (
              <FullScriptView
                content={currentContent}
                onOpenTeleprompter={() => setShowTeleprompter(true)}
              />
            )}

            {activeTab === 'prompts' && (
              <PromptGalleryView content={currentContent} />
            )}

          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p className="max-w-7xl mx-auto px-4">
          Content Creator Studio • Generator Narasi Video Short & Prompt AI Faceless (Tanpa Muka)
        </p>
      </footer>

      {/* Modals */}
      {showTeleprompter && currentContent && (
        <TeleprompterModal
          content={currentContent}
          onClose={() => setShowTeleprompter(false)}
        />
      )}

      {showPresets && (
        <PresetTopicsModal
          onSelectTopic={(selectedTopic, theme) => {
            handleGenerate({
              topic: selectedTopic,
              theme: theme || 'Minimalist Flat Vector 2D',
              duration: 30,
              tone: 'Santai & Kasual (Ngobrol Temen)'
            });
          }}
          onClose={() => setShowPresets(false)}
        />
      )}

      {showDraftsModal && (
        <SavedDraftsModal
          drafts={savedDrafts}
          onSelectDraft={(draft) => {
            setCurrentContent(draft);
            setActiveTab('storyboard');
          }}
          onDeleteDraft={handleDeleteDraft}
          onClose={() => setShowDraftsModal(false)}
        />
      )}

    </div>
  );
}
