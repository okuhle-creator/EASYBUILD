import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';
import type { Project, DesignSettings } from '../../types';
import { ChatPanel } from '../chat/ChatPanel';
import { PreviewPanel } from '../preview/PreviewPanel';
import { RightPanel } from '../design/RightPanel';
import { useEditor } from '../../hooks/useEditor';
import styles from './EditorWorkspace.module.css';

type GenerationMode = 'demo' | 'api';

interface EditorWorkspaceProps {
  project: Project;
  onBack: () => void;
  onUpdate: (id: string, updates: Partial<Project>) => void;
}

export function EditorWorkspace({ project, onBack, onUpdate }: EditorWorkspaceProps) {
  const [mode, setMode] = useState<GenerationMode>('demo');
  const [saved, setSaved] = useState(false);

  const { isGenerating, error, sendMessage, updateDesignSettings, updateCode, clearError } =
    useEditor({
      project,
      updateProject: onUpdate,
      mode,
    });

  // Automatically trigger generation if initial prompt was provided on creation
  useEffect(() => {
    const initialPrompt = sessionStorage.getItem('easybuild_initial_prompt');
    if (initialPrompt && (!project.messages || project.messages.length === 0)) {
      sessionStorage.removeItem('easybuild_initial_prompt');
      sendMessage(initialPrompt);
    }
  }, [project.id, sendMessage]);

  function handleDesignChange(settings: Partial<DesignSettings>) {
    updateDesignSettings(settings);
    flashSaved();
  }

  function handleCodeChange(field: 'html' | 'css' | 'javascript', value: string) {
    updateCode(field, value);
    flashSaved();
  }

  function flashSaved() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className={styles.workspace}>
      {/* Editor header bar */}
      <div className={styles.editorBar}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Back to projects">
          <ArrowLeft size={15} strokeWidth={2} />
          Projects
        </button>
        <div className={styles.projectTitle}>
          <span className={styles.titleDot} />
          <span className={styles.titleText}>{project.name}</span>
        </div>
        <div className={styles.saveIndicator}>
          {saved ? (
            <>
              <CheckCircle size={13} strokeWidth={2} className={styles.savedIcon} />
              <span>Saved</span>
            </>
          ) : (
            <>
              <Save size={13} strokeWidth={1.75} />
              <span>Auto-saved</span>
            </>
          )}
        </div>
      </div>

      {/* Three-panel layout */}
      <div className={styles.panels}>
        {/* Left: Chat */}
        <div className={styles.chatPane}>
          <ChatPanel
            messages={project.messages ?? []}
            isGenerating={isGenerating}
            error={error}
            mode={mode}
            onModeChange={setMode}
            onSend={sendMessage}
            onClearError={clearError}
            hasProject={Boolean(project.html)}
          />
        </div>

        {/* Centre: Preview */}
        <div className={styles.previewPane}>
          <PreviewPanel
            html={project.html}
            css={project.css}
            javascript={project.javascript}
            designSettings={project.designSettings}
            isGenerating={isGenerating}
          />
        </div>

        {/* Right: Design + Code */}
        <div className={styles.rightPane}>
          <RightPanel
            project={project}
            onDesignChange={handleDesignChange}
            onCodeChange={handleCodeChange}
          />
        </div>
      </div>
    </div>
  );
}
