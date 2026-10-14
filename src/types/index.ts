// Core project types for EasyBuild

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  html: string;
  css: string;
  javascript: string;
  designSettings: DesignSettings;
  messages: ChatMessage[];
  thumbnail?: string;
}

export interface DesignSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  mutedColor: string;
  headingFont: string;
  bodyFont: string;
  baseSize: number;
  headingScale: number;
  spacing: number;
  borderRadius: number;
  maxWidth: number;
  theme: 'light' | 'dark';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  status?: 'sending' | 'done' | 'error';
  isGenerating?: boolean;
}

export type ViewportSize = 'desktop' | 'tablet' | 'mobile';

export type RightPanelTab = 'design' | 'code';

export type CodeTab = 'html' | 'css' | 'javascript';

export type AppPage = 'dashboard' | 'editor' | 'templates' | 'docs' | 'settings';

export interface GenerationRequest {
  prompt: string;
  projectContext?: {
    html: string;
    css: string;
    javascript: string;
    designSettings: DesignSettings;
    conversationHistory: ChatMessage[];
  };
  mode: 'demo' | 'api';
}

export interface GenerationResponse {
  html: string;
  css: string;
  javascript: string;
  success: boolean;
  error?: string;
}

export interface ExportOptions {
  projectName: string;
  includeReadme: boolean;
  includeGitignore: boolean;
}

export const DEFAULT_DESIGN_SETTINGS: DesignSettings = {
  primaryColor: '#1E3A5F',
  secondaryColor: '#2D5A8E',
  accentColor: '#4A90D9',
  backgroundColor: '#FAFAF8',
  surfaceColor: '#FFFFFF',
  textColor: '#1A1A1A',
  mutedColor: '#6B7280',
  headingFont: 'Inter',
  bodyFont: 'Inter',
  baseSize: 16,
  headingScale: 1.25,
  spacing: 1,
  borderRadius: 8,
  maxWidth: 1200,
  theme: 'light',
};

export const FONT_OPTIONS = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Geist', label: 'Geist' },
  { value: 'DM Sans', label: 'DM Sans' },
  { value: 'Outfit', label: 'Outfit' },
  { value: 'Sora', label: 'Sora' },
  { value: 'Playfair Display', label: 'Playfair Display (Serif)' },
  { value: 'Lora', label: 'Lora (Serif)' },
  { value: 'Georgia', label: 'Georgia (Serif)' },
  { value: 'System UI', label: 'System UI' },
];
