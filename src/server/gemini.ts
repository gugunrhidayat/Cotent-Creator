import { GoogleGenAI, Type, Schema } from '@google/genai';
import { GeneratedContent, GenerationRequest, ScenePart } from '../types/content';
import { generateFallbackContent } from '../services/fallbackGenerator';

export async function generateContentServer(req: GenerationRequest): Promise<GeneratedContent> {
  const { topic, theme, duration, tone } = req;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    console.log('[ContentServer] GEMINI_API_KEY missing or placeholder, using fallback generator.');
    return generateFallbackContent(req);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Kamu adalah pakar Content Creator Short Video (Reels/TikTok/YouTube Shorts).
Buat draf konten lengkap berdasarkan parameter berikut:
- Topik Utama / Premis: "${topic}"
- Tema Desain Visual: "${theme}"
- Target Durasi: ${duration} detik
- Gaya Bahasa / Tone: "${tone || 'Santai, Gaul Terpelajar, Luwes'}"

PERSYARATAN MUTLAK:
1. Struktur Konten terbagi secara urut: Hook (0-3s), Foreshadow (3-8s), Isi (1-3 scene), dan CTA.
2. Draf Narasi (Voiceover): Gunakan bahasa Indonesia yang SANGAT TIDAK KAKU, gaul santai, mengalir seperti orang bercerita langsung di depan kamera. Jangan kaku seperti membaca artikel/buku.
3. ATURAN PROMPT GAMBAR AI FACELESS (SANGAT KETAT & MUTLAK!):
   - Setiap bagian WAJIB memiliki Prompt Gambar AI (imagePromptEn & imagePromptId) yang merepresentasikan narasi scene tersebut dengan Tema Desain "${theme}".
   - KRUSIAL: Karakter utama HARUS FACELESS (TANPA MATA, TANPA HIDUNG, TANPA MULUT). Kepala polos mulus / anonim.
   - Sertakan frasa wajib di prompt Inggris: "faceless character, smooth featureless head with no eyes, no nose, no mouth, blank anonymous face, minimalist aesthetic, ${theme}".

Format JSON output harus sesuai schema berikut.`;

    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        hookSummary: { type: Type.STRING },
        foreshadowSummary: { type: Type.STRING },
        isiSummary: { type: Type.STRING },
        ctaSummary: { type: Type.STRING },
        fullNarrationText: { type: Type.STRING },
        estimatedReadingTime: { type: Type.STRING },
        scenes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              sceneNumber: { type: Type.NUMBER },
              partType: { type: Type.STRING, description: "Must be 'Hook' | 'Foreshadow' | 'Isi' | 'CTA'" },
              timestamp: { type: Type.STRING },
              narrationDraft: { type: Type.STRING },
              actingCue: { type: Type.STRING },
              imagePromptEn: { type: Type.STRING },
              imagePromptId: { type: Type.STRING },
              visualDescription: { type: Type.STRING },
            },
            required: ["sceneNumber", "partType", "timestamp", "narrationDraft", "actingCue", "imagePromptEn", "imagePromptId", "visualDescription"]
          }
        }
      },
      required: ["hookSummary", "foreshadowSummary", "isiSummary", "ctaSummary", "fullNarrationText", "estimatedReadingTime", "scenes"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.75,
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    const scenesList: ScenePart[] = (parsed.scenes || []).map((s: any, idx: number) => ({
      sceneNumber: s.sceneNumber || idx + 1,
      partType: (['Hook', 'Foreshadow', 'Isi', 'CTA'].includes(s.partType) ? s.partType : 'Isi') as any,
      timestamp: s.timestamp || `00:${idx * 5} - 00:${(idx + 1) * 5}`,
      narrationDraft: s.narrationDraft || '',
      actingCue: s.actingCue || '[Nada santai]',
      imagePromptEn: s.imagePromptEn?.includes('faceless') ? s.imagePromptEn : `${s.imagePromptEn}, faceless character with no eyes, no nose, no mouth, smooth blank featureless face, anonymous figure, ${theme}`,
      imagePromptId: s.imagePromptId || '',
      visualDescription: s.visualDescription || ''
    }));

    const fullNarration = scenesList.map(s => `${s.actingCue}\n"${s.narrationDraft}"`).join('\n\n');
    const totalWords = scenesList.reduce((acc, s) => acc + (s.narrationDraft ? s.narrationDraft.split(/\s+/).length : 0), 0);

    return {
      id: 'draft_' + Date.now(),
      topic,
      theme,
      duration,
      tone: tone || 'Santai & Kasual',
      createdAt: new Date().toISOString(),
      hookSummary: parsed.hookSummary || scenesList[0]?.narrationDraft || '',
      foreshadowSummary: parsed.foreshadowSummary || scenesList[1]?.narrationDraft || '',
      isiSummary: parsed.isiSummary || scenesList.filter(s => s.partType === 'Isi').map(s => s.narrationDraft).join(' '),
      ctaSummary: parsed.ctaSummary || scenesList[scenesList.length - 1]?.narrationDraft || '',
      fullNarrationText: parsed.fullNarrationText || fullNarration,
      estimatedReadingTime: parsed.estimatedReadingTime || `${duration} detik`,
      totalWords,
      scenes: scenesList
    };

  } catch (err) {
    console.error('[ContentServer] Gemini generation failed, falling back:', err);
    return generateFallbackContent(req);
  }
}
