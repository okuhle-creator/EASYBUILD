import React, { useState } from 'react';
import { Palette, Code2, Download, Archive, Github, ChevronDown, FileCode, Paintbrush, FileTerminal } from 'lucide-react';
import type { Project, RightPanelTab } from '../../types';
import { DesignPanel } from './DesignPanel';
import { CodePanel } from './CodePanel';
import { downloadProjectZip, downloadHtml, downloadCss, downloadJs } from '../../services/export';
import { GitHubExportModal } from '../ui/GitHubExportModal';
import styles from './RightPanel.module.css';

interface RightPanelProps {
  project: Project | null;
  onDesignChange: (settings: Partial<import('../../types').DesignSettings>) => void;
  onCodeChange: (field: 'html' | 'css' | 'javascript', value: string) => void;
}

export function RightPanel({ project, onDesignChange, onCodeChange }: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<RightPanelTab>('design');
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [exporting, setExporting] = useState(false);

  async function handleExportZip() {
    if (!project || !project.html) return;
    setExporting(true);
    setExportMenuOpen(false);
    try {
      await downloadProjectZip(project);
    } finally {
      setExporting(false);
    }
  }

  function handleOpenGithub() {
    setExportMenuOpen(false);
    setShowGithubModal(true);
  }

  return (
    <div className={styles.panel}>
      {/* Tab header */}
      <div className={styles.header}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'design' ? styles.active : ''}`}
            onClick={() => setActiveTab('design')}
          >
            <Palette size={13} strokeWidth={2} />
            Design
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'code' ? styles.active : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <Code2 size={13} strokeWidth={2} />
            Code
          </button>
        </div>

        {/* Export button */}
        <div className={styles.exportWrapper}>
          <button
            className={styles.exportBtn}
            onClick={() => setExportMenuOpen((o) => !o)}
            disabled={!project?.html}
            aria-label="Export options"
          >
            <Download size={13} strokeWidth={2} />
            Export
            <ChevronDown size={12} strokeWidth={2} />
          </button>

          {exportMenuOpen && (
            <>
              <div className={styles.exportOverlay} onClick={() => setExportMenuOpen(false)} />
              <div className={styles.exportMenu}>
                <button
                  className={styles.exportMenuItem}
                  onClick={handleExportZip}
                  disabled={exporting}
                >
                  <Archive size={15} strokeWidth={1.75} />
                  <div>
                    <strong>Download Project ZIP</strong>
                    <span>index.html, style.css, script.js, README & .gitignore</span>
                  </div>
                </button>

                <button
                  className={styles.exportMenuItem}
                  onClick={handleOpenGithub}
                >
                  <Github size={15} strokeWidth={1.75} />
                  <div>
                    <strong>Export for GitHub</strong>
                    <span>Publishing instructions & CLI setup for GitHub Pages</span>
                  </div>
                </button>

                <div className={styles.exportMenuDivider} />

                <div className={styles.exportSubHeader}>Single Files</div>

                <button
                  className={styles.exportSubItem}
                  onClick={() => { project && downloadHtml(project); setExportMenuOpen(false); }}
                >
                  <FileCode size={13} />
                  <span>Download index.html</span>
                </button>
                <button
                  className={styles.exportSubItem}
                  onClick={() => { project && downloadCss(project); setExportMenuOpen(false); }}
                >
                  <Paintbrush size={13} />
                  <span>Download style.css</span>
                </button>
                <button
                  className={styles.exportSubItem}
                  onClick={() => { project && downloadJs(project); setExportMenuOpen(false); }}
                >
                  <FileTerminal size={13} />
                  <span>Download script.js</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Panel content */}
      <div className={styles.content}>
        {activeTab === 'design' && (
          <DesignPanel
            settings={project?.designSettings ?? null}
            onChange={onDesignChange}
            hasProject={Boolean(project)}
          />
        )}
        {activeTab === 'code' && (
          <CodePanel
            html={project?.html ?? ''}
            css={project?.css ?? ''}
            javascript={project?.javascript ?? ''}
            onChange={onCodeChange}
            hasProject={Boolean(project)}
          />
        )}
      </div>

      {showGithubModal && project && (
        <GitHubExportModal
          project={project}
          onClose={() => setShowGithubModal(false)}
        />
      )}
    </div>
  );
}
