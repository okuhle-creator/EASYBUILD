import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import styles from './NewProjectModal.module.css';

interface NewProjectModalProps {
  onClose: () => void;
  onCreate: (name: string, description: string, initialPrompt?: string) => void;
}

const STARTERS = [
  { label: 'Portfolio', prompt: 'A portfolio website for a UX designer with hero, case studies, about section and contact form' },
  { label: 'Startup', prompt: 'A SaaS landing page for a productivity tool with features, pricing tiers and customer testimonials' },
  { label: 'Online Store', prompt: 'An e-commerce landing page for artisan coffee with product showcase, brand story and newsletter' },
  { label: 'Personal Blog', prompt: 'A minimal personal website for a writer with bio, recent posts list and social links' },
  { label: 'Agency', prompt: 'A creative agency website with hero, services, portfolio grid and contact form' },
  { label: 'Restaurant', prompt: 'A restaurant website with hero, menu sections, gallery and reservation form' },
];

export function NewProjectModal({ onClose, onCreate }: NewProjectModalProps) {
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const projectName = name.trim() || 'Untitled Project';
    onCreate(projectName, prompt.trim(), prompt.trim() || undefined);
    onClose();
  }

  function handleStarterSelect(starter: typeof STARTERS[0]) {
    if (!name.trim()) {
      setName(starter.label + ' Website');
    }
    setPrompt(starter.prompt);
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className={styles.modalHeader}>
          <h2 id="modal-title" className={styles.modalTitle}>New Project</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="project-name">Project Name</label>
            <input
              id="project-name"
              ref={nameRef}
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Website"
              autoComplete="off"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="project-prompt">
              Describe your website <span className={styles.optional}>(optional — you can also type it in the editor)</span>
            </label>
            <textarea
              id="project-prompt"
              className={styles.textarea}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A portfolio for a graphic designer with dark theme, minimal layout and a featured projects grid..."
              rows={3}
            />
          </div>

          {/* Quick starters */}
          <div className={styles.starters}>
            <p className={styles.startersLabel}>Or start from a template:</p>
            <div className={styles.starterGrid}>
              {STARTERS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  className={`${styles.starterBtn} ${prompt === s.prompt ? styles.selected : ''}`}
                  onClick={() => handleStarterSelect(s)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.createBtn}>
              <Sparkles size={14} strokeWidth={2} />
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
