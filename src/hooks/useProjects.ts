import { useState, useEffect, useCallback } from 'react';
import type { Project } from '../types';
import {
  loadProjects,
  saveProjects,
  createProject,
  updateProject,
  deleteProject,
  duplicateProject,
  getActiveProjectId,
  setActiveProjectId,
} from '../services/storage';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveId] = useState<string | null>(null);

  // Load on mount
  useEffect(() => {
    const loaded = loadProjects();
    setProjects(loaded);
    const activeId = getActiveProjectId();
    if (activeId && loaded.some((p) => p.id === activeId)) {
      setActiveId(activeId);
    }
  }, []);

  // Persist whenever projects change
  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  // Persist active project id
  useEffect(() => {
    setActiveProjectId(activeProjectId);
  }, [activeProjectId]);

  const activeProject = projects.find((p) => p.id === activeProjectId) ?? null;

  const handleCreateProject = useCallback((name: string, description?: string): Project => {
    const project = createProject(name, description);
    setProjects((prev) => [project, ...prev]);
    setActiveId(project.id);
    return project;
  }, []);

  const handleUpdateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects((prev) => updateProject(prev, id, updates));
  }, []);

  const handleDeleteProject = useCallback((id: string) => {
    setProjects((prev) => deleteProject(prev, id));
    setActiveId((prev) => (prev === id ? null : prev));
  }, []);

  const handleDuplicateProject = useCallback((id: string) => {
    setProjects((prev) => {
      const copy = duplicateProject(prev, id);
      if (!copy) return prev;
      const idx = prev.findIndex((p) => p.id === id);
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      setActiveId(copy.id);
      return next;
    });
  }, []);

  const handleRenameProject = useCallback((id: string, name: string) => {
    setProjects((prev) => updateProject(prev, id, { name }));
  }, []);

  const handleSelectProject = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return {
    projects,
    activeProject,
    activeProjectId,
    createProject: handleCreateProject,
    updateProject: handleUpdateProject,
    deleteProject: handleDeleteProject,
    duplicateProject: handleDuplicateProject,
    renameProject: handleRenameProject,
    selectProject: handleSelectProject,
  };
}
