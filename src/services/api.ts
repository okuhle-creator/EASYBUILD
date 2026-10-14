import type { GenerationRequest, GenerationResponse, DesignSettings } from '../types';
import { demoGenerate } from './demoMode';

const API_BASE = '/api';

export async function generateWebsite(
  request: GenerationRequest
): Promise<GenerationResponse> {
  if (request.mode === 'demo') {
    // Simulate a realistic delay
    await new Promise((r) => setTimeout(r, 1800 + Math.random() * 1200));
    return demoGenerate(request.prompt, request.projectContext);
  }

  try {
    const response = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(
        data.error || `Server responded with ${response.status}`
      );
    }

    const data = await response.json();
    return { ...data, success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return {
      html: '',
      css: '',
      javascript: '',
      success: false,
      error: message,
    };
  }
}

export async function checkApiStatus(): Promise<{
  available: boolean;
  provider?: string;
}> {
  try {
    const response = await fetch(`${API_BASE}/status`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return { available: false };
    const data = await response.json();
    return { available: true, provider: data.provider };
  } catch {
    return { available: false };
  }
}
