import React, { useState } from 'react';
import { X, Github, Copy, Check, Download, ExternalLink, Terminal } from 'lucide-react';
import type { Project } from '../../types';
import { downloadProjectZip } from '../../services/export';
import styles from './GitHubExportModal.module.css';

interface GitHubExportModalProps {
  project: Project;
  onClose: () => void;
}

export function GitHubExportModal({ project, onClose }: GitHubExportModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);

  const safeName = project.name
    .toLowerCase()
    .replace(/[^a-z0-9-_\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 40) || 'my-website';

  const gitCommands = [
    `# 1. Navigate to the extracted project\ncd ${safeName}`,
    `# 2. Initialise Git and stage all files\ngit init\ngit add .\ngit commit -m "Initial commit from EasyBuild"`,
    `# 3. Connect to your GitHub repository and push\ngit remote add origin https://github.com/YOUR_USERNAME/${safeName}.git\ngit branch -M main\ngit push -u origin main`,
  ];

  function copyCommand(text: string, index: number) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      await downloadProjectZip(project);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className={styles.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="gh-modal-title">
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleWrap}>
            <Github size={20} />
            <h2 id="gh-modal-title" className={styles.modalTitle}>Publish to GitHub & Pages</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.heroBox}>
            <p>
              Your website code is completely self-contained static HTML, CSS and JavaScript. It runs anywhere without needing EasyBuild or any runtime server.
            </p>
            <button className={styles.downloadBtn} onClick={handleDownload} disabled={downloading}>
              <Download size={15} />
              {downloading ? 'Preparing ZIP…' : `Download ${safeName}.zip`}
            </button>
          </div>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNum}>1</span>
                <h3>Create an Empty GitHub Repository</h3>
              </div>
              <p className={styles.stepDesc}>
                Open <a href="https://github.com/new" target="_blank" rel="noopener noreferrer">github.com/new <ExternalLink size={11} /></a> and name your repository <code>{safeName}</code>. Do not select "Add a README file".
              </p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNum}>2</span>
                <h3>Push Your Files</h3>
              </div>
              <p className={styles.stepDesc}>Extract the downloaded ZIP and run these commands in your terminal:</p>
              <div className={styles.codeStack}>
                {gitCommands.map((cmd, idx) => (
                  <div key={idx} className={styles.commandBlock}>
                    <pre>{cmd}</pre>
                    <button
                      className={styles.copyBtn}
                      onClick={() => copyCommand(cmd, idx)}
                      title="Copy command"
                    >
                      {copiedIndex === idx ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNum}>3</span>
                <h3>Activate Free GitHub Pages Hosting</h3>
              </div>
              <p className={styles.stepDesc}>
                In your repository on GitHub, go to <strong>Settings → Pages</strong>. Under <strong>Build and deployment</strong>, set Source to <strong>Deploy from a branch</strong>, choose <strong>main</strong> and <strong>/ (root)</strong>, then click <strong>Save</strong>.
              </p>
              <p className={styles.liveUrlNote}>
                Your website will be live worldwide at <code>https://YOUR_USERNAME.github.io/{safeName}</code> in ~60 seconds!
              </p>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.doneBtn} onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
