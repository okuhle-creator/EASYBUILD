import type { Project, DesignSettings } from '../types';
import { DEFAULT_DESIGN_SETTINGS } from '../types';

const STORAGE_KEY = 'easybuild_projects';
const ACTIVE_KEY = 'easybuild_active_project';

function generateId(): string {
  return `proj_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save projects:', err);
  }
}

export function createProject(name: string, description: string = ''): Project {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    name,
    description,
    createdAt: now,
    updatedAt: now,
    html: '',
    css: '',
    javascript: '',
    designSettings: { ...DEFAULT_DESIGN_SETTINGS },
    messages: [],
  };
}

export function updateProject(
  projects: Project[],
  id: string,
  updates: Partial<Project>
): Project[] {
  return projects.map((p) =>
    p.id === id
      ? { ...p, ...updates, updatedAt: new Date().toISOString() }
      : p
  );
}

export function deleteProject(projects: Project[], id: string): Project[] {
  return projects.filter((p) => p.id !== id);
}

export function duplicateProject(projects: Project[], id: string): Project | null {
  const original = projects.find((p) => p.id === id);
  if (!original) return null;
  const now = new Date().toISOString();
  return {
    ...original,
    id: generateId(),
    name: `${original.name} (copy)`,
    createdAt: now,
    updatedAt: now,
  };
}

export function getActiveProjectId(): string | null {
  return localStorage.getItem(ACTIVE_KEY);
}

export function setActiveProjectId(id: string | null): void {
  if (id) {
    localStorage.setItem(ACTIVE_KEY, id);
  } else {
    localStorage.removeItem(ACTIVE_KEY);
  }
}

export function applyDesignSettings(settings: DesignSettings): string {
  return `
    --eb-primary: ${settings.primaryColor};
    --eb-secondary: ${settings.secondaryColor};
    --eb-accent: ${settings.accentColor};
    --eb-bg: ${settings.backgroundColor};
    --eb-surface: ${settings.surfaceColor};
    --eb-text: ${settings.textColor};
    --eb-muted: ${settings.mutedColor};
    --eb-heading-font: '${settings.headingFont}', sans-serif;
    --eb-body-font: '${settings.bodyFont}', sans-serif;
    --eb-base-size: ${settings.baseSize}px;
    --eb-spacing: ${settings.spacing}rem;
    --eb-radius: ${settings.borderRadius}px;
    --eb-max-width: ${settings.maxWidth}px;
  `.trim();
}
