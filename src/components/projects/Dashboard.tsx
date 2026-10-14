import React, { useState } from 'react';
import {
  Plus, Clock, Trash2, Copy, Edit3, ChevronRight, Layers, Sparkles
} from 'lucide-react';
import type { Project } from '../../types';
import styles from './Dashboard.module.css';

interface DashboardProps {
  projects: Project[];
  onOpen: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onRename: (id: string, name: string) => void;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface RenameState { id: string; value: string }

export function Dashboard({ projects, onOpen, onCreate, onDelete, onDuplicate, onRename }: DashboardProps) {
  const [renaming, setRenaming] = useState<RenameState | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  function handleRenameSubmit(id: string) {
    if (renaming && renaming.value.trim()) {
      onRename(id, renaming.value.trim());
    }
    setRenaming(null);
  }

  function handleDeleteClick(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    setDeleteConfirm(id);
  }

  function handleDeleteConfirm(id: string) {
    onDelete(id);
    setDeleteConfirm(null);
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.pageTitle}>Projects</h1>
            <p className={styles.pageSubtitle}>
              {projects.length === 0
                ? 'Create your first website'
                : `${projects.length} project${projects.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <button className={styles.newBtn} onClick={onCreate}>
            <Plus size={16} strokeWidth={2} />
            New Project
          </button>
        </div>
      </header>

      <div className={styles.content}>
        {/* Empty state */}
        {projects.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Layers size={40} strokeWidth={1.25} />
            </div>
            <h2 className={styles.emptyTitle}>No projects yet</h2>
            <p className={styles.emptyDesc}>
              Describe a website in plain language and see it generated live.
            </p>
            <button className={styles.emptyBtn} onClick={onCreate}>
              <Sparkles size={16} strokeWidth={1.75} />
              Create your first project
            </button>
            <div className={styles.emptyExamples}>
              <p>Try these:</p>
              <div className={styles.exampleChips}>
                {[
                  'Portfolio for a UX designer',
                  'SaaS landing page',
                  'Personal blog',
                  'Online store',
                ].map((ex) => (
                  <button key={ex} className={styles.exampleChip} onClick={onCreate}>
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Project grid */}
        {projects.length > 0 && (
          <div className={styles.grid}>
            {/* New project card */}
            <button className={styles.newCard} onClick={onCreate}>
              <div className={styles.newCardIcon}>
                <Plus size={24} strokeWidth={1.5} />
              </div>
              <span>New Project</span>
            </button>

            {/* Project cards */}
            {projects.map((project) => (
              <div
                key={project.id}
                className={styles.projectCard}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Thumbnail */}
                <div
                  className={styles.thumbnail}
                  onClick={() => onOpen(project.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onOpen(project.id)}
                  aria-label={`Open ${project.name}`}
                >
                  {project.html ? (
                    <div className={styles.thumbnailPreview}>
                      <div className={styles.thumbnailBar}>
                        <span/><span/><span/>
                      </div>
                      <div className={styles.thumbnailCode}>
                        <div className={styles.fakeLine} style={{width:'70%'}}/>
                        <div className={styles.fakeLine} style={{width:'90%'}}/>
                        <div className={styles.fakeLine} style={{width:'55%'}}/>
                        <div className={styles.fakeLine} style={{width:'80%'}}/>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.thumbnailEmpty}>
                      <Layers size={28} strokeWidth={1.25} />
                      <span>Empty project</span>
                    </div>
                  )}
                  <div className={styles.thumbnailOverlay}>
                    <span className={styles.openHint}>
                      Open <ChevronRight size={14}/>
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className={styles.cardBody}>
                  {renaming?.id === project.id ? (
                    <input
                      className={styles.renameInput}
                      value={renaming.value}
                      autoFocus
                      onChange={(e) => setRenaming({ id: project.id, value: e.target.value })}
                      onBlur={() => handleRenameSubmit(project.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRenameSubmit(project.id);
                        if (e.key === 'Escape') setRenaming(null);
                      }}
                    />
                  ) : (
                    <h3
                      className={styles.projectName}
                      onClick={() => onOpen(project.id)}
                    >
                      {project.name}
                    </h3>
                  )}
                  <div className={styles.cardMeta}>
                    <Clock size={12} strokeWidth={1.75} />
                    <span>{timeAgo(project.updatedAt)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className={`${styles.cardActions} ${hoveredId === project.id ? styles.visible : ''}`}>
                  <button
                    className={styles.actionBtn}
                    onClick={(e) => { e.stopPropagation(); setRenaming({ id: project.id, value: project.name }); }}
                    title="Rename"
                    aria-label="Rename project"
                  >
                    <Edit3 size={13} strokeWidth={2} />
                  </button>
                  <button
                    className={styles.actionBtn}
                    onClick={(e) => { e.stopPropagation(); onDuplicate(project.id); }}
                    title="Duplicate"
                    aria-label="Duplicate project"
                  >
                    <Copy size={13} strokeWidth={2} />
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.danger}`}
                    onClick={(e) => handleDeleteClick(e, project.id)}
                    title="Delete"
                    aria-label="Delete project"
                  >
                    <Trash2 size={13} strokeWidth={2} />
                  </button>
                </div>

                {/* Delete confirmation */}
                {deleteConfirm === project.id && (
                  <div className={styles.deleteConfirm} onClick={(e) => e.stopPropagation()}>
                    <p>Delete "{project.name}"?</p>
                    <div className={styles.confirmActions}>
                      <button
                        className={styles.confirmBtn}
                        onClick={() => setDeleteConfirm(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className={`${styles.confirmBtn} ${styles.confirmDelete}`}
                        onClick={() => handleDeleteConfirm(project.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
