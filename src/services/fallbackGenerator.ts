import { GeneratedContent, GenerationRequest, ScenePart } from '../types/content';

export function generateFallbackContent(req: GenerationRequest): GeneratedContent {
  const { topic, theme, duration, tone } = req;
  const isShort = duration <= 30;
  
  // Clean theme string for prompt integration
  const themePromptStr = theme || 'Minimalist Flat Vector 2D, clean aesthetic';
  
  const scenes: ScenePart[] = [
    {
      sceneNumber: 1,
      partType: 'Hook',
      timestamp: '00:00 - 00:04',
      narrationDraft: `Pernah nggak sih kamu mikir, kenapa tentang ${topic} ini sering banget bikin orang kecele? Sini aku bisikin rahasianya!`,
      actingCue: '[Nada berbisik, wajah penasaran, jeda 1 detik]',
      imagePromptEn: `Faceless character looking shocked with floating glowing question mark icons around head, smooth featureless face with no eyes, no nose, no mouth, blank anonymous head, ${themePromptStr}, high quality, crisp details, 16:9 aspect ratio --no face features, eyes, mouth, nose`,
      imagePromptId: `Karakter faceless tanpa mata, tanpa hidung, tanpa mulut dengan efek ikon melayang, gaya ${themePromptStr}`,
      visualDescription: `Karakter faceless berdiri terkejut dengan simbol misterius melayang di sekitarnya.`
    },
    {
      sceneNumber: 2,
      partType: 'Foreshadow',
      timestamp: '00:04 - 00:10',
      narrationDraft: `Kebanyakan orang kira masalahnya ada di niat. Padahal ada 1 jebakan halus yang 90% orang nggak sadari pas ngerjain ${topic}.`,
      actingCue: '[Intonasi serius tapi santai, jari menunjuk ke depan]',
      imagePromptEn: `Faceless character standing in front of a giant puzzle wall with one missing glowing piece, smooth featureless head with no eyes, no nose, no mouth, completely featureless face, anonymous silhouette, ${themePromptStr}, modern vector art style --no facial features, eyes, mouth, nose`,
      imagePromptId: `Karakter faceless polos tanpa wajah memegang potongan puzzle, gaya ${themePromptStr}`,
      visualDescription: `Karakter faceless memegang kunci puzzle rahasia dalam suasana misterius.`
    },
    {
      sceneNumber: 3,
      partType: 'Isi',
      timestamp: '00:10 - 00:25',
      narrationDraft: `Kuncinya itu simpel banget: Pertama, fokus sama langkah paling kecil yang bisa selesai dalam 2 menit. Kedua, stop bandingin proses kamu sama hasil akhir orang lain di sosmed!`,
      actingCue: '[Suara optimis, ketukan tempo agak cepat, percaya diri]',
      imagePromptEn: `Faceless character climbing step-by-step up a glowing staircase leading to success, smooth featureless face with no eyes, no nose, no mouth, clean blank head, minimalist vector aesthetic, ${themePromptStr}, dynamic angle --no facial features, eyes, mouth, nose`,
      imagePromptId: `Karakter faceless tanpa wajah menaiki tangga kesuksesan, gaya ${themePromptStr}`,
      visualDescription: `Karakter faceless melangkah menaiki tangga visual mewakili progress nyata.`
    },
    ...(isShort ? [] : [
      {
        sceneNumber: 4,
        partType: 'Isi' as const,
        timestamp: '00:25 - 00:45',
        narrationDraft: `Coba deh konsisten cuma 7 hari aja. Kamu bakal kaget sendiri liat perubahan energi dan hasil yang kamu dapet!`,
        actingCue: '[Nada memotivasi, santai bagai ngobrol sama temen dekat]',
        imagePromptEn: `Faceless character holding a glowing trophy with calendar checkmarks floating behind, smooth blank featureless head with no eyes, no nose, no mouth, anonymous figure, ${themePromptStr}, vibrant composition --no face features, eyes, mouth, nose`,
        imagePromptId: `Karakter faceless tanpa wajah memegang trofi dengan latar belakang kalender, gaya ${themePromptStr}`,
        visualDescription: `Karakter faceless merayakan pencapaian konsistensi.`
      }
    ]),
    {
      sceneNumber: isShort ? 4 : 5,
      partType: 'CTA',
      timestamp: isShort ? '00:25 - 00:30' : '00:45 - 00:60',
      narrationDraft: `Menurut kamu, mana poin yang paling cocok buat dicoba hari ini? Tulis di kolom komentar ya, biar kita diskusi bareng! Jangan lupa save konten ini biar nggak hilang!`,
      actingCue: '[Nada ramah, tersenyum hangat, ajakan terbuka]',
      imagePromptEn: `Faceless character pointing downwards toward a floating save and comment bookmark button icon, smooth featureless face with no eyes, no nose, no mouth, blank anonymous head, ${themePromptStr}, eye-catching CTA composition --no facial features, eyes, mouth, nose`,
      imagePromptId: `Karakter faceless tanpa wajah menunjuk tombol simpan dan komentar, gaya ${themePromptStr}`,
      visualDescription: `Karakter faceless mengajak penonton berinteraksi di kolom komentar.`
    }
  ];

  const fullNarration = scenes.map(s => `${s.actingCue}\n"${s.narrationDraft}"`).join('\n\n');
  const totalWords = scenes.reduce((acc, s) => acc + s.narrationDraft.split(/\s+/).length, 0);

  return {
    id: 'draft_' + Date.now(),
    topic,
    theme: themePromptStr,
    duration,
    tone: tone || 'Santai & Kasual',
    createdAt: new Date().toISOString(),
    hookSummary: scenes[0]?.narrationDraft || '',
    foreshadowSummary: scenes[1]?.narrationDraft || '',
    isiSummary: scenes.filter(s => s.partType === 'Isi').map(s => s.narrationDraft).join(' '),
    ctaSummary: scenes[scenes.length - 1]?.narrationDraft || '',
    fullNarrationText: fullNarration,
    estimatedReadingTime: `${duration} detik`,
    totalWords,
    scenes
  };
}
