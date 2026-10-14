import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Eye, X } from 'lucide-react';
import { TEMPLATES, SiteTemplate } from '../services/templates';
import type { Project } from '../types';
import styles from './Templates.module.css';

interface TemplatesProps {
  onUseTemplate: (template: SiteTemplate) => void;
}

export function Templates({ onUseTemplate }: TemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewTemplate, setPreviewTemplate] = useState<SiteTemplate | null>(null);

  const categories = ['All', 'SaaS', 'Portfolio', 'Agency'];

  const filtered = selectedCategory === 'All'
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.category === selectedCategory);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <span className={styles.badge}>Curated Starters</span>
            <h1 className={styles.pageTitle}>Website Templates</h1>
            <p className={styles.pageSubtitle}>
              Explore responsive, typography-driven website architectures ready for instant conversational customisation.
            </p>
          </div>
        </div>

        {/* Category filter pills */}
        <div className={styles.filtersWrapper}>
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.grid}>
          {filtered.map((t) => (
            <article key={t.id} className={styles.templateCard}>
              <div className={styles.previewBox}>
                <div className={styles.previewHeader}>
                  <div className={styles.dots}>
                    <span/><span/><span/>
                  </div>
                  <span className={styles.previewCategory}>{t.category}</span>
                </div>
                <div className={styles.previewBody}>
                  <div className={styles.mockTagline}>{t.tagline}</div>
                  <h3 className={styles.mockTitle}>{t.name}</h3>
                  <div className={styles.mockLines}>
                    <div className={styles.mockLine} style={{ width: '85%' }}/>
                    <div className={styles.mockLine} style={{ width: '65%' }}/>
                  </div>
                  <div className={styles.mockBtnRow}>
                    <div className={styles.mockButton}/>
                    <div className={styles.mockButtonGhost}/>
                  </div>
                </div>
                <div className={styles.previewOverlay}>
                  <button
                    className={styles.quickPreviewBtn}
                    onClick={() => setPreviewTemplate(t)}
                  >
                    <Eye size={14} />
                    Inspect Layout
                  </button>
                  <button
                    className={styles.useTemplateBtn}
                    onClick={() => onUseTemplate(t)}
                  >
                    <Sparkles size={14} />
                    Use This Template
                  </button>
                </div>
              </div>

              <div className={styles.cardInfo}>
                <div className={styles.cardMeta}>
                  <h2 className={styles.cardTitle}>{t.name}</h2>
                  <span className={styles.categoryBadge}>{t.category}</span>
                </div>
                <p className={styles.cardDesc}>{t.description}</p>
                <div className={styles.tagList}>
                  {t.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <button
                  className={styles.cardUseBtn}
                  onClick={() => onUseTemplate(t)}
                >
                  Start Building with this Template
                  <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Quick preview modal */}
      {previewTemplate && (
        <div className={styles.modalBackdrop} onClick={() => setPreviewTemplate(null)}>
          <div className={styles.previewModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>{previewTemplate.name}</h3>
                <span>{previewTemplate.category} Architecture</span>
              </div>
              <div className={styles.modalActions}>
                <button
                  className={styles.modalUseBtn}
                  onClick={() => {
                    onUseTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                >
                  <Sparkles size={14} />
                  Start with this Template
                </button>
                <button
                  className={styles.modalCloseBtn}
                  onClick={() => setPreviewTemplate(null)}
                  aria-label="Close preview"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className={styles.modalIframeWrap}>
              <iframe
                title={previewTemplate.name}
                srcDoc={`<!DOCTYPE html><html><head><style>${previewTemplate.css}</style></head><body>${previewTemplate.html}</body></html>`}
                sandbox="allow-scripts allow-same-origin"
                className={styles.previewIframe}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
