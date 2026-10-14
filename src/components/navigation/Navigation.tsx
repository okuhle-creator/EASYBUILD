import React from 'react';
import { LayoutGrid, Plus, BookOpen, Settings, LayoutTemplate } from 'lucide-react';
import type { AppPage } from '../../types';
import styles from './Navigation.module.css';

interface NavigationProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  onNewProject: () => void;
}

export function Navigation({ currentPage, onNavigate, onNewProject }: NavigationProps) {
  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <div className={styles.navInner}>
        {/* Wordmark */}
        <button
          className={styles.wordmark}
          onClick={() => onNavigate('dashboard')}
          aria-label="EasyBuild — Go to dashboard"
        >
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="7" fill="#1E3A5F"/>
            <path d="M8 10h10M8 16h16M8 22h12" stroke="#4A90D9" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span>EasyBuild</span>
        </button>

        {/* Main nav links */}
        <ul className={styles.navLinks} role="list">
          <li>
            <button
              className={`${styles.navLink} ${currentPage === 'dashboard' ? styles.active : ''}`}
              onClick={() => onNavigate('dashboard')}
              aria-current={currentPage === 'dashboard' ? 'page' : undefined}
            >
              <LayoutGrid size={15} strokeWidth={1.75} />
              Projects
            </button>
          </li>
          <li>
            <button
              className={`${styles.navLink} ${currentPage === 'templates' ? styles.active : ''}`}
              onClick={() => onNavigate('templates')}
              aria-current={currentPage === 'templates' ? 'page' : undefined}
            >
              <LayoutTemplate size={15} strokeWidth={1.75} />
              Templates
            </button>
          </li>
          <li>
            <button
              className={styles.navLink}
              onClick={onNewProject}
            >
              <Plus size={15} strokeWidth={2} />
              New Project
            </button>
          </li>
        </ul>

        {/* Right side */}
        <div className={styles.navRight}>
          <button
            className={`${styles.navLink} ${currentPage === 'docs' ? styles.active : ''}`}
            onClick={() => onNavigate('docs')}
            title="Documentation & Guides"
            aria-current={currentPage === 'docs' ? 'page' : undefined}
          >
            <BookOpen size={15} strokeWidth={1.75} />
            <span>Docs</span>
          </button>

          <button
            className={`${styles.navIconBtn} ${currentPage === 'settings' ? styles.active : ''}`}
            onClick={() => onNavigate('settings')}
            title="Settings"
            aria-label="Settings"
          >
            <Settings size={16} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </nav>
  );
}
