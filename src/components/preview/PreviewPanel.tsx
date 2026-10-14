import React, { useRef, useEffect, useState } from 'react';
import { Monitor, Tablet, Smartphone, RefreshCw, ExternalLink, Loader2, Layers, ZoomIn, ZoomOut } from 'lucide-react';
import type { ViewportSize, DesignSettings } from '../../types';
import styles from './PreviewPanel.module.css';

interface PreviewPanelProps {
  html: string;
  css: string;
  javascript: string;
  designSettings?: DesignSettings;
  isGenerating: boolean;
}

const VIEWPORT_SIZES: Record<ViewportSize, { width: string; label: string; icon: React.ReactNode }> = {
  desktop: { width: '100%', label: 'Desktop', icon: <Monitor size={14} strokeWidth={1.75} /> },
  tablet: { width: '768px', label: 'Tablet', icon: <Tablet size={14} strokeWidth={1.75} /> },
  mobile: { width: '375px', label: 'Mobile', icon: <Smartphone size={14} strokeWidth={1.75} /> },
};

function buildDesignOverrides(settings?: DesignSettings): string {
  if (!settings) return '';
  return `
    <style id="easybuild-injected-tokens">
      :root {
        --primary: ${settings.primaryColor} !important;
        --eb-primary: ${settings.primaryColor} !important;
        --secondary: ${settings.secondaryColor} !important;
        --eb-secondary: ${settings.secondaryColor} !important;
        --accent: ${settings.accentColor} !important;
        --eb-accent: ${settings.accentColor} !important;
        --bg: ${settings.backgroundColor} !important;
        --eb-bg: ${settings.backgroundColor} !important;
        --surface: ${settings.surfaceColor} !important;
        --eb-surface: ${settings.surfaceColor} !important;
        --text: ${settings.textColor} !important;
        --eb-text: ${settings.textColor} !important;
        --muted: ${settings.mutedColor} !important;
        --eb-muted: ${settings.mutedColor} !important;
        --radius: ${settings.borderRadius}px !important;
        --eb-radius: ${settings.borderRadius}px !important;
        --max-w: ${settings.maxWidth}px !important;
        --eb-max-width: ${settings.maxWidth}px !important;
      }
      body {
        font-family: '${settings.bodyFont}', -apple-system, sans-serif !important;
        font-size: ${settings.baseSize}px !important;
        ${settings.theme === 'dark' ? 'background: #0F1419 !important; color: #F3F4F6 !important;' : ''}
      }
      h1, h2, h3, h4, h5, h6, .hero-title, .section-title, .hero-heading {
        font-family: '${settings.headingFont}', Georgia, serif !important;
      }
      .btn {
        border-radius: ${settings.borderRadius}px !important;
      }
    </style>
  `;
}

function buildSrcdoc(html: string, css: string, js: string, settings?: DesignSettings): string {
  const overrides = buildDesignOverrides(settings);

  // If html already has a complete document structure, inject CSS/JS
  if (html.includes('</head>') && html.includes('<link') && html.includes('style.css')) {
    let doc = html.replace(/<link[^>]*href=["']style\.css["'][^>]*\/?>/gi, `<style>${css}</style>\n${overrides}`);
    doc = doc.replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/gi, `<script>${js}</script>`);
    return doc;
  }

  if (html.trim().startsWith('<!DOCTYPE') || html.trim().startsWith('<html')) {
    let doc = html;
    if (doc.includes('</head>')) {
      doc = doc.replace('</head>', `<style>\n${css}\n</style>\n${overrides}\n</head>`);
    } else {
      doc = `<head><style>\n${css}\n</style>\n${overrides}</head>` + doc;
    }
    if (doc.includes('</body>')) {
      doc = doc.replace('</body>', `<script>\n${js}\n</script>\n</body>`);
    } else {
      doc = doc + `<script>\n${js}\n</script>`;
    }
    return doc;
  }

  // Partial HTML — wrap it
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>${css}</style>
  ${overrides}
</head>
<body>
${html}
<script>${js}</script>
</body>
</html>`;
}

export function PreviewPanel({ html, css, javascript, designSettings, isGenerating }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [zoom, setZoom] = useState<number>(100);
  const [refreshKey, setRefreshKey] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(false);
  const hasContent = Boolean(html && html.trim().length > 50);

  const srcdoc = hasContent ? buildSrcdoc(html, css, javascript, designSettings) : '';

  useEffect(() => {
    if (hasContent) {
      setIframeLoading(true);
    }
  }, [srcdoc, refreshKey]);

  function handleRefresh() {
    setRefreshKey((k) => k + 1);
  }

  function handleOpenExternal() {
    if (!hasContent) return;
    const blob = new Blob([srcdoc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank', 'noopener');
    if (win) {
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    }
  }

  function cycleZoom() {
    if (zoom === 100) setZoom(75);
    else if (zoom === 75) setZoom(50);
    else setZoom(100);
  }

  return (
    <div className={styles.panel}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.viewportSwitcher}>
          {(Object.keys(VIEWPORT_SIZES) as ViewportSize[]).map((v) => {
            const { label, icon } = VIEWPORT_SIZES[v];
            return (
              <button
                key={v}
                className={`${styles.viewportBtn} ${viewport === v ? styles.active : ''}`}
                onClick={() => setViewport(v)}
                title={label}
                aria-label={label}
                aria-pressed={viewport === v}
              >
                {icon}
                <span className={styles.viewportLabel}>{label}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.toolbarRight}>
          <button
            className={styles.toolBtn}
            onClick={cycleZoom}
            title={`Zoom: ${zoom}% (Click to cycle)`}
            aria-label="Toggle zoom"
          >
            <span className={styles.zoomLabel}>{zoom}%</span>
          </button>
          <button
            className={styles.toolBtn}
            onClick={handleRefresh}
            title="Refresh preview"
            aria-label="Refresh preview"
            disabled={!hasContent}
          >
            <RefreshCw size={13} strokeWidth={2} />
          </button>
          <button
            className={styles.toolBtn}
            onClick={handleOpenExternal}
            title="Open in new tab"
            aria-label="Open in new tab"
            disabled={!hasContent}
          >
            <ExternalLink size={13} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div className={styles.previewArea}>
        <div
          className={styles.viewportWrapper}
          style={{
            maxWidth: VIEWPORT_SIZES[viewport].width,
            transform: zoom !== 100 ? `scale(${zoom / 100})` : undefined,
            transformOrigin: 'top center',
          }}
        >
          {/* Generating state */}
          {isGenerating && (
            <div className={styles.generatingOverlay}>
              <div className={styles.generatingContent}>
                <Loader2 size={32} strokeWidth={1.5} className={styles.spinning} />
                <p>Generating your website…</p>
                <span>Synthesising responsive markup, styles & scripts</span>
              </div>
            </div>
          )}

          {/* Empty / first use */}
          {!hasContent && !isGenerating && (
            <div className={styles.emptyPreview}>
              <Layers size={48} strokeWidth={1} />
              <h3>Your website will appear here</h3>
              <p>Describe what you want to build in the conversation panel and your site will be generated live.</p>
            </div>
          )}

          {/* Iframe preview */}
          {hasContent && !isGenerating && (
            <iframe
              key={`${refreshKey}-${viewport}`}
              ref={iframeRef}
              className={styles.iframe}
              srcDoc={srcdoc}
              sandbox="allow-scripts allow-same-origin allow-forms"
              title="EasyBuild Website Live Preview"
              onLoad={() => setIframeLoading(false)}
            />
          )}

          {iframeLoading && hasContent && !isGenerating && (
            <div className={styles.iframeLoader}>
              <Loader2 size={20} strokeWidth={1.5} className={styles.spinning} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
