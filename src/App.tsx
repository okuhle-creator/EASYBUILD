import React, { useState, useEffect } from 'react';
import type { AppPage, Project } from './types';
import { Navigation } from './components/navigation/Navigation';
import { Dashboard } from './components/projects/Dashboard';
import { EditorWorkspace } from './components/editor/EditorWorkspace';
import { Templates } from './pages/Templates';
import { Documentation } from './pages/Documentation';
import { Settings } from './pages/Settings';
import { NewProjectModal } from './components/ui/NewProjectModal';
import { useProjects } from './hooks/useProjects';
import type { SiteTemplate } from './services/templates';
import './styles/global.css';

export default function App() {
  const [page, setPage] = useState<AppPage>('dashboard');
  const [showNewModal, setShowNewModal] = useState(false);

  const {
    projects,
    activeProject,
    activeProjectId,
    createProject,
    updateProject,
    deleteProject,
    duplicateProject,
    renameProject,
    selectProject,
  } = useProjects();

  // Navigate to editor when a project is selected
  useEffect(() => {
    if (activeProjectId && page === 'dashboard') {
      setPage('editor');
    }
  }, [activeProjectId]);

  function handleNavigate(target: AppPage) {
    setPage(target);
  }

  function handleNewProject() {
    setShowNewModal(true);
  }

  function handleCreateProject(name: string, description: string, initialPrompt?: string) {
    const project = createProject(name, description);
    selectProject(project.id);
    setPage('editor');

    if (initialPrompt) {
      sessionStorage.setItem('easybuild_initial_prompt', initialPrompt);
    }
  }

  function handleUseTemplate(template: SiteTemplate) {
    const proj = createProject(template.name, template.description);
    updateProject(proj.id, {
      html: template.html,
      css: template.css,
      javascript: template.javascript,
      designSettings: { ...template.designSettings },
      messages: [
        {
          id: `msg_${Date.now()}`,
          role: 'assistant',
          content: `Initialized from the **${template.name}** starter template. You can now chat to make custom changes, adjust styles in the Design panel, or inspect and modify the raw code.`,
          timestamp: new Date().toISOString(),
          status: 'done',
        },
      ],
    });
    selectProject(proj.id);
    setPage('editor');
  }

  function handleOpenProject(id: string) {
    selectProject(id);
    setPage('editor');
  }

  function handleBackToDashboard() {
    setPage('dashboard');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Navigation
        currentPage={page}
        onNavigate={handleNavigate}
        onNewProject={handleNewProject}
      />

      <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {page === 'dashboard' && (
          <Dashboard
            projects={projects}
            onOpen={handleOpenProject}
            onCreate={handleNewProject}
            onDelete={deleteProject}
            onDuplicate={duplicateProject}
            onRename={renameProject}
          />
        )}

        {page === 'templates' && (
          <Templates onUseTemplate={handleUseTemplate} />
        )}

        {page === 'docs' && (
          <Documentation />
        )}

        {page === 'editor' && activeProject && (
          <EditorWorkspace
            project={activeProject}
            onBack={handleBackToDashboard}
            onUpdate={updateProject}
          />
        )}

        {page === 'editor' && !activeProject && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: 'var(--color-stone)', fontSize: 'var(--text-base)' }}>No project selected.</p>
            <button
              style={{ padding: '0.5rem 1.25rem', background: 'var(--color-cobalt)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: 'var(--text-sm)' }}
              onClick={() => setPage('dashboard')}
            >
              Go to Projects
            </button>
          </div>
        )}

        {page === 'settings' && <Settings />}
      </main>

      {showNewModal && (
        <NewProjectModal
          onClose={() => setShowNewModal(false)}
          onCreate={handleCreateProject}
        />
      )}
    </div>
  );
}
