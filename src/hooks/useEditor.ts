import { useState, useCallback, useRef } from 'react';
import type { Project, ChatMessage, GenerationRequest, DesignSettings } from '../types';
import { generateWebsite } from '../services/api';

type GenerationMode = 'demo' | 'api';

interface UseEditorOptions {
  project: Project | null;
  updateProject: (id: string, updates: Partial<Project>) => void;
  mode: GenerationMode;
}

export function useEditor({ project, updateProject, mode }: UseEditorOptions) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (userInput: string) => {
      if (!project || !userInput.trim() || isGenerating) return;

      setError(null);
      setIsGenerating(true);

      const userMsg: ChatMessage = {
        id: `msg_${Date.now()}`,
        role: 'user',
        content: userInput.trim(),
        timestamp: new Date().toISOString(),
        status: 'done',
      };

      const assistantMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
        isGenerating: true,
        status: 'sending',
      };

      // Add user message immediately
      const messagesWithUser = [...(project.messages ?? []), userMsg, assistantMsg];
      updateProject(project.id, { messages: messagesWithUser });

      try {
        const request: GenerationRequest = {
          prompt: userInput.trim(),
          mode,
          projectContext:
            project.html
              ? {
                  html: project.html,
                  css: project.css,
                  javascript: project.javascript,
                  designSettings: project.designSettings,
                  conversationHistory: project.messages ?? [],
                }
              : undefined,
        };

        const result = await generateWebsite(request);

        if (!result.success) {
          throw new Error(result.error || 'Generation failed');
        }

        const doneMsg: ChatMessage = {
          ...assistantMsg,
          content:
            mode === 'demo'
              ? "Here's your website! I've generated a complete design based on your description. You can continue chatting to make changes, or use the Design tab to customise colours and typography."
              : 'Your website has been generated. Feel free to ask for changes or customise using the Design controls.',
          isGenerating: false,
          status: 'done',
        };

        const finalMessages = [...(project.messages ?? []), userMsg, doneMsg];
        updateProject(project.id, {
          messages: finalMessages,
          html: result.html,
          css: result.css,
          javascript: result.javascript,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong';
        setError(message);

        const errorMsg: ChatMessage = {
          ...assistantMsg,
          content: `Sorry, I ran into a problem: ${message}. Please try again.`,
          isGenerating: false,
          status: 'error',
        };

        const finalMessages = [...(project.messages ?? []), userMsg, errorMsg];
        updateProject(project.id, { messages: finalMessages });
      } finally {
        setIsGenerating(false);
      }
    },
    [project, updateProject, mode, isGenerating]
  );

  const updateDesignSettings = useCallback(
    (settings: Partial<DesignSettings>) => {
      if (!project) return;
      updateProject(project.id, {
        designSettings: { ...project.designSettings, ...settings },
      });
    },
    [project, updateProject]
  );

  const updateCode = useCallback(
    (field: 'html' | 'css' | 'javascript', value: string) => {
      if (!project) return;
      updateProject(project.id, { [field]: value });
    },
    [project, updateProject]
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    isGenerating,
    error,
    sendMessage,
    updateDesignSettings,
    updateCode,
    clearError,
  };
}
