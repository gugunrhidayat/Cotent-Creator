export type PartType = 'Hook' | 'Foreshadow' | 'Isi' | 'CTA';

export interface ScenePart {
  sceneNumber: number;
  partType: PartType;
  timestamp: string;
  narrationDraft: string;
  actingCue: string;
  imagePromptEn: string;
  imagePromptId: string;
  visualDescription: string;
  generatedImageUrl?: string;
}

export interface GeneratedContent {
  id: string;
  topic: string;
  theme: string;
  duration: number; // 15, 30, 45, 60
  tone: string;
  createdAt: string;
  hookSummary: string;
  foreshadowSummary: string;
  isiSummary: string;
  ctaSummary: string;
  fullNarrationText: string;
  estimatedReadingTime: string;
  totalWords: number;
  scenes: ScenePart[];
}

export interface GenerationRequest {
  topic: string;
  theme: string;
  duration: number;
  tone: string;
}
